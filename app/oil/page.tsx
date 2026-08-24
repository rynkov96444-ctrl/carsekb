import { Metadata } from "next"
import Link from "next/link"
import { Droplet, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Подбор масла по автомобилю — CarsEkb",
  description: "Подбор моторного масла по марке и модели автомобиля. Калькулятор, рекомендации.",
}

export default function OilPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Подбор масла
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
          Подберите идеальное моторное масло для вашего автомобиля. Рекомендации по марке, модели и году выпуска.
        </p>
      </div>

      <div className="mb-12 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Подобрать масло</CardTitle>
            <CardDescription>Введите марку и модель автомобиля</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input placeholder="Марка автомобиля (например: Toyota)" />
              <Input placeholder="Модель (например: Camry)" />
              <Input placeholder="Год выпуска (например: 2021)" />
              <Button className="w-full" size="lg">Подобрать</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Популярные масла</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {["Mobil 1", "Castrol", "Shell Helix", "Liqui Moly"].map((brand) => (
            <Card key={brand}>
              <CardHeader>
                <Droplet className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{brand}</CardTitle>
                <CardDescription>Синтетическое моторное масло</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center space-y-4 border-t pt-12">
        <h2 className="text-2xl font-bold">Вы продаёте масла?</h2>
        <p className="text-muted-foreground">
          Разместите ваш магазин на CarsEkb и получайте новых клиентов
        </p>
        <Button size="lg" className="mt-4" asChild>
          <Link href="/oil/add">Добавить магазин</Link>
        </Button>
      </div>
    </div>
  )
}
