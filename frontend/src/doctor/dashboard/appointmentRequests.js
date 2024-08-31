import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCalendarCheck, faVideo } from "@fortawesome/free-solid-svg-icons";
import Nav from "./dashboard";

const DoctorDashboard = () => {
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to handle joining the video chat
  const handleJoinVideoChat = (roomId) => {
    if (roomId) {
      navigate(`/video-room/${roomId}`);
    } else {
      alert("No video conference room available for this appointment.");
    }
  };

  // Function to approve an appointment and generate a video conference room
  const handleApproveAppointment = async (appointmentId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized: No token found');
      return;
    }

    try {
      // Approve appointment and get the room ID
      const response = await axios.put(`https://healt-link-v36m.onrender.com/api/auth/appointment-requests/${appointmentId}/approve`, null, {
        headers: {
          'x-auth-token': token,
        },
      });

      // Update the appointment with the room ID
      setAppointmentRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === appointmentId
            ? { ...request, status: 'approved', roomId: response.data.roomId }
            : request
        )
      );
    } catch (error) {
      console.error('Error approving appointment:', error);
      setError('Failed to approve appointment');
    }
  };

  useEffect(() => {
    const fetchAppointmentRequests = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Unauthorized: No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://healt-link-v36m.onrender.com/api/auth/appointment-requests", {
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

  const handleRejectAppointment = async (appointmentId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Unauthorized: No token found");
      return;
    }

    try {
      await axios.put(`https://healt-link-v36m.onrender.com/api/auth/appointment-requests/${appointmentId}/reject`, null, {
        headers: {
          'x-auth-token': token
        }
      });

      setAppointmentRequests(prevRequests =>
        prevRequests.map(request =>
          request._id === appointmentId ? { ...request, status: "rejected" } : request
        )
      );
    } catch (error) {
      console.error("Error rejecting appointment:", error);
      setError("Failed to reject appointment");
    }
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Appointment Requests</h2>
        {loading ? (
          <div>Loading...</div>
        
        ) : appointmentRequests.length === 0 ? (
          <div className="bg-white p-4 shadow rounded flex justify-center items-center">
            <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 mr-2" />
            <span>No appointment requests found.</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {appointmentRequests.map((appointment) => (
              <div
                key={appointment._id}
                className={`bg-white p-4 shadow rounded border-l-4 ${appointment.status === 'approved' ? 'border-green-500' : appointment.status === 'rejected' ? 'border-red-500' : 'border-gray-400'}`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold flex items-center">
                    <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 mr-2" />
                    <div className="text-lg font-bold flex items-center">
                      <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 mr-2" />
                      <span>{appointment.patient?.name || 'Unknown Patient'}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Email: {appointment.patient?.email || 'N/A'}
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Address: {appointment.patient?.age || 'N/A'}
                    </div>
                  </div>
                </div>
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
                <div className="mt-4 flex justify-end">
                  {appointment.status !== 'approved' && (
                    <>
                      <button
                        onClick={() => handleApproveAppointment(appointment._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectAppointment(appointment._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {appointment.status === 'approved' && (
                    <button
                      onClick={() => handleJoinVideoChat(appointment.roomId)}
                      className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded"
                    >
                      Join Video Conference
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorDashboard
