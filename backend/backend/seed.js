const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'trader@thrivetrading.com' },
    update: {},
    create: {
      email: 'trader@thrivetrading.com',
      name: 'Default Trader',
      role: 'CLIENT',
      tier: 'Retail'
    }
  });
  console.log('SUCCESS: User ready in database:', user);
}

main()
  .catch((e) => console.error('ERROR:', e))
  .finally(async () => await prisma.$disconnect());