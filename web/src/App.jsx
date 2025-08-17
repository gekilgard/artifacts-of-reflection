import React, { Suspense, lazy, useState } from 'react'
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import ThemeToggle from './components/ThemeToggle'
import Loading from './components/Loading'
import Home from './pages/Home.jsx'
import './components/components.css'

const MapPage = lazy(() => import('./pages/Map.jsx'))
const Submit = lazy(() => import('./pages/Submit.jsx'))
const Wall = lazy(() => import('./pages/Wall.jsx'))

function Navigation() {
  const location = useLocation()
  
  // Hide navigation on home page for fullscreen experience
  if (location.pathname === '/') {
    return null
  }
  
  return (
    <nav className="main-nav new-nav">
      <Link to="/" className="nav-logo">Artifacts of Reflection</Link>
      <div className="nav-group">
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link to="/wall" className={`nav-item ${location.pathname === '/wall' ? 'active' : ''}`}>Wall</Link>
        <Link to="/map" className={`nav-item ${location.pathname === '/map' ? 'active' : ''}`}>Map</Link>
        <Link to="/submit" className={`nav-item ${location.pathname === '/submit' ? 'active' : ''}`}>Submit</Link>
      </div>
      <div className="nav-actions"><ThemeToggle /></div>
    </nav>
  )
}

function AppLayout({ children }) {
  const location = useLocation()
  
  // Full screen layout for home page
  if (location.pathname === '/') {
    return (
      <div className="app-layout fullscreen">
        {children}
      </div>
    )
  }
  
  return (
    <div className="app-layout">
      <div className="app-container">
        <Navigation />
        <main className="app-main">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  const [showLoading, setShowLoading] = useState(true)

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  return (
    <ThemeProvider>
      {showLoading && <Loading onComplete={handleLoadingComplete} />}
      
      <AppLayout>
        <Suspense fallback={
          <div className="page-loading">
            <div className="loading-spinner"></div>
            <p className="text-secondary">Loading...</p>
            

          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/wall" element={<Wall />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </ThemeProvider>
  )
}

