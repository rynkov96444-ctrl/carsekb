import Link from "next/link"
import { Car, LayoutDashboard, Wrench, Globe, Package, Building2, ShoppingCart, Camera, FileText, Truck, Droplet, Key, MessageSquare, Users, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  { name: "Дашборд", href: "/admin", icon: LayoutDashboard },
  { name: "Сервисы", href: "/admin/services", icon: Wrench },
  { name: "Привоз авто", href: "/admin/import", icon: Globe },
  { name: "Автозапчасти", href: "/admin/parts", icon: Package },
  { name: "Автосалоны", href: "/admin/dealers", icon: Building2 },
  { name: "Купля-продажа", href: "/admin/marketplace", icon: ShoppingCart },
  { name: "Car Spotting", href: "/admin/spotting", icon: Camera },
  { name: "Блог", href: "/admin/blog", icon: FileText },
  { name: "Прицепы", href: "/admin/trailers", icon: Truck },
  { name: "Подбор масла", href: "/admin/oil", icon: Droplet },
  { name: "Аренда", href: "/admin/rental", icon: Key },
  { name: "Отзывы", href: "/admin/reviews", icon: MessageSquare },
  { name: "Пользователи", href: "/admin/users", icon: Users },
  { name: "Настройки", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-muted/40">
      <aside className="w-64 border-r bg-background flex flex-col">
        <div className="p-4 border-b">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600">
              <Car className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold">CarsEkb</div>
              <div className="text-xs text-muted-foreground">Админ-панель</div>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t">
          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <LogOut className="h-4 w-4" />
              Выйти
            </Button>
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
