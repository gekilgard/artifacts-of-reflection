import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

function DetailModal({ item, onClose }) {
  if (!item) return null

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 20
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 24,
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflow: 'auto',
          color: 'black'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            float: 'right',
            background: 'none',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer'
          }}
        >
          ×
        </button>
        
        {item.image_url && (
          <img 
            src={item.image_url} 
            alt="" 
            style={{ 
              maxWidth: '100%',
              maxHeight: '60vh',
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto 16px'
            }} 
          />
        )}
        
        <div style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 16 }}>
          {item.question_text}
        </div>
        
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5, marginBottom: 8 }}>
          {item.story_text}
        </div>
        
        {item.location_text && (
          <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
            📍 {item.location_text}
          </div>
        )}
        
        <div style={{ fontSize: 12, color: '#666' }}>
          {new Date(item.created_at).toLocaleString()}
        </div>
      </div>
    </div>
  )
}

export default function Wall() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    let ignore = false
    async function load() {
      setLoading(true)
      if (!supabase) {
        setItems([])
        setLoading(false)
        return
      }
      const { data, error } = await supabase
        .from('submissions')
        .select('id, image_url, question_text, story_text, location_text, created_at')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
      if (!ignore) {
        if (error) setItems([])
        else setItems(data || [])
        setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [])



  if (loading) return <p>Loading…</p>

  return (
    <div>
      <h2>Wall</h2>
      <div style={{
        display: 'grid',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))'
      }}>
        {items.map(it => (
          <article 
            key={it.id} 
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: 8, 
              padding: 8,
              cursor: 'pointer'
            }}
            onClick={() => setSelectedItem(it)}
          >
            {it.image_url && <img src={it.image_url} alt="" style={{ width: '100%' }} />}
            <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
              {new Date(it.created_at).toLocaleString()}
            </div>
            {it.location_text && (
              <div style={{ fontSize: 11, color: '#777' }}>
                📍 {it.location_text}
              </div>
            )}
          </article>
        ))}
      </div>
      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  )
}

