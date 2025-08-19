import { useEffect } from 'react'
import './TestHome.css'

export default function TestHome() {
  useEffect(() => {
    // Set document title for the Getty clone
    document.title = 'Tracing Art - Getty Clone Test'
    
    // Remove any existing body styles that might interfere
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.overflow = 'hidden'
    
    // Cleanup function to restore original styles
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="getty-clone-container">
      <iframe
        src="/test-home.html"
        className="getty-clone-iframe"
        title="Getty Tracing Art Clone"
        frameBorder="0"
        allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}