import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const link = await prisma.affiliateLink.update({
      where: { id },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    if (!link || !link.url) {
      return redirect("/affiliate");
    }

    return redirect(link.url);
  } catch (error) {
    console.error("Resource redirect error:", error);
    return redirect("/affiliate");
  }
}
