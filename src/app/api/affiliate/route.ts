import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const links = await prisma.affiliateLink.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(links);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch affiliate links" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { label, url, description, category, active } = body;

    if (!label || !url) {
      return NextResponse.json({ error: "Label and URL are required" }, { status: 400 });
    }

    const link = await prisma.affiliateLink.create({
      data: {
        label,
        url,
        description,
        category,
        active: active ?? true,
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error("Affiliate creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
