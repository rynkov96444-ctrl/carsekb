import Link from "next/link"
import { Car, Mail, MapPin, Phone } from "lucide-react"

const footerLinks = {
  services: {
    title: "Сервисы",
    links: [
      { name: "Детейлинг", href: "/services?category=detailing" },
      { name: "Малярные станции", href: "/services?category=paint" },
      { name: "Автомойки", href: "/services?category=carwash" },
      { name: "Шиномонтаж", href: "/services?category=tire" },
      { name: "СТО", href: "/services?category=repair" },
    ],
  },
  company: {
    title: "Компания",
    links: [
      { name: "О нас", href: "/about" },
      { name: "Блог", href: "/blog" },
      { name: "Контакты", href: "/contacts" },
      { name: "Реклама", href: "/advertising" },
    ],
  },
  help: {
    title: "Помощь",
    links: [
      { name: "FAQ", href: "/faq" },
      { name: "Добавить сервис", href: "/services/add" },
      { name: "Политика конфиденциальности", href: "/privacy" },
      { name: "Условия использования", href: "/terms" },
    ],
  },
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">CarsEkb</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Автомобильный портал Екатеринбурга. Всё для автолюбителей в одном месте.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Екатеринбург</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@carsekb.ru</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">{footerLinks.services.title}</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.services.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">{footerLinks.company.title}</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">{footerLinks.help.title}</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.help.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 CarsEkb. Все права защищены.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://t.me/carsekb"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Telegram
              </Link>
              <Link
                href="https://vk.com/carsekb"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ВКонтакте
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
