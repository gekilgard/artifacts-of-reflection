import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient.js'
import './Submit.css'

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

  // Format the current date for the letter
  const formatDate = () => {
    const now = new Date()
    return now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="submit-page">
      <div className="letter-container">
        <div className="letter-paper">
          {/* Letter Header */}
          <div className="letter-header">
            <div className="letter-date">{formatDate()}</div>
            <div className="letter-from">
              <input 
                type="text" 
                value={locationText} 
                onChange={e => setLocationText(e.target.value)} 
                placeholder="From: Your City, Country"
                className="location-input"
              />
            </div>
          </div>

          {/* Letter Greeting */}
          <div className="letter-greeting">
            Dear Universe,
          </div>

          {/* Prompt as Letter Opening */}
          {prompt && (
            <div className="letter-prompt">
              {prompt.text}
            </div>
          )}

          {/* Image Upload Section */}
          <div className="letter-image-section">
            <input 
              type="file" 
              accept="image/*" 
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="image-input"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="image-upload-label">
              {file ? (
                <div className="image-preview">
                  <img src={URL.createObjectURL(file)} alt="Preview" />
                  <span className="image-filename">{file.name}</span>
                </div>
              ) : (
                <div className="image-placeholder">
                  <div className="image-placeholder-icon">📷</div>
                  <span>Attach a memory</span>
                </div>
              )}
            </label>
          </div>

          {/* Letter Content */}
          <div className="letter-content">
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Share your story here..."
              className="letter-textarea"
              rows={12}
            />
          </div>

          {/* Letter Signature */}
          <div className="letter-signature">
            <div className="signature-line">
              With reflection,
            </div>
            <div className="signature-space">
              A fellow traveler
            </div>
          </div>

          {/* Character Count */}
          <div className="letter-meta">
            <div className={`char-count ${text.length < MIN ? 'too-short' : text.length > MAX ? 'too-long' : 'valid'}`}>
              {text.length} / {MAX} characters
              {text.length < MIN && ` (${MIN - text.length} more needed)`}
            </div>
          </div>

          {/* Submit Button */}
          <form onSubmit={handleSubmit} className="letter-form">
            <button 
              disabled={!valid || loading} 
              type="submit"
              className="send-letter-btn"
            >
              {loading ? 'Sending letter...' : 'Send Letter to the Universe'}
            </button>
          </form>

          {/* Message */}
          {message && (
            <div className={`letter-message ${message.includes('Thank you') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

