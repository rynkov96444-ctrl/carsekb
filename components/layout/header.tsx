"use client"

import Link from "next/link"
import { useState } from "react"
import { Car, Menu, Search, User, Wrench, Globe, Camera, BookOpen, Package, Building2, CheckCircle, FileText, Truck, ShoppingCart, Droplet, Key, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const mainNavigation = [
  { name: "Сервисы", href: "/services", icon: Wrench },
  { name: "Привоз авто", href: "/import", icon: Globe },
  { name: "Автосалоны", href: "/dealers", icon: Building2 },
  { name: "Купля-продажа", href: "/marketplace", icon: ShoppingCart },
  { name: "Car Spotting", href: "/spotting", icon: Camera },
  { name: "Блог", href: "/blog", icon: BookOpen },
]

const moreNavigation = [
  { name: "Автозапчасти", href: "/parts", icon: Package },
  { name: "Проверка авто", href: "/check", icon: CheckCircle },
  { name: "Документы", href: "/documents", icon: FileText },
  { name: "Прицепы", href: "/trailers", icon: Truck },
  { name: "Китайские авто", href: "/chinese-cars", icon: Car },
  { name: "Подбор масла", href: "/oil", icon: Droplet },
  { name: "Аренда", href: "/rental", icon: Key },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 shadow-sm">
            <Car className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">CarsEkb</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 flex-1">
          {mainNavigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
          
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground"
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            >
              Ещё
              <ChevronDown className={`h-4 w-4 transition-transform ${moreMenuOpen ? "rotate-180" : ""}`} />
            </Button>
            
            {moreMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMoreMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-md border bg-background p-2 shadow-lg">
                  {moreNavigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                        onClick={() => setMoreMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            Войти
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="flex h-16 items-center justify-between border-b px-4">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">CarsEkb</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="p-4 space-y-1">
            {[...mainNavigation, ...moreNavigation].map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            <div className="pt-4 border-t mt-4">
              <Button variant="outline" className="w-full">
                <User className="h-4 w-4 mr-2" />
                Войти
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
