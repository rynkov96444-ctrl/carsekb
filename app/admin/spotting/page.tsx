import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, MapPin, Heart } from "lucide-react"

const spottingPosts = [
  {
    id: 1,
    title: "Porsche 911 GT3 на Ленина",
    carModel: "Porsche 911 GT3",
    location: "ул. Ленина",
    author: "user123",
    likes: 42,
    status: "pending",
  },
  {
    id: 2,
    title: "Lamborghini Huracan в центре",
    carModel: "Lamborghini Huracan",
    location: "ул. Малышева",
    author: "carlover",
    likes: 89,
    status: "pending",
  },
  {
    id: 3,
    title: "Tesla Model S Plaid",
    carModel: "Tesla Model S Plaid",
    location: "ТЦ Гринвич",
    author: "ev_fan",
    likes: 56,
    status: "approved",
  },
]

export default function AdminSpottingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Car Spotting</h1>
        <p className="text-muted-foreground mt-2">Модерация публикаций пользователей</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>На модерации</CardTitle>
            <CardDescription>Публикации, ожидающие проверки</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {spottingPosts.filter(p => p.status === "pending").map((post) => (
                <div key={post.id} className="p-4 border rounded-lg">
                  <div className="aspect-video bg-muted rounded-lg mb-3" />
                  <div className="font-medium">{post.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{post.carModel}</div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{post.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{post.likes}</span>
                    </div>
                    <span>Автор: {post.author}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm">
                      <Check className="h-4 w-4 mr-1" />
                      Одобрить
                    </Button>
                    <Button size="sm" variant="outline">
                      <X className="h-4 w-4 mr-1" />
                      Отклонить
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Одобренные публикации</CardTitle>
            <CardDescription>Последние опубликованные посты</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {spottingPosts.filter(p => p.status === "approved").map((post) => (
                <div key={post.id} className="p-4 border rounded-lg">
                  <div className="aspect-video bg-muted rounded-lg mb-3" />
                  <div className="font-medium">{post.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{post.carModel}</div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{post.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      Скрыть
                    </Button>
                    <Button size="sm" variant="ghost">
                      Удалить
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
