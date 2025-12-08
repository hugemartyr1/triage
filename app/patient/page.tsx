// "use client";

// import { PatientCard } from "../components/PatientCard";

// export default function PatientDashboard() {
//   const visits = [
//     {
//       id: "v1",
//       name: "John Doe",
//       date: "2025-10-01",
//       doctor: "Dr. Mehta",
//       notes: "Routine checkup",
//       prescriptions: ["Paracetamol", "Vitamin D"],
//     },
//     {
//       id: "v2",
//       name: "Jane Smith",
//       date: "2025-11-01",
//       doctor: "Dr. Sharma",
//       notes: "Follow-up visit",
//       prescriptions: ["Cough Syrup"],
//     },
//   ];

//   const handlePrescribe = (id: string) => {
//     console.log("Add prescription for visit:", id);
//     // Add navigation or modal here
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold text-teal-700 mb-6">
//         Your Medical Visits
//       </h1>

//       <div className="grid gap-4 md:grid-cols-2">
//         {visits.map((v) => (
//           <PatientCard
//             key={v.id}
//             patient={{
//               id: v.id,
//               name: v.name,
//               date: v.date,
//               doctor: v.doctor,
//               notes: v.notes,
//             }}
//             onPrescribe={() => handlePrescribe(v.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { PatientCard } from "../components/PatientCard";

export default function PatientDashboard() {
  const visits = [
    {
      id: "v1",
      name: "John Doe",
      // FIX: The property here must be renamed to match the PatientCard component's prop name
      appointmentDate: "2025-10-01T10:00:00", // Added time for accurate toLocaleString()
      reason: "Routine checkup",
      // The rest of these properties are not used by PatientCard and can be ignored when mapping props
      doctor: "Dr. Mehta",
      notes: "Routine checkup notes",
      prescriptions: ["Paracetamol", "Vitamin D"],
    },
    {
      id: "v2",
      name: "Jane Smith",
      appointmentDate: "2025-11-01T14:30:00",
      reason: "Follow-up visit",
      doctor: "Dr. Sharma",
      notes: "Follow-up visit notes",
      prescriptions: ["Cough Syrup"],
    },
  ];

  const handlePrescribe = (id: string) => {
    console.log("Add prescription for visit:", id);
    // Add navigation or modal here
  };

  // FIX: Added placeholder functions required by PatientCard, as they are not optional.
  const handleViewHistory = (id: string) => {
    console.log("View history for visit:", id);
    // Add navigation or modal here
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-teal-700 mb-6">
        Your Medical Visits
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        {visits.map((v) => (
          <PatientCard
            key={v.id}
            patient={{
              id: v.id,
              name: v.name,
              // FIX 1: Changed 'date' to 'appointmentDate' to match the PatientCard interface.
              appointmentDate: v.appointmentDate,
              // FIX 2: Used 'reason' which is defined in the PatientCard interface.
              reason: v.reason,
              // Removed extra properties (doctor, notes) that PatientCard doesn't expect.
            }}
            // FIX 3: Added the required 'onViewHistory' prop.
            onViewHistory={() => handleViewHistory(v.id)}
            onPrescribe={() => handlePrescribe(v.id)}
          />
        ))}
      </div>
    </div>
  );
}
