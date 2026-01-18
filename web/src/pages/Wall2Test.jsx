import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import gsap from 'gsap'
import './Wall2Test.css'

// Physics simulation for circles with gravity and collisions
class PhysicsCircle {
  constructor(id, imageUrl, data, index, total) {
    this.id = id
    this.imageUrl = imageUrl
    this.data = data
    // Start in a ring around center
    const angle = (index / total) * Math.PI * 2
    const startRadius = 150 + Math.random() * 100
    this.x = startRadius * Math.cos(angle)
    this.y = startRadius * Math.sin(angle)
    this.vx = (Math.random() - 0.5) * 2
    this.vy = (Math.random() - 0.5) * 2
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

    const circleRadius = 50
    const minDist = circleRadius * 2 + 6 // Slight gap between circles

    const simulate = () => {
      const circles = circlesRef.current
      const damping = 0.985 // High damping for smooth movement
      const gravity = 0.03 // Gentle pull to center
      const bounce = 0.4 // Bounce factor on collision

      for (let i = 0; i < circles.length; i++) {
        const c = circles[i]
        
        // Gravitational pull toward center
        const dx = -c.x
        const dy = -c.y
        const distToCenter = Math.sqrt(dx * dx + dy * dy)
        if (distToCenter > 10) {
          c.vx += (dx / distToCenter) * gravity
          c.vy += (dy / distToCenter) * gravity
        }

        // Subtle cursor repulsion (very gentle - still clickable)
        if (mousePos.current.x !== null) {
          const mdx = c.x - mousePos.current.x
          const mdy = c.y - mousePos.current.y
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
          if (mDist < 120 && mDist > 0) {
            // Very gentle push, linear falloff
            const force = 0.15 * (1 - mDist / 120)
            c.vx += (mdx / mDist) * force
            c.vy += (mdy / mDist) * force
          }
        }
      }

      // Collision detection and response
      for (let i = 0; i < circles.length; i++) {
        const c = circles[i]
        for (let j = i + 1; j < circles.length; j++) {
          const other = circles[j]
          const odx = other.x - c.x
          const ody = other.y - c.y
          const oDist = Math.sqrt(odx * odx + ody * ody)
          
          if (oDist < minDist && oDist > 0.001) {
            // Normalize collision vector
            const nx = odx / oDist
            const ny = ody / oDist
            
            // Separate circles (position correction)
            const overlap = (minDist - oDist) / 2
            c.x -= nx * overlap
            c.y -= ny * overlap
            other.x += nx * overlap
            other.y += ny * overlap
            
            // Calculate relative velocity
            const dvx = c.vx - other.vx
            const dvy = c.vy - other.vy
            const dvn = dvx * nx + dvy * ny
            
            // Only resolve if circles are approaching
            if (dvn > 0) {
              // Apply bounce impulse
              c.vx -= dvn * nx * bounce
              c.vy -= dvn * ny * bounce
              other.vx += dvn * nx * bounce
              other.vy += dvn * ny * bounce
            }
          }
        }
      }

      // Apply velocity and damping
      for (let i = 0; i < circles.length; i++) {
        const c = circles[i]
        c.vx *= damping
        c.vy *= damping
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
  const imageContainerRef = useRef(null)
  const textContentRef = useRef(null)
  const overlayRef = useRef(null)
  const [isClosing, setIsClosing] = useState(false)
  
  // Fixed card dimensions
  const cardWidth = Math.min(1000, window.innerWidth - 60)
  const cardHeight = Math.min(560, window.innerHeight - 100)
  const imageSize = cardHeight // Square image matching card height

  useLayoutEffect(() => {
    const card = cardRef.current
    const imageContainer = imageContainerRef.current
    const textContent = textContentRef.current
    const overlay = overlayRef.current
    if (!card || !imageContainer || !textContent || !overlay) return

    gsap.killTweensOf([card, imageContainer, textContent, overlay])

    // Initial state: small circle at click position, image visible
    gsap.set(overlay, { backgroundColor: 'rgba(0,0,0,0)' })
    gsap.set(card, {
      width: 100,
      height: 100,
      borderRadius: 50,
      x: clickedPosition?.x || 0,
      y: clickedPosition?.y || 0,
    })
    // Image container fills the circle initially (centered)
    gsap.set(imageContainer, {
      width: '100%',
      height: '100%',
      x: 0,
      borderRadius: 50,
    })
    gsap.set(textContent, { opacity: 0, x: 30 })

    const tl = gsap.timeline()
    
    // Overlay fades in
    tl.to(overlay, {
      backgroundColor: 'rgba(0,0,0,0.92)',
      duration: 1.8,
      ease: 'power2.inOut'
    }, 0)
    
    // Stage 1: Circle grows to final image size (stays circular) - 2s
    tl.to(card, {
      width: imageSize,
      height: imageSize,
      borderRadius: imageSize / 2,
      x: 0,
      y: 0,
      duration: 2,
      ease: 'power2.inOut'
    }, 0)
    
    // Stage 2: Card expands to full width, image slides left
    tl.to(card, {
      width: cardWidth,
      borderRadius: 24,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 2)
    
    // Image container shrinks to left portion and squares off
    tl.to(imageContainer, {
      width: '45%',
      borderRadius: '24px 0 0 24px',
      duration: 0.8,
      ease: 'power2.inOut'
    }, 2)
    
    // Text content fades and slides in
    tl.to(textContent, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    }, 2.4)

  }, [clickedPosition, cardWidth, cardHeight, imageSize])

  const handleClose = () => {
    if (isClosing) return
    setIsClosing(true)

    const card = cardRef.current
    const imageContainer = imageContainerRef.current
    const textContent = textContentRef.current
    const overlay = overlayRef.current

    const tl = gsap.timeline({ onComplete: onClose })

    // Text fades out and slides right
    tl.to(textContent, {
      opacity: 0,
      x: 30,
      duration: 0.3,
      ease: 'power2.inOut'
    }, 0)
    
    // Image expands back to fill card, card shrinks to square
    tl.to(imageContainer, {
      width: '100%',
      borderRadius: imageSize / 2,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0.2)
    
    tl.to(card, {
      width: imageSize,
      borderRadius: imageSize / 2,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0.2)
    
    // Circle shrinks back to thumbnail size - 2s
    tl.to(card, {
      width: 100,
      height: 100,
      borderRadius: 50,
      x: clickedPosition?.x || 0,
      y: clickedPosition?.y || 0,
      duration: 2,
      ease: 'power2.inOut'
    }, 0.6)
    
    tl.to(imageContainer, {
      borderRadius: 50,
      duration: 2,
      ease: 'power2.inOut'
    }, 0.6)

    // Overlay fades during shrink
    tl.to(overlay, {
      backgroundColor: 'rgba(0,0,0,0)',
      duration: 1.6,
      ease: 'power2.inOut'
    }, 0.8)
    
    // Final fade only at the very end
    tl.to(card, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    }, 2.5)
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
        {/* Image container - animates independently */}
        <div ref={imageContainerRef} className="expanded-image-container">
          {item.image_url && (
            <img src={item.image_url} alt="" className="expanded-image" />
          )}
        </div>
        
        {/* Text content - fades in after image slides */}
        <div ref={textContentRef} className="expanded-content">
          <button className="expanded-close" onClick={handleClose}>×</button>
          
          <div className="expanded-question">
            {item.question_text}
          </div>
          
          <div className="expanded-location">
            {item.location_text && (
              <>
                <span className="location-pin">📍</span>
                <span>{item.location_text}</span>
              </>
            )}
            {!item.location_text && <span className="location-unknown">Location not specified</span>}
          </div>
          
          <div className="expanded-story">
            {item.story_text}
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

  // Track mouse position relative to center of container
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
