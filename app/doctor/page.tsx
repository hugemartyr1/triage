"use client";

import { AppointmentCard } from "../components/AppointmentCard";
import { PrescriptionModal } from "../components/modals/PrescriptionModal";
import { useState } from "react";

export default function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const appointments = [
    {
      id: "a1",
      patient: "Ravi Kumar",
      datetime: "2025-11-15T10:00",
      reason: "Fever",
    },
    {
      id: "a2",
      patient: "Anita Desai",
      datetime: "2025-11-16T12:30",
      reason: "Back pain",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-teal-700 mb-6">
        Upcoming Appointments
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        {appointments.map((a) => (
          <AppointmentCard
            key={a.id}
            appointment={a}
            onPrescribe={() => {
              setSelectedPatient(a.patient);
              setShowModal(true);
            }}
          />
        ))}
      </div>

      <PrescriptionModal
        open={showModal}
        onClose={() => setShowModal(false)}
        patient={selectedPatient}
        onSubmit={(prescriptions) => {
          console.log("Prescribed:", prescriptions);
          setShowModal(false);
        }}
      />
    </div>
  );
}
