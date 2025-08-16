import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const [prompts, setPrompts] = useState([])
  const [selectedPrompt, setSelectedPrompt] = useState(null)

  useEffect(() => {
    fetch('/prompt.json').then(r => r.json()).then(setPrompts).catch(() => setPrompts([]))
  }, [])

  const randomThree = prompts
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-primary">Artifacts</span>
            <span className="title-secondary">of Reflection</span>
          </h1>
          <p className="hero-description">
            Discover meaningful objects and the stories they hold. 
            Each artifact connects us to memories, people, and moments that shape who we are.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{prompts.length}</span>
              <span className="stat-label">Prompts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">Stories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Global</span>
              <span className="stat-label">Community</span>
            </div>
          </div>
        </div>
      </div>

      <div className="prompts-section">
        <div className="section-header">
          <h2 className="section-title">Begin Your Reflection</h2>
          <p className="section-subtitle">
            Choose a prompt that resonates with you and share your story
          </p>
        </div>

        <div className="prompts-grid">
          {randomThree.map((prompt, index) => (
            <div 
              key={prompt.id} 
              className={`prompt-card ${selectedPrompt === prompt.id ? 'selected' : ''}`}
              onClick={() => setSelectedPrompt(selectedPrompt === prompt.id ? null : prompt.id)}
            >
              <div className="prompt-number">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="prompt-content">
                <p className="prompt-text">{prompt.text}</p>
              </div>
              <div className="prompt-actions">
                <Link 
                  to={`/submit?promptId=${encodeURIComponent(prompt.id)}`}
                  className="prompt-action-btn"
                >
                  <span>Begin</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3L9 6L3 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="refresh-prompts">
          <button 
            className="refresh-btn"
            onClick={() => window.location.reload()}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1V5H5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 7C13 10.3137 10.3137 13 7 13C4.64706 13 2.65294 11.5529 1.5 9.5M1 7C1 3.68629 3.68629 1 7 1C9.35294 1 11.3471 2.44706 12.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>


    </div>
  )
}

