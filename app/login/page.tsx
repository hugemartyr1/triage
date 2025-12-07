"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { LogIn, Lock, Mail } from "lucide-react"; // Using Lucide icons

// --- SHADCN UI PLACEHOLDERS (Assuming these are available) ---
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// -----------------------------------------------------------

const DOCTOR_ID = "IXi4vGpYPUcfvy4EUISb2oR2MFi2";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // --- FUNCTIONALITY (UNCHANGED) ---

  // If already logged in as doctor, redirect
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && user.uid === DOCTOR_ID) {
        router.replace("/doctor");
      }
    });
    return () => unsub();
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (cred.user.uid !== DOCTOR_ID) {
        setError("You are not authorized as the clinic doctor.");
        // Optional: sign out if some other user logs in
        // await auth.signOut();
        setLoading(false);
        return;
      }
      router.replace("/doctor");
    } catch (err: any) {
      console.error(err);
      setError("Invalid credentials or login failed.");
      setLoading(false);
    }
  };
  // ----------------------------------

  return (
    // Updated background and layout for a clean, centered look
    <div className="min-h-screen flex items-center justify-center bg-teal-50 p-4">
      {/* Login Card (ShadCN style) */}
      <Card className="w-full max-w-md bg-white rounded-xl shadow-2xl border-t-8 border-teal-600">
        <CardHeader className="text-center space-y-2 pt-8 pb-4">
          <div className="flex justify-center mb-2">
            <LogIn className="w-8 h-8 text-teal-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-teal-800">
            Doctor Login
          </CardTitle>
          <p className="text-sm text-gray-500">
            Access the CarePoint Dashboard
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  className="pl-10 h-10 border-gray-300 focus:border-teal-500"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@clinic.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  className="pl-10 h-10 border-gray-300 focus:border-teal-500"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-700 bg-red-100 rounded-lg px-4 py-3 border border-red-200">
                {error}
              </p>
            )}

            {/* Submit Button (ShadCN Button) */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white font-semibold py-2 text-base hover:bg-teal-700 disabled:opacity-50 h-11"
            >
              {loading ? "Signing in..." : "Login as Doctor"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
