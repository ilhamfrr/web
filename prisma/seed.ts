import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Posts
  await prisma.post.upsert({
    where: { slug: "getting-started-with-nextjs" },
    update: {},
    create: {
      title: "Getting Started with Next.js 15",
      slug: "getting-started-with-nextjs",
      excerpt: "Learn how to build modern web applications with the latest Next.js features.",
      content: "Next.js is a powerful framework for building React applications. In this post, we will explore the App Router, Server Components, and more...",
      category: "Development",
      published: true,
    },
  });

  await prisma.post.upsert({
    where: { slug: "the-power-of-prisma" },
    update: {},
    create: {
      title: "The Power of Prisma ORM",
      slug: "the-power-of-prisma",
      excerpt: "Why Prisma is the best choice for your next TypeScript project.",
      content: "Prisma makes it incredibly easy to interact with your database. With its type-safe client, you can avoid many common bugs...",
      category: "Database",
      published: true,
    },
  });

  // Create Products
  await prisma.product.upsert({
    where: { slug: "nextjs-saas-starter" },
    update: {},
    create: {
      name: "Next.js SaaS Starter Kit",
      slug: "nextjs-saas-starter",
      description: "A complete starter kit for building your next SaaS with Next.js, Tailwind, and Prisma.",
      price: 49.00,
      published: true,
    },
  });

  // Create Affiliate Links
  await prisma.affiliateLink.create({
    data: {
      label: "Bluehost Hosting",
      url: "https://www.bluehost.com/track/ilhamfrr",
      description: "The best hosting for WordPress and small websites.",
      category: "Hosting",
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
