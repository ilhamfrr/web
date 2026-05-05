import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const adminCount = await prisma.admin.count();
    console.log("Admin count:", adminCount);
    const admins = await prisma.admin.findMany();
    console.log("Admins:", JSON.stringify(admins, null, 2));
  } catch (error) {
    console.error("Error checking admin table:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
