// // app/api/prescriptions/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/firebase";
// import { doc, setDoc, arrayUnion, serverTimestamp } from "firebase/firestore";

// export async function POST(req: NextRequest) {
//   try {
//     const {
//       doctorId,
//       patient,
//       medicine,
//       dosage,
//       instructions,
//       appointmentDate,
//     } = await req.json();

//     if (!doctorId || !patient || !medicine || !dosage) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const patientRef = doc(db, "doctors", doctorId, "patients", patient);

//     await setDoc(
//       patientRef,
//       {
//         // we keep latest appointment date here; can be expanded later
//         appointmentDate: appointmentDate || new Date().toISOString(),
//         prescriptions: arrayUnion({
//           medicine,
//           dosage,
//           instructions: instructions || "",
//           datePrescribed: serverTimestamp(),
//         }),
//       },
//       { merge: true }
//     );

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error saving prescription:", error);
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// app/api/prescriptions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, arrayUnion, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const {
      doctorId,
      patient,
      medicine,
      dosage,
      instructions,
      appointmentDate,
    } = await req.json();

    if (!doctorId || !patient || !medicine || !dosage) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const patientRef = doc(db, "doctors", doctorId, "patients", patient);

    // 1. Prepare the prescription object without serverTimestamp()
    const newPrescription = {
      medicine,
      dosage,
      instructions: instructions || "",
      // 🔥 FIX: Use the client-side date for the array element
      // NOTE: For better fidelity, you could use a subcollection instead (best practice)
      datePrescribed: new Date().toISOString(),
    };

    await setDoc(
      patientRef,
      {
        // Update the appointment date
        appointmentDate: appointmentDate || new Date().toISOString(),

        // 2. Use arrayUnion to safely add the prescription object
        prescriptions: arrayUnion(newPrescription),

        // 3. ✅ FIX: Use serverTimestamp() on a TOP-LEVEL FIELD
        lastPrescribed: serverTimestamp(),
      },
      { merge: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving prescription:", error);
    // You might also be hitting a PERMISSION_DENIED error (as seen before).
    // Ensure your Firestore rules allow 'write' access for this API route.
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
