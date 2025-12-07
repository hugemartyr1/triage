// "use client";
// import React from "react";
// import { Button } from "./ui/Button";

// interface PatientCardProps {
//   patient: { name: string; date: string };
//   onPrescribe: () => void;
// }

// export const PatientCard: React.FC<PatientCardProps> = ({
//   patient,
//   onPrescribe,
// }) => {
//   return (
//     <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
//       <h3 className="font-semibold text-lg text-teal-700">{patient.name}</h3>
//       <p className="text-sm text-gray-500">{patient.email}</p>
//       <Button variant="outline" className="mt-3" onClick={onPrescribe}>
//         Add Prescription
//       </Button>
//     </div>
//   );
// };

"use client";
import React from "react";
import { Button } from "./ui/Button";

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    date: string;
    doctor?: string;
    notes?: string;
  };
  onPrescribe: () => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onPrescribe,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-lg text-teal-700">{patient.name}</h3>
      <p className="text-sm text-gray-500">Visit Date: {patient.date}</p>

      {patient.doctor && (
        <p className="text-sm text-gray-500">Doctor: {patient.doctor}</p>
      )}
      {patient.notes && (
        <p className="text-xs text-gray-400 italic">{patient.notes}</p>
      )}

      <Button variant="outline" className="mt-3" onClick={onPrescribe}>
        Add Prescription
      </Button>
    </div>
  );
};
