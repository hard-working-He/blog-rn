'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  content: string
  slug: string
  createdAt: string
}

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container">
        <div className="header">
          <h1>博客列表</h1>
          <p>加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <h1>我的博客</h1>
        <p>分享技术见解与生活感悟</p>
      </div>
      <div className="content">
        {posts.length === 0 ? (
          <div className="section">
            <h2>暂无博客文章</h2>
            <p>开始创建您的第一篇博客吧！</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="section">
              <h2>
                <Link 
                  href={`/blog/${post.slug}`}
                  style={{ 
                    textDecoration: 'none', 
                    color: '#de6b92',
                    cursor: 'pointer'
                  }}
                >
                  {post.title}
                </Link>
              </h2>
              <p style={{ color: '#666', marginBottom: '15px' }}>
                发布于 {new Date(post.createdAt).toLocaleDateString('zh-CN')}
              </p>
              <div 
                style={{ 
                  maxHeight: '200px', 
                  overflow: 'hidden',
                  position: 'relative'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: post.content.substring(0, 300) + '...' 
                }} 
              />
              <Link 
                href={`/blog/${post.slug}`}
                style={{
                  display: 'inline-block',
                  marginTop: '15px',
                  padding: '8px 16px',
                  background: '#e91e63',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                阅读全文
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 