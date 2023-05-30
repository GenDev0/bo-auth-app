"use client";

import ImageUpload from "@/components/input/Imageupload";
import Input from "@/components/input/Input";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

interface InitalStateProps {
  name?: string;
  imageSrc: string;
  description: string;
}

const initialState: InitalStateProps = {
  name: "",
  imageSrc: "",
  description: "",
};

const Createpost = () => {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await fetch("/api/blogs", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(state),
    })
      .then(() => {
        router.push("/");

        // router.push('/')
      })

      .catch(() => {
        toast.error("Something went wrong!");
      });
    router.refresh();
  };

  const setCustomValue = (id: any, value: any) => {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className='w-[600px] h-[700px] mx-auto py-12'>
      <div>
        <ImageUpload
          value={state.imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>

      <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
        <Input
          placeholder='Blog header'
          id='name'
          type='text'
          value={state.name}
          name='name'
          onChange={handleChange}
        />
        <Input
          big
          placeholder='Blog content or description'
          id='description'
          type='text'
          value={state.description}
          name='description'
          onChange={handleChange}
        />
        <div></div>
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
};

export default Createpost;
