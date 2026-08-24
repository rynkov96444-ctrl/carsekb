import { Metadata } from "next"
import { Star, MapPin, Calendar, Gauge, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Купля-продажа авто в Екатеринбурге — CarsEkb",
  description: "Автомобили с пробегом в Екатеринбурге. Проверенные объявления от частных лиц и салонов.",
}

const cars = [
  {
    title: "Toyota Camry 2021",
    price: "2 450 000 ₽",
    year: 2021,
    mileage: "45 000 км",
    location: "Екатеринбург",
    seller: "Частное лицо",
    image: "/placeholder-car.jpg",
  },
  {
    title: "BMW X5 2020",
    price: "4 890 000 ₽",
    year: 2020,
    mileage: "62 000 км",
    location: "Екатеринбург",
    seller: "Автосалон",
    image: "/placeholder-car.jpg",
  },
  {
    title: "Hyundai Tucson 2022",
    price: "2 150 000 ₽",
    year: 2022,
    mileage: "28 000 км",
    location: "Екатеринбург",
    seller: "Частное лицо",
    image: "/placeholder-car.jpg",
  },
]

export default function MarketplacePage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Купля-продажа авто
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
          Проверенные объявления о продаже автомобилей в Екатеринбурге от частных лиц и салонов.
        </p>
      </div>

      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Свежие объявления</h2>
          <Button variant="outline" size="sm">Все объявления <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car, idx) => (
            <Card key={idx} className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="aspect-video bg-muted" />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{car.title}</CardTitle>
                    <CardDescription className="mt-1">{car.location}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{car.price}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Gauge className="h-4 w-4" />
                    <span>{car.mileage}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{car.seller}</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/marketplace/${idx}`}>Подробнее</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center space-y-4 border-t pt-12">
        <h2 className="text-2xl font-bold">Продать автомобиль</h2>
        <p className="text-muted-foreground">
          Разместите объявление о продаже вашего авто на CarsEkb
        </p>
        <Button size="lg" className="mt-4" asChild>
          <Link href="/marketplace/add">Разместить объявление</Link>
        </Button>
      </div>
    </div>
  )
}
