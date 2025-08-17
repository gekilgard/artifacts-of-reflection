import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import * as THREE from 'three'
import './Home.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [selectedArtifact, setSelectedArtifact] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const artifactRefs = useRef([])
  const lenisRef = useRef(null)

  // Artifact memories positioned around the page like Getty
  const artifacts = [
    {
      id: 1,
      title: "Grandmother's Wooden Spoon",
      year: "1952",
      description: "A worn kitchen tool that stirred countless family meals",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=400&fit=crop",
      story: "This spoon has been in my family for over 70 years. Every scratch and stain tells a story of Sunday dinners, birthday cakes, and late-night comfort food. When I hold it, I can almost feel my grandmother's hands guiding mine.",
      position: { top: "15%", left: "8%" },
      size: "medium"
    },
    {
      id: 2,
      title: "Faded Family Photograph",
      year: "1987",
      description: "A Polaroid from a summer that defined everything",
      image: "https://images.unsplash.com/photo-1566479179817-0d6ed1be1ba5?w=250&h=300&fit=crop",
      story: "This photograph captured the last summer we were all together. The colors have faded, but the memory remains vivid. It reminds me that presence is more valuable than perfection.",
      position: { top: "25%", right: "10%" },
      size: "small"
    },
    {
      id: 3,
      title: "Hand-Knitted Scarf",
      year: "2019",
      description: "Uneven stitches that wrap love around my shoulders",
      image: "https://images.unsplash.com/photo-1544037151-6e4ed999de21?w=350&h=300&fit=crop",
      story: "My sister made this during her first year of college. Every dropped stitch represents a video call, every color change marks a care package. It's not perfect, but it's perfectly ours.",
      position: { top: "60%", left: "5%" },
      size: "large"
    },
    {
      id: 4,
      title: "Pressed Flower Collection",
      year: "2020",
      description: "Fragments of walks we took during uncertain times",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=280&h=350&fit=crop",
      story: "During lockdown, we started pressing flowers from our daily walks. Each petal preserved a moment of beauty during a difficult time. They taught us to notice small miracles.",
      position: { top: "45%", right: "8%" },
      size: "medium"
    },
    {
      id: 5,
      title: "Child's Drawing",
      year: "2023",
      description: "Crayon marks that captured pure joy",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=250&h=200&fit=crop",
      story: "My nephew drew this the day he learned to spell my name. The letters are backwards, but the love is perfect. It hangs on my refrigerator as a daily reminder of unconditional joy.",
      position: { top: "80%", left: "15%" },
      size: "small"
    }
  ]

  // Section definitions for progress bar
  const sections = [
    { id: 0, title: "Introduction", offset: 0 },
    { id: 1, title: "The Practice", offset: 0.3 },
    { id: 2, title: "Your Story", offset: 0.7 }
  ]

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2
    })

    function raf(time) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  // Initialize Three.js particle background
  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Create floating particles
    const particleCount = 50
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10
      positions[i + 1] = (Math.random() - 0.5) * 10
      positions[i + 2] = (Math.random() - 0.5) * 10

      colors[i] = 0.8
      colors[i + 1] = 0.8
      colors[i + 2] = 0.9
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)

    camera.position.z = 5

    // Animation loop
    function animate() {
      particleSystem.rotation.x += 0.001
      particleSystem.rotation.y += 0.002
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  // GSAP Scroll Triggers and Animations
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Hero title animation
      gsap.fromTo('.main-title', 
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.5
        }
      )

      // Subtitle animation
      gsap.fromTo('.subtitle',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power2.out",
          delay: 0.8
        }
      )

      // Floating artifacts entrance
      artifactRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(ref,
            { 
              scale: 0,
              rotation: 45,
              opacity: 0
            },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 1.2,
              ease: "elastic.out(1, 0.5)",
              delay: 1 + index * 0.2
            }
          )
        }
      })

      // Scroll-triggered section animations
      gsap.utils.toArray('.section-content').forEach((section, index) => {
        gsap.fromTo(section,
          { 
            y: 100,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

      // Parallax effect for artifacts
      artifactRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.to(ref, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
              trigger: ref,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          })
        }
      })

      // Progress bar animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setScrollProgress(self.progress)
          
          // Update active section
          const newSection = sections.findIndex((section, index) => {
            const nextSection = sections[index + 1]
            return self.progress >= section.offset && (!nextSection || self.progress < nextSection.offset)
          })
          
          if (newSection !== -1 && newSection !== activeSection) {
            setActiveSection(newSection)
          }
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [activeSection])

  // Advanced mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })

      // Apply subtle parallax to artifacts
      artifactRefs.current.forEach((ref, index) => {
        if (ref) {
          const speed = (index + 1) * 0.5
          gsap.to(ref, {
            x: x * speed * 10,
            y: y * speed * 10,
            duration: 0.5,
            ease: "power2.out"
          })
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Jump to section with smooth scroll
  const jumpToSection = (sectionId) => {
    const section = sections.find(s => s.id === sectionId)
    if (section && lenisRef.current) {
      const targetScroll = section.offset * (document.documentElement.scrollHeight - window.innerHeight)
      lenisRef.current.scrollTo(targetScroll)
    }
  }

  // Artifact click with GSAP animation
  const handleArtifactClick = (artifact) => {
    setSelectedArtifact(artifact)
    
    // Animate modal entrance
    if (artifact) {
      gsap.fromTo('.artifact-modal',
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.4,
          ease: "back.out(1.7)"
        }
      )
    }
  }

  const closeModal = () => {
    if (selectedArtifact) {
      gsap.to('.artifact-modal', {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => setSelectedArtifact(null)
      })
    }
  }

  return (
    <div className="home-page" ref={containerRef}>
      {/* Three.js Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="background-canvas"
      />

      {/* Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar">
          <div 
            className="scroll-progress-fill" 
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="scroll-sections">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`section-marker ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => jumpToSection(section.id)}
              style={{ left: `${section.offset * 100}%` }}
            >
              <span className="section-number">{section.id + 1}</span>
              <span className="section-title">{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section with Positioned Artifacts */}
      <section className="hero-section" data-section="0" ref={heroRef}>
        <div className="hero-background">
          <p className="subtitle">Millions of Memories, Spanning Generations</p>
          <h1 className="main-title">
            Here's how Artifacts of Reflection is transforming research on
            <br />
            <em>the social life of objects.</em>
          </h1>
          <div className="scroll-prompt">
            <span>↓ Scroll down</span>
          </div>
        </div>

        {/* Positioned Artifact Images with Advanced Parallax */}
        {artifacts.map((artifact, index) => (
          <div
            key={artifact.id}
            ref={el => artifactRefs.current[index] = el}
            className={`floating-artifact ${artifact.size}`}
            style={artifact.position}
            onClick={() => handleArtifactClick(artifact)}
          >
            <img 
              src={artifact.image} 
              alt={artifact.title}
              className="artifact-image"
            />
            <div className="artifact-hint">
              Click on an artifact to learn more.
            </div>
          </div>
        ))}
      </section>

      {/* The Practice Section */}
      <section className="practice-section" data-section="1">
        <div className="section-content">
          <h2 className="section-title">The Practice of Remembering</h2>
          <div className="practice-grid">
            <div className="practice-text">
              <p>
                This project began as a personal ritual during my capstone research. 
                I realized that objects hold more than memory—they hold presence itself.
              </p>
              <p>
                Through careful attention to family artifacts, I discovered a framework 
                for remembering better—for being present with the people and moments they represent.
              </p>
              <p>
                Each object became a conversation partner. I learned to listen to their 
                stories of touch, time, and connection.
              </p>
            </div>
            <div className="practice-visual">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop"
                alt="Hands holding memories"
                className="practice-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Your Story Section */}
      <section className="invitation-section" data-section="2">
        <div className="section-content">
          <h2 className="section-title">Your Artifact Journey Begins Here</h2>
          <p className="invitation-description">
            Every object has a story. Every story creates connection. Share yours with the growing 
            constellation of memory artifacts from around the world.
          </p>
          <p className="invitation-question">
            <strong>What object connects you to someone you care about?</strong>
          </p>
          <div className="invitation-actions">
            <Link to="/submit" className="btn-primary-large">
              Share Your Artifact Story
            </Link>
            <Link to="/wall" className="btn-secondary">
              Explore Stories
            </Link>
            <Link to="/map" className="btn-secondary">
              View Global Map
            </Link>
          </div>
        </div>
      </section>

      {/* Artifact Detail Modal */}
      {selectedArtifact && (
        <div className="artifact-modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={closeModal}
            >
              ×
            </button>
            <div className="modal-image">
              <img 
                src={selectedArtifact.image} 
                alt={selectedArtifact.title}
              />
            </div>
            <div className="modal-info">
              <h3 className="modal-title">{selectedArtifact.title}</h3>
              <p className="modal-year">{selectedArtifact.year}</p>
              <p className="modal-description">{selectedArtifact.description}</p>
              <div className="modal-story">
                <p>{selectedArtifact.story}</p>
              </div>
              <div className="modal-attribution">
                Artifacts of Reflection, Personal Collection
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}