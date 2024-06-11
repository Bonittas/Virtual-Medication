// PatientPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../dashboard";

function PatientPage() {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(`/video-call?doctor=${doctorName}`);
  };

  return (
    <>
      <Nav />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-green-500 mb-6 text-center">Patients Page </h1>
          <input
            type="text"
            placeholder="Enter Patient's Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="border border-green-500 p-3 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Enter Doctor's Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="border border-green-500 p-3 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleNext}
            className="bg-green-500 text-white py-3 px-6 rounded-lg w-full hover:bg-green-600 transition duration-300"
          >
            Join Room
          </button>
        </div>
      </div>
    </>
  );
}

export default PatientPage;
