"use client";

import { PatientCard } from "../components/PatientCard";

export default function PatientDashboard() {
  const visits = [
    {
      id: "v1",
      name: "John Doe",
      date: "2025-10-01",
      doctor: "Dr. Mehta",
      notes: "Routine checkup",
      prescriptions: ["Paracetamol", "Vitamin D"],
    },
    {
      id: "v2",
      name: "Jane Smith",
      date: "2025-11-01",
      doctor: "Dr. Sharma",
      notes: "Follow-up visit",
      prescriptions: ["Cough Syrup"],
    },
  ];

  const handlePrescribe = (id: string) => {
    console.log("Add prescription for visit:", id);
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
              date: v.date,
              doctor: v.doctor,
              notes: v.notes,
            }}
            onPrescribe={() => handlePrescribe(v.id)}
          />
        ))}
      </div>
    </div>
  );
}
