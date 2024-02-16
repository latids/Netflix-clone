import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser)
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
