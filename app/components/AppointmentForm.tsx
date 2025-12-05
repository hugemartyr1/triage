"use client";

import React, { useState, Fragment } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { ChevronsUpDown, Check } from "lucide-react"; // Added Check icon for selection
import { Button } from "./ui/Button"; // Assuming this component supports primary/ghost/teal styling
import { Input } from "./ui/Input"; // Assuming this component has basic styling
import { Toast } from "./ui/Toast";

interface Doctor {
  id: string;
  name: string;
}

interface AppointmentFormProps {
  doctors: Doctor[];
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  doctors,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [datetime, setDatetime] = useState("");
  const [reason, setReason] = useState("");
  const [doctor, setDoctor] = useState<Doctor | null>(doctors[0] || null);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(true);
  }

  async function confirmSubmit() {
    setOpen(false);
    // Placeholder API call (assuming /api/appointments is ready)
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        datetime,
        reason,
        doctorId: doctor?.id,
      }),
    });

    if (res.ok) {
      setToast({ message: "Appointment request sent!", type: "success" });
      setName("");
      setEmail("");
      setDatetime("");
      setReason("");
    } else {
      setToast({ message: "Something went wrong", type: "error" });
    }
    setTimeout(() => setToast(null), 3000);
  }

  // --- Listbox styling functions for conditional classes ---
  function getListboxOptionClasses({
    active,
    selected,
  }: {
    active: boolean;
    selected: boolean;
  }) {
    let classes = "cursor-pointer select-none py-2 pl-10 pr-4 relative";

    if (active) {
      classes += " bg-teal-100 text-teal-900"; // Light teal background on hover/focus
    } else {
      classes += " text-gray-900";
    }

    if (selected) {
      classes += " font-semibold bg-teal-50"; // Slightly different background for selected item
    }

    return classes;
  }
  // --------------------------------------------------------

  return (
    // Applied clean styling to the container
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
      {/* Form Title - Used text-teal-700 for brand alignment */}
      <h2 className="text-2xl font-bold mb-6 text-teal-700 text-center">
        Book Your Consultation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
        {/* Input fields */}
        <Input
          label=""
          type="text"
          placeholder="Your Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label=""
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Set minimum date to today for `datetime-local` input */}
        <Input
          label=""
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          required
        />
        <Input
          label=""
          type="text"
          placeholder="Brief Reason for Visit"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        {/* Doctor selection - Styled with Teal/Gray for contrast */}
        <Listbox value={doctor} onChange={setDoctor}>
          {({ open: listboxOpen }) => (
            <div className="relative">
              <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
                Select Doctor
              </Listbox.Label>
              <Listbox.Button
                className={`relative w-full cursor-default rounded-lg bg-white border border-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-150 ease-in-out ${
                  listboxOpen ? "border-teal-500 ring-1 ring-teal-500" : ""
                }`}
              >
                <span className="block truncate text-gray-800">
                  {doctor ? doctor.name : "Choose a doctor"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronsUpDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {/* Listbox Options - Use subtle teal colors for selection */}
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {doctors.map((d) => (
                    <Listbox.Option
                      key={d.id}
                      value={d}
                      className={({ active, selected }) =>
                        getListboxOptionClasses({ active, selected })
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-bold" : "font-normal"
                            }`}
                          >
                            {d.name}
                          </span>
                          {/* Check icon for selected item, using teal color */}
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>

        {/* Submit Button - Assuming the Button component can render a primary teal style */}
        <Button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Book Appointment
        </Button>
      </form>

      {/* Confirmation Dialog - Styled to match teal theme */}
      <Transition show={open} as={Fragment}>
        <Dialog onClose={() => setOpen(false)} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/40" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-xl p-6 max-w-sm mx-auto shadow-2xl border-t-4 border-teal-500">
              <Dialog.Title className="text-xl font-bold text-teal-700">
                Confirm Appointment
              </Dialog.Title>
              <p className="mt-2 text-sm text-gray-700">
                Please confirm the following appointment details:
              </p>
              <p className="mt-1 text-base font-semibold text-gray-800">
                {datetime
                  ? new Date(datetime).toLocaleString()
                  : "Selected Date/Time"}
              </p>
              <p className="text-sm text-gray-600 italic">
                with {doctor?.name || "selected doctor"}
              </p>

              <div className="mt-6 flex justify-end gap-3">
                {/* Confirm Button - Primary teal style */}
                <Button
                  onClick={confirmSubmit}
                  className="bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 text-white"
                >
                  Confirm Booking
                </Button>
                {/* Cancel Button - Ghost/secondary style */}
                <Button
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {toast && <Toast {...toast} />}
    </div>
  );
};
