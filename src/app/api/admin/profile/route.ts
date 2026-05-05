import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let admin = await prisma.admin.findFirst();
    
    // Seed default admin if not exists
    if (!admin) {
      admin = await prisma.admin.create({
        data: {
          name: "Ilham Faturahman",
          email: "ilhamfrr12@gmail.com",
          password: "admin123",
        }
      });
    }

    // Exclude password from the response
    const { password: _, ...adminData } = admin;
    return NextResponse.json(adminData);
  } catch (error) {
    console.error("GET /api/admin/profile error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, avatar } = body;

    let admin = await prisma.admin.findFirst();
    
    // If for some reason admin doesn't exist, create one instead of failing
    if (!admin) {
      admin = await prisma.admin.create({
        data: {
          name: name || "Ilham Faturahman",
          email: email || "ilhamfrr12@gmail.com",
          password: password || "admin123",
          avatar: avatar || null
        }
      });
      const { password: _, ...finalAdmin } = admin;
      return NextResponse.json(finalAdmin);
    }

    const updateData: any = { 
      name: name || admin.name, 
      email: email || admin.email, 
      avatar: avatar || admin.avatar 
    };

    if (password && password.trim() !== "") {
      updateData.password = password;
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: admin.id },
      data: updateData,
    });

    const { password: _, ...finalAdmin } = updatedAdmin;
    return NextResponse.json(finalAdmin);
  } catch (error) {
    console.error("PATCH /api/admin/profile error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
