import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.heat'
import { supabase } from '../lib/supabaseClient.js'
import './Map.css'

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

// Heatmap component
function HeatmapLayer({ points }) {
  const map = useMap()
  const heatLayerRef = useRef(null)
  
  useEffect(() => {
    if (!points.length) return
    
    // Remove existing heat layer
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current)
    }
    
    // Create heatmap data: [lat, lng, intensity]
    const heatData = points.map(point => [
      point.lat, 
      point.lng, 
      point.intensity || 1
    ])
    
    // Dynamic scaling based on data volume
    const totalPoints = heatData.length
    const maxIntensity = Math.max(...heatData.map(point => point[2]))
    
    // Adjust settings for low data volumes
    const dynamicRadius = totalPoints < 50 ? 40 : totalPoints < 200 ? 30 : 25
    const dynamicBlur = totalPoints < 50 ? 25 : totalPoints < 200 ? 20 : 15
    const dynamicMax = Math.max(maxIntensity * 0.8, 1) // Normalize max to make small datasets more visible
    
    // Create and add heat layer
    heatLayerRef.current = L.heatLayer(heatData, {
      radius: dynamicRadius,
      blur: dynamicBlur,
      max: dynamicMax, // Dynamic scaling instead of fixed scale
      maxZoom: 17,
      gradient: {
        0.0: '#3b82f6',    // Blue
        0.2: '#06b6d4',    // Cyan  
        0.4: '#10b981',    // Emerald
        0.6: '#f59e0b',    // Amber
        0.8: '#ef4444',    // Red
        1.0: '#dc2626'     // Dark red
      }
    }).addTo(map)
    
    return () => {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current)
      }
    }
  }, [map, points])
  
  return null
}

export default function MapPage() {
  const [items, setItems] = useState([])
  const [processedPoints, setProcessedPoints] = useState([])
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
        
        setItems(items)
        setProcessedPoints(processed)
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
      >
        <DynamicTileLayer />
        <HeatmapLayer points={processedPoints} />
      </MapContainer>
        
      <div className="map-overlay-info">
        <div className="info-note">
          Locations are approximate for privacy
        </div>
      </div>
    </div>
  )
}

