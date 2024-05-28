import React from 'react';

const RejectedPatients = ({ rejectedAppointments }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Rejected Appointments</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Patient Name</th>
              <th className="border border-gray-400 px-4 py-2">Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            {rejectedAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="border border-gray-400 px-4 py-2">{appointment.patient?.name || 'Unknown Patient'}</td>
                <td className="border border-gray-400 px-4 py-2">{appointment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RejectedPatients;
