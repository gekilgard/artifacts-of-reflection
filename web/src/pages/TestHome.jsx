import { useEffect } from 'react'
import './TestHome.css'

export default function TestHome() {
  useEffect(() => {
    // Set document title for the Getty clone
    document.title = 'Tracing Art - Getty Clone Test'
    
    // Store original styles to restore later
    const originalOverflow = document.body.style.overflow
    const originalMargin = document.body.style.margin
    const originalPadding = document.body.style.padding
    
    // Apply styles only for this page
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.overflow = 'hidden'
    
    // Cleanup function to restore original styles when leaving this page
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.margin = originalMargin
      document.body.style.padding = originalPadding
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