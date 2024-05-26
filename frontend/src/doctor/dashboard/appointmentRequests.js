// DoctorDashboard.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCalendarCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import AppointmentForm from "./AppointmentForm";

const DoctorDashboard = () => {
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [rejectedAppointments, setRejectedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPatientId, setExpandedPatientId] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
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
          setApprovedAppointments(response.data.appointmentRequests.filter(request => request.status === "approved"));
          setRejectedAppointments(response.data.appointmentRequests.filter(request => request.status === "rejected"));
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

  const handleApproveAppointment = async (appointmentId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Unauthorized: No token found");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/auth/appointment-requests/${appointmentId}/approve`, null, {
        headers: {
          'x-auth-token': token
        }
      });

      const roomID = response.data.roomID;

      setAppointmentRequests(prevRequests =>
        prevRequests.map(request =>
          request._id === appointmentId ? { ...request, status: "approved", roomID } : request
        )
      );

      setApprovedAppointments(prevApproved => [
        ...prevApproved,
        { ...appointmentRequests.find(request => request._id === appointmentId), status: "approved", roomID },
      ]);

      setRejectedAppointments(prevRejected =>
        prevRejected.filter(request => request._id !== appointmentId)
      );

      navigate(`/doctor-room/${roomID}`);
    } catch (error) {
      console.error("Error approving appointment:", error);
      setError("Failed to approve appointment");
    }
  };

  const handleRejectAppointment = async (appointmentId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Unauthorized: No token found");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/auth/appointment-requests/${appointmentId}/reject`, null, {
        headers: {
          'x-auth-token': token
        }
      });

      setAppointmentRequests(prevRequests =>
        prevRequests.map(request =>
          request._id === appointmentId ? { ...request, status: "rejected" } : request
        )
      );

      setRejectedAppointments(prevRejected => [
        ...prevRejected,
        { ...appointmentRequests.find(request => request._id === appointmentId), status: "rejected" },
      ]);

      setApprovedAppointments(prevApproved =>
        prevApproved.filter(request => request._id !== appointmentId)
      );
    } catch (error) {
      console.error("Error rejecting appointment:", error);
      setError("Failed to reject appointment");
    }
  };

  const togglePatientProfile = (patientId) => {
    setExpandedPatientId((prevId) => (prevId === patientId ? null : patientId));
  };

  return (
    <div>
      <h2>Appointment Requests</h2>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {showAppointmentForm ? (
        <AppointmentForm onClose={() => setShowAppointmentForm(false)} />
      ) : (
        <>
          <button onClick={() => setShowAppointmentForm(true)}>Request Appointment</button>
          <div>
            {appointmentRequests.map(appointment => (
              <div key={appointment._id}>
                <div>
                  <FontAwesomeIcon icon={faUserCircle} />
                  <span>{appointment.patient?.name || 'Unknown Patient'}</span>
                </div>
                <button onClick={() => togglePatientProfile(appointment.patient?._id)}>
                  {expandedPatientId === appointment.patient?._id ? "Hide Profile" : "View Profile"}
                </button>
                {expandedPatientId === appointment.patient?._id && (
                  <div>
                    <div>Email: {appointment.patient?.email || 'N/A'}</div>
                    <div>Age: {appointment.patient?.age || 'N/A'}</div>
                    <div>Gender: {appointment.patient?.gender || 'N/A'}</div>
                    <div>Address: {appointment.patient?.address1 || 'N/A'}, {appointment.patient?.country || 'N/A'}</div>
                  </div>
                )}
                <div>
                  <div>Date: {new Date(appointment.preferredDateTime).toLocaleDateString()}</div>
                  <div>Time: {new Date(appointment.preferredDateTime).toLocaleTimeString()}</div>
                  <div>Symptoms: {appointment.symptoms}</div>
                  <div>Status: {appointment.status}</div>
                  {appointment.status === "approved" && (
                    <button onClick={() => navigate(`/doctor-room/${appointment.roomID}`)}>Join</button>
                  )}
                </div>
                {appointment.status === "pending" && (
                  <div>
                    <button onClick={() => handleApproveAppointment(appointment._id)}>Approve</button>
                    <button onClick={() => handleRejectAppointment(appointment._id)}>Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorDashboard;
