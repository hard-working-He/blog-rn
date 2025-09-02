import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { parseMarkdown, generateSlug } from '@/lib/markdown'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, markdown } = await request.json()

    if (!title || !markdown) {
      return NextResponse.json(
        { error: 'Title and markdown content are required' },
        { status: 400 }
      )
    }

    const content = await parseMarkdown(markdown)
    const slug = generateSlug(title)

    const post = await prisma.post.create({
      data: {
        title,
        content,
        markdown,
        slug,
        published: true,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
} 