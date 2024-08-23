import { InputHTMLAttributes } from "react";

export default function Input({
  classNames,
  ...props
}: {
  classNames?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`border border-gray-400 w-14 md:w-full p-1 rounded-md text-teal-600 font-semibold px-3 py-1 disabled:text-opacity-60 ${classNames}`}
      {...props}
    />
  );
}
