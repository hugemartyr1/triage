"use client";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-4">
      <h1 className="text-2xl font-semibold text-teal-700">Sunrise Clinic</h1>
      <nav className="space-x-4 text-gray-700">
        <a href="/" className="hover:text-teal-600">
          Home
        </a>
        <a href="/auth/login" className="hover:text-teal-600">
          Login
        </a>
        <a href="/auth/register" className="hover:text-teal-600">
          Register
        </a>
      </nav>
    </header>
  );
};
