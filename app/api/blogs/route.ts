import { NextResponse } from "next/server";

import prisma from "../../lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const body = await request.json();
  const { name, description, imageSrc } = body;

  //   Object.keys(body).forEach((value: any) => {
  //     if (!body[value]) {
  //       NextResponse.error();
  //     }
  //   });

  const blog = await prisma.blog.create({
    data: {
      name,
      imageSrc,
      description,
      userId: currentUser.id,
      //   userId: currentUser.id
    },
  });

  return NextResponse.json(blog);
}
