import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function genRandomPassword(len = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
  return Array.from(
    { length: len },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

export async function POST(req: NextRequest) {
  try {
    const { doctorId, name, appointmentDate, reason } = await req.json();
    if (!doctorId || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert name to email
    const safeName = name.toLowerCase().replace(/\s+/g, ".");
    const email = `${safeName}@carepoint.app`;
    const password = genRandomPassword(10);

    // Create patient auth user
    const user = await createUserWithEmailAndPassword(auth, email, password);

    // Save patient doc
    await setDoc(doc(db, "doctors", doctorId, "patients", name), {
      name,
      appointmentDate,
      reason: reason || "",
      authUID: user.user.uid,
    });

    return NextResponse.json({
      success: true,
      email,
      password,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
