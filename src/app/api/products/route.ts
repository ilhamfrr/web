import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, fileUrl, imageUrl, published } = body;

    if (!name || price === undefined) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug: slugify(name),
        description,
        price: parseFloat(price.toString()),
        fileUrl,
        imageUrl,
        published: published ?? false,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error("Product creation error:", error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "A product with this name already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
