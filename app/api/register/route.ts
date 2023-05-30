import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../lib/db";

export const POST = async (req: Request) => {
  const body = await req.json();
  console.log(body);
  const { email, name, password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
};
