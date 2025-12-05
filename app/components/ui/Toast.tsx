"use client";
import React from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
}

export const Toast: React.FC<ToastProps> = ({ message, type = "success" }) => {
  const colors = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  };
  return (
    <div
      className={`fixed bottom-5 right-5 border px-4 py-2 rounded-lg shadow ${colors[type]}`}
    >
      {message}
    </div>
  );
};
