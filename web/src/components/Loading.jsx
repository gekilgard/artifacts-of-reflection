import { useState, useEffect } from 'react'
import './components.css'

const loadingMessages = [
  "Gathering stories...",
  "Connecting memories...",
  "Preparing reflection...",
  "Almost ready..."
]

export default function Loading({ onComplete }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Message rotation
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length)
    }, 800)

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(messageInterval)
          setTimeout(onComplete, 300)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <div 
      className="loading-screen" 
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      <div className="loading-content">
        <div className="loading-logo">
          <div className="logo-circle">
            <div className="logo-inner"></div>
          </div>
        </div>
        
        <h1 className="loading-title">Artifacts of Reflection</h1>
        
        <div className="loading-message">
          {loadingMessages[messageIndex]}
        </div>
        
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
