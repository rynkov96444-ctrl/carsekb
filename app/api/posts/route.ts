import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { prisma } = await import("@/lib/prisma")
    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published")
    
    let where = {}
    if (published === "true") {
      where = { published: true }
    } else if (published === "false") {
      where = { published: false }
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Ошибка загрузки постов" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prisma } = await import("@/lib/prisma")
    const body = await request.json()
    
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9а-я]+/gi, "-")
      .replace(/^-+|-+$/g, "") + "-" + Date.now()
    
    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug,
        content: body.content,
        excerpt: body.excerpt,
        coverImage: body.coverImage,
        published: body.published || false
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Ошибка создания поста" }, { status: 500 })
  }
}
