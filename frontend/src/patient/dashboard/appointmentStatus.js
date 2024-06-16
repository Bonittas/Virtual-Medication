import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./dashboard";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://healt-link-v36m.onrender.com/api/auth/patient/appointments",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
  
        console.log("Appointments Data:", response.data.appointments);
        setAppointments(response.data.appointments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };
  
    fetchAppointments();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleJoinVideoChat = (roomId, appointmentId) => {
    if (roomId) {
      console.log(`Attempting to join room for Appointment ID: ${appointmentId}, Room ID: ${roomId}`);
      navigate('/patient');
    } else {
      console.error(`No video conference room available for this appointment. Appointment ID: ${appointmentId}`);
    }
  };
  
  const filteredAppointments = appointments.filter((appointment) => {
    if (appointment && appointment.doctor && appointment.date && appointment.status) {
      return (
        appointment.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return false;
  });

  const indexOfLastAppointment = currentPage * itemsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (filteredAppointments.length === 0) {
    return <p>No appointments found.</p>;
  }
  
  return (
    <div>
      <Nav />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
        <div className="mb-4 flex justify-center items-center w-full">
          <input
            type="text"
            placeholder="Search appointments"
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border rounded w-1/2"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Doctor</th>
                <th className="border border-gray-400 px-4 py-2">Date</th>
                <th className="border border-gray-400 px-4 py-2">Status</th>
                <th className="border border-gray-400 px-4 py-2">Join Video Conference</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.map((appointment) => (
                <tr key={appointment._id || appointment.id}>
                  <td className="border border-gray-400 px-4 py-2">{appointment.doctor?.name}</td>
                  <td className="border border-gray-400 px-4 py-2">{new Date(appointment.preferredDateTime).toLocaleString()}</td>
                  <td className={`border border-gray-400 px-4 py-2 ${appointment.status === "approved" ? "text-green-500" : appointment.status === "rejected" ? "text-red-500" : "text-yellow-500"}`}>
                    {appointment.status}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {appointment.status === 'approved' && (
                           <Link to ='/patient'> 
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Join Video Conference
                      </button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            className="px-4 py-2 mx-1 border rounded"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage < Math.ceil(filteredAppointments.length / itemsPerPage) ? currentPage + 1 : Math.ceil(filteredAppointments.length / itemsPerPage))}
            className="px-4 py-2 mx-1 border rounded"
            disabled={currentPage === Math.ceil(filteredAppointments.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;
