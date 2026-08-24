import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id }
    })

    if (!service) {
      return NextResponse.json({ error: "Сервис не найден" }, { status: 404 })
    }

    const serviceWithParsedImages = {
      ...service,
      images: JSON.parse(service.images || "[]")
    }

    return NextResponse.json(serviceWithParsedImages)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Ошибка загрузки сервиса" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const service = await prisma.service.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        address: body.address,
        phone: body.phone,
        website: body.website,
        instagram: body.instagram,
        images: JSON.stringify(body.images || [])
      }
    })

    const serviceWithParsedImages = {
      ...service,
      images: JSON.parse(service.images || "[]")
    }

    return NextResponse.json(serviceWithParsedImages)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Ошибка обновления сервиса" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.service.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Ошибка удаления сервиса" }, { status: 500 })
  }
}
