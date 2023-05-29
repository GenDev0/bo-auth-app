"use client";
import Input from "@/components/Input/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Props = {};

interface initialStateProps {
  name: string;
  email: string;
  password: string;
}

const initialState: initialStateProps = {
  name: "",
  email: "",
  password: "",
};

const Register = (props: Props) => {
  const [state, setState] = useState(initialState);
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(state),
    })
      .then(() => {
        router.refresh();
      })
      .then(() => {
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };
  return (
    <form className='text-center' onSubmit={handleSubmit}>
      <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
        <Input
          placeholder='Name'
          type={"text"}
          value={state.name}
          name={"name"}
          id={"name"}
          onChange={handleChange}
        />
        <Input
          placeholder='Email'
          type={"email"}
          value={state.email}
          name={"email"}
          id={"email"}
          onChange={handleChange}
        />
        <Input
          placeholder='Password'
          type={"password"}
          value={state.password}
          name={"password"}
          id={"password"}
          onChange={handleChange}
        />
        <button type='submit'>Register</button>
      </div>
      <div>
        <div>
          <span>Do you have an account ?</span>{" "}
          <Link href={"/login"}>Sign In</Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
