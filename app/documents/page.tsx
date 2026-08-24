import { Metadata } from "next"
import { FileText, Download, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Документы для автомобиля — CarsEkb",
  description: "Шаблоны договоров купли-продажи, дарения. Постановка на учёт, ОСАГО, юридические вопросы.",
}

const documents = [
  {
    title: "Договор купли-продажи",
    description: "Актуальный бланк ДКП автомобиля 2026",
    icon: FileText,
    downloads: "12.5k",
  },
  {
    title: "Договор дарения",
    description: "Бланк договора дарения автомобиля",
    icon: FileText,
    downloads: "3.2k",
  },
  {
    title: "Доверенность",
    description: "Генеральная доверенность на автомобиль",
    icon: FileText,
    downloads: "5.8k",
  },
  {
    title: "Акт приёма-передачи",
    description: "Акт приёма-передачи автомобиля",
    icon: FileText,
    downloads: "8.1k",
  },
]

const guides = [
  {
    title: "Постановка на учёт",
    description: "Как поставить автомобиль на учёт в ГИБДД",
  },
  {
    title: "ОСАГО и КАСКО",
    description: "Сравнение страховых компаний, калькулятор",
  },
  {
    title: "Снятие с учёта",
    description: "Как снять автомобиль с учёта",
  },
  {
    title: "Замена прав",
    description: "Как заменить водительское удостоверение",
  },
]

export default function DocumentsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Документы для автомобиля
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
          Шаблоны договоров, инструкции по регистрации, страхованию и другим юридическим вопросам.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Шаблоны документов</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {documents.map((doc) => (
            <Card key={doc.title} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <doc.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{doc.title}</CardTitle>
                <CardDescription>{doc.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{doc.downloads} скачиваний</span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Скачать
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Полезные инструкции</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {guides.map((guide) => (
            <Card key={guide.title} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle>{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0" asChild>
                  <Link href={`/documents/guides/${guide.title.toLowerCase().replace(/\s/g, "-")}`}>
                    Читать <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
