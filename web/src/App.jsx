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
  
  const navItems = [
    { path: '/', label: 'Home', description: 'Discover prompts' },
    { path: '/submit', label: 'Submit', description: 'Share your story' },
    { path: '/wall', label: 'Wall', description: 'Browse stories' },
    { path: '/map', label: 'Map', description: 'Explore locations' }
  ]

  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <Link to="/" className="brand-link">
          <div className="brand-icon">
            <div className="brand-circle"></div>
          </div>
          <span className="brand-text">Artifacts</span>
        </Link>
      </div>
      
      <div className="nav-links">
        {navItems.map(item => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-label">{item.label}</span>
            <span className="nav-description">{item.description}</span>
          </Link>
        ))}
      </div>
      
      <div className="nav-actions">
        <ThemeToggle />
      </div>
      

    </nav>
  )
}

function AppLayout({ children }) {
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

