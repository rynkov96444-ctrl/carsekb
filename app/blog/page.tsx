"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, Clock, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  published: boolean
  createdAt: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts?published=true")
      const data = await res.json()
      setPosts(data)
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

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Блог
        </h1>
        <p className="mt-2 text-muted-foreground">
          Полезные статьи об автомобилях и автокультуре
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Статьи пока не опубликованы</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              {post.coverImage ? (
                <div className="aspect-video">
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-video bg-muted" />
              )}
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.createdAt).toLocaleDateString("ru-RU")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
