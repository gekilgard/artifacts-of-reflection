import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import gsap from 'gsap'
import './Wall2Test.css'

// Physics simulation for circles with mouse interaction
class PhysicsCircle {
  constructor(id, imageUrl, data, index, total) {
    this.id = id
    this.imageUrl = imageUrl
    this.data = data
    // Start in a ring around center
    const angle = (index / total) * Math.PI * 2
    const startRadius = 180 + Math.random() * 120
    this.x = startRadius * Math.cos(angle)
    this.y = startRadius * Math.sin(angle)
    this.vx = 0
    this.vy = 0
    this.radius = 55
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
      const gravity = 0.04
      const damping = 0.92
      const circleRadius = 50
      const minDist = circleRadius * 2 + 8 // Diameter + small gap (no overlap)

      for (let i = 0; i < circles.length; i++) {
        const c = circles[i]
        
        // Attract to center (very gentle)
        const dx = centerX - c.x
        const dy = centerY - c.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        c.vx += (dx / dist) * gravity
        c.vy += (dy / dist) * gravity

        // Gentle nudge from mouse cursor (much weaker - just a subtle push)
        if (mousePos.current.x !== null) {
          const mdx = c.x - mousePos.current.x
          const mdy = c.y - mousePos.current.y
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy) || 1
          if (mDist < 80) {
            // Very gentle push, falls off quickly
            const mouseForce = 0.8 * (1 - mDist / 80)
            c.vx += (mdx / mDist) * mouseForce
            c.vy += (mdy / mDist) * mouseForce
          }
        }

        // Squishy collision with other circles (spring-like)
        for (let j = 0; j < circles.length; j++) {
          if (i === j) continue
          const other = circles[j]
          const odx = c.x - other.x
          const ody = c.y - other.y
          const oDist = Math.sqrt(odx * odx + ody * ody) || 1
          
          if (oDist < minDist) {
            // How much they're overlapping
            const overlap = minDist - oDist
            // Spring force - stronger when more overlap (squishy effect)
            const springForce = overlap * 0.15
            c.vx += (odx / oDist) * springForce
            c.vy += (ody / oDist) * springForce
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
