import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Nav from './dashboard'
const ViewPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Change this value as needed

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("Unauthorized: No token found");
                    setLoading(false);
                    return;
                }
                const res = await axios.get('http://localhost:5000/api/auth/prescriptions', {
                    headers: {
                        'x-auth-token': token
                    }
                });
                setPrescriptions(res.data);
            } catch (err) {
                console.error('Error fetching prescriptions:', err);
            }
        };

        fetchPrescriptions();
    }, []);

    // Function to perform pagination
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Function to filter prescriptions based on search term
    const filteredPrescriptions = prescriptions.filter(prescription =>
        prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get current prescriptions based on pagination
    const indexOfLastPrescription = currentPage * itemsPerPage;
    const indexOfFirstPrescription = indexOfLastPrescription - itemsPerPage;
    const currentPrescriptions = filteredPrescriptions.slice(indexOfFirstPrescription, indexOfLastPrescription);

    // Function to generate a random role number
    const generateRoleNumber = () => {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return (
      <><Nav/>
        <div className="relative top-32 container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">PAst Appointments</h2>
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="border border-gray-300 px-4 py-2 w-64 mr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setSearchTerm('')}>
                    Clear
                </button>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-gray-200">
                        {/* <th className="border px-4 py-2">Role Number</th> */}
                        <th className="border px-4 py-2">Patient Name</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Time</th>
                        <th className="border px-4 py-2">Disease</th>
                        <th className="border px-4 py-2">Blood Pressure</th>
                        <th className="border px-4 py-2">Medications</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPrescriptions.map((prescription) => (
                        <tr key={prescription._id}>
                            {/* <td className="border px-4 py-2">{prescription.roleNumber}</td> */}
                            <td className="border px-4 py-2">{prescription.patientName}</td>
                            <td className="border px-4 py-2">{new Date(prescription.date).toLocaleDateString()}</td>
                            <td className="border px-4 py-2">{prescription.time}</td>
                            <td className="border px-4 py-2">{prescription.disease}</td>
                            <td className="border px-4 py-2">{prescription.bloodPressure}</td>
                            <td className="border px-4 py-2">
                                <ul>
                                    {prescription.medications.map(med => (
                                        <li key={med.name}>{med.name} ({med.dosage}, {med.frequency})</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredPrescriptions.length === 0 && <p className="mt-4">No past appointment found.</p>}
            <div className="mt-4 flex justify-between items-center">
                <div>
                    <button
                        className={`bg-green-500 text-white px-4 py-2 rounded mr-2 ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <button
                        className={`bg-green-500 text-white px-4 py-2 rounded ${currentPrescriptions.length < itemsPerPage && 'opacity-50 cursor-not-allowed'}`}
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPrescriptions.length < itemsPerPage}
                    >
                        Next
                    </button>
                </div>
                <span className="text-green-500">Page {currentPage}</span>
            </div>
        </div>
        </>
    );
};

export default ViewPrescriptions;
