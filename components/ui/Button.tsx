import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "destructive";
}

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  const baseStyle = "px-4 py-2 font-semibold rounded-lg transition";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button className={`${baseStyle} ${variantStyles[variant]} ${className}`} {...props} />
  );
};

