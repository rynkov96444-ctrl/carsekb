import { Metadata } from "next"
import { Star, MapPin, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Автосалоны Екатеринбурга — CarsEkb",
  description: "Официальные дилеры и автосалоны Екатеринбурга. Новые автомобили, тест-драйвы, рейтинги.",
}

const dealers = [
  {
    name: "Тойота Центр Екатеринбург",
    description: "Официальный дилер Toyota. Новые автомобили, гарантийное обслуживание, тест-драйв",
    address: "ул. Щорса, 109",
    rating: 4.7,
    reviews: 234,
    brands: ["Toyota"],
  },
  {
    name: "BMW Екатеринбург",
    description: "Официальный дилер BMW и MINI. Полный модельный ряд, сервис, оригинальные запчасти",
    address: "ул. Московская, 283",
    rating: 4.8,
    reviews: 189,
    brands: ["BMW", "MINI"],
  },
  {
    name: "Hyundai Motor Екатеринбург",
    description: "Официальный дилер Hyundai. Новые автомобили, trade-in, кредитование",
    address: "ул. Белинского, 175",
    rating: 4.6,
    reviews: 312,
    brands: ["Hyundai"],
  },
  {
    name: "Kia Motors Екатеринбург",
    description: "Официальный дилер Kia. Модельный ряд 2026, сервис, запчасти",
    address: "ул. Малышева, 210",
    rating: 4.5,
    reviews: 267,
    brands: ["Kia"],
  },
]

export default function DealersPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Автосалоны Екатеринбурга
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
          Официальные дилеры и автосалоны Екатеринбурга. Выберите салон по рейтингу и отзывам.
        </p>
      </div>

      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Автосалоны</h2>
          <Button variant="outline" size="sm">Все салоны <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dealers.map((dealer) => (
            <Card key={dealer.name} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{dealer.name}</CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {dealer.address}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-sm">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="font-medium">{dealer.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{dealer.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {dealer.brands.map((brand) => (
                    <span key={brand} className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                      {brand}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{dealer.reviews} отзывов</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dealers/${dealer.name.toLowerCase().replace(/\s/g, "-")}`}>Подробнее</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center space-y-4 border-t pt-12">
        <h2 className="text-2xl font-bold">У вас автосалон?</h2>
        <p className="text-muted-foreground">
          Разместите ваш салон на CarsEkb и получайте новых клиентов
        </p>
        <Button size="lg" className="mt-4" asChild>
          <Link href="/dealers/add">Добавить салон</Link>
        </Button>
      </div>
    </div>
  )
}
