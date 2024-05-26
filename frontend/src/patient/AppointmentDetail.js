// PatientDashboard.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCalendarCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const PatientDashboard = () => {
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointmentRequests = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Unauthorized: No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/appointment-requests", {
          headers: {
            'x-auth-token': token
          }
        });

        if (response.data.appointmentRequests) {
          setAppointmentRequests(response.data.appointmentRequests);
        } else {
          setError("No appointment requests found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch appointment requests:", error);
        setError("Failed to fetch appointment requests");
        setLoading(false);
      }
    };

    fetchAppointmentRequests();
  }, []);

  const handleShowResponse = () => {
    setShowResponse(true);
  };

  return (
    <div>
      <h2>Appointment Requests</h2>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!showResponse && (
        <div>
          <button onClick={handleShowResponse}>Show Response</button>
        </div>
      )}
      {showResponse && (
        <>
          <div>
            {appointmentRequests.map(appointment => (
              <div key={appointment._id}>
                <div>
                  <FontAwesomeIcon icon={faUserCircle} />
                  <span>{appointment.doctor?.name || 'Unknown Doctor'}</span>
                </div>
                <div>
                  <div>Date: {new Date(appointment.preferredDateTime).toLocaleDateString()}</div>
                  <div>Time: {new Date(appointment.preferredDateTime).toLocaleTimeString()}</div>
                  <div>Symptoms: {appointment.symptoms}</div>
                  <div>Status: {appointment.status}</div>
                  {appointment.status === "approved" && (
                    <>
                      <div>Appointment successfully approved</div>
                      <button onClick={() => navigate(`/patient-room/${appointment.roomID}`)}>Join Meeting</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PatientDashboard;
