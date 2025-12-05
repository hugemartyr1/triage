"use client";
import React from "react";
import { Button } from "./ui/Button";

interface AppointmentCardProps {
  appointment: {
    patient: string;
    datetime: string;
    reason?: string;
  };
  onPrescribe: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onPrescribe,
}) => {
  const { patient, datetime, reason } = appointment;

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between transition-all hover:shadow-lg">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{patient}</h3>
          <span className="text-sm text-teal-600 font-medium">
            {new Date(datetime).toLocaleString()}
          </span>
        </div>
        {reason && (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Reason:</span> {reason}
          </p>
        )}
      </div>

      <div className="pt-4 flex justify-end">
        <Button variant="primary" onClick={onPrescribe}>
          Prescribe
        </Button>
      </div>
    </div>
  );
};
