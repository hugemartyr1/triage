"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500",
    outline:
      "border border-teal-600 text-teal-700 hover:bg-teal-50 focus:ring-teal-400",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
  };
  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};
