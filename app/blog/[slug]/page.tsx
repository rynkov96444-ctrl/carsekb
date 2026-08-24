"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  coverImage: string | null
  createdAt: string
}

export default function PostPage() {
  const params = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [params.slug])

  const fetchPost = async () => {
    try {
      const res = await fetch("/api/posts")
      const posts = await res.json()
      const foundPost = posts.find((p: Post) => p.slug === params.slug)
      setPost(foundPost || null)
    } catch (error) {
      console.error("Ошибка загрузки:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold">Статья не найдена</h1>
        <Button className="mt-4" asChild>
          <Link href="/blog">Вернуться к блогу</Link>
        </Button>
      </div>
    )
  }

  return (
    <article className="container py-8 md:py-12 max-w-4xl">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/blog">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к блогу
        </Link>
      </Button>

      {post.coverImage && (
        <div className="aspect-video rounded-lg overflow-hidden mb-8">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.createdAt).toLocaleDateString("ru-RU")}</span>
          </div>
        </div>
      </header>

      {post.excerpt && (
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          {post.excerpt}
        </p>
      )}

      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>
      </div>
    </article>
  )
}
