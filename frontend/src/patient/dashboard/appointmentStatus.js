import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/auth/patient/appointments",
          {
            headers: {
              "x-auth-token": token,
            }
          }
        );
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

  const filteredAppointments = appointments.filter(appointment =>
    appointment.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastAppointment = currentPage * itemsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderJoinMeetingLink = (appointment) => {
    if (appointment.status === "approved" ) {
      return (
        <button
          onClick={() => window.open(`/video-room/${appointment.roomId}`, "_blank")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faVideo} className="mr-2" />
          Join Meeting
        </button>
      );
    } else {
      return null;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-6">Your Appointments</h2>
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={handleSearch}
            className="mb-6 px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-1/2"
          />
        </div>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentAppointments.map((appointment) => (
                <li
                  key={appointment._id}
                  className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-semibold text-lg mb-2">Doctor: {appointment.doctor.name}</div>
                    <div className="text-gray-700 mb-1">Date: {appointment.date}</div>
                    <div className="text-gray-700 mb-1">Time: {appointment.time}</div>
                    <div className={`text-sm font-medium mb-2 ${appointment.status === "approved" ? "text-green-600" : "text-red-600"}`}>Status: {appointment.status}</div>
                  </div>
                  {renderJoinMeetingLink(appointment)}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredAppointments.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="inline-flex space-x-2">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-lg ${currentPage === number ? "bg-green-500 text-white" : "bg-white text-gray-700 border border-gray-300"} transition-colors duration-300`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PatientAppointments;
