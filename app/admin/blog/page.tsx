"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Calendar, Clock, Loader2 } from "lucide-react"

interface Post {
  id: string
  title: string
  excerpt: string | null
  published: boolean
  createdAt: string
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts")
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      console.error("Ошибка загрузки:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить статью?")) return

    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" })
      setPosts(posts.filter(p => p.id !== id))
    } catch (error) {
      console.error("Ошибка удаления:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Блог</h1>
          <p className="text-muted-foreground mt-2">Управление статьями и публикациями</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4 mr-2" />
            Написать статью
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все статьи ({posts.length})</CardTitle>
          <CardDescription>Список всех публикаций в блоге</CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Статьи пока не добавлены</p>
              <Button className="mt-4" asChild>
                <Link href="/admin/blog/new">Написать первую статью</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{post.title}</div>
                      {post.published ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Опубликовано
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          Черновик
                        </span>
                      )}
                    </div>
                    {post.excerpt && (
                      <div className="text-sm text-muted-foreground mt-1">{post.excerpt}</div>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.createdAt).toLocaleDateString("ru-RU")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/blog/${post.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
