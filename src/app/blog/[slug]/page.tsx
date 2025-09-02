import React from 'react'
import { prisma } from '@/lib/db'
import BlogPost from '@/components/BlogPost'
import { notFound } from 'next/navigation'

interface BlogPageProps {
  params: { slug: string }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  })

  if (!post) {
    notFound()
  }

  return (
    <div>
      <nav style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
      }}>
        <a
          href="/"
          style={{
            padding: '10px 20px',
            background: 'white',
            color: '#e91e63',
            border: '2px solid #e91e63',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          返回首页
        </a>
      </nav>
      
      <BlogPost 
        title={post.title}
        content={post.content}
        createdAt={post.createdAt.toISOString()}
      />
    </div>
  )
} 