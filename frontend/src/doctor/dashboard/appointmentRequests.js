import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use this for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCalendarCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Nav from "./dashboard";

const DoctorDashboard = () => {
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [rejectedAppointments, setRejectedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPatientId, setExpandedPatientId] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

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

      const roomID = response.data.roomID; // Assume the backend sends back a roomID

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

      navigate(`/doctor-room/${roomID}`); // Navigate to the video room
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong> {error}
      </div>
    );
  }
  
  return (
    <>
      <Nav />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Appointment Requests</h2>
        {appointmentRequests.length === 0 ? (
          <div className="bg-white p-4 shadow rounded flex justify-center items-center">
            <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 mr-2" />
            <span>No appointment requests found.</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {appointmentRequests.map(appointment => (
              <div
                key={appointment._id}
                className={`bg-white p-4 shadow rounded border-l-4 ${appointment.status === 'approved' ? 'border-green-500' : appointment.status === 'rejected' ? 'border-red-500' : 'border-gray-400'}`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold flex items-center">
                    <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 mr-2" />
                    <span>{appointment.patient?.name || 'Unknown Patient'}</span>
                  </div>
                  <button
                    onClick={() => togglePatientProfile(appointment.patient?._id)}
                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    {expandedPatientId === appointment.patient?._id ? "Hide Profile" : "View Profile"}
                  </button>
                </div>
                {expandedPatientId === appointment.patient?._id && (
                  <div className="mt-4">
                    <div>Email: {appointment.patient?.email || 'N/A'}</div>
                    <div>Age: {appointment.patient?.age || 'N/A'}</div>
                    <div>Gender: {appointment.patient?.gender || 'N/A'}</div>
                    <div>Address: {appointment.patient?.address1 || 'N/A'}, {appointment.patient?.country || 'N/A'}</div>
                  </div>
                )}
                <div className="mt-4">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCalendarCheck} className="text-gray-400 mr-2" />
                    <span>Date: {new Date(appointment.preferredDateTime).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCalendarCheck} className="text-gray-400 mr-2" />
                    <span>Time: {new Date(appointment.preferredDateTime).toLocaleTimeString()}</span>
                  </div>
                  <div>Symptoms: {appointment.symptoms}</div>
                  <div>Status: {appointment.status}</div>
                </div>
                {appointment.status === "pending" && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleApproveAppointment(appointment._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                    >
                      <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectAppointment(appointment._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorDashboard;
