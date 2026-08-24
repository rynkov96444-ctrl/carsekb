"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wrench, TrendingUp, MessageSquare } from "lucide-react"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    services: 0,
    posts: 0,
    reviews: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/services")
      const services = await res.json()
      setStats(prev => ({ ...prev, services: services.length }))
    } catch (error) {
      console.error("Ошибка загрузки статистики:", error)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Дашборд</h1>
        <p className="text-muted-foreground mt-2">Обзор активности на сайте</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Сервисы
            </CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.services}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              Добавлено сервисов
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Статьи
            </CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.posts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              Публикаций в блоге
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Отзывы
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reviews}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              Всего отзывов
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
            <CardDescription>Часто используемые функции</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/services/new" className="block p-3 rounded-md border hover:bg-accent transition-colors">
              <div className="font-medium">Добавить сервис</div>
              <div className="text-sm text-muted-foreground">Детейлинг, СТО, автомойка</div>
            </Link>
            <Link href="/admin/blog/new" className="block p-3 rounded-md border hover:bg-accent transition-colors">
              <div className="font-medium">Написать статью</div>
              <div className="text-sm text-muted-foreground">Создать новую публикацию</div>
            </Link>
            <Link href="/admin/reviews" className="block p-3 rounded-md border hover:bg-accent transition-colors">
              <div className="font-medium">Модерация отзывов</div>
              <div className="text-sm text-muted-foreground">Проверить новые отзывы</div>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Последние действия</CardTitle>
            <CardDescription>Недавние действия на сайте</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wrench className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Добавлен новый сервис</div>
                  <div className="text-sm text-muted-foreground">Только что</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
