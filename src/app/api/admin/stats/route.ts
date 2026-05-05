import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [postCount, productCount, affiliateCount, totalClicks] = await Promise.all([
      prisma.post.count(),
      prisma.product.count(),
      prisma.affiliateLink.count(),
      prisma.affiliateLink.aggregate({ _sum: { clicks: true } }),
    ]);

    return NextResponse.json({
      postCount,
      productCount,
      affiliateCount,
      totalClicks: totalClicks._sum.clicks || 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
