import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { prisma } = await import("@/lib/prisma")
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    
    let where = {}
    if (category) {
      where = { category }
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: { createdAt: "desc" }
    })

    const servicesWithParsedImages = services.map(service => ({
      ...service,
      images: JSON.parse(service.images || "[]")
    }))

    return NextResponse.json(servicesWithParsedImages)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Ошибка загрузки сервисов" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prisma } = await import("@/lib/prisma")
    const body = await request.json()
    
    const service = await prisma.service.create({
      data: {
        name: body.name,
        slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: body.description,
        category: body.category,
        address: body.address,
        phone: body.phone,
        website: body.website,
        instagram: body.instagram,
        images: JSON.stringify(body.images || [])
      }
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Ошибка создания сервиса" }, { status: 500 })
  }
}
