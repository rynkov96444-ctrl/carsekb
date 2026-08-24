import { Metadata } from "next"
import { Star, MapPin, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Китайские автомобили в Екатеринбурге — CarsEkb",
  description: "Китайские автомобили в Екатеринбурге. Обзоры, сравнения, дилеры Haval, Chery, Geely.",
}

const brands = [
  {
    name: "Haval",
    description: "Популярный китайский бренд SUV. Модели Jolion, F7, H9",
    models: ["Jolion", "F7", "H9", "Dargo"],
  },
  {
    name: "Chery",
    description: "Один из крупнейших китайских автопроизводителей. Tiggo, Arrizo",
    models: ["Tiggo 4", "Tiggo 7", "Tiggo 8", "Arrizo 8"],
  },
  {
    name: "Geely",
    description: "Премиальный китайский бренд. Coolray, Atlas, Monjaro",
    models: ["Coolray", "Atlas", "Monjaro", "Tugella"],
  },
]

const dealers = [
  {
    name: "Haval Екатеринбург",
    description: "Официальный дилер Haval в Екатеринбурге. Полный модельный ряд, сервис",
    address: "ул. Щорса, 109",
    rating: 4.7,
    reviews: 156,
    brand: "Haval",
  },
  {
    name: "Chery Екатеринбург",
    description: "Официальный дилер Chery. Новые модели, trade-in, кредитование",
    address: "ул. Белинского, 175",
    rating: 4.6,
    reviews: 203,
    brand: "Chery",
  },
  {
    name: "Geely Motors Екатеринбург",
    description: "Официальный дилер Geely. Модельный ряд 2026, сервис, запчасти",
    address: "ул. Малышева, 210",
    rating: 4.8,
    reviews: 189,
    brand: "Geely",
  },
]

export default function ChineseCarsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Китайские автомобили
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
          Всё о китайских автомобилях в Екатеринбурге. Обзоры, сравнения, дилеры.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Популярные бренды</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {brands.map((brand) => (
            <Card key={brand.name}>
              <CardHeader>
                <CardTitle>{brand.name}</CardTitle>
                <CardDescription>{brand.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {brand.models.map((model) => (
                    <span key={model} className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                      {model}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Дилеры китайских авто</h2>
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
                  <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                    {dealer.brand}
                  </span>
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
    </div>
  )
}
