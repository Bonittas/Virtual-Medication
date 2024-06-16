import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PatientProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`http://localhost:5000/api/auth/patients/${id}` ,
        {
          headers: {
            'x-auth-token': token,
          },
        });
        setPatient(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch patient:", error);
        setError("Failed to fetch patient details");
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Patient Profile</h2>
      <p>Name: {patient.name}</p>
      <p>Email: {patient.email}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default PatientProfile;
