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
    // Start clustered near center - collision will spread them out
    const angle = (index / total) * Math.PI * 2
    const startRadius = 20 + Math.random() * 30 // All start near center
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
    const minDist = circleRadius * 2 + 4

    const simulate = () => {
      if (settled) return

      const circles = circlesRef.current
      const damping = 0.75
      
      // Brief gravity to cluster them, only first 30 frames
      if (frameCount.current < 30) {
        for (let i = 0; i < circles.length; i++) {
          const c = circles[i]
          const dx = -c.x
          const dy = -c.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > 5) {
            c.vx += (dx / dist) * 0.5
            c.vy += (dy / dist) * 0.5
          }
        }
      }
      
      // Collision resolution - multiple passes
      for (let iteration = 0; iteration < 10; iteration++) {
        for (let i = 0; i < circles.length; i++) {
          const c = circles[i]
          for (let j = i + 1; j < circles.length; j++) {
            const other = circles[j]
            const odx = other.x - c.x
            const ody = other.y - c.y
            const oDist = Math.sqrt(odx * odx + ody * ody)
            
            if (oDist < minDist && oDist > 0.001) {
              const overlap = (minDist - oDist) / 2 + 0.5
              const nx = odx / oDist
              const ny = ody / oDist
              
              c.x -= nx * overlap
              c.y -= ny * overlap
              other.x += nx * overlap
              other.y += ny * overlap
            }
          }
        }
      }

      // Apply velocity and damping
      let totalMovement = 0
      for (let i = 0; i < circles.length; i++) {
        const c = circles[i]
        c.vx *= damping
        c.vy *= damping
        c.x += c.vx
        c.y += c.vy
        totalMovement += Math.abs(c.vx) + Math.abs(c.vy)
      }

      frameCount.current++
      
      // After gravity phase, settle quickly when movement stops
      if (frameCount.current > 60 && totalMovement < 0.02) {
        setSettled(true)
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
      duration: 2.5,
      ease: 'power2.inOut'
    }, 0)
    
    // Stage 1: Circle grows to final image size (stays circular) - 3s
    tl.to(card, {
      width: imageSize,
      height: imageSize,
      borderRadius: imageSize / 2,
      x: 0,
      y: 0,
      duration: 3,
      ease: 'power2.inOut'
    }, 0)
    
    // Stage 2: Card expands to full width, image slides left
    tl.to(card, {
      width: cardWidth,
      borderRadius: 24,
      duration: 1,
      ease: 'power2.inOut'
    }, 3)
    
    // Image container shrinks to left portion and squares off
    tl.to(imageContainer, {
      width: '45%',
      borderRadius: '24px 0 0 24px',
      duration: 1,
      ease: 'power2.inOut'
    }, 3)
    
    // Text content fades and slides in
    tl.to(textContent, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 3.5)

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
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0)
    
    // Image expands back to fill card, card shrinks to square
    tl.to(imageContainer, {
      width: '100%',
      borderRadius: imageSize / 2,
      duration: 0.6,
      ease: 'power2.inOut'
    }, 0.2)
    
    tl.to(card, {
      width: imageSize,
      borderRadius: imageSize / 2,
      duration: 0.6,
      ease: 'power2.inOut'
    }, 0.2)
    
    // Circle shrinks and fades - 1.5s to match opening
    tl.to(card, {
      width: 100,
      height: 100,
      borderRadius: 50,
      opacity: 0,
      x: clickedPosition?.x || 0,
      y: clickedPosition?.y || 0,
      duration: 1.2,
      ease: 'power2.inOut'
    }, 0.7)
    
    tl.to(imageContainer, {
      borderRadius: 50,
      duration: 1.2,
      ease: 'power2.inOut'
    }, 0.7)

    tl.to(overlay, {
      backgroundColor: 'rgba(0,0,0,0)',
      duration: 1.0,
      ease: 'power2.inOut'
    }, 1.0)
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
