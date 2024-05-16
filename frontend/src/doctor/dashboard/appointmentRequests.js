import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const userId  = useParams();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`http://localhost:5000/api/auth/doctor/appointments/${userId}`,{
            headers: {
                'x-auth-token': token
              }
        })
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [userId]);

  return (
    <div>
      <h1>Appointments for User ID: {userId}</h1>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment._id}>
      <div>Mode of Consultation: {appointment.modeOfConsultation}</div>
            <div>Preferred DateTime: {appointment.preferredDateTime}</div>
            <div>Symptoms: {appointment.symptoms}</div>
            <div>Status: {appointment.status}</div>           </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
