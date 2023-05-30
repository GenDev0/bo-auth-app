"use client";

import Image from "next/image";
import { SafeListing, SafeUser } from "@/types/type";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsFillPencilFill } from "react-icons/bs";
import { Blog } from "@prisma/client";

interface BlogProps {
  key: string;
  data: Blog;
  currentUser?: SafeUser | null;
}

export default function SingleBlog({ key, data, currentUser }: BlogProps) {
  const router = useRouter();

  return (
    <div className='w-full md:w-[1100px] border-2 p-4'>
      <div className=''>
        <div className='flex gap-2 justify-between items-center'>
          <Image
            width={150}
            className='w-1/3 md:w-[500px] object-contain'
            height={150}
            src={data.imageSrc!}
            alt='Blog Image'
          />

          <div className='w-2/3 md:w-[530px] flex flex-col gap-4 leading-[1.5]'>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
          </div>
        </div>
      </div>

      {data.userId === currentUser?.id && (
        <div className='flex items-center gap-4 mt-4'>
          <RiDeleteBin5Line
            onClick={() => console.log("delete")}
            className=' cursor-pointer text-[1.5rem]'
          />
          <BsFillPencilFill
            onClick={() => console.log("edit")}
            className=' cursor-pointer text-[1.2rem]'
          />
          {/* <button className="bg-red-400 px-6 py-2" onClick={onDelete}>Delete</button> */}
          {/* <button className="bg-yellow-400 px-6 py-2" onClick={() => router.push(`/blogs/${data.id}`)}>Edit</button> */}
        </div>
      )}
    </div>
  );
}
