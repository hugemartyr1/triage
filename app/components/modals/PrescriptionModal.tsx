"use client";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Toast } from "../ui/Toast";

interface PrescriptionModalProps {
  open: boolean;
  onClose: () => void;
  appointmentId: string | null;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
  open,
  onClose,
  appointmentId,
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
    if (!appointmentId) return;

    setLoading(true);
    try {
      const res = await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId,
          medicine,
          dosage,
          instructions,
        }),
      });

      if (res.ok) {
        setToast({
          message: "Prescription saved successfully!",
          type: "success",
        });
        setMedicine("");
        setDosage("");
        setInstructions("");
        onClose();
      } else {
        setToast({ message: "Failed to save prescription.", type: "error" });
      }
    } catch (error) {
      setToast({ message: "An error occurred.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
                  Add Prescription
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Medicine Name
                    </label>
                    <Input
                      label=""
                      value={medicine}
                      onChange={(e) => setMedicine(e.target.value)}
                      placeholder="e.g., Paracetamol"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dosage
                    </label>
                    <Input
                      label=""
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      placeholder="e.g., 500mg twice a day"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instructions
                    </label>
                    <textarea
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="Any additional notes for the patient"
                      className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {toast && <Toast {...toast} />}
    </>
  );
};
