import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import gsap from 'gsap'
import './Wall2Test.css'

// Physics simulation for circles
class PhysicsCircle {
  constructor(id, imageUrl, data, index, total) {
    this.id = id
    this.imageUrl = imageUrl
    this.data = data
    // Start in a spiral pattern to avoid initial overlap
    const angle = (index / total) * Math.PI * 2 * 3 // 3 rotations
    const startRadius = 60 + index * 25
    this.x = startRadius * Math.cos(angle)
    this.y = startRadius * Math.sin(angle)
    this.vx = 0
    this.vy = 0
  }
}

function usePhysicsSimulation(items) {
  const [circles, setCircles] = useState([])
  const [settled, setSettled] = useState(false)
  const animationRef = useRef()
  const circlesRef = useRef([])
  const frameCount = useRef(0)

  useEffect(() => {
    if (!items.length) return

    // Initialize circles only once
    if (circlesRef.current.length !== items.length) {
      circlesRef.current = items.map((item, i) => 
        new PhysicsCircle(item.id, item.image_url, item, i, items.length)
      )
      setSettled(false)
      frameCount.current = 0
    }
    setCircles([...circlesRef.current])

    const circleRadius = 50
    const minDist = circleRadius * 2 + 6 // No overlap, tiny gap

    const simulate = () => {
      if (settled) return // Stop simulation when settled

      const circles = circlesRef.current
      const centerX = 0
      const centerY = 0
      const damping = 0.85
      
      let totalMovement = 0

      for (let i = 0; i < circles.length; i++) {
        const c = circles[i]
        
        // Very gentle pull toward center (only if far away)
        const dx = centerX - c.x
        const dy = centerY - c.y
        const distFromCenter = Math.sqrt(dx * dx + dy * dy)
        if (distFromCenter > 50) {
          const pullStrength = 0.02
          c.vx += (dx / distFromCenter) * pullStrength
          c.vy += (dy / distFromCenter) * pullStrength
        }

        // Hard collision resolution - push apart immediately
        for (let j = i + 1; j < circles.length; j++) {
          const other = circles[j]
          const odx = other.x - c.x
          const ody = other.y - c.y
          const oDist = Math.sqrt(odx * odx + ody * ody)
          
          if (oDist < minDist && oDist > 0) {
            // Calculate overlap
            const overlap = (minDist - oDist) / 2
            const nx = odx / oDist
            const ny = ody / oDist
            
            // Push both circles apart (position correction)
            c.x -= nx * overlap
            c.y -= ny * overlap
            other.x += nx * overlap
            other.y += ny * overlap
            
            // Add small velocity for squishy bounce
            const bounce = 0.3
            c.vx -= nx * bounce
            c.vy -= ny * bounce
            other.vx += nx * bounce
            other.vy += ny * bounce
          }
        }

        // Apply damping
        c.vx *= damping
        c.vy *= damping

        // Update position
        c.x += c.vx
        c.y += c.vy

        // Track total movement
        totalMovement += Math.abs(c.vx) + Math.abs(c.vy)
      }

      frameCount.current++
      
      // Check if settled (very little movement for a while)
      if (frameCount.current > 60 && totalMovement < 0.1) {
        setSettled(true)
        // Zero out all velocities
        circles.forEach(c => { c.vx = 0; c.vy = 0 })
      }

      setCircles([...circlesRef.current])
      
      if (!settled) {
        animationRef.current = requestAnimationFrame(simulate)
      }
    }

    animationRef.current = requestAnimationFrame(simulate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [items, settled])

  return circles
}

function ExpandedCard({ item, onClose, clickedPosition }) {
  const cardRef = useRef(null)
  const contentRef = useRef(null)
  const overlayRef = useRef(null)
  const [isClosing, setIsClosing] = useState(false)

  useLayoutEffect(() => {
    const card = cardRef.current
    const content = contentRef.current
    const overlay = overlayRef.current
    if (!card || !content || !overlay) return

    // Kill any existing animations
    gsap.killTweensOf([card, content, overlay])

    // Set initial state (small circle at click position)
    gsap.set(card, {
      width: 100,
      height: 100,
      borderRadius: '50%',
      opacity: 0,
      scale: 0.5,
      x: clickedPosition?.x || 0,
      y: clickedPosition?.y || 0,
    })
    gsap.set(content, { opacity: 0 })
    gsap.set(overlay, { backgroundColor: 'rgba(0,0,0,0)' })

    // Animate to full card
    const tl = gsap.timeline()
    
    tl.to(overlay, {
      backgroundColor: 'rgba(0,0,0,0.92)',
      duration: 0.4,
      ease: 'power2.out'
    }, 0)
    
    tl.to(card, {
      width: 'calc(100vw - 40px)',
      height: 'auto',
      borderRadius: 24,
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, 0)

    tl.to(content, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 0.5)

  }, [clickedPosition])

  const handleClose = () => {
    if (isClosing) return
    setIsClosing(true)

    const card = cardRef.current
    const content = contentRef.current
    const overlay = overlayRef.current

    const tl = gsap.timeline({
      onComplete: onClose
    })

    // Fade content first
    tl.to(content, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    }, 0)

    // Shrink card back to circle
    tl.to(card, {
      width: 100,
      height: 100,
      borderRadius: '50%',
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      ease: 'power3.in'
    }, 0.1)

    tl.to(overlay, {
      backgroundColor: 'rgba(0,0,0,0)',
      duration: 0.4,
      ease: 'power2.in'
    }, 0.2)
  }

  return (
    <div 
      ref={overlayRef}
      className="expanded-overlay" 
      onClick={handleClose}
    >
      <div 
        ref={cardRef}
        className="expanded-card"
        onClick={e => e.stopPropagation()}
      >
        <button className="expanded-close" onClick={handleClose}>×</button>
        
        <div ref={contentRef} className="card-inner">
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
  const [clickedPosition, setClickedPosition] = useState(null)
  const containerRef = useRef(null)

  const circles = usePhysicsSimulation(items)

  const handleCircleClick = (circle, e) => {
    // Get click position relative to viewport center
    const rect = e.currentTarget.getBoundingClientRect()
    const viewportCenterX = window.innerWidth / 2
    const viewportCenterY = window.innerHeight / 2
    const circleCenterX = rect.left + rect.width / 2
    const circleCenterY = rect.top + rect.height / 2
    
    setClickedPosition({
      x: circleCenterX - viewportCenterX,
      y: circleCenterY - viewportCenterY
    })
    setSelectedItem(circle.data)
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
              onClick={(e) => handleCircleClick(circle, e)}
            />
          ))}
        </div>
      </div>

      {selectedItem && (
        <ExpandedCard 
          item={selectedItem} 
          clickedPosition={clickedPosition}
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  )
}
