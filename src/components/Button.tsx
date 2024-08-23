import { ReactNode, ButtonHTMLAttributes } from "react";

export default function Button({
  classNames,
  children,
  ...props
}: {
  classNames?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`border border-gray-400 rounded-md text-teal-600 font-semibold px-3 py-1 w-fit disabled:text-opacity-60 ${classNames}`}
      {...props}
    >
      {children}
    </button>
  );
}
