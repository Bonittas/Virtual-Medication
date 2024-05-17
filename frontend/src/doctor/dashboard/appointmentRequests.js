import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCalendarCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Nav from "./dashboard"
const DoctorDashboard = () => {
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [rejectedAppointments, setRejectedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPatientId, setExpandedPatientId] = useState(null);

  useEffect(() => {
    const fetchAppointmentRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/appointment-requests");
        setAppointmentRequests(response.data.appointmentRequests);
        setApprovedAppointments(response.data.appointmentRequests.filter(request => request.status === "approved"));
        setRejectedAppointments(response.data.appointmentRequests.filter(request => request.status === "rejected"));
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch appointment requests");
        setLoading(false);
      }
    };

    fetchAppointmentRequests();
  }, []);

  const handleApproveAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/appointment-requests/${appointmentId}/approve`);
      setAppointmentRequests(prevRequests =>
        prevRequests.map(request =>
          request._id === appointmentId ? { ...request, status: "approved" } : request
        )
      );
      // Update the approved appointments state
      setApprovedAppointments(prevApproved => [
        ...prevApproved,
        appointmentRequests.find(request => request._id === appointmentId),
      ]);
      // Remove the approved appointment from rejectedAppointments if exists
      setRejectedAppointments(prevRejected =>
        prevRejected.filter(request => request._id !== appointmentId)
      );
    } catch (error) {
      console.error("Error approving appointment:", error);
    }
  };
  const togglePatientProfile = (patientId) => {
    setExpandedPatientId((prevId) => (prevId === patientId ? null : patientId));
  };
  const handleRejectAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/appointment-requests/${appointmentId}/reject`);
      setAppointmentRequests(prevRequests =>
        prevRequests.map(request =>
          request._id === appointmentId ? { ...request, status: "rejected" } : request
        )
      );
      // Update the rejected appointments state
      setRejectedAppointments(prevRejected => [
        ...prevRejected,
        appointmentRequests.find(request => request._id === appointmentId),
      ]);
      // Remove the rejected appointment from approvedAppointments if exists
      setApprovedAppointments(prevApproved =>
        prevApproved.filter(request => request._id !== appointmentId)
      );
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
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
    <><Nav/>
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
              className="bg-white p-4 shadow rounded border-l-4 border-gray-400"
            >
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold flex items-center">
                  <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 mr-2" />
                  <span>{appointment.patient.name}</span>
                </div>
                <button
                  onClick={() => togglePatientProfile(appointment.patient._id)}
                  className="text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  {expandedPatientId === appointment.patient._id ? "Hide Profile" : "View Profile"}
                </button>
              </div>
              {expandedPatientId === appointment.patient._id && (
  <div className="mt-4 bg-gray-200 w-1/2 rounded p-4">
    <div>Name: {appointment.patient.name}</div>
    <div>Email: {appointment.patient.email}</div>
    <div>Age: {appointment.patient.age}</div>
    <div>Gender: {appointment.patient.gender}</div>
    <div>Address: {appointment.patient.address1}</div>
    <div>Country: {appointment.patient.country}</div>
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
