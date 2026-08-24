"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fetching, setFetching] = useState(true)

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    published: false
  })

  useEffect(() => {
    fetchPost()
  }, [params.id])

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${params.id}`)
      const data = await res.json()
      
      setFormData({
        title: data.title || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        published: data.published || false
      })
      setCoverImage(data.coverImage || null)
    } catch (error) {
      console.error("Ошибка загрузки:", error)
    } finally {
      setFetching(false)
    }
  }

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload
      })
      const data = await res.json()
      if (data.url) {
        setCoverImage(data.url)
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          coverImage,
          published: publish
        })
      })

      if (res.ok) {
        router.push("/admin/blog")
        router.refresh()
      }
    } catch (error) {
      console.error("Ошибка:", error)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Редактировать статью</h1>
        <p className="text-muted-foreground mt-2">Измените информацию о статье</p>
      </div>

      <form className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
            <CardDescription>Заголовок и краткое описание статьи</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Заголовок *</label>
              <Input 
                placeholder="Введите заголовок статьи" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Краткое описание</label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Краткое описание для превью статьи..."
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Обложка статьи</label>
              {coverImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                  <img src={coverImage} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setCoverImage(null)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                  {uploading ? (
                    <Loader2 className="h-12 w-12 text-muted-foreground animate-spin mb-2" />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {uploading ? "Загрузка..." : "Загрузить обложку"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverUpload}
                    disabled={uploading}
                  />
                </label>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Содержание статьи</CardTitle>
            <CardDescription>Текст статьи</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea 
              className="flex min-h-[400px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Текст статьи..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            />
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="button" onClick={(e) => handleSubmit(e, true)} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Сохранение...
              </>
            ) : (
              "Опубликовать"
            )}
          </Button>
          <Button type="button" variant="outline" onClick={(e) => handleSubmit(e, false)} disabled={loading}>
            Сохранить как черновик
          </Button>
          <Button type="button" variant="ghost" asChild>
            <Link href="/admin/blog">Отмена</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
