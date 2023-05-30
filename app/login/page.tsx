"use client";
import Input from "@/components/input/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";

type Props = {};

interface initialStateProps {
  email: string;
  password: string;
}

const initialState: initialStateProps = {
  email: "",
  password: "",
};

const Login = (props: Props) => {
  const [state, setState] = useState(initialState);
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn("credentials", {
      ...state,
      redirect: false,
    }).then((callback) => {
      try {
        if (callback?.error) {
          throw Error("Wrong Credentials!");
        }

        if (callback?.ok) {
          router.refresh();
          router.push("/");
        }
      } catch (error) {
        console.log("errrrrrr", error);
      }
    });
  };
  return (
    <form className='text-center' onSubmit={handleSubmit}>
      <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
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
        <button type='submit'>Sign In</button>
      </div>
      <div>
        <div>
          <span>You don't have an account ?</span>{" "}
          <Link href={"/register"}>Register</Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
