import { Metadata } from "next"
import { Star, MapPin, ArrowRight, Car } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Аренда автомобилей в Екатеринбурге — CarsEkb",
  description: "Аренда автомобилей в Екатеринбурге. Прокат авто на час, день, неделю. Рейтинги, отзывы.",
}

const companies = [
  {
    name: "Автопрокат66",
    description: "Аренда автомобилей эконом и бизнес класса. Без залога, быстрое оформление",
    address: "ул. Ленина, 50",
    rating: 4.8,
    reviews: 156,
    price: "от 2 500 ₽/день",
  },
  {
    name: "RentCar EKB",
    description: "Прокат автомобилей любых классов. Доставка авто в аэропорт",
    address: "ул. Малышева, 78",
    rating: 4.7,
    reviews: 203,
    price: "от 2 000 ₽/день",
  },
  {
    name: "DriveTime",
    description: "Аренда авто с водителем и без. Свадьбы, трансферы, корпоративы",
    address: "ул. Белинского, 120",
    rating: 4.9,
    reviews: 189,
    price: "от 3 000 ₽/день",
  },
]

export default function RentalPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Аренда автомобилей
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
          Компании по прокату автомобилей в Екатеринбурге. Выберите надёжную компанию по рейтингу и отзывам.
        </p>
      </div>

      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Компании</h2>
          <Button variant="outline" size="sm">Все компании <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Card key={company.name} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {company.address}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-sm">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="font-medium">{company.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{company.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <Car className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{company.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{company.reviews} отзывов</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/rental/${company.name.toLowerCase().replace(/\s/g, "-")}`}>Подробнее</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center space-y-4 border-t pt-12">
        <h2 className="text-2xl font-bold">У вас компания по прокату?</h2>
        <p className="text-muted-foreground">
          Разместите вашу компанию на CarsEkb и получайте новых клиентов
        </p>
        <Button size="lg" className="mt-4" asChild>
          <Link href="/rental/add">Добавить компанию</Link>
        </Button>
      </div>
    </div>
  )
}
