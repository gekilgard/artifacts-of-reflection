import { useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import './Wall2Test.css'

// Physics simulation for circles with mouse interaction
class PhysicsCircle {
  constructor(id, imageUrl, data, index, total) {
    this.id = id
    this.imageUrl = imageUrl
    this.data = data
    // Start in a ring around center
    const angle = (index / total) * Math.PI * 2
    const startRadius = 200 + Math.random() * 150
    this.x = startRadius * Math.cos(angle)
    this.y = startRadius * Math.sin(angle)
    this.vx = 0
    this.vy = 0
    this.radius = 55 // Slightly larger for spacing calculation
  }
}

function usePhysicsSimulation(items, mousePos) {
  const [circles, setCircles] = useState([])
  const animationRef = useRef()
  const circlesRef = useRef([])

  useEffect(() => {
    if (!items.length) return

    // Initialize circles only once
    if (circlesRef.current.length !== items.length) {
      circlesRef.current = items.map((item, i) => 
        new PhysicsCircle(item.id, item.image_url, item, i, items.length)
      )
    }
    setCircles([...circlesRef.current])

    const simulate = () => {
      const circles = circlesRef.current
      const centerX = 0
      const centerY = 0
      const gravity = 0.08
      const damping = 0.94
      const repulsion = 1200
      const minDist = 115 // Circles barely touch

      for (let i = 0; i < circles.length; i++) {
        const c = circles[i]
        
        // Attract to center (gentle)
        const dx = centerX - c.x
        const dy = centerY - c.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        c.vx += (dx / dist) * gravity
        c.vy += (dy / dist) * gravity

        // Repel from mouse cursor
        if (mousePos.current.x !== null) {
          const mdx = c.x - mousePos.current.x
          const mdy = c.y - mousePos.current.y
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy) || 1
          if (mDist < 150) {
            const mouseForce = 2000 / (mDist * mDist)
            c.vx += (mdx / mDist) * mouseForce
            c.vy += (mdy / mDist) * mouseForce
          }
        }

        // Repel from other circles
        for (let j = 0; j < circles.length; j++) {
          if (i === j) continue
          const other = circles[j]
          const odx = c.x - other.x
          const ody = c.y - other.y
          const oDist = Math.sqrt(odx * odx + ody * ody) || 1
          if (oDist < minDist) {
            const force = repulsion / (oDist * oDist)
            c.vx += (odx / oDist) * force
            c.vy += (ody / oDist) * force
          }
        }

        // Apply damping
        c.vx *= damping
        c.vy *= damping

        // Update position
        c.x += c.vx
        c.y += c.vy
      }

      setCircles([...circlesRef.current])
      animationRef.current = requestAnimationFrame(simulate)
    }

    animationRef.current = requestAnimationFrame(simulate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [items, mousePos])

  return circles
}

function ExpandedCard({ item, onClose }) {
  const [phase, setPhase] = useState('entering') // entering, visible, exiting

  useEffect(() => {
    // Small delay then expand
    const timer = setTimeout(() => setPhase('visible'), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setPhase('exiting')
    setTimeout(onClose, 500)
  }

  return (
    <div 
      className={`expanded-overlay ${phase === 'visible' ? 'active' : ''}`} 
      onClick={handleClose}
    >
      <div 
        className={`expanded-card ${phase}`}
        onClick={e => e.stopPropagation()}
      >
        <button className="expanded-close" onClick={handleClose}>×</button>
        
        <div className={`card-inner ${phase === 'visible' ? 'show' : ''}`}>
          {item.image_url && (
            <div className="expanded-image-container">
              <img src={item.image_url} alt="" className="expanded-image" />
            </div>
          )}
          
          <div className="expanded-content">
            {item.location_text && (
              <div className="expanded-location">
                <span className="location-pin">📍</span>
                <span>{item.location_text}</span>
              </div>
            )}
            
            <div className="expanded-question">
              {item.question_text}
            </div>
            
            <div className="expanded-story">
              {item.story_text}
            </div>
            
            <div className="expanded-date">
              {new Date(item.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Wall2Test() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const containerRef = useRef(null)
  const mousePos = useRef({ x: null, y: null })

  const circles = usePhysicsSimulation(items, mousePos)

  // Track mouse position relative to center
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    mousePos.current = {
      x: e.clientX - rect.left - centerX,
      y: e.clientY - rect.top - centerY
    }
  }

  const handleMouseLeave = () => {
    mousePos.current = { x: null, y: null }
  }

  useEffect(() => {
    async function load() {
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

      if (error) {
        console.error('Error loading submissions:', error)
        setItems([])
      } else {
        setItems(data || [])
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="wall2-page">
        <div className="wall2-loading">
          <div className="loading-spinner"></div>
          <div>Loading memories...</div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="wall2-page">
        <div className="wall2-empty">
          <h2>No memories yet</h2>
          <p>Be the first to share your story!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="wall2-page">
      <div 
        className="wall2-container" 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="circles-container">
          {circles.map(circle => (
            <div
              key={circle.id}
              className="physics-circle"
              style={{
                transform: `translate(${circle.x}px, ${circle.y}px)`,
                backgroundImage: circle.imageUrl ? `url(${circle.imageUrl})` : 'none'
              }}
              onClick={() => setSelectedItem(circle.data)}
            />
          ))}
        </div>
      </div>

      {selectedItem && (
        <ExpandedCard item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
