// AppointmentDetails.js

import React from 'react';

const AppointmentDetails = ({ appointment }) => {
  return (
    <div>
      <h2>Appointment Details</h2>
      {/* Display appointment details */}
      <p>Status: {appointment.status}</p>
      {appointment.status === 'approved' && <p>Google Meet Link: {appointment.googleMeetLink}</p>}
    </div>
  );
};

export default AppointmentDetails;
