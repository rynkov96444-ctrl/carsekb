import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    serviceName: "Detailing Pro",
    author: "Иван Петров",
    rating: 5,
    text: "Отличный сервис! Сделали детейлинг за один день, машина как новая. Рекомендую!",
    date: "2026-08-22",
    status: "pending",
  },
  {
    id: 2,
    serviceName: "AutoPaint Master",
    author: "Алексей Сидоров",
    rating: 4,
    text: "Хорошая малярка, покрасили крыло, результат отличный. Немного затянули по срокам.",
    date: "2026-08-21",
    status: "pending",
  },
  {
    id: 3,
    serviceName: "CarWash Express",
    author: "Мария Иванова",
    rating: 5,
    text: "Лучшая мойка в городе! Быстро, качественно, недорого.",
    date: "2026-08-20",
    status: "approved",
  },
]

export default function AdminReviewsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Отзывы</h1>
        <p className="text-muted-foreground mt-2">Модерация отзывов пользователей</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>На модерации</CardTitle>
            <CardDescription>Отзывы, ожидающие проверки</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviews.filter(r => r.status === "pending").map((review) => (
                <div key={review.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{review.serviceName}</div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Автор: {review.author} • {new Date(review.date).toLocaleDateString("ru-RU")}
                  </div>
                  <div className="text-sm mb-3">{review.text}</div>
                  <div className="flex gap-2">
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
            <CardTitle>Одобренные отзывы</CardTitle>
            <CardDescription>Последние опубликованные отзывы</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviews.filter(r => r.status === "approved").map((review) => (
                <div key={review.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{review.serviceName}</div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Автор: {review.author} • {new Date(review.date).toLocaleDateString("ru-RU")}
                  </div>
                  <div className="text-sm mb-3">{review.text}</div>
                  <Button size="sm" variant="ghost">
                    Удалить
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
