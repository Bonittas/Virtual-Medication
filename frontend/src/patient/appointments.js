import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

const Appointments = (props) => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/doctors/${props.doctorUID}/patients/${props.patientUID}/prescriptions`);
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {prescriptions.map((prescription) => {
        if (prescription.appointmentID === props.appointmentID)
          return <Typography>{prescription.prescription}</Typography>;
      })}
    </>
  );
};

export default Appointments;
