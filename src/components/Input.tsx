import { InputHTMLAttributes } from "react";

export default function Input({
  classNames,
  ...props
}: {
  classNames?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`border border-gray-400 w-12 md:w-full p-1 rounded focus:!border-[1.5px] focus:!border-teal-500 focus:outline-none ${classNames}`}
      {...props}
    />
  );
}
