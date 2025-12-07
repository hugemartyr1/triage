// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "@/lib/firebase";
// import { AppointmentCard } from "../components/AppointmentCard";
// import { PrescriptionModal } from "../components/modals/PrescriptionModal";
// import { AddPatientModal } from "../components/modals/AddPatientModal";
// import { collection, onSnapshot } from "firebase/firestore";
// import { PatientHistoryModal } from "../components/modals/PatientHistoryModal";

// // --- SHADCN UI PLACEHOLDERS (Assuming these are available) ---
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Plus } from "lucide-react";
// // -----------------------------------------------------------

// const DOCTOR_ID = "IXi4vGpYPUcfvy4EUISb2oR2MFi2";

// export default function DoctorDashboard() {
//   const router = useRouter();
//   const [appointments, setAppointments] = useState<any[]>([]);
//   const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
//   const [showRxModal, setShowRxModal] = useState(false);
//   const [showHistory, setShowHistory] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);

//   // --- FUNCTIONALITY (UNCHANGED) ---
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       // NOTE: DOCTOR_ID check might need refinement based on your auth logic
//       if (!user || user.uid !== DOCTOR_ID) router.replace("/login");
//     });
//     return () => unsub();
//   }, [router]);

//   useEffect(() => {
//     const col = collection(db, "doctors", DOCTOR_ID, "patients");
//     const unsub = onSnapshot(col, (snap) => {
//       setAppointments(
//         snap.docs.map((d) => ({
//           id: d.id,
//           patient: d.id,
//           ...d.data(),
//         }))
//       );
//     });
//     return () => unsub();
//   }, []);
//   // ----------------------------------

//   return (
//     <div className="p-8 md:p-12 space-y-10 bg-gray-50 min-h-screen">
//       {/* 1. Dashboard Header */}
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between pb-4">
//           <h1 className="text-4xl text-teal-800 font-bold tracking-tight">
//             Doctor Dashboard
//           </h1>

//           {/* Add Patient Button (ShadCN Button Style) */}
//           <Button
//             className="bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-md px-6 py-2"
//             onClick={() => setShowAddModal(true)}
//           >
//             <Plus className="w-5 h-5 mr-2" /> Add Patient
//           </Button>
//         </div>
//         <Separator className="bg-teal-100" />
//       </div>

//       {/* 2. Appointments Grid */}
//       <div className="max-w-7xl mx-auto space-y-6">
//         <h2 className="text-2xl text-gray-700 font-semibold border-l-4 border-teal-500 pl-3">
//           Upcoming Appointments
//         </h2>

//         {appointments.length === 0 ? (
//           <p className="text-gray-500 italic">
//             No appointments scheduled today.
//           </p>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {appointments.map((a) => (
//               <AppointmentCard
//                 key={a.id}
//                 appointment={a}
//                 // Functionality remains the same
//                 onPrescribe={() => {
//                   setSelectedPatient(a.patient);
//                   setShowRxModal(true);
//                 }}
//                 onClickHistory={() => {
//                   setSelectedPatient(a.patient);
//                   setShowHistory(true);
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* 3. Modals (Functionality preserved) */}

//       {/* History modal */}
//       <PatientHistoryModal
//         open={showHistory}
//         onClose={() => setShowHistory(false)}
//         doctorId={DOCTOR_ID}
//         patientId={selectedPatient}
//       />

//       {/* Prescription Modal */}
//       <PrescriptionModal
//         open={showRxModal}
//         onClose={() => setShowRxModal(false)}
//         patient={selectedPatient}
//         onSubmit={async (p) => {
//           await fetch("/api/prescriptions", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ doctorId: DOCTOR_ID, ...p }),
//           });
//           setShowRxModal(false);
//         }}
//       />

//       {/* Add patient */}
//       <AddPatientModal
//         open={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onSubmit={async (d) => {
//           await fetch("/api/patients", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ doctorId: DOCTOR_ID, ...d }),
//           });
//           setShowAddModal(false);
//         }}
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { PatientCard } from "../components/PatientCard";
import { PrescriptionModal } from "../components/modals/PrescriptionModal";
import { AddPatientModal } from "../components/modals/AddPatientModal";
import { PatientHistoryModal } from "../components/modals/PatientHistoryModal";
import { collection, onSnapshot } from "firebase/firestore";

// UI imports
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

const DOCTOR_ID = "IXi4vGpYPUcfvy4EUISb2oR2MFi2";

export default function DoctorDashboard() {
  const router = useRouter();
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const [showRxModal, setShowRxModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Ensure only doctor can see this dashboard
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user || user.uid !== DOCTOR_ID) router.replace("/login");
    });
    return () => unsub();
  }, [router]);

  // Fetch patients from Firestore in realtime
  useEffect(() => {
    const col = collection(db, "doctors", DOCTOR_ID, "patients");
    const unsub = onSnapshot(col, (snap) => {
      setPatients(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-8 md:p-12 space-y-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-4xl text-teal-800 font-bold">Doctor Dashboard</h1>

          <Button
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 shadow"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-5 h-5 mr-2" /> Add Patient
          </Button>
        </div>
        <Separator className="bg-teal-200" />
      </div>

      {/* Patients Grid */}
      <div className="max-w-7xl mx-auto space-y-6">
        <h2 className="text-2xl text-gray-700 font-semibold border-l-4 border-teal-500 pl-3">
          Patient Records
        </h2>

        {patients.length === 0 ? (
          <p className="text-gray-500 italic">No patients available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {patients.map((p) => (
              <PatientCard
                key={p.id}
                patient={p}
                onViewHistory={() => {
                  setSelectedPatient(p.id);
                  setShowHistoryModal(true);
                }}
                onPrescribe={() => {
                  setSelectedPatient(p.id);
                  setShowRxModal(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <PatientHistoryModal
        open={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        doctorId={DOCTOR_ID}
        patientId={selectedPatient}
      />

      <PrescriptionModal
        open={showRxModal}
        onClose={() => setShowRxModal(false)}
        patient={selectedPatient}
        onSubmit={async (data) => {
          console.log("Save prescription:", data);
          setShowRxModal(false);
        }}
      />

      <AddPatientModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={(d) => {
          console.log("Add Patient:", d);
          setShowAddModal(false);
        }}
      />
    </div>
  );
}
