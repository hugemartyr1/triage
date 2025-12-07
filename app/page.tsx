// "use client";

// import { AppointmentForm } from "./components/AppointmentForm";
// import {
//   Users,
//   Shield,
//   Calendar,
//   Clock,
//   HeartPulse,
//   Stethoscope,
// } from "lucide-react";

// const doctors = [
//   {
//     id: "1",
//     name: "Dr. Priya Mehta",
//     specialty: "Cardiologist",
//     bio: "Dr. Mehta has over 15 years of experience specializing in preventive cardiology and treating complex heart conditions. Focus on patient education and holistic health.",
//     imagePlaceholder:
//       "[Image Placeholder: Dr. Priya Mehta, Professional Headshot]",
//   },
//   {
//     id: "2",
//     name: "Dr. Rakesh Sharma",
//     specialty: "Pediatrician",
//     bio: "Dr. Sharma is a beloved pediatrician with 10 years of experience focusing on children's developmental health, vaccinations, and common illnesses.",
//     imagePlaceholder:
//       "[Image Placeholder: Dr. Rakesh Sharma, Professional Headshot]",
//   },
// ];

// const features = [
//   {
//     icon: Calendar,
//     title: "Instant Booking",
//     description:
//       "Schedule appointments online 24/7 with immediate confirmation and reminders.",
//   },
//   {
//     icon: Users,
//     title: "Certified Specialists",
//     description:
//       "Consult with highly qualified, board-certified doctors dedicated to excellence.",
//   },
//   {
//     icon: Shield,
//     title: "Private Records",
//     description:
//       "Your medical history is secure and accessible with advanced data encryption.",
//   },
//   {
//     icon: Clock,
//     title: "Optimized Visits",
//     description:
//       "Efficient scheduling means minimal waiting and focused, quality consultation time.",
//   },
// ];

// export default function HomePage() {
//   return (
//     <div className="space-y-20 py-12 bg-white">
//       {/* 1. 🌟 Hero Section */}
//       <section className="relative overflow-hidden pt-20 pb-24 px-4 bg-white">
//         {/* 1. SEO Enhancement: Semantic tags and attributes */}
//         <header className="text-center max-w-4xl mx-auto z-10 relative">
//           {/* Use an H1 tag for the primary focus, good for SEO */}
//           <h1 className="text-6xl md:text-7xl font-extrabold text-teal-800 tracking-tight leading-tight">
//             CarePoint Clinic:{" "}
//             <span className="text-teal-600">Advanced Medicine</span> &
//             Compassionate Care
//           </h1>

//           {/* Use a prominent paragraph (often treated as a subtitle/H2 by some readers) */}
//           <p className="mt-6 text-2xl text-gray-700 max-w-3xl mx-auto font-light">
//             Your trusted partner in health. Book your appointment easily today
//             and experience **personalized care** tailored to your needs.
//           </p>

//           {/* Call to Action Placeholder (Important for conversion) */}
//           <div className="mt-8">
//             {/* Replace this with an actual <Button> component pointing to the appointment form */}
//             <a
//               href="#appointment-form"
//               className="inline-block px-10 py-3 text-lg font-semibold rounded-full bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105"
//               aria-label="Book an appointment now at CarePoint Clinic"
//             >
//               Book Now
//             </a>
//             <a
//               href="/doctor"
//               className="inline-block px-10 py-3 text-lg font-semibold rounded-full bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105"
//               aria-label="Visit Doctor Dashboard"
//             >
//               Doctors
//             </a>
//             <a
//               href="patient"
//               className="inline-block px-10 py-3 text-lg font-semibold rounded-full bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105"
//               aria-label="Visit Patient Portal"
//             >
//               Patients
//             </a>
//           </div>
//         </header>

//         {/* 2. Geometric Components for Aesthetic Appeal (Subtle Teal/Gray) */}

//         {/* Large Teal Circle (Top Left) */}
//         <div className="absolute top-0 left-0 w-60 h-60 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>

//         {/* Small Gray Square (Top Right) */}
//         <div className="absolute top-10 right-20 w-8 h-8 border-4 border-gray-200 rotate-45"></div>

//         {/* Wavy Line/Divider (Bottom) */}
//         <svg
//           className="absolute bottom-0 left-0 w-full h-12 text-teal-50 opacity-80"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1440 320"
//           preserveAspectRatio="none"
//           fill="currentColor"
//         >
//           <path
//             fillOpacity="1"
//             d="M0,160L48,160C96,160,192,160,288,144C384,128,480,96,576,90.7C672,85,768,107,864,138.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//           ></path>
//         </svg>
//       </section>

//       {/* 2. 🚀 Clinic Features Section */}
//       <section className="max-w-7xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
//           Why Choose CarePoint?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="p-8 bg-white shadow-xl rounded-lg text-center border-t-4 border-teal-500 transition duration-300 hover:shadow-teal-300/60"
//             >
//               <feature.icon className="w-10 h-10 text-teal-600 mx-auto mb-4" />
//               <h3 className="text-xl font-bold mb-2 text-teal-700">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600 text-sm">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <hr className="max-w-6xl mx-auto border-t border-teal-100" />

//       {/* 3. 🩺 Our Expert Doctors Section */}
//       <section className="max-w-7xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
//           Meet Our Dedicated Physicians
//         </h2>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {doctors.map((doctor) => (
//             <div
//               key={doctor.id}
//               className="p-6 bg-white shadow-2xl rounded-xl flex items-start space-x-6 border border-teal-100 transition duration-300 hover:scale-[1.01] hover:shadow-teal-200/50"
//             >
//               {/* Doctor Image Placeholder */}
//               <div className="w-24 h-24 flex-shrink-0 bg-teal-100 rounded-full flex items-center justify-center border-4 border-teal-500 overflow-hidden">
//                 <Stethoscope className="w-10 h-10 text-teal-700" />
//                 <p className="sr-only">{doctor.imagePlaceholder}</p>
//               </div>

//               {/* Doctor Info */}
//               <div className="flex-grow">
//                 <h3 className="text-2xl font-bold text-teal-800">
//                   {doctor.name}
//                 </h3>
//                 <p className="text-lg font-semibold text-gray-700 mb-2 italic">
//                   {doctor.specialty}
//                 </p>
//                 <p className="text-gray-600 text-sm">{doctor.bio}</p>
//                 <p className="mt-3 text-xs text-gray-400">
//                   {doctor.imagePlaceholder}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 4. 📅 Appointment Booking Section (The Call to Action) */}
//       <section className="bg-teal-50 py-12 border-t border-b border-teal-200">
//         <div className="max-w-3xl mx-auto px-4">
//           <h2 className="text-3xl font-bold mb-8 text-teal-800 text-center">
//             Schedule Your Appointment
//           </h2>
//           <div className="bg-white p-8 shadow-2xl rounded-xl border-t-8 border-teal-600">
//             <p className="text-center text-gray-600 mb-6">
//               Select your preferred doctor and time slot below.
//             </p>
//             <AppointmentForm doctors={doctors} />
//           </div>
//         </div>
//       </section>

//       {/* 5. 📞 Footer/Contact Info */}
//       <section className="text-center pt-8 pb-12 bg-white max-w-6xl mx-auto">
//         <h3 className="text-xl font-bold text-gray-800 mb-2">
//           Contact & Location
//         </h3>
//         <p className="text-gray-600">
//           [Placeholder: Clinic Address, Operating Hours, Phone Number]
//         </p>
//         <p className="mt-4 text-sm text-teal-600 font-medium">
//           Providing exceptional care in your community since [Year].
//         </p>
//       </section>
//     </div>
//   );
// }

"use client";

import { AppointmentForm } from "./components/AppointmentForm";
import {
  Users,
  Shield,
  Calendar,
  Clock,
  HeartPulse,
  Stethoscope,
  ChevronRight,
} from "lucide-react";

// --- SHADCN UI PLACEHOLDERS (Replace these with your actual imports) ---
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// ------------------------------------------------------------------------

// --- MOCK DATA (Kept unchanged) ---
const doctors = [
  {
    id: "1",
    name: "Dr. Priya Mehta",
    specialty: "Cardiologist",
    bio: "Dr. Mehta has over 15 years of experience specializing in preventive cardiology and treating complex heart conditions. Focus on patient education and holistic health.",
    imagePlaceholder:
      "[Image Placeholder: Dr. Priya Mehta, Professional Headshot]",
  },
  {
    id: "2",
    name: "Dr. Rakesh Sharma",
    specialty: "Pediatrician",
    bio: "Dr. Sharma is a beloved pediatrician with 10 years of experience focusing on children's developmental health, vaccinations, and common illnesses.",
    imagePlaceholder:
      "[Image Placeholder: Dr. Rakesh Sharma, Professional Headshot]",
  },
];

const features = [
  // ... (features array remains the same)
  {
    icon: Calendar,
    title: "Instant Booking",
    description:
      "Schedule appointments online 24/7 with immediate confirmation and reminders.",
  },
  {
    icon: Users,
    title: "Certified Specialists",
    description:
      "Consult with highly qualified, board-certified doctors dedicated to excellence.",
  },
  {
    icon: Shield,
    title: "Private Records",
    description:
      "Your medical history is secure and accessible with advanced data encryption.",
  },
  {
    icon: Clock,
    title: "Optimized Visits",
    description:
      "Efficient scheduling means minimal waiting and focused, quality consultation time.",
  },
];

// ------------------------------------------------------------------------
// --- MODULARIZED COMPONENTS ---
// ------------------------------------------------------------------------

interface FeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <Card className="p-6 text-center border-t-4 border-teal-500 hover:shadow-2xl transition duration-300">
    <Icon className="w-8 h-8 text-teal-600 mx-auto mb-4" />
    <CardTitle className="text-xl text-teal-700">{title}</CardTitle>
    <CardDescription className="text-sm mt-2 text-gray-600">
      {description}
    </CardDescription>
  </Card>
);

interface DoctorProps {
  doctor: (typeof doctors)[0];
}

const DoctorCard: React.FC<DoctorProps> = ({ doctor }) => (
  <Card className="shadow-2xl flex flex-col md:flex-row items-start p-6 space-x-4 border border-teal-200 transition duration-300 hover:scale-[1.01]">
    <Avatar className="w-20 h-20 flex-shrink-0 border-4 border-teal-500 bg-teal-100">
      {/* Use AvatarImage for actual image if available, AvatarFallback for icon/initials */}
      <AvatarFallback>
        <Stethoscope className="w-8 h-8 text-teal-700" />
      </AvatarFallback>
    </Avatar>

    <div className="flex-grow mt-4 md:mt-0">
      <CardTitle className="text-2xl text-teal-800">{doctor.name}</CardTitle>
      <CardDescription className="text-lg font-semibold italic text-gray-700 mb-2">
        {doctor.specialty}
      </CardDescription>
      <p className="text-gray-600 text-sm">{doctor.bio}</p>
    </div>
  </Card>
);

// ------------------------------------------------------------------------
// --- MAIN HOMEPAGE COMPONENT ---
// ------------------------------------------------------------------------

export default function HomePage() {
  return (
    <div className="space-y-20 py-12 bg-gray-50">
      {/* 1. 🌟 Hero Section with Complex Geometry */}
      <section className="relative overflow-hidden pt-32 pb-40 px-4 bg-teal-50">
        {/* Complex Geometric Background: Mimics the image's overlapping soft shapes */}
        <div className="absolute inset-0 z-0 opacity-50">
          {/* Large Soft Teal Wave (Left-Center) */}
          <div className="absolute top-0 left-0 w-[800px] h-[500px] bg-teal-100 rounded-[50%_40%] mix-blend-multiply filter blur-3xl transform rotate-12 -translate-x-1/4"></div>
          {/* Smaller Aqua/Mint Shape (Top Right) */}
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-teal-200 rounded-[60%_70%_30%_40%] mix-blend-multiply filter blur-3xl opacity-40 transform translate-x-1/2 rotate-90"></div>
          {/* Bottom-left curve/sweep */}
          <svg
            className="absolute bottom-0 left-0 w-full h-auto text-white opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path
              fillOpacity="1"
              d="M0,224L48,218.7C96,213,192,203,288,186.7C384,171,480,149,576,149.3C672,149,768,171,864,197.3C960,224,1056,256,1152,240C1248,224,1344,160,1392,128L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Content: Z-index 10 to ensure visibility */}
        <header className="text-left max-w-6xl mx-auto z-10 relative grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Heading and CTA */}
          <div>
            <HeartPulse className="w-12 h-12 text-teal-600 mb-4" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-teal-800 tracking-tight leading-tight">
              CarePoint Clinic:{" "}
              <span className="text-teal-600">Advanced Medicine</span> &
              Compassionate Care
            </h1>

            <p className="mt-6 text-xl text-gray-700 font-light max-w-lg">
              Your trusted partner in health. Book your appointment easily today
              and experience **personalized care** tailored to your needs.
            </p>

            {/* Call to Action Buttons (using ShadCN Button) */}
            <div className="mt-8 space-x-4">
              <Button
                asChild
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full px-8 py-6 text-lg shadow-lg"
              >
                <a href="#appointment-form">
                  Book Appointment <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-teal-600 text-teal-700 font-semibold rounded-full px-8 py-6 text-lg hover:bg-teal-50"
              >
                <a href="/login">Doctor Portal</a>
              </Button>
            </div>
          </div>

          {/* Right Column: Appointment Form (Kept the original form structure) */}
          <div id="appointment-form" className="lg:mt-0 mt-12">
            <Card className="shadow-2xl p-6 bg-white border-t-8 border-teal-600">
              <CardHeader>
                <CardTitle className="text-2xl text-teal-800">
                  Quick Appointment Booking
                </CardTitle>
                <CardDescription>
                  Select your preferred doctor and time slot.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentForm doctors={doctors} />
              </CardContent>
            </Card>
          </div>
        </header>
      </section>

      {/* 2. 🚀 Clinic Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-teal-800">
          Why Choose CarePoint?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      <hr className="max-w-6xl mx-auto border-t border-gray-200" />

      {/* 3. 🩺 Our Expert Doctors Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-teal-800">
          Meet Our Dedicated Physicians
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      {/* 4. 📅 Appointment Booking Section (Simplified - now integrated into Hero) */}
      {/* Keeping the old AppointmentForm call in the Hero section, this can be simplified or removed */}
      <section className="bg-teal-50 py-12 border-t border-b border-teal-200 hidden">
        {/* Hidden section since form is in the Hero section */}
      </section>

      {/* 5. 📞 Footer/Contact Info */}
      <section className="text-center pt-8 pb-12 bg-white max-w-6xl mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Contact & Location
        </h3>
        <p className="text-gray-600">
          [Placeholder: Clinic Address, Operating Hours, Phone Number]
        </p>
        <p className="mt-4 text-sm text-teal-600 font-medium">
          Providing exceptional care in your community since [Year].
        </p>
      </section>
    </div>
  );
}
