import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { requestAppointment} from "../actions/patient_authActions";

const AppointmentForm = ({ doctor, onClose }) => {
  const dispatch = useDispatch();
  const [modeOfConsultation, setModeOfConsultation] = useState("");
  const [preferredDateTime, setPreferredDateTime] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentData = {
      doctorId: doctor._id,
      modeOfConsultation,
      preferredDateTime,
      symptoms
    };
    dispatch(requestAppointment(appointmentData));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-96">
        <h2 className="text-xl font-semibold mb-4">Book Appointment with {doctor.name}</h2>
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
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded mr-2"
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
