"use client";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Toast } from "../ui/Toast";

interface PrescriptionModalProps {
  open: boolean;
  onClose: () => void;
  patient: string | null;
  onSubmit: (data: {
    medicine: string;
    dosage: string;
    instructions: string;
    patient: string | null;
  }) => void;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
  open,
  onClose,
  patient,
  onSubmit,
}) => {
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [instructions, setInstructions] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;

    setLoading(true);

    try {
      onSubmit({ medicine, dosage, instructions, patient });

      setToast({ message: "Prescription saved!", type: "success" });
      setMedicine("");
      setDosage("");
      setInstructions("");
      onClose();
    } catch {
      setToast({ message: "Failed to save prescription.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
                Add Prescription
              </Dialog.Title>

              {patient && (
                <p className="text-sm text-gray-600 mb-3">
                  Patient: <strong>{patient}</strong>
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Medicine Name"
                  value={medicine}
                  onChange={(e) => setMedicine(e.target.value)}
                  placeholder="e.g., Paracetamol"
                  required
                />

                <Input
                  label="Dosage"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g., 500mg twice a day"
                  required
                />

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Instructions
                  </label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Any additional notes"
                    className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-teal-500"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {toast && <Toast {...toast} />}
    </>
  );
};
