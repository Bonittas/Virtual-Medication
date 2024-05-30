import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

const ApprovedPatients = ({ approvedAppointments }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredAppointments = approvedAppointments.filter(appointment =>
    appointment.patient?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const currentAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Approved Appointments</h2>
      <div className="mb-4 flex justify-center items-center w-full">
        <input
          type="text"
          placeholder="Search by patient name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded w-1/2"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Patient Name</th>
              <th className="border border-gray-400 px-4 py-2">Appointment Date</th>
              <th className="border border-gray-400 px-4 py-2">Join Video Conference</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="border border-gray-400 px-4 py-2">{appointment.patient?.name}</td>
                <td className="border border-gray-400 px-4 py-2">{new Date(appointment.date).toLocaleDateString()}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {appointment.roomId ? (
                    <a
                      href={`/video-room/${appointment.roomId}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FontAwesomeIcon icon={faVideo} size="2x" />
                    </a>
                  ) : (
                    'Room not available'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ApprovedPatients;
