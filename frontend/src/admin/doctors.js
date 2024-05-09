import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewDoctors, verifyDoctor, unverifyDoctor } from "../actions/admin/viewDoctors";
import Navbar from "./navbar";
const Doctors = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector(state => state.doctors);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust as needed
  const [filteredDoctors, setFilteredDoctors] = useState([]);

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
      const filtered = doctors.filter(doctor =>
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-2xl mt-32 text-center font-bold m-4">Registered Doctors</h1>
        <div className="flex justify-center  m-4">
          <input
            type="text"
            placeholder="Search Doctors..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border bg-blue-50 border-gray-400 rounded-full px-3 py-2 w-2/3"
          />
        </div>
        {currentDoctors.length === 0 ? (
          <div>No doctors found.</div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 m-6 ">
              {currentDoctors.map((doctor) => (
                <li key={doctor._id} className="bg-blue-50 border m-4 w-full rounded-md px-4 py-8 flex items-center">
                  <div className="flex-1">
                    <div className="text-lg font-semibold">{doctor.name}</div>
                    <div className="text-sm text-gray-500">Email: {doctor.email}</div>
                    <div className="text-sm text-gray-500">Medical Speciality: {doctor.medicalSpeciality}</div>
                    <div className="text-sm text-gray-500">Age: {doctor.age}</div>
                    <div className="text-sm text-gray-500">Gender: {doctor.gender}</div>
                    <div className="text-sm text-gray-500">Degree: {doctor.degree}</div>
                    <div className="text-sm text-gray-500">Registration Number: {doctor.regNumber}</div>
                    <div className="text-sm text-gray-500">Year of Registration: {doctor.yearOfReg}</div>
                    <div className="text-sm text-gray-500">State Medical Council: {doctor.stateMedicalCouncil}</div>
                    <div className="text-sm text-gray-500">Experience: {doctor.experience}</div>
                    <div className="text-sm text-gray-500">Address: {doctor.address1}, {doctor.address2}, {doctor.city}, {doctor.state}, {doctor.pincode}, {doctor.country}</div>
                    <div className="text-sm text-gray-500">Working Hours: {doctor.startTime} - {doctor.endTime}</div>
                    <div><img src={`http://localhost:5001/${doctor.imageUrl}`} alt={doctor.name} className="w-20 h-20 rounded-full mx-auto" />
                    </div>
                </div>
                  <div>
                    {doctor.verified ? (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white text-center px-4 py-2 w-20 rounded mr-2"
                        onClick={() => handleUnverify(doctor._id)}
                      >
                        Unverify
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 w-20  rounded mr-2"
                        onClick={() => handleVerify(doctor._id)}
                      >
                        Verify
                      </button>
                    )}
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
          </>
        )}
      </div>
    </>
  );
};

export default Doctors;
