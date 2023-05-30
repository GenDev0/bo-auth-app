import prisma from "../lib/db";

export default async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // const safeBlogs = blogs.map((blog) => ({
    //   ...blogs,
    //   createdAt: blog.createdAt.toISOString(),
    // }));

    return blogs;
  } catch (error: any) {
    throw new Error(error);
  }
}
