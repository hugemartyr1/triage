// app/api/patients/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { doctorId, name, appointmentDate, reason } = await req.json();

    if (!doctorId || !name || !appointmentDate) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Use patient name as ID for simplicity (can change to UUID later)
    const patientRef = doc(db, "doctors", doctorId, "patients", name);

    await setDoc(
      patientRef,
      {
        name,
        appointmentDate,
        reason: reason || "",
      },
      { merge: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding patient:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
