import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

const ApprovedPatients = ({ approvedAppointments }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter appointments based on search query
  const filteredAppointments = approvedAppointments.filter(appointment =>
    appointment.patient?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const currentAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
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
                <td className="border border-gray-400 px-4 py-2">{appointment.patient?.name || 'Unknown Patient'}</td>
                <td className="border border-gray-400 px-4 py-2">{appointment.date}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {appointment.status === 'approved' && appointment.roomId ? (
                    <a
                      href={`/video-room/${appointment.roomId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      <FontAwesomeIcon icon={faVideo} className="mr-2" />
                      Join Video Chat
                    </a>
                  ) : (
                    'No video conference room available for this appointment.'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ApprovedPatients;
