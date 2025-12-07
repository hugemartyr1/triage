// "use client";
// import React from "react";
// import { Button } from "./ui/Button";

// interface AppointmentCardProps {
//   appointment: {
//     patient: string;
//     datetime: string;
//     reason?: string;
//   };
//   onPrescribe: () => void;
//   onClickHistory: () => void;
// }

// export const AppointmentCard: React.FC<AppointmentCardProps> = ({
//   appointment,
//   onPrescribe,
// }) => {
//   const { patient, datetime, reason } = appointment;

//   return (
//     <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between transition-all hover:shadow-lg">
//       <div className="space-y-2">
//         <div className="flex justify-between items-start">
//           <h3 className="text-lg font-semibold text-gray-800">{patient}</h3>
//           <span className="text-sm text-teal-600 font-medium">
//             {new Date(datetime).toLocaleString()}
//           </span>
//         </div>
//         {reason && (
//           <p className="text-sm text-gray-600">
//             <span className="font-medium text-gray-700">Reason:</span> {reason}
//           </p>
//         )}
//       </div>

//       <div className="pt-4 flex justify-end">
//         <Button
//           variant="primary"
//           onClick={(e) => {
//             e.stopPropagation(); // prevent opening history modal
//             onPrescribe();
//           }}
//         >
//           Prescribe
//         </Button>
//       </div>
//     </div>
//   );
// };

"use client";

interface AppointmentCardProps {
  appointment: any;
  onPrescribe: () => void;
  onClickHistory: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onPrescribe,
  onClickHistory,
}) => {
  return (
    <div
      onClick={onClickHistory}
      className="cursor-pointer bg-white rounded-xl p-5 shadow hover:shadow-lg transition"
    >
      <h3 className="font-semibold text-gray-800">{appointment.patient}</h3>
      <p className="text-xs text-teal-600">
        {new Date(appointment.datetime).toLocaleString()}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrescribe();
        }}
        className="mt-3 bg-teal-600 text-white px-3 py-1 rounded"
      >
        Prescribe
      </button>
    </div>
  );
};
