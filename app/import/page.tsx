import { Metadata } from "next"
import { Star, MapPin, Shield, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Привоз авто из-за рубежа в Екатеринбурге — Companies, рейтинги, отзывы — CarsEkb",
  description: "Каталог компаний Екатеринбурга по привозу авто из Японии, Кореи, Китая и Европы. Рейтинги, отзывы, контакты.",
}

const countries = [
  { name: "Япония", description: "Правый руль, отличное состояние, аукционы", icon: "🇯🇵" },
  { name: "Корея", description: "Левый руль, современные модели, хорошие цены", icon: "🇰🇷" },
  { name: "Китай", description: "Электромобили, новые бренды, быстрые поставки", icon: "🇨🇳" },
  { name: "Европа", description: "Премиум класс, проверенная история", icon: "🇪🇺" },
]

const companies = [
  {
    name: "AutoImport EKB",
    description: "Привоз авто из Японии и Кореи под ключ. Работаем с аукционами с 2018 года.",
    countries: ["Япония", "Корея"],
    rating: 4.9,
    reviews: 87,
    address: "ул. Малышева, 35",
  },
  {
    name: "Vostok Auto",
    description: "Полный цикл привоза авто из Китая и Японии. Помощь с растаможкой и постановкой на учёт.",
    countries: ["Китай", "Япония"],
    rating: 4.7,
    reviews: 54,
    address: "ул. Белинского, 12",
  },
  {
    name: "Global Cars",
    description: "Привоз автомобилей из Европы и Кореи. Проверка истории, доставка, оформление.",
    countries: ["Европа", "Корея"],
    rating: 4.8,
    reviews: 112,
    address: "ул. Ленина, 78",
  },
]

const advantages = [
  {
    icon: Shield,
    title: "Проверенные компании",
    description: "Все компании проходят модерацию и имеют реальные отзывы клиентов",
  },
  {
    icon: Star,
    title: "Рейтинги и отзывы",
    description: "Сравните компании по рейтингу, отзывам и опыту работы",
  },
  {
    icon: CheckCircle,
    title: "Прозрачные условия",
    description: "Информация о стоимости, сроках и этапах привоза от каждой компании",
  },
]

export default function ImportPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Привоз авто из-за рубежа
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
          Компании Екатеринбурга, которые привезут авто из Японии, Кореи, Китая или Европы. 
          Выберите проверенного брокера по рейтингу и отзывам.
        </p>
      </div>

      {/* Countries */}
      <div className="mb-12">
        <h2 className="mb-6 text-center text-2xl font-bold">Откуда привозят</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {countries.map((country) => (
            <Card key={country.name}>
              <CardHeader>
                <div className="text-4xl mb-2">{country.icon}</div>
                <CardTitle>{country.name}</CardTitle>
                <CardDescription>{country.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Companies */}
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
                    <CardDescription className="mt-1">{company.address}</CardDescription>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-sm">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="font-medium">{company.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{company.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {company.countries.map((c) => (
                    <span key={c} className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{company.reviews} отзывов</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/import/${company.name.toLowerCase().replace(/\s/g, "-")}`}>Подробнее</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Advantages */}
      <div className="mb-12">
        <h2 className="mb-8 text-center text-2xl font-bold">Почему CarsEkb</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {advantages.map((adv) => (
            <Card key={adv.title}>
              <CardHeader>
                <adv.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{adv.title}</CardTitle>
                <CardDescription>{adv.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 border-t pt-12">
        <h2 className="text-2xl font-bold">Вы занимаетесь привозом авто?</h2>
        <p className="text-muted-foreground">
          Разместите вашу компанию на CarsEkb и получайте новых клиентов
        </p>
        <Button size="lg" className="mt-4" asChild>
          <Link href="/import/add">Добавить компанию</Link>
        </Button>
      </div>
    </div>
  )
}
