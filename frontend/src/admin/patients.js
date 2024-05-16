import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, verifyPatient, unverifyPatient } from "../actions/admin/viewPatients";
import Navbar from "./navbar";
import Footer from "../home/footer"

const Patients = () => {
  const dispatch = useDispatch();
  const { patients, loading, error } = useSelector(state => state.patients);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust as needed
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPatients(patients); // Initialize filtered patients with all patients
  }, [patients]); // Update filtered patients when patients change

  const handleVerify = async (patientId) => {
    try {
      await dispatch(verifyPatient(patientId));
      // Update the local state immediately after dispatching the verify action
      setFilteredPatients(prevPatients =>
        prevPatients.map(patient =>
          patient._id === patientId ? { ...patient, verified: true } : patient
        )
      );
    } catch (error) {
      console.error('Error verifying patient:', error);
    }
  };
  
  const handleUnverify = async (patientId) => {
    try {
      await dispatch(unverifyPatient(patientId));
      // Update the local state immediately after dispatching the unverify action
      setFilteredPatients(prevPatients =>
        prevPatients.map(patient =>
          patient._id === patientId ? { ...patient, verified: false } : patient
        )
      );
    } catch (error) {
      console.error('Error unverifying patient:', error);
    }
  };
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset current page when search query changes
    filterPatients(e.target.value);
  };

  const filterPatients = (query) => {
    if (!query.trim()) {
      // If search query is empty, display all patients
      setFilteredPatients(patients);
    } else {
      // Otherwise, filter based on search query
      setFilteredPatients(patients.filter(patient =>
        (patient.name && patient.name.toLowerCase().includes(query.toLowerCase())) ||
        (patient.email && patient.email.toLowerCase().includes(query.toLowerCase()))
      ));
    }
  };

  // Pagination logic
  const indexOfLastPatient = currentPage * itemsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

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
        <h1 className="text-2xl mt-32 text-center font-bold m-4">Registered Patients</h1>
        <div className="flex justify-center  m-4">
          <input
            type="text"
            placeholder="Search Patients..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border bg-blue-50 border-gray-400 rounded-full px-3 py-2 w-2/3"
          />
        </div>
        {currentPatients.length === 0 ? (
          <div>No patients found.</div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 m-6 ">
              {currentPatients.map((patient) => (
                <li key={patient._id} className="bg-blue-50 border m-4 w-full rounded-md px-4 py-8 flex items-center">
                  <div className="flex-1">
                    <div className="text-lg font-semibold">{patient.name}</div>
                    <div className="text-sm text-gray-500">Email: {patient.email}</div>
                    <div className="text-sm text-gray-500">Medical Speciality: {patient.medicalSpeciality}</div>
                    <div className="text-sm text-gray-500">Age: {patient.age}</div>
                    <div className="text-sm text-gray-500">Gender: {patient.gender}</div>
                    <div className="text-sm text-gray-500">Degree: {patient.degree}</div>
                    <div className="text-sm text-gray-500">Registration Number: {patient.regNumber}</div>
                    <div className="text-sm text-gray-500">Year of Registration: {patient.yearOfReg}</div>
                    <div className="text-sm text-gray-500">State Medical Council: {patient.stateMedicalCouncil}</div>
                    <div className="text-sm text-gray-500">Experience: {patient.experience}</div>
                    <div className="text-sm text-gray-500">Address: {patient.address1}, {patient.address2}, {patient.city}, {patient.state}, {patient.pincode}, {patient.country}</div>
                    <div className="text-sm text-gray-500">Working Hours: {patient.startTime} - {patient.endTime}</div>
                    <div><img src={`http://localhost:5000/uploads/${patient.imageUrl}`} alt={patient.name} className="w-20 h-20 rounded-full mx-auto" />
                    </div>
                    </div>
                  <div>
                    {patient.verified ? (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white text-center px-4 py-2 w-20 rounded mr-2"
                        onClick={() => handleUnverify(patient._id)}
                      >
                        Unverify
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 w-20  rounded mr-2"
                        onClick={() => handleVerify(patient._id)}
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
                  {Array.from({ length: Math.ceil(filteredPatients.length / itemsPerPage) }, (_, i) => (
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
      <div className="bg-blue-950">
    <Footer/>
    </div>
    </>
  );
};

export default Patients;
