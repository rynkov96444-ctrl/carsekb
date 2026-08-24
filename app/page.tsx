import Link from "next/link"
import { ArrowRight, Car, MapPin, Sparkles, Wrench, Star, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Wrench,
    title: "Сервисы",
    description: "Детейлинг центры, малярные станции, СТО — найдите лучшее для вашего авто",
    href: "/services",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Car,
    title: "Привоз авто",
    description: "Компании Екатеринбурга, которые привезут авто из Японии, Кореи, Китая или Европы",
    href: "/import",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Car Spotting",
    description: "Уникальные и интересные автомобили на дорогах Екатеринбурга",
    href: "/spotting",
    color: "from-orange-500 to-red-500",
  },
]

const steps = [
  {
    number: "01",
    title: "Выберите раздел",
    description: "Detailing центр, малярная станция, автомойка, привоз авто или car spotting",
  },
  {
    number: "02",
    title: "Изучите информацию",
    description: "Читайте реальные отзывы, смотрите рейтинги и фотографии работ",
  },
  {
    number: "03",
    title: "Свяжитесь с сервисом",
    description: "Запишитесь онлайн или свяжитесь напрямую с выбранным сервисом",
  },
]

const popularServices = [
  {
    name: "Detailing Pro",
    category: "Детейлинг",
    rating: 4.8,
    reviews: 124,
    address: "ул. Ленина, 50",
  },
  {
    name: "AutoPaint Master",
    category: "Малярная станция",
    rating: 4.6,
    reviews: 89,
    address: "ул. Малышева, 100",
  },
  {
    name: "CarWash Express",
    category: "Автомойка",
    rating: 4.5,
    reviews: 203,
    address: "ул. Белинского, 25",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-black/10" />
        <div className="container relative flex flex-col items-center justify-center gap-6 py-24 md:py-32 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-1.5 text-sm backdrop-blur">
              <Zap className="h-4 w-4 text-primary" />
              <span>Автомобильный портал №1 в Екатеринбурге</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Всё для автолюбителей
              <br />
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                в одном месте
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Автосервисы, детейлинг центры, автомойки, привоз авто из-за рубежа, 
            Car spotting и сообщество. Найдите лучшее для вашего автомобиля
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/services">
                Все сервисы
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Читать блог</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Что мы предлагаем
          </h2>
          <p className="mt-4 text-muted-foreground">
            Три основных направления для автолюбителей Екатеринбурга
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href} className="group">
              <Card className="h-full transition-all hover:shadow-xl hover:-translate-y-1">
                <CardHeader>
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color}`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm font-medium text-primary">
                    Подробнее <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t bg-muted/40">
        <div className="container py-16 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Как это работает
            </h2>
            <p className="mt-4 text-muted-foreground">
              Три простых шага до идеального обслуживания
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="text-6xl font-bold text-primary/20">{step.number}</div>
                <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="absolute top-8 right-0 hidden md:block">
                    <ArrowRight className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="container py-16 md:py-24">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Популярные сервисы
            </h2>
            <p className="mt-2 text-muted-foreground">
              Лучшие сервисы по отзывам пользователей
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/services">
              Все сервисы <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {popularServices.map((service) => (
            <Card key={service.name} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>{service.category}</CardDescription>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-sm">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="font-medium">{service.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{service.address}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{service.reviews} отзывов</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 md:py-24">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-blue-600 p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            У вас автосервис?
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-white/90">
            Разместите ваш бизнес на автомобильном портале Екатеринбурга и получите новых клиентов
          </p>
          <Button size="lg" variant="secondary" className="mt-8" asChild>
            <Link href="/services/add">
              Добавить сервис
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
