import { useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import './Wall2Test.css'

// Physics simulation for circles
class PhysicsCircle {
  constructor(id, imageUrl, data, index, total) {
    this.id = id
    this.imageUrl = imageUrl
    this.data = data
    // Start in a ring around center
    const angle = (index / total) * Math.PI * 2
    const startRadius = 300 + Math.random() * 200
    this.x = startRadius * Math.cos(angle)
    this.y = startRadius * Math.sin(angle)
    this.vx = 0
    this.vy = 0
    this.radius = 50
    this.mass = 1
  }
}

function usePhysicsSimulation(items) {
  const [circles, setCircles] = useState([])
  const animationRef = useRef()
  const circlesRef = useRef([])

  useEffect(() => {
    if (!items.length) return

    // Initialize circles
    circlesRef.current = items.map((item, i) => 
      new PhysicsCircle(item.id, item.image_url, item, i, items.length)
    )
    setCircles([...circlesRef.current])

    const simulate = () => {
      const circles = circlesRef.current
      const centerX = 0
      const centerY = 0
      const gravity = 0.15
      const damping = 0.92
      const repulsion = 800
      const minDist = 110

      for (let i = 0; i < circles.length; i++) {
        const c = circles[i]
        
        // Attract to center
        const dx = centerX - c.x
        const dy = centerY - c.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        c.vx += (dx / dist) * gravity
        c.vy += (dy / dist) * gravity

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
  }, [items])

  return circles
}

function ExpandedCard({ item, onClose }) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    // Trigger expansion animation after mount
    requestAnimationFrame(() => {
      setExpanded(true)
    })
  }, [])

  const handleClose = () => {
    setExpanded(false)
    setTimeout(onClose, 400)
  }

  return (
    <div className={`expanded-overlay ${expanded ? 'active' : ''}`} onClick={handleClose}>
      <div 
        className={`expanded-card ${expanded ? 'expanded' : 'collapsed'}`}
        onClick={e => e.stopPropagation()}
      >
        <button className="expanded-close" onClick={handleClose}>×</button>
        
        {item.image_url && (
          <div className="expanded-image-container">
            <img src={item.image_url} alt="" className="expanded-image" />
          </div>
        )}
        
        <div className="expanded-content">
          <div className="expanded-location">
            {item.location_text && (
              <>
                <span className="location-pin">📍</span>
                <span>{item.location_text}</span>
              </>
            )}
          </div>
          
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
  )
}

export default function Wall2Test() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const containerRef = useRef(null)

  const circles = usePhysicsSimulation(items)

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
      <div className="wall2-container" ref={containerRef}>
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
