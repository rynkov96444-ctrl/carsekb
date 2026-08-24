import { Metadata } from "next"
import { Star, MapPin, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Магазины автозапчастей в Екатеринбурге — CarsEkb",
  description: "Магазины автозапчастей в Екатеринбурге. Рейтинги, отзывы, контакты.",
}

const shops = [
  {
    name: "АвтоДеталь Екб",
    description: "Оригинальные запчасти и качественные аналоги для японских и корейских авто",
    address: "ул. Малышева, 45",
    rating: 4.8,
    reviews: 156,
    specialties: ["Япония", "Корея"],
  },
  {
    name: "Запчасти66",
    description: "Широкий ассортимент запчастей для европейских автомобилей. Быстрая доставка",
    address: "ул. Белинского, 120",
    rating: 4.6,
    reviews: 98,
    specialties: ["Европа", "Премиум"],
  },
  {
    name: "МоторСити",
    description: "Запчасти для двигателей, масла, фильтры. Консультации специалистов",
    address: "ул. Ленина, 78",
    rating: 4.7,
    reviews: 134,
    specialties: ["Двигатели", "Масла"],
  },
]

export default function PartsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Магазины автозапчастей
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
          Магазины автозапчастей Екатеринбурга. Выберите проверенный магазин по рейтингу и отзывам.
        </p>
      </div>

      {/* Магазины */}
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Магазины</h2>
          <Button variant="outline" size="sm">Все магазины <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shops.map((shop) => (
            <Card key={shop.name} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{shop.name}</CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {shop.address}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-sm">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="font-medium">{shop.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{shop.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {shop.specialties.map((spec) => (
                    <span key={spec} className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{shop.reviews} отзывов</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/parts/${shop.name.toLowerCase().replace(/\s/g, "-")}`}>Подробнее</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 border-t pt-12">
        <h2 className="text-2xl font-bold">У вас магазин запчастей?</h2>
        <p className="text-muted-foreground">
          Разместите ваш магазин на CarsEkb и получайте новых клиентов
        </p>
        <Button size="lg" className="mt-4" asChild>
          <Link href="/parts/add">Добавить магазин</Link>
        </Button>
      </div>
    </div>
  )
}
