import { Metadata } from "next"
import Link from "next/link"
import { Shield, AlertTriangle, CheckCircle, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Проверка автомобиля — CarsEkb",
  description: "Проверка автомобиля по VIN или гос. номеру. История, ограничения, ДТП, залоги.",
}

const features = [
  {
    icon: Shield,
    title: "История автомобиля",
    description: "Количество владельцев, пробеги, регистрации",
  },
  {
    icon: AlertTriangle,
    title: "Ограничения",
    description: "Запреты на регистрационные действия, аресты, залоги",
  },
  {
    icon: FileText,
    title: "ДТП и ремонты",
    description: "Информация о страховых случаях и ремонтах",
  },
  {
    icon: CheckCircle,
    title: "Юридическая чистота",
    description: "Проверка по базам ГИБДД, ФССП, ФНП",
  },
]

export default function CheckPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Проверка автомобиля
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
          Проверьте автомобиль перед покупкой. История, ограничения, ДТП, залоги — вся информация в одном месте.
        </p>
      </div>

      <div className="mb-12 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Проверить автомобиль</CardTitle>
            <CardDescription>Введите VIN или гос. номер автомобиля</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input placeholder="VIN или гос. номер (например: А123БВ196)" />
              <Button className="w-full" size="lg">Проверить</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="mb-8 text-center text-2xl font-bold">Что вы узнаете</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center space-y-4 border-t pt-12">
        <h2 className="text-2xl font-bold">Вы предоставляете услуги проверки?</h2>
        <p className="text-muted-foreground">
          Разместите вашу компанию на CarsEkb
        </p>
        <Button size="lg" className="mt-4" asChild>
          <Link href="/check/add">Добавить компанию</Link>
        </Button>
      </div>
    </div>
  )
}
