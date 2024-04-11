import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CompleteDetails from "./complete_details";
import EditDetails from "./edit_details/edit_details";

const theme = createTheme();

const Form = (props) => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`/api/patients/${props.uid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }
        const data = await response.json();
        setPatient(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [props.uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      {patient.isVerified === "false" ? (
        <CompleteDetails patient={patient} />
      ) : (
        <EditDetails patient={patient} />
      )}
    </ThemeProvider>
  );
};

export default Form;
