import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const AppointmentForm = ({ doctorId, onClose }) => {
  const [modeOfConsultation, setModeOfConsultation] = useState("");
  const [preferredDateTime, setPreferredDateTime] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = {
      doctorId,
      modeOfConsultation,
      preferredDateTime,
      symptoms
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/auth/appointment/request",
        appointmentData,
        {
          headers: {
            "x-auth-token": token
          }
        } 
      );
      setSuccessMessage("Appointment requested successfully");
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 3000);
    } catch (error) {
      setErrorMessage("Failed to request appointment");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-96">
        <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="modeOfConsultation" className="block text-gray-700">Mode of Consultation:</label>
            <select
              id="modeOfConsultation"
              value={modeOfConsultation}
              onChange={(e) => setModeOfConsultation(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            >
              <option value="">Select Mode</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <div>
            <label htmlFor="preferredDateTime" className="block text-gray-700">Preferred Date and Time:</label>
            <input
              type="datetime-local"
              id="preferredDateTime"
              value={preferredDateTime}
              onChange={(e) => setPreferredDateTime(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="symptoms" className="block text-gray-700">Symptoms:</label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-red-600 hover:bg-red-400 text-white px-6 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
