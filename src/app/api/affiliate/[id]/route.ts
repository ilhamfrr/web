import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const link = await prisma.affiliateLink.findUnique({ where: { id } });
    if (!link) return NextResponse.json({ error: "Link not found" }, { status: 404 });
    return NextResponse.json(link);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { label, url, description, category, active } = body;

    const link = await prisma.affiliateLink.update({
      where: { id },
      data: {
        label,
        url,
        description,
        category,
        active,
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error("Affiliate update error:", error);
    return NextResponse.json({ error: "Failed to update link" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.affiliateLink.delete({ where: { id } });
    return NextResponse.json({ message: "Link deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete link" }, { status: 500 });
  }
}
