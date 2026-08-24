import { Metadata } from "next"
import { Heart, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Car Spotting Екатеринбург — CarsEkb",
  description: "Уникальные и интересные автомобили на дорогах Екатеринбурга. Фотогалерея автолюбителей.",
}

const mockPosts = [
  {
    id: "1",
    title: "Porsche 911 GT3 на Ленина",
    carModel: "Porsche 911 GT3",
    location: "ул. Ленина",
    likes: 42,
    image: "/placeholder-spotting.jpg",
  },
  {
    id: "2",
    title: "Lamborghini Huracan в центре",
    carModel: "Lamborghini Huracan",
    location: "ул. Малышева",
    likes: 89,
    image: "/placeholder-spotting.jpg",
  },
  {
    id: "3",
    title: "Tesla Model S Plaid",
    carModel: "Tesla Model S Plaid",
    location: "ТЦ Гринвич",
    likes: 56,
    image: "/placeholder-spotting.jpg",
  },
]

export default function SpottingPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Car Spotting Екатеринбург
          </h1>
          <p className="mt-2 text-muted-foreground">
            Уникальные автомобили на дорогах города
          </p>
        </div>
        <Button asChild>
          <Link href="/spotting/add">Добавить фото</Link>
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden transition-shadow hover:shadow-lg">
            <div className="aspect-video bg-muted relative">
              <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-sm backdrop-blur">
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                <span>{post.likes}</span>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{post.location}</span>
                </div>
                <span className="text-sm font-medium">{post.carModel}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button variant="outline" size="lg">
          Загрузить ещё
        </Button>
      </div>
    </div>
  )
}
