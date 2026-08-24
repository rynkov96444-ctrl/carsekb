import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Upload } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Настройки</h1>
        <p className="text-muted-foreground mt-2">Управление параметрами сайта</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Основные настройки</CardTitle>
            <CardDescription>Базовая информация о сайте</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Название сайта</label>
              <Input defaultValue="CarsEkb" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Описание</label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                defaultValue="Автомобильный портал Екатеринбурга"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email для связи</label>
              <Input defaultValue="info@carsekb.ru" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO настройки</CardTitle>
            <CardDescription>Мета-теги и описание для поисковых систем</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Title</label>
              <Input defaultValue="CarsEkb — Автомобильный портал Екатеринбурга" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Description</label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                defaultValue="Автосервисы, детейлинг центры, автомойки, привоз авто из-за рубежа, Car spotting и сообщество. Найдите лучшее для вашего автомобиля"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ключевые слова</label>
              <Input defaultValue="авто, екатеринбург, сервис, детейлинг, привоз авто" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Социальные сети</CardTitle>
            <CardDescription>Ссылки на социальные сети</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Telegram</label>
              <Input placeholder="https://t.me/carsekb" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ВКонтакте</label>
              <Input placeholder="https://vk.com/carsekb" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">YouTube</label>
              <Input placeholder="https://youtube.com/@carsekb" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Логотип и фавикон</CardTitle>
            <CardDescription>Загрузите логотип и иконку сайта</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Логотип</label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <Button variant="outline">Загрузить логотип</Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Фавикон</label>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
                <Button variant="outline">Загрузить фавикон</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button>
          <Save className="h-4 w-4 mr-2" />
          Сохранить настройки
        </Button>
      </div>
    </div>
  )
}
