"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { MapPin, Star, Phone, Globe, Instagram, ArrowLeft, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Service {
  id: string
  name: string
  category: string
  description: string | null
  address: string
  phone: string | null
  website: string | null
  instagram: string | null
  rating: number
  reviewCount: number
  images: string[]
}

const categoryNames: Record<string, string> = {
  DETAILING: "Детейлинг",
  PAINT_SHOP: "Малярная станция",
  CAR_WASH: "Автомойка",
  TIRE_SHOP: "Шиномонтаж",
  REPAIR: "СТО",
  IMPORT: "Привоз авто",
  OTHER: "Другое"
}

export default function ServicePage() {
  const params = useParams()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchService()
  }, [params.id])

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/services/${params.id}`)
      const data = await res.json()
      setService(data)
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

  if (!service) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold">Сервис не найден</h1>
        <Button className="mt-4" asChild>
          <Link href="/services">Вернуться к списку</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/services">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к списку
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Галерея */}
          {service.images && service.images.length > 0 && (
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover" />
              </div>
              {service.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {service.images.slice(1, 5).map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-lg overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Описание */}
          <Card>
            <CardHeader>
              <CardTitle>О сервисе</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {service.description || "Описание не добавлено"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Информация */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{service.name}</CardTitle>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{service.rating}</span>
                </div>
                <span className="text-muted-foreground">({service.reviewCount} отзывов)</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Категория</div>
                <div className="text-lg">
                  {categoryNames[service.category] || service.category}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">Адрес</div>
                <div className="flex items-start gap-2 mt-1">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span>{service.address}</span>
                </div>
              </div>

              {service.phone && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Телефон</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <a href={`tel:${service.phone}`} className="hover:text-primary">
                      {service.phone}
                    </a>
                  </div>
                </div>
              )}

              {service.website && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Сайт</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <a href={service.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      Перейти на сайт
                    </a>
                  </div>
                </div>
              )}

              {service.instagram && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Instagram</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Instagram className="h-5 w-5 text-muted-foreground" />
                    <a href={`https://instagram.com/${service.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      {service.instagram}
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Button className="w-full" size="lg">
            Оставить отзыв
          </Button>
        </div>
      </div>
    </div>
  )
}
