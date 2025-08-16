import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.heat'
import { supabase } from '../lib/supabaseClient.js'
import { useTheme } from '../components/ThemeProvider.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import './Map.css'

// Fix default icon paths for Leaflet when bundled
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

// Location fuzzing utility functions
const CITY_RADIUS_KM = 25 // Consider posts within 25km as same city
const FUZZ_RADIUS_KM = 5 // Spread posts within 5km radius

// Calculate distance between two coordinates (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// Add random offset to coordinates within specified radius
function fuzzLocation(lat, lng, radiusKm = FUZZ_RADIUS_KM) {
  const earthRadius = 6371 // Earth's radius in km
  const randomDistance = Math.random() * radiusKm
  const randomBearing = Math.random() * 2 * Math.PI
  
  const deltaLat = (randomDistance / earthRadius) * (180 / Math.PI)
  const deltaLng = (randomDistance / earthRadius) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180)
  
  const newLat = lat + deltaLat * Math.cos(randomBearing)
  const newLng = lng + deltaLng * Math.sin(randomBearing)
  
  return { lat: newLat, lng: newLng }
}

// Group posts by city and apply fuzzing
function processLocations(items) {
  const groups = []
  const processed = []
  
  items.forEach(item => {
    // Find existing group within city radius
    const existingGroup = groups.find(group => 
      getDistance(item.lat, item.lng, group.centerLat, group.centerLng) <= CITY_RADIUS_KM
    )
    
    if (existingGroup) {
      existingGroup.items.push(item)
    } else {
      groups.push({
        centerLat: item.lat,
        centerLng: item.lng,
        items: [item]
      })
    }
  })
  
  // Apply fuzzing to groups with multiple items
  groups.forEach(group => {
    if (group.items.length === 1) {
      // Single item, no fuzzing needed
      processed.push({
        ...group.items[0],
        intensity: 1
      })
    } else {
      // Multiple items, apply fuzzing and increase intensity
      group.items.forEach(item => {
        const fuzzed = fuzzLocation(group.centerLat, group.centerLng)
        processed.push({
          ...item,
          lat: fuzzed.lat,
          lng: fuzzed.lng,
          intensity: Math.min(group.items.length * 0.5, 3) // Scale intensity by group size
        })
      })
    }
  })
  
  return processed
}

// World wrapping controller for infinite seamless scrolling
function WorldWrapController() {
  const map = useMap()
  
  useEffect(() => {
    // Set world bounds to prevent infinite zoom out
    const worldBounds = [
      [-90, -180], // Southwest corner
      [90, 180]    // Northeast corner
    ]
    
    // Restrict zoom and set world bounds
    map.setMaxBounds(worldBounds)
    map.setMinZoom(1) // Prevent zooming out too far
    map.setMaxZoom(18)
    
    // Handle world wrapping when panning reaches edges
    const handleMoveEnd = () => {
      const center = map.getCenter()
      let { lat, lng } = center
      
      // Wrap longitude when crossing edges (like Snake game)
      if (lng > 180) {
        lng = lng - 360
        map.setView([lat, lng], map.getZoom(), { animate: false })
      } else if (lng < -180) {
        lng = lng + 360
        map.setView([lat, lng], map.getZoom(), { animate: false })
      }
    }
    
    map.on('moveend', handleMoveEnd)
    
    return () => {
      map.off('moveend', handleMoveEnd)
    }
  }, [map])
  
  return null
}

// Dynamic tile layer that responds to theme changes
function DynamicTileLayer() {
  const map = useMap()
  const tileLayerRef = useRef(null)
  
  useEffect(() => {
    // Remove existing tile layer
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current)
    }
    
    // Determine theme
    const isDark = document.documentElement.dataset.theme === 'dark' || 
                   (!document.documentElement.dataset.theme && 
                    window.matchMedia('(prefers-color-scheme: dark)').matches)
    
    // Add new tile layer based on theme
    tileLayerRef.current = L.tileLayer(
      `https://{s}.basemaps.cartocdn.com/${isDark ? 'dark_nolabels' : 'light_nolabels'}/{z}/{x}/{y}{r}.png`,
      {
        attribution: '&copy; Carto',
        subdomains: 'abcd',
        maxZoom: 19
      }
    ).addTo(map)
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const newIsDark = document.documentElement.dataset.theme === 'dark' || 
                        (!document.documentElement.dataset.theme && 
                         window.matchMedia('(prefers-color-scheme: dark)').matches)
      
      if (newIsDark !== isDark) {
        // Theme changed, update tile layer
        if (tileLayerRef.current) {
          map.removeLayer(tileLayerRef.current)
        }
        tileLayerRef.current = L.tileLayer(
          `https://{s}.basemaps.cartocdn.com/${newIsDark ? 'dark_nolabels' : 'light_nolabels'}/{z}/{x}/{y}{r}.png`,
          {
            attribution: '&copy; Carto',
            subdomains: 'abcd',
            maxZoom: 19
          }
        ).addTo(map)
      }
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })
    
    return () => {
      observer.disconnect()
      if (tileLayerRef.current) {
        map.removeLayer(tileLayerRef.current)
      }
    }
  }, [map])
  
  return null
}

// Zoom-responsive heatmap component
function HeatmapLayer({ points }) {
  const map = useMap()
  const heatLayerRef = useRef(null)
  
  const updateHeatmap = () => {
    if (!points.length) return
    
    // Remove existing heat layer
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current)
    }
    
    // Create heatmap data with optimized world wrapping
    const baseHeatData = points.map(point => [
      point.lat, 
      point.lng, 
      point.intensity || 1
    ])
    
    // Create strategic copies for seamless wrapping (only what's needed)
    const heatData = [...baseHeatData]
    
    // Add edge copies for seamless wrapping at boundaries
    baseHeatData.forEach(point => {
      const [lat, lng, intensity] = point
      
      // Add copies near the edges for seamless wrapping
      if (lng > 90) {
        // Points near eastern edge also appear on western edge
        heatData.push([lat, lng - 360, intensity])
      }
      if (lng < -90) {
        // Points near western edge also appear on eastern edge
        heatData.push([lat, lng + 360, intensity])
      }
    })
    
    // Get current zoom level
    const currentZoom = map.getZoom()
    
    // Dynamic scaling based on zoom level and data volume
    const totalPoints = baseHeatData.length
    const maxIntensity = Math.max(...baseHeatData.map(point => point[2]))
    
    // Completely rewritten zoom-responsive scaling to prevent square artifacts
    let radius, blur, minOpacity
    
    if (currentZoom <= 1) {
      // Global view - very conservative to prevent artifacts
      radius = 15
      blur = 25
      minOpacity = 0.3
    } else if (currentZoom <= 2) {
      // Continental view - smooth scaling
      radius = 20
      blur = 20
      minOpacity = 0.4
    } else if (currentZoom <= 3) {
      // Large continental view
      radius = 25
      blur = 18
      minOpacity = 0.5
    } else if (currentZoom <= 5) {
      // Country view
      radius = 30
      blur = 15
      minOpacity = 0.4
    } else if (currentZoom <= 8) {
      // Regional view
      radius = 35
      blur = 12
      minOpacity = 0.3
    } else if (currentZoom <= 12) {
      // City view
      radius = 40
      blur = 10
      minOpacity = 0.2
    } else {
      // Close-up view
      radius = 45
      blur = 8
      minOpacity = 0.1
    }
    
    // Adjust for data volume without artifacts
    if (totalPoints < 20) {
      radius += 10
      blur += 5
    } else if (totalPoints < 50) {
      radius += 5
      blur += 2
    }
    
    // Calculate max intensity to prevent oversaturation
    const dynamicMax = Math.max(maxIntensity, 1)
    
    // Create heat layer with anti-artifact settings
    heatLayerRef.current = L.heatLayer(heatData, {
      radius: radius,
      blur: blur,
      max: dynamicMax,
      minOpacity: minOpacity,
      maxZoom: 18,
      gradient: {
        0.0: '#3b82f6',    // Blue
        0.2: '#06b6d4',    // Cyan  
        0.4: '#10b981',    // Emerald
        0.6: '#f59e0b',    // Amber
        0.8: '#ef4444',    // Red
        1.0: '#dc2626'     // Dark red
      }
    }).addTo(map)
  }
  
  useEffect(() => {
    updateHeatmap()
    
    // Update heatmap when zoom changes
    map.on('zoomend', updateHeatmap)
    
    return () => {
      map.off('zoomend', updateHeatmap)
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current)
      }
    }
  }, [map, points])
  
  return null
}

// Generate optimized markers for seamless world wrapping
function generateWrappedMarkers(items) {
  const wrappedMarkers = [...items] // Start with original items
  
  // Add strategic edge copies for seamless wrapping
  items.forEach(item => {
    // Add copies near edges for seamless Snake-game-like wrapping
    if (item.lng > 90) {
      // Items near eastern edge also appear on western edge
      wrappedMarkers.push({
        ...item,
        id: `${item.id}_west`,
        lng: item.lng - 360,
        originalId: item.id
      })
    }
    if (item.lng < -90) {
      // Items near western edge also appear on eastern edge
      wrappedMarkers.push({
        ...item,
        id: `${item.id}_east`,
        lng: item.lng + 360,
        originalId: item.id
      })
    }
  })
  
  return wrappedMarkers
}

export default function MapPage() {
  const [items, setItems] = useState([])
  const [processedPoints, setProcessedPoints] = useState([])
  const [wrappedMarkers, setWrappedMarkers] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, cities: 0 })

  useEffect(() => {
    let ignore = false
    async function load() {
      setLoading(true)
      if (!supabase) { 
        setItems([])
        setProcessedPoints([])
        setLoading(false)
        return 
      }
      
      const { data, error } = await supabase
        .from('submissions')
        .select('id, question_text, story_text, image_url, lat, lng, location_text, created_at')
        .eq('status', 'approved')
        .not('lat', 'is', null)
        .not('lng', 'is', null)
        .limit(5000)
        
      if (!ignore) {
        const items = error ? [] : (data || [])
        const processed = processLocations(items)
        const wrapped = generateWrappedMarkers(items)
        
        setItems(items)
        setProcessedPoints(processed)
        setWrappedMarkers(wrapped)
        setStats({
          total: items.length,
          cities: new Set(processed.map(p => `${Math.round(p.lat * 10)},${Math.round(p.lng * 10)}`)).size
        })
        setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [])

  const center = [20, 0] // world view
  const zoom = 2

  // Prevent page scrolling when map is active
  useEffect(() => {
    document.body.classList.add('map-active')
    return () => {
      document.body.classList.remove('map-active')
    }
  }, [])

  if (loading) {
    return (
      <div className="map-page">
        <div className="map-loading">
          <div className="loading-spinner"></div>
          <div className="map-loading-text">Loading story locations...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="map-page">
      {/* Persistent Navigation */}
      <nav className="map-nav">
        <div className="map-nav-content">
          <Link to="/" className="map-nav-brand">
            <div className="brand-icon">
              <div className="brand-circle">
                <div className="brand-inner"></div>
              </div>
            </div>
            <span className="brand-text">Artifacts of Reflection</span>
          </Link>
          
          <div className="map-nav-links">
            <Link to="/" className="map-nav-link">Home</Link>
            <Link to="/wall" className="map-nav-link">Wall</Link>
            <Link to="/map" className="map-nav-link active">Map</Link>
            <Link to="/submit" className="map-nav-link">Submit</Link>
          </div>
          
          <div className="map-nav-actions">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="map-overlay-header">
        <div className="map-overlay-content">
          <h1 className="map-overlay-title">Story Heatmap</h1>
          <p className="map-overlay-subtitle">
            {stats.total} {stats.total === 1 ? 'story' : 'stories'} from around the world
          </p>
        </div>
        <div className="map-overlay-stats">
          <div className="stat-item">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Stories</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.cities}</div>
            <div className="stat-label">Regions</div>
          </div>
        </div>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        className="story-map-fullscreen"
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={true}
        dragging={true}
        touchZoom={true}
        doubleClickZoom={true}
        boxZoom={false}
        keyboard={false}
        worldCopyJump={false} // Disable Leaflet's default world jumping
      >
        <WorldWrapController />
        <DynamicTileLayer />
        <HeatmapLayer points={processedPoints} />
        {wrappedMarkers.map(item => (
          <Marker key={item.id} position={[item.lat, item.lng]}>
            <Popup maxWidth={300} className="story-popup">
              <div className="popup-content">
                {item.image_url && (
                  <img 
                    src={item.image_url} 
                    alt="" 
                    className="popup-image"
                  />
                )}
                <div className="popup-question">{item.question_text}</div>
                <div className="popup-story">{item.story_text}</div>
                <div className="popup-meta">
                  {item.location_text && (
                    <div className="popup-location">
                      <span>📍</span>
                      <span>{item.location_text}</span>
                    </div>
                  )}
                  <div className="popup-date">
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
        
      <div className="map-overlay-info">
        <div className="info-note">
          Locations are approximate for privacy
        </div>
      </div>
    </div>
  )
}

