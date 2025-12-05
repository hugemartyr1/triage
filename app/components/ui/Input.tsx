"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <label className="block text-sm">
      <span className="text-gray-700 font-medium">{label}</span>
      <input
        {...props}
        className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
      />
    </label>
  );
};
