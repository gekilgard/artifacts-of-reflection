import { useEffect } from 'react'

export default function TestHome() {
  useEffect(() => {
    // Redirect to the Getty clone HTML file
    window.location.replace('/test-home.html')
  }, [])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#333',
      background: '#fff'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Loading Getty Tracing Art Clone...</h1>
        <p>Redirecting to the full Getty experience...</p>
        <div style={{ marginTop: '20px' }}>
          <p>If you are not redirected automatically:</p>
          <a href="/test-home.html" style={{ color: '#0066cc', textDecoration: 'underline' }}>
            Click here to view the Getty Clone
          </a>
        </div>
      </div>
    </div>
  )
}