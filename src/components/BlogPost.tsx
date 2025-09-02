'use client'

import React from 'react'

interface BlogPostProps {
  title: string
  content: string
  createdAt: string
}

export default function BlogPost({ title, content, createdAt }: BlogPostProps) {
  return (
    <div className="container">
      <div className="header">
        <h1>{title}</h1>
        <p>发布于 {new Date(createdAt).toLocaleDateString('zh-CN')}</p>
      </div>
      <div className="content">
        <div 
          className="section"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  )
} 