import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@carsekb.ru'
  const password = 'admin123' // Измените после первого входа!
  
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })
  
  if (existingUser) {
    console.log('Админ уже существует')
    return
  }
  
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const user = await prisma.user.create({
    data: {
      email,
      name: "Администратор",
      passwordHash: hashedPassword,
      role: "ADMIN"
    }
  })
  
  console.log('✅ Админ создан!')
  console.log('Email:', email)
  console.log('Пароль:', password)
  console.log('\n⚠️  ВАЖНО: Измените пароль после первого входа!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
