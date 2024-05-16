import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewDoctors } from "../actions/admin/viewDoctors";
import Navbar from "./dashboard/dashboard";
import Footer from "../home/footer";
import AppointmentForm from "./bookAppointment";

const Doctors = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector((state) => state.doctors);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false); // Track if appointment form is shown

  useEffect(() => {
    dispatch(viewDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (!doctors || doctors.length === 0) {
      setFilteredDoctors([]);
    } else if (searchQuery.trim() === "") {
      const verifiedDoctors = doctors.filter((doctor) => doctor.verified === true);
      setFilteredDoctors(verifiedDoctors);
    } else {
      const filtered = doctors.filter(
        (doctor) =>
          doctor.verified === true &&
          (doctor.name && doctor.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (doctor.email && doctor.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (doctor.specialization && doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredDoctors(filtered);
    }
  }, [searchQuery, doctors]);

  const handleShowMoreDetails = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBookAppointment = () => {
    setShowAppointmentForm(true); // Show appointment form when "Book Appointment" button is clicked
  };

  const handleAppointmentSubmission = () => {
    // Handle appointment submission
    setShowAppointmentForm(false); // Hide appointment form after submission
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastDoctor = currentPage * itemsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - itemsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="text-3xl mt-10 mb-6 text-center font-bold">Verified Doctors</h1>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search Doctors..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-1/2"
          />
        </div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentDoctors.map((doctor) => (
            <li
              key={doctor._id}
              className="bg-white rounded-lg shadow-lg p-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <h3 className="text-lg font-semibold mb-2">{doctor.name}</h3>
              <p className="text-gray-700 mb-2">Medical Speciality: {doctor.medicalSpeciality}</p>
              <p className="text-gray-700 mb-2">Age: {doctor.age}</p>
              <p className="text-gray-700 mb-2">Gender: {doctor.gender}</p>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => handleShowMoreDetails(doctor)}
                >
                  More Details
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2"
                  onClick={() => handleBookAppointment()}
                >
                  Book Appointment
                </button>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="my-8 flex justify-center">
          <nav>
            <ul className="pagination flex">
              {Array.from({ length: Math.ceil(filteredDoctors.length / itemsPerPage) }, (_, i) => (
                <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`page-link focus:outline-none rounded-md px-3 py-1 mx-1 ${i + 1 === currentPage ? 'bg-blue-200' : 'bg-gray-200 hover:bg-blue-50'}`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      
      {selectedDoctor && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Details of {selectedDoctor.name}</h2>
          <p className="text-gray-700 mb-2">Name: {selectedDoctor.name}</p>
          <p className="text-gray-700 mb-2">Medical Speciality: {selectedDoctor.medicalSpeciality}</p>
          <p className="text-gray-700 mb-2">Age: {selectedDoctor.age}</p>
          <p className="text-gray-700 mb-2">Gender: {selectedDoctor.gender}</p>
          <p className="text-gray-700 mb-2">Degree: {selectedDoctor.degree}</p>
          <p className="text-gray-700 mb-2">Registration Number: {selectedDoctor.regNumber}</p>
          <p className="text-gray-700 mb-2">Year of Registration: {selectedDoctor.yearOfReg}</p>
          <p className="text-gray-700 mb-2">State Medical Council: {selectedDoctor.stateMedicalCouncil}</p>
          <p className="text-gray-700 mb-2">Experience: {selectedDoctor.experience}</p>
          <p className="text-gray-700 mb-2">Address: {selectedDoctor.address1}, {selectedDoctor.address2}, {selectedDoctor.city}, {selectedDoctor.state}, {selectedDoctor.pincode}, {selectedDoctor.country}</p>
          <p className="text-gray-700 mb-2">Working Hours: {selectedDoctor.startTime} - {selectedDoctor.endTime}</p>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setSelectedDoctor(null)}
            >
              Close Details
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2"
              onClick={() => handleBookAppointment()}
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
      
      {showAppointmentForm && (
        <AppointmentForm
          doctor={selectedDoctor}
          onClose={() => setShowAppointmentForm(false)}
          onSubmit={handleAppointmentSubmission}
        />
      )}
      
      <Footer />
    </>
  );
};

export default Doctors;
