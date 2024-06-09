import React, { useEffect, useState } from "react";
import Navbar from "./dashboard/dashboard";
import Footer from "../home/footer";
import axios from 'axios';
import AppointmentForm from "./bookAppointment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBriefcaseMedical,faPlusCircle,faLocation, faCalendarAlt, faClock, faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Doctors = () => {
  const [verifiedDoctors, setVerifiedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/doctors/verified', {
          headers: {
            'x-auth-token': token
          }
        });
        const data = response.data;
        setVerifiedDoctors(data.doctors);
        setFilteredDoctors(data.doctors);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch doctors data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowMoreDetails = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBookAppointment = () => {
    if (selectedDoctor) {
      setShowAppointmentForm(true);
    } else {
      // Optionally, you can handle this case by showing an error message or logging a message
      console.error("No doctor selected");
    }
  };
  

  const handleAppointmentSubmission = async (doctorId, modeOfConsultation, preferredDateTime, symptoms) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/auth/book-appointment', {
        doctorId,
        modeOfConsultation,
        preferredDateTime,
        symptoms
      }, {
        headers: {
          'x-auth-token': token
        }
      });
      setShowAppointmentForm(false);
      // Optionally, you can display a success message or perform any other action upon successful appointment booking
    } catch (error) {
      console.error('Error booking appointment:', error);
      // Handle error (e.g., display error message to the user)
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1);
    const filtered = verifiedDoctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query) ||
        (doctor.medicalSpeciality && doctor.medicalSpeciality.toLowerCase().includes(query)) // Add null check for medicalSpeciality
    );
    setFilteredDoctors(filtered);
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
    <div className="z-30">
      <Navbar />
      </div>
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
        <ul className="grid grid-cols-1 z-10 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {currentDoctors.map((doctor) => (
            <li
              key={doctor._id}
              className="bg-white rounded-lg shadow-lg p-6
              "
            >
              <h3 className="text-lg font-semibold mb-2">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                {doctor.name}
              </h3>
              <p className="text-gray-700 mb-2">
                <FontAwesomeIcon icon={faBriefcaseMedical} className="mr-2" />
                Medical Speciality: {doctor.medicalSpeciality}
              </p>
              <p className="text-gray-700 mb-2">
                Gender: {doctor.gender}
              </p>
              <p className="text-gray-700 mb-2">
                <FontAwesomeIcon icon={faLocation} className="mr-2" />
               Location: {doctor.address1},  {doctor.country}
              </p>
              <div className="flex justify-end">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white  pl-2 w-10 h-10 rounded-full"
                  onClick={() => handleShowMoreDetails(doctor)}
                >
                <FontAwesomeIcon icon={faPlusCircle} className="mr-2 w-7 h-7" />
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-1/2 my-4">
            <h2 className="text-xl font-semibold mb-4">Details of {selectedDoctor.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700 font-semibold">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                  Name:
                </p>
                <p className="text-gray-700">{selectedDoctor.name}</p>
              </div>
 
              <div>
                <p className="text-gray-700 font-semibold">
                  <FontAwesomeIcon icon={faBriefcaseMedical} className="mr-2" />
                  Medical Speciality:
                </p>
                <p className="text-gray-700 mb-2">Gender: {selectedDoctor.gender}</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  Age:
                </p>
                <p className="text-gray-700">{selectedDoctor.age}</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  Address:
                </p>
                <p className="text-gray-700">{selectedDoctor.address}</p>
              </div>
              {/* <div>
              <img
                src={`http://localhost:5000/${selectedDoctor.imageUrl}`}
                alt="Profile"
                className="rounded-md w-2/3 h-1/2 border-2 border-green-300 mx-auto "
              />
            </div> */}
              <p className="text-gray-700 mb-2">Gender: {selectedDoctor.gender}</p>
          <p className="text-gray-700 mb-2">Degree: {selectedDoctor.degree}</p>
          <p className="text-gray-700 mb-2">Registration Number: {selectedDoctor.regNumber}</p>
          <p className="text-gray-700 mb-2">Year of Registration: {selectedDoctor.yearOfReg}</p>
          <p className="text-gray-700 mb-2">State Medical Council: {selectedDoctor.stateMedicalCouncil}</p>
          <p className="text-gray-700 mb-2">Experience: {selectedDoctor.experience}</p>
          <p className="text-gray-700 mb-2">Address: {selectedDoctor.address1}, {selectedDoctor.address2}, {selectedDoctor.city}, {selectedDoctor.state}, {selectedDoctor.pincode}, {selectedDoctor.country}</p>
          <p className="text-gray-700 mb-2">Working Hours: {selectedDoctor.startTime} - {selectedDoctor.endTime}</p>
                      </div>
            <div className="flex justify-end mt-4">
<Link to='/payment'>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded "
              >
                Book Appointment
              </button>
              </Link>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 ml-2 rounded"
                onClick={() => setSelectedDoctor(null)}
              >
Close              </button>
            </div>
          </div>
        </div>
      )}
      
      {showAppointmentForm && (
        <AppointmentForm
          doctorId={selectedDoctor._id}
          onClose={() => setShowAppointmentForm(false)}
          onSubmit={handleAppointmentSubmission}
        />
      )}

      <Footer />
    </>
  );
};

export default Doctors;
