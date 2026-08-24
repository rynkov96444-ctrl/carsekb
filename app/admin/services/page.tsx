"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Star, MapPin, Loader2 } from "lucide-react"

interface Service {
  id: string
  name: string
  category: string
  address: string
  phone: string | null
  rating: number
  reviewCount: number
  status: string
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services")
      const data = await res.json()
      setServices(data)
    } catch (error) {
      console.error("Ошибка загрузки:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить сервис?")) return

    try {
      await fetch(`/api/services/${id}`, { method: "DELETE" })
      setServices(services.filter(s => s.id !== id))
    } catch (error) {
      console.error("Ошибка удаления:", error)
    }
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
          <h1 className="text-3xl font-bold">Сервисы</h1>
          <p className="text-muted-foreground mt-2">Управление сервисами: детейлинг, СТО, автомойки</p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="h-4 w-4 mr-2" />
            Добавить сервис
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все сервисы ({services.length})</CardTitle>
          <CardDescription>Список всех добавленных сервисов</CardDescription>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Сервисы пока не добавлены</p>
              <Button className="mt-4" asChild>
                <Link href="/admin/services/new">Добавить первый сервис</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {categoryNames[service.category] || service.category}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span>{service.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {service.reviewCount} отзывов
                        </span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{service.address}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Активен
                    </span>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/services/${service.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(service.id)}
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
