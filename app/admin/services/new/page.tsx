"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, Loader2 } from "lucide-react"
import Link from "next/link"

export default function AdminServiceNewPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    website: "",
    instagram: ""
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append("file", file)

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData
        })
        const data = await res.json()
        if (data.url) {
          setImages(prev => [...prev, data.url])
        }
      } catch (error) {
        console.error("Ошибка загрузки:", error)
      }
    }
    setUploading(false)
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, images })
      })

      if (res.ok) {
        router.push("/admin/services")
        router.refresh()
      }
    } catch (error) {
      console.error("Ошибка:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Добавить сервис</h1>
        <p className="text-muted-foreground mt-2">Заполните информацию о сервисе</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
            <CardDescription>Базовые данные о сервисе</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Название *</label>
                <Input 
                  placeholder="Например: Detailing Pro" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Категория *</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  <option value="">Выберите категорию</option>
                  <option value="DETAILING">Детейлинг</option>
                  <option value="PAINT_SHOP">Малярная станция</option>
                  <option value="CAR_WASH">Автомойка</option>
                  <option value="TIRE_SHOP">Шиномонтаж</option>
                  <option value="REPAIR">СТО</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Описание</label>
              <textarea 
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Расскажите о сервисе, услугах, преимуществах..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Адрес *</label>
                <Input 
                  placeholder="ул. Ленина, 50" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Телефон</label>
                <Input 
                  placeholder="+7 (343) 123-45-67" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Сайт</label>
                <Input 
                  placeholder="https://example.com" 
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Instagram</label>
                <Input 
                  placeholder="@username" 
                  value={formData.instagram}
                  onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Фотографии</CardTitle>
            <CardDescription>Загрузите фотографии сервиса и работ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                    <img src={image} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <label className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                  {uploading ? (
                    <Loader2 className="h-8 w-8 text-muted-foreground animate-spin mb-2" />
                  ) : (
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {uploading ? "Загрузка..." : "Загрузить"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Сохранение...
              </>
            ) : (
              "Сохранить"
            )}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/services">Отмена</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
