'use client'

import React, { useState } from 'react'
import BlogList from '@/components/BlogList'
import BlogEditor from '@/components/BlogEditor'

export default function Home() {
  const [currentView, setCurrentView] = useState<'list' | 'create'>('list')

  const handlePostCreated = () => {
    setCurrentView('list')
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <nav style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        gap: '10px',
      }}>
        <button
          onClick={() => setCurrentView('list')}
          style={{
            padding: '10px 20px',
            background: currentView === 'list' ? '#e91e63' : 'white',
            color: currentView === 'list' ? 'white' : '#e91e63',
            border: '2px solid #e91e63',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          博客列表
        </button>
        
        <button
          onClick={() => setCurrentView('create')}
          style={{
            padding: '10px 20px',
            background: currentView === 'create' ? '#e91e63' : 'white',
            color: currentView === 'create' ? 'white' : '#e91e63',
            border: '2px solid #e91e63',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          创建博客
        </button>
      </nav>

      {currentView === 'list' ? (
        <BlogList />
      ) : (
        <BlogEditor onSave={handlePostCreated} />
      )}
    </div>
  )
}
