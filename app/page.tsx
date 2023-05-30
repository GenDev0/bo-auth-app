import Image from "next/image";
import getCurrentuser from "./actions/getCurrentUser";
import getBlogs from "./actions/getBlogs";
import { Blog } from "@prisma/client";
import SingleBlog from "@/components/blog/SingleBlog";

export default async function Home() {
  const currentUser = await getCurrentuser();
  const blogs: Blog[] = await getBlogs();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='flex justify-center items-center text-center font-bold text-blue-500 text-2xl'>
        Ahmed
      </h1>
      {blogs.map((blog) => (
        <SingleBlog key={blog.id} data={blog} />
      ))}
    </main>
  );
}
