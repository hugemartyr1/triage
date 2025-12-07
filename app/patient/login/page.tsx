// "use client";

// import { useRouter } from "next/navigation";
// import { auth } from "@/lib/firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useState } from "react";

// export default function PatientLoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e: any) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push("/patient/dashboard");
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-6 rounded-xl shadow space-y-4 w-full max-w-sm"
//       >
//         <h2 className="text-xl font-bold text-teal-700">Patient Login</h2>

//         <input
//           className="border p-2 w-full rounded"
//           type="email"
//           placeholder="yourname@carepoint.app"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           className="border p-2 w-full rounded"
//           type="password"
//           placeholder="*******"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button className="bg-teal-600 text-white w-full py-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { PatientCard } from "@/components/PatientCard";

export default function PatientDashboard() {
  const [record, setRecord] = useState<any | null>(null);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const patientsRef = collection(
      db,
      "doctors",
      "IXi4vGpYPUcfvy4EUISb2oR2MFi2",
      "patients"
    );
    const q = query(patientsRef, where("authUID", "==", uid));

    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) setRecord(snap.docs[0].data());
    });

    return () => unsub();
  }, []);

  if (!record) return <p className="p-6">Loading patient data...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-teal-700 mb-4">
        Welcome, {record.name}
      </h1>

      {/* Show Patient Info */}
      <div className="bg-white p-4 shadow rounded mb-4">
        <p>
          <strong>Next Visit:</strong>{" "}
          {new Date(record.appointmentDate).toLocaleString()}
        </p>
        {record.reason && (
          <p>
            <strong>Reason:</strong> {record.reason}
          </p>
        )}
      </div>

      {/* Show Prescriptions */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Your Prescriptions</h2>
        {record.prescriptions?.length ? (
          <ul className="space-y-2">
            {record.prescriptions.map((p: any, i: number) => (
              <li key={i} className="bg-gray-50 p-3 rounded shadow-sm">
                <strong>{p.medicine}</strong> — {p.dosage}
              </li>
            ))}
          </ul>
        ) : (
          <p>No prescriptions yet.</p>
        )}
      </div>
    </div>
  );
}
