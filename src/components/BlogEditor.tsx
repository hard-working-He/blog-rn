'use client'

import React, { useState } from 'react'
import { parseMarkdown } from '@/lib/markdown'

interface BlogEditorProps {
  onSave?: (post: any) => void
}

export default function BlogEditor({ onSave }: BlogEditorProps) {
  const [title, setTitle] = useState('')
  const [markdown, setMarkdown] = useState('')
  const [preview, setPreview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handlePreview = async () => {
    if (markdown) {
      const html = await parseMarkdown(markdown)
      setPreview(html)
      setShowPreview(true)
    }
  }

  const handleSave = async () => {
    if (!title || !markdown) {
      alert('请输入标题和内容')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, markdown }),
      })

      if (response.ok) {
        const post = await response.json()
        alert('博客发布成功！')
        setTitle('')
        setMarkdown('')
        setPreview('')
        setShowPreview(false)
        onSave?.(post)
      } else {
        alert('发布失败，请重试')
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert('发布失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>创建新博客</h1>
        <p>使用 Markdown 格式编写您的博客内容</p>
      </div>
      <div className="content">
        <div className="section">
          <h2>博客信息</h2>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="输入博客标题..."
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '16px',
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              内容 (Markdown)
            </label>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="使用 Markdown 格式编写内容..."
              rows={15}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'Monaco, Consolas, monospace',
                resize: 'vertical',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <button
              onClick={handlePreview}
              disabled={!markdown}
              style={{
                padding: '12px 24px',
                background: '#de6b92',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: markdown ? 'pointer' : 'not-allowed',
                opacity: markdown ? 1 : 0.5,
              }}
            >
              预览
            </button>
            
            <button
              onClick={handleSave}
              disabled={!title || !markdown || isLoading}
              style={{
                padding: '12px 24px',
                background: '#e91e63',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: (!title || !markdown || isLoading) ? 'not-allowed' : 'pointer',
                opacity: (!title || !markdown || isLoading) ? 0.5 : 1,
              }}
            >
              {isLoading ? '发布中...' : '发布博客'}
            </button>
          </div>
        </div>

        {showPreview && (
          <div className="section">
            <h2>预览</h2>
            <div dangerouslySetInnerHTML={{ __html: preview }} />
          </div>
        )}
      </div>
    </div>
  )
} 