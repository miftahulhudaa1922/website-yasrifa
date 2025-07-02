import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  await prisma.admin.upsert({
    where: { email: 'admin@pondok.id' },
    update: {},
    create: {
      name: 'Admin Pondok',
      email: 'admin@pondok.id',
      password: hashedPassword,
    },
  })

  console.log('✅ Admin berhasil dibuat')
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
