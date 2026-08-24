"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, Star, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Service {
  id: string
  name: string
  category: string
  address: string
  phone: string | null
  rating: number
  reviewCount: number
  images: string[]
}

const categories = [
  { id: "DETAILING", name: "Детейлинг" },
  { id: "PAINT_SHOP", name: "Малярные станции" },
  { id: "CAR_WASH", name: "Автомойки" },
  { id: "TIRE_SHOP", name: "Шиномонтаж" },
  { id: "REPAIR", name: "СТО" },
]

const categoryNames: Record<string, string> = {
  DETAILING: "Детейлинг",
  PAINT_SHOP: "Малярная станция",
  CAR_WASH: "Автомойка",
  TIRE_SHOP: "Шиномонтаж",
  REPAIR: "СТО",
  IMPORT: "Привоз авто",
  OTHER: "Другое"
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [selectedCategory])

  const fetchServices = async () => {
    setLoading(true)
    try {
      const url = selectedCategory 
        ? `/api/services?category=${selectedCategory}`
        : "/api/services"
      const res = await fetch(url)
      const data = await res.json()
      setServices(data)
    } catch (error) {
      console.error("Ошибка загрузки:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Автосервисы Екатеринбурга
        </h1>
        <p className="mt-2 text-muted-foreground">
          Найдите лучший сервис для вашего автомобиля
        </p>
      </div>

      {/* Категории */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button 
            key={category.id} 
            variant={selectedCategory === category.id ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Список сервисов */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Сервисы пока не добавлены</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              {service.images && service.images.length > 0 ? (
                <div className="aspect-video">
                  <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-video bg-muted" />
              )}
              <CardHeader>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {categoryNames[service.category] || service.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{service.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-muted-foreground">({service.reviewCount} отзывов)</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href={`/services/${service.id}`}>Подробнее</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold">У вас сервис?</h2>
        <p className="mt-2 text-muted-foreground">
          Добавьте его в каталог и получите новых клиентов
        </p>
        <Button size="lg" className="mt-4" asChild>
          <Link href="/services/add">Добавить сервис</Link>
        </Button>
      </div>
    </div>
  )
}
