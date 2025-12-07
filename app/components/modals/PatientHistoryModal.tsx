// "use client";

// import { Fragment, useEffect, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { Button } from "../ui/Button";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// interface PatientHistoryModalProps {
//   open: boolean;
//   onClose: () => void;
//   doctorId: string;
//   patientId: string | null;
// }

// export const PatientHistoryModal: React.FC<PatientHistoryModalProps> = ({
//   open,
//   onClose,
//   doctorId,
//   patientId,
// }) => {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!patientId) return;

//     const fetchData = async () => {
//       setLoading(true);
//       const ref = doc(db, "doctors", doctorId, "patients", patientId);
//       const snap = await getDoc(ref);
//       if (snap.exists()) {
//         setData(snap.data());
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, [doctorId, patientId]);

//   return (
//     <Transition appear show={open} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-6">
//             <Dialog.Title className="text-xl font-semibold text-gray-900 mb-3">
//               {patientId} — Medical History
//             </Dialog.Title>

//             {loading ? (
//               <p>Loading...</p>
//             ) : data ? (
//               <div className="space-y-4">
//                 <div className="bg-gray-50 p-3 rounded-lg">
//                   <p>
//                     <strong>Next Appointment:</strong>{" "}
//                     {new Date(data.appointmentDate).toLocaleString()}
//                   </p>
//                   {data.reason && (
//                     <p>
//                       <strong>Reason:</strong> {data.reason}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-gray-800">Prescriptions</h3>
//                   <div className="max-h-48 overflow-y-auto border rounded-lg p-3 space-y-3">
//                     {data?.prescriptions?.length > 0 ? (
//                       data.prescriptions.map((p: any, index: number) => (
//                         <div
//                           key={index}
//                           className="border p-2 rounded-lg bg-gray-50"
//                         >
//                           <p>
//                             <strong>{p.medicine}</strong> — {p.dosage}
//                           </p>
//                           {p.instructions && (
//                             <p className="text-sm text-gray-600 italic">
//                               {p.instructions}
//                             </p>
//                           )}
//                           <p className="text-xs text-gray-500">
//                             {p.datePrescribed?.toDate
//                               ? p.datePrescribed.toDate().toLocaleString()
//                               : "---"}
//                           </p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-sm text-gray-500">
//                         No prescriptions yet.
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <p>No data found.</p>
//             )}

//             <div className="flex justify-end pt-4">
//               <Button variant="ghost" onClick={onClose}>
//                 Close
//               </Button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

"use client";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export const PatientHistoryModal = ({
  open,
  onClose,
  doctorId,
  patientId,
}: any) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!patientId) return;

    const fetch = async () => {
      const ref = doc(db, "doctors", doctorId, "patients", patientId);
      const snap = await getDoc(ref);
      if (snap.exists()) setData(snap.data());
    };
    fetch();
  }, [doctorId, patientId]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              Medical History — {patientId}
            </h3>

            {!data ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm">
                    <strong>Next Appointment:</strong>{" "}
                    {new Date(data.appointmentDate).toLocaleString()}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Prescriptions</h4>
                  <div className="max-h-48 overflow-y-auto border p-3 rounded">
                    {data.prescriptions?.length ? (
                      data.prescriptions.map((p: any, i: number) => (
                        <div key={i} className="text-sm mb-2 border-b pb-1">
                          <strong>{p.medicine}</strong> — {p.dosage}
                          <p className="text-xs text-gray-500">
                            {p.datePrescribed?.toDate
                              ? p.datePrescribed.toDate().toLocaleString()
                              : ""}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500">
                        No prescriptions yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={onClose}
                className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};
