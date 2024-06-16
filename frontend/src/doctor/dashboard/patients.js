import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApprovedPatients from './approvedPatients';
import RejectedPatients from './rejectedPatients';
import Nav from "./dashboard";

const Patients = () => {
  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [rejectedAppointments, setRejectedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApproved, setShowApproved] = useState(true); // Default to show approved patients
  const [showRejected, setShowRejected] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const responseApproved = await axios.get('https://healt-link-v36m.onrender.com/api/auth/approved-appointments', {
          headers: {
            'x-auth-token': token
          }
        });
        const responseRejected = await axios.get('https://healt-link-v36m.onrender.com/api/auth/rejected-appointments', {
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
    <>
      <Nav />
      <div className=" relative top-32 p-4">
        <div className="mb-4 flex justify-center">
          <button
            className={`px-4 py-6 mx-8 rounded ${showApproved ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => {
              setShowApproved(true);
              setShowRejected(false);
            }}
          >
            Show Approved Patients
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded ${showRejected ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => {
              setShowApproved(false);
              setShowRejected(true);
            }}
          >
            Show Rejected Patients
          </button>
        </div>
        {showApproved && (
          <div className="mb-4">
            <ApprovedPatients approvedAppointments={approvedAppointments} />
          </div>
        )}
        {showRejected && (
          <div>
            <RejectedPatients rejectedAppointments={rejectedAppointments} />
          </div>
        )}
      </div>
    </>
  );
};

export default Patients;
