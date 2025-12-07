// // "use client";
// // import React from "react";
// // import { Button } from "./ui/Button";

// // interface PatientCardProps {
// //   patient: { name: string; date: string };
// //   onPrescribe: () => void;
// // }

// // export const PatientCard: React.FC<PatientCardProps> = ({
// //   patient,
// //   onPrescribe,
// // }) => {
// //   return (
// //     <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
// //       <h3 className="font-semibold text-lg text-teal-700">{patient.name}</h3>
// //       <p className="text-sm text-gray-500">{patient.email}</p>
// //       <Button variant="outline" className="mt-3" onClick={onPrescribe}>
// //         Add Prescription
// //       </Button>
// //     </div>
// //   );
// // };

// "use client";
// import React from "react";
// import { Button } from "./ui/Button";

// interface PatientCardProps {
//   patient: {
//     id: string;
//     name: string;
//     date: string;
//     doctor?: string;
//     notes?: string;
//   };
//   onPrescribe: () => void;
// }

// export const PatientCard: React.FC<PatientCardProps> = ({
//   patient,
//   onPrescribe,
// }) => {
//   return (
//     <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
//       <h3 className="font-semibold text-lg text-teal-700">{patient.name}</h3>
//       <p className="text-sm text-gray-500">Visit Date: {patient.date}</p>

//       {patient.doctor && (
//         <p className="text-sm text-gray-500">Doctor: {patient.doctor}</p>
//       )}
//       {patient.notes && (
//         <p className="text-xs text-gray-400 italic">{patient.notes}</p>
//       )}

//       <Button variant="outline" className="mt-3" onClick={onPrescribe}>
//         Add Prescription
//       </Button>
//     </div>
//   );
// };

"use client";

import { Button } from "@/components/ui/button";
import { ClipboardPlus, FileText } from "lucide-react";

interface PatientCardProps {
  patient: {
    id: string;
    name?: string;
    appointmentDate?: string;
    reason?: string;
  };
  onViewHistory: () => void;
  onPrescribe: () => void;
}

export const PatientCard = ({
  patient,
  onViewHistory,
  onPrescribe,
}: PatientCardProps) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-900">
        {patient.name || patient.id}
      </h3>

      {patient.appointmentDate && (
        <p className="text-sm text-gray-600 mt-1">
          Next Visit:{" "}
          <strong>{new Date(patient.appointmentDate).toLocaleString()}</strong>
        </p>
      )}

      {patient.reason && (
        <p className="text-xs text-gray-500 mt-1">Reason: {patient.reason}</p>
      )}

      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1" onClick={onViewHistory}>
          <FileText className="w-4 h-4 mr-2" /> History
        </Button>

        <Button
          className="bg-teal-600 hover:bg-teal-700 flex-1 text-white"
          onClick={onPrescribe}
        >
          <ClipboardPlus className="w-4 h-4 mr-2" /> Prescribe
        </Button>
      </div>
    </div>
  );
};
