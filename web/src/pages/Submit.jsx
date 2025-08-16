import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient.js'

const MIN = 50
const MAX = 500

export default function Submit() {
  const [params] = useSearchParams()
  const promptId = params.get('promptId')
  const [prompts, setPrompts] = useState([])
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [locationText, setLocationText] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/prompt.json').then(r => r.json()).then(setPrompts).catch(() => setPrompts([]))
  }, [])

  const prompt = useMemo(() => prompts.find(p => p.id === promptId) || prompts[0], [prompts, promptId])
  const valid = text.trim().length >= MIN && text.trim().length <= MAX && (file instanceof File) && !!supabase && locationText.trim().length > 2

  async function handleSubmit(e) {
    e.preventDefault()
    if (!prompt) return
    setLoading(true)
    setMessage('')
    try {
      let image_url = null
      if (file) {
        if (!supabase) throw new Error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
        const ext = file.name.split('.').pop()
        const path = `stories/${crypto.randomUUID()}.${ext}`
        const { error: upErr } = await supabase.storage.from('stories').upload(path, file, { upsert: false })
        if (upErr) throw upErr
        const { data } = supabase.storage.from('stories').getPublicUrl(path)
        image_url = data.publicUrl
      }

      // Geocode user-provided location (best-effort, optional)
      let lat = null, lng = null
      if (locationText.trim()) {
        try {
          const q = encodeURIComponent(locationText.trim())
          const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`, {
            headers: { 'Accept': 'application/json' }
          })
          const js = await r.json()
          if (Array.isArray(js) && js[0]) {
            lat = parseFloat(js[0].lat)
            lng = parseFloat(js[0].lon)
          }
        } catch {}
      }

      const { error: insertErr } = await supabase.from('submissions').insert({
        question_id: prompt.id,
        question_text: prompt.text,
        story_text: text.trim(),
        image_url,
        location_text: locationText.trim() || null,
        lat,
        lng
      })
      if (insertErr) throw insertErr
      setMessage('Thank you. Your story has been submitted for review.')
      setText('')
      setFile(null)
      setLocationText('')
    } catch (err) {
      setMessage(err.message || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Submit your story</h2>
      {prompt && <p style={{ fontStyle: 'italic' }}>{prompt.text}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          Where are you uploading from? (City, Country)
          <input type="text" value={locationText} onChange={e => setLocationText(e.target.value)} placeholder="e.g., Los Angeles, USA" />
        </label>
        <label>
          Image (jpg/png/gif)
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
        </label>
        <label>
          Story (50–500 chars)
          <textarea rows={6} value={text} onChange={e => setText(e.target.value)} />
        </label>
        <button disabled={!valid || loading} type="submit">{loading ? 'Submitting…' : 'Submit'}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

