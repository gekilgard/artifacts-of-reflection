import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  // Capstone artifact journey - Grant's origin story
  const artifactJourney = [
    {
      year: "2024",
      title: "The Beginning",
      description: "I began collecting objects from my family—a worn wooden spoon, faded photographs, letters never sent.",
      image: "https://images.unsplash.com/photo-1566479179817-0d6ed1be1ba5?w=400&h=300&fit=crop&crop=center",
      story: "This project started as a personal ritual. During my capstone research, I realized that objects hold more than memory—they hold presence itself."
    },
    {
      year: "2024",
      title: "The Ritual",
      description: "Each object became a conversation partner. I learned to listen to their stories of touch, time, and connection.",
      image: "https://images.unsplash.com/photo-1544037151-6e4ed999de21?w=400&h=300&fit=crop&crop=center",
      story: "Through careful attention to these objects, I discovered a framework for remembering better—for being present with the people and moments they represent."
    },
    {
      year: "2025",
      title: "The Invitation",
      description: "Now this practice becomes yours. What object connects you to someone you care about?",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      story: "Artifacts of Reflection is both a research tool and an invitation—to slow down, to notice, to remember that objects can teach us how to be present with each other."
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const newStep = Math.min(Math.floor(scrollY / (windowHeight * 0.8)), artifactJourney.length - 1)
      
      if (newStep !== currentStep) {
        setCurrentStep(newStep)
        setIsScrolling(true)
        setTimeout(() => setIsScrolling(false), 300)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentStep])

  return (
    <div className="home-page">
      {/* Hero Landing - Getty Style */}
      <div className="hero-landing">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-primary">Artifacts</span>
            <span className="title-secondary">of Reflection</span>
          </h1>
          <p className="hero-subtitle">
            A practice of remembering better
          </p>
          <p className="hero-description">
            This project began as a personal ritual—making objects to remember, making ritual to reconnect. 
            Each artifact holds a story of time, care, and presence.
          </p>
          <div className="hero-cta">
            <p className="hero-invitation">
              <strong>Explore these stories, then add your own memory artifact.</strong>
            </p>
            <p className="hero-question">
              What object connects you to someone you care about?
            </p>
            <div className="hero-buttons">
              <Link to="/wall" className="btn-primary">
                Explore Stories
              </Link>
              <Link to="/submit" className="btn-secondary">
                Start Your Story
              </Link>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to explore Grant's artifact journey</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>

      {/* Interactive Artifact Journey - Inspired by Getty's timeline */}
      <div className="artifact-journey">
        <div className="journey-container">
          <div className="journey-timeline">
            {artifactJourney.map((step, index) => (
              <div 
                key={index}
                className={`journey-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'passed' : ''}`}
              >
                <div className="step-marker">
                  <div className="step-year">{step.year}</div>
                </div>
                <div className="step-content">
                  <div className="step-image-container">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="step-image"
                    />
                  </div>
                  <div className="step-text">
                    <h2 className="step-title">{step.title}</h2>
                    <p className="step-description">{step.description}</p>
                    <div className={`step-story ${index === currentStep ? 'visible' : ''}`}>
                      <p>{step.story}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="final-invitation">
        <div className="invitation-content">
          <h2 className="invitation-title">Your Artifact Journey Begins Here</h2>
          <p className="invitation-text">
            Every object has a story. Every story creates connection. Share yours with the growing 
            constellation of memory artifacts from around the world.
          </p>
          <div className="invitation-buttons">
            <Link to="/submit" className="btn-primary-large">
              Share Your Artifact Story
            </Link>
            <Link to="/map" className="btn-secondary">
              View Global Map
            </Link>
          </div>
          <div className="invitation-stats">
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">Stories Waiting</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Global</span>
              <span className="stat-label">Community</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">One</span>
              <span className="stat-label">Shared Practice</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

