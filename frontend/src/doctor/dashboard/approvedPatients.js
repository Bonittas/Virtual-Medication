import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

const ApprovedPatients = ({ approvedAppointments }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Approved Appointments</h2>
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
            {approvedAppointments.map((appointment) => (
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
    </div>
  );
};

export default ApprovedPatients;
