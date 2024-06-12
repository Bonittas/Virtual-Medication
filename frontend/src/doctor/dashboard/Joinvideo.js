import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "./dashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faUserPlus } from '@fortawesome/free-solid-svg-icons';

function DoctorPage() {
  const [doctorName, setDoctorName] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(`/video-call?doctor=${doctorName}`);
  };

  const handleAddPatientDetail = () => {
    navigate('/add-data');
  };

  return (
    <>
      <Nav />
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-green-500 mb-6 text-center">Doctor Page</h1>
          <input
            type="text"
            placeholder="Enter Doctor's Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="border border-green-500 p-3 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleNext}
            className="bg-green-500 text-white py-3 px-6 rounded-lg w-full mb-4 flex items-center justify-center space-x-2 hover:bg-green-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faVideo} className="text-lg" />
            <span>Join Room</span>
          </button>
          <button
            onClick={handleAddPatientDetail}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg w-full flex items-center justify-center space-x-2 hover:bg-blue-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faUserPlus} className="text-lg" />
            <span>Add Patient Detail</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default DoctorPage;
