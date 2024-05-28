import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApprovedPatients from './approvedPatients';
import RejectedPatients from './rejectedPatients';
import Nav from "./dashboard"
const Patients = () => {
  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [rejectedAppointments, setRejectedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const responseApproved = await axios.get('http://localhost:5000/api/auth/approved-appointments', {
          headers: {
            'x-auth-token': token
          }
        });
        const responseRejected = await axios.get('http://localhost:5000/api/auth/rejected-appointments', {
          headers: {
            'x-auth-token': token
          }
        });
        setApprovedAppointments(responseApproved.data.approvedAppointments);
        setRejectedAppointments(responseRejected.data.rejectedAppointments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to fetch appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <><Nav/>
    <div>
      <ApprovedPatients approvedAppointments={approvedAppointments} />
      <RejectedPatients rejectedAppointments={rejectedAppointments} />
    </div>
    </>
  );
};

export default Patients;
