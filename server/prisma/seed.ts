import argon2 from 'argon2'
import dotenv from 'dotenv'

import { PrismaClient } from '../generated/prisma'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    throw new Error('Password is required to create a user.')
  }

  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password:  await argon2.hash(adminPassword),
      isAdmin: true
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
