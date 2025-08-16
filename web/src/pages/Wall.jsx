import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import './Wall.css'

function DetailModal({ item, onClose }) {
  if (!item) return null

  return (
    <div className="detail-modal" onClick={onClose}>
      <div className="detail-modal-content" onClick={e => e.stopPropagation()}>
        <button className="detail-modal-close" onClick={onClose}>
          ×
        </button>
        
        {item.image_url && (
          <img 
            src={item.image_url} 
            alt="" 
            className="detail-modal-image"
          />
        )}
        
        <div className="detail-modal-question">
          {item.question_text}
        </div>
        
        <div className="detail-modal-story">
          {item.story_text}
        </div>
        
        <div className="detail-modal-meta">
          {item.location_text && (
            <div className="detail-modal-location">
              <span>📍</span>
              <span>{item.location_text}</span>
            </div>
          )}
          <div className="detail-modal-date">
            {new Date(item.created_at).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Wall() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [newItemIds, setNewItemIds] = useState(new Set())
  const [newItemCount, setNewItemCount] = useState(0)
  const [removingItemIds, setRemovingItemIds] = useState(new Set())
  const [hoveredItem, setHoveredItem] = useState(null)

  const loadSubmissions = useCallback(async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true)
    
    if (!supabase) {
      setItems([])
      setLoading(false)
      setIsRefreshing(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('id, image_url, question_text, story_text, location_text, created_at')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error loading submissions:', error)
        setItems([])
      } else {
        const newData = data || []
        
        // If we have existing items, check for new ones and removed ones
        if (items.length > 0) {
          const existingIds = new Set(items.map(item => item.id))
          const newDataIds = new Set(newData.map(item => item.id))
          const newIds = new Set()
          const removedIds = new Set()
          
          // Check for new items
          newData.forEach(item => {
            if (!existingIds.has(item.id)) {
              newIds.add(item.id)
            }
          })
          
          // Check for removed items
          items.forEach(item => {
            if (!newDataIds.has(item.id)) {
              removedIds.add(item.id)
            }
          })
          
          // Handle new items
          if (newIds.size > 0) {
            setNewItemIds(newIds)
            setNewItemCount(newIds.size)
            
            // Clear new item indicators after animation completes
            setTimeout(() => {
              setNewItemIds(new Set())
              setNewItemCount(0)
            }, 3000)
          }
          
          // Handle removed items
          if (removedIds.size > 0) {
            setRemovingItemIds(removedIds)
            
            // Wait for fade-out animation to complete before removing from state
            setTimeout(() => {
              setItems(newData)
              setRemovingItemIds(new Set())
            }, 600) // Match the fade-out animation duration
            return // Don't update items immediately if we're animating removals
          }
        }
        
        setItems(newData)
      }
    } catch (err) {
      console.error('Error loading submissions:', err)
      setItems([])
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }, [items])

  // Initial load
  useEffect(() => {
    loadSubmissions()
  }, [])

  // Set up periodic refresh
  useEffect(() => {
    if (!supabase) return

    const refreshInterval = setInterval(() => {
      loadSubmissions(true)
    }, 2000) // Refresh every 2 seconds

    return () => clearInterval(refreshInterval)
  }, [loadSubmissions])

  // Set up real-time subscription for instant updates
  useEffect(() => {
    if (!supabase) return

    const channel = supabase
      .channel('submissions-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'submissions',
          filter: 'status=eq.approved'
        },
        (payload) => {
          console.log('Real-time update:', payload)
          // Reload data when changes occur
          loadSubmissions(true)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [loadSubmissions])

  if (loading) {
    return (
      <div className="wall-page">
        <div className="wall-loading">
          <div className="loading-spinner"></div>
          <div className="wall-loading-text">Loading stories...</div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="wall-page">
        <div className="wall-empty">
          <h2 className="wall-empty-title">No stories yet</h2>
          <p className="wall-empty-text">
            Be the first to share your story! Stories appear here once they're approved.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`wall-page ${hoveredItem ? 'blur-mode' : ''}`}>
      <div className="wall-header">
        <div>
          <h1 className="wall-title">Stories</h1>
          <p className="wall-subtitle">
            {items.length} {items.length === 1 ? 'story' : 'stories'} shared
          </p>
        </div>
        <div className={`refresh-indicator ${newItemCount > 0 ? 'has-new-items' : ''}`}>
          <div className={`refresh-dot ${isRefreshing ? 'loading' : ''}`}></div>
          <span>
            {newItemCount > 0 
              ? `${newItemCount} new ${newItemCount === 1 ? 'story' : 'stories'}!` 
              : 'Live updates'
            }
          </span>
        </div>
      </div>

      <div className="wall-grid">
        {items.map((item, index) => (
          <article 
            key={item.id}
            className={`wall-item ${newItemIds.has(item.id) ? 'new-item' : ''} ${removingItemIds.has(item.id) ? 'removing-item' : ''} ${hoveredItem === item.id ? 'hovered' : ''}`}
            style={{ 
              animationDelay: `${Math.min(index * 50, 500)}ms` 
            }}
            onClick={() => setSelectedItem(item)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item.image_url && (
              <img 
                src={item.image_url} 
                alt="" 
                className="wall-item-image"
              />
            )}
            <div className="wall-item-content">
              <p className="wall-item-text">{item.story_text}</p>
              <div className="wall-item-meta">
                {item.location_text && (
                  <div className="wall-item-location">
                    <span>📍</span>
                    <span>{item.location_text}</span>
                  </div>
                )}
                <div className="wall-item-date">
                  {new Date(item.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  )
}

