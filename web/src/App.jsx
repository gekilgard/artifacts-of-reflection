import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
const MapPage = lazy(() => import('./pages/Map.jsx'))
const Submit = lazy(() => import('./pages/Submit.jsx'))
const Wall = lazy(() => import('./pages/Wall.jsx'))

export default function App() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <Link to="/">Home</Link>
        <Link to="/submit">Submit</Link>
        <Link to="/wall">Wall</Link>
        <Link to="/map">Map</Link>
      </nav>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/wall" element={<Wall />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}

