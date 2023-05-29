"use client";

interface InputProps {
  type: any;
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  textarea?: boolean;
  id: string;
  placeholder?: string;
  big?: boolean;
}

type Props = {};

const Input = ({
  type,
  value,
  onChange,
  name,
  textarea,
  id,
  placeholder,
  big,
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      placeholder={placeholder}
      className={`w-full p-4 pt-6 font-light bg-white border-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-black ${
        textarea ? "w-700px h-500px" : "w-full"
      } ${big ? "w-[400px] pb-[6rem]" : ""}`}
    />
  );
};

export default Input;
