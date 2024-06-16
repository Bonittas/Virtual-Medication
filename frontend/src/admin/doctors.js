import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewDoctors, verifyDoctor, unverifyDoctor } from "../actions/admin/viewDoctors";
import Navbar from "./navbar";
import Footer from "../home/footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const Doctors = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector((state) => state.doctors);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust as needed
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [expandedDoctorId, setExpandedDoctorId] = useState(null);

  useEffect(() => {
    // Fetch doctors data when component mounts
    dispatch(viewDoctors());
  }, [dispatch]);

  // Filter doctors based on search query
  useEffect(() => {
    if (!doctors || doctors.length === 0) {
      // Check if doctors array is empty or undefined
      setFilteredDoctors([]);
    } else if (searchQuery.trim() === "") {
      // If search query is empty, display all doctors
      setFilteredDoctors(doctors);
    } else {
      // Otherwise, filter based on search query
      const filtered = doctors.filter((doctor) =>
        (doctor.name && doctor.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (doctor.email && doctor.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (doctor.specialization && doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredDoctors(filtered);
    }
  }, [searchQuery, doctors]);

  const handleVerify = (doctorId) => {
    dispatch(verifyDoctor(doctorId));
  };

  const handleUnverify = (doctorId) => {
    dispatch(unverifyDoctor(doctorId));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };

  // Pagination logic
  const indexOfLastDoctor = currentPage * itemsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - itemsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleDetails = (doctorId) => {
    setExpandedDoctorId(expandedDoctorId === doctorId ? null : doctorId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <h1 className="text-3xl mt-24 text-center font-bold text-blue-900">Registered Doctors</h1>
        <div className="flex justify-center my-6">
          <input
            type="text"
            placeholder="Search Doctors..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border bg-white border-gray-300 rounded-full px-4 py-2 w-2/3"
          />
        </div>
        {currentDoctors.length === 0 ? (
          <div className="text-center text-gray-500">No doctors found.</div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mx-6 bg-white rounded-lg shadow-lg">
              {currentDoctors.map((doctor) => (
                <li key={doctor._id} className="p-6 flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={`http://localhost:5000/images/profilePictures/${doctor.imageUrl}`} alt={doctor.name} className="w-20 h-20 rounded-full mr-4" />
                      <div>
                        <div className="text-lg font-semibold text-blue-900">{doctor.name}</div>
                        <div className="text-gray-600 py-2">Medical Speciality: {doctor.medicalSpeciality}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {doctor.verified ? (
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                          onClick={() => handleUnverify(doctor._id)}
                        >
                          <FontAwesomeIcon icon={faTimes} /> Unverify
                        </button>
                      ) : (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                          onClick={() => handleVerify(doctor._id)}
                        >
                          <FontAwesomeIcon icon={faCheck} /> Verify
                        </button>
                      )}
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                        onClick={() => toggleDetails(doctor._id)}
                      >
                        <FontAwesomeIcon icon={expandedDoctorId === doctor._id ? faEyeSlash : faEye} /> {expandedDoctorId === doctor._id ? "Hide" : "View Profile"}
                      </button>
                    </div>
                  </div>
                  {expandedDoctorId === doctor._id && (
                    <div className="mt-4 bg-blue-50 flex-cols justify-center items-center rounded-lg shadow-lg p-6 ">
                      <div className="space-y-2 flex  justify-between">
                        <div>
                        <div className="text-gray-600 py-2">Email: {doctor.email}</div>
                        <div className="text-gray-600 py-2">Medical Speciality: {doctor.medicalSpeciality}</div>
                        <div className="text-gray-600 py-2">Age: {doctor.age}</div>
                        <div className="text-gray-600 py-2">Gender: {doctor.gender}</div>
                        </div>
                        <div>
                        <div className="text-gray-600 py-2">Degree: {doctor.degree}</div>
                        <div className="text-gray-600 py-2">Registration Number: {doctor.regNumber}</div>
                        <div className="text-gray-600 py-2">Year of Registration: {doctor.yearOfReg}</div>
                        <div className="text-gray-600 py-2">State Medical Council: {doctor.stateMedicalCouncil}</div>
                        </div>
                        <div>
                        <div className="text-gray-600 py-2">Experience: {doctor.experience}</div>
                        <div className="text-gray-600 py-2">Address: {doctor.address1}, {doctor.address2}, {doctor.city}, {doctor.state}, {doctor.pincode}, {doctor.country}</div>
                        <div className="text-gray-600 py-2">Working Hours: {doctor.startTime} - {doctor.endTime}</div>
                        <div className="px-3 py-2">
                          {doctor.cvUrl ? (
                            <a
                              href={`http://localhost:5000/cvs/${doctor.cvUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-green-500 hover:text-green-700 transition-colors duration-200"
                            >
                              <div className="flex items-center">
                                <svg
                                  className="w-24 h-24 mr-2"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <div>View CV (PDF)</div>
                              </div>
                            </a>
                          ) : (
                            <p className="text-gray-600 py-2">No CV uploaded</p>
                          )}
                        </div>
                        </div>

                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="my-8 flex justify-center">
              <nav>
                <ul className="pagination flex space-x-2">
                  {Array.from({ length: Math.ceil(filteredDoctors.length / itemsPerPage) }, (_, i) => (
                    <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                      <button
                        onClick={() => paginate(i + 1)}
                        className={`page-link focus:outline-none rounded-full px-3 py-1 ${i + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-200'}`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Doctors;
