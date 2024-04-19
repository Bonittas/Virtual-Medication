// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { viewPatients, verifyPatient, unverifyPatient} from "../actions/admin/viewPatients";
// import Navbar from "./navbar";

// const Patients = () => {
//   const dispatch = useDispatch();
//   const { patients, loading, error } = useSelector(state => state.patients);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5); // Adjust as needed
//   const [filteredPatients, setFilteredPatients] = useState([]);

//   useEffect(() => {
//     // Fetch doctors data when component mounts
//     dispatch(viewPatients());
//   }, [dispatch]);

//   // Filter doctors based on search query
//   useEffect(() => {
//     if (!patients || patients.length === 0) {
//       // Check if doctors array is empty or undefined
//       setFilteredPatients([]);
//     } else if (searchQuery.trim() === "") {
//       // If search query is empty, display all doctors
//       setFilteredPatients(patients);
//     } else {
//       // Otherwise, filter based on search query
//       const filtered = patients.filter(doctor =>
//         (patient.name && patient.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         (patient.email && patient.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         (patient.specialization && patient.specialization.toLowerCase().includes(searchQuery.toLowerCase()))
//       );
//       setFilteredPatients(filtered);
//     }
//   }, [searchQuery, patients]);

//   const handleVerify = (patientId) => {
//     dispatch(verifyPatient(patientId));
//   };

//   const handleUnverify = (patientId) => {
//     dispatch(unverifyPatient(patientId));
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1); // Reset current page when search query changes
//   };

//   // Pagination logic
//   const indexOfLastPatient = currentPage * itemsPerPage;
//   const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
//   const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <div>
//         <h1 className="text-2xl mt-32 text-center font-bold m-4">Registered Doctors</h1>
//         <div className="flex justify-center  m-4">
//           <input
//             type="text"
//             placeholder="Search Doctors..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="border bg-blue-50 border-gray-400 rounded-full px-3 py-2 w-2/3"
//           />
//         </div>
//         {currentPatients.length === 0 ? (
//           <div>No doctors found.</div>
//         ) : (
//           <>
//             <ul className="divide-y divide-gray-200 m-6 ">
//               {currentPatients.map((patient) => (
//                 <li key={patient._id} className="bg-blue-50 border m-4 w-full rounded-md px-4 py-8 flex items-center">
//                   <div className="flex-1">
//                     <div className="text-lg font-semibold">{patient.name}</div>
//                     <div className="text-sm text-gray-500">{patient.email}</div>
//                     <div className="text-sm text-gray-500">{patient.specialization}</div>
//                   </div>
//                   <div>
//                     {patient.verified ? (
//                       <button
//                         className="bg-red-500 hover:bg-red-600 text-white text-center px-4 py-2 w-20 rounded mr-2"
//                         onClick={() => handleUnverify(patient._id)}
//                       >
//                         Unverify
//                       </button>
//                     ) : (
//                       <button
//                         className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 w-20  rounded mr-2"
//                         onClick={() => handleVerify(patient._id)}
//                       >
//                         Verify
//                       </button>
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <div className="my-8 flex justify-center">
//   <nav>
//     <ul className="pagination flex">
//       {Array.from({ length: Math.ceil(filteredPatients.length / itemsPerPage) }, (_, i) => (
//         <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
//           <button
//             onClick={() => paginate(i + 1)}
//             className={`page-link focus:outline-none rounded-md px-3 py-1 mx-1 ${i + 1 === currentPage ? 'bg-blue-200' : 'bg-gray-200 hover:bg-blue-50'}`}
//           >
//             {i + 1}
//           </button>
//         </li>
//       ))}
//     </ul>
//   </nav>
// </div>

//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Patients;
