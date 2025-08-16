import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { supabase } from '../lib/supabaseClient.js'

// Fix default icon paths for Leaflet when bundled
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

export default function MapPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    async function load() {
      setLoading(true)
      if (!supabase) { setItems([]); setLoading(false); return }
      const { data, error } = await supabase
        .from('submissions')
        .select('id, question_text, story_text, image_url, lat, lng, created_at')
        .eq('status', 'approved')
        .not('lat', 'is', null)
        .not('lng', 'is', null)
        .limit(5000)
      if (!ignore) {
        setItems(error ? [] : (data || []))
        setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [])

  const center = [20, 0] // world view
  const zoom = 2

  return (
    <div>
      <h2>Map</h2>
      {loading && <p>Loading…</p>}
      <MapContainer center={center} zoom={zoom} style={{ height: '70vh', width: '100%' }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map(it => (
          <Marker key={it.id} position={[it.lat, it.lng]}>
            <Popup>
              <div style={{ maxWidth: 240 }}>
                {it.image_url && <img src={it.image_url} alt="" />}
                <div style={{ fontWeight: 'bold', marginTop: 6 }}>{it.question_text}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{new Date(it.created_at).toLocaleString()}</div>
                <div style={{ marginTop: 6, whiteSpace: 'pre-wrap' }}>{it.story_text}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

