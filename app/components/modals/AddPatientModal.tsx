// components/modals/AddPatientModal.tsx
"use client";

import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface AddPatientModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    appointmentDate: string;
    reason: string;
  }) => void;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !appointmentDate) return;
    onSubmit({ name, appointmentDate, reason });
    setName("");
    setAppointmentDate("");
    setReason("");
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
              Add New Patient
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Patient Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Ravi Kumar"
                required
              />

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Appointment Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Reason (optional)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Fever, back pain"
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Save Patient</Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};
