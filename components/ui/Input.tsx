import { InputHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className="w-full px-3 py-2 border rounded-lg" />;
};

