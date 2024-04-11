import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for HTTP requests

import {
  createTheme,
  ThemeProvider,
  Typography,
  CircularProgress,
} from "@mui/material";
import Complete_Details from "./complete_details";
import Edit_Details from "./edit_details/edit_details";

const theme = createTheme();

const Form = (props) => {
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCHING DOCTOR'S DATA FROM DB
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`/api/doctors/${props.uid}`);
        setDoctorData(response.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [props.uid]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!doctorData) {
    return <Typography variant="h6">Doctor data not found</Typography>;
  }

  const { isVerified } = doctorData;

  return (
    <ThemeProvider theme={theme}>
      {isVerified === "false" ? (
        <Complete_Details uid={props.uid} />
      ) : isVerified === "pending" ? (
        <Typography variant="h6">Verification is pending by Admin</Typography>
      ) : (
        <Edit_Details uid={props.uid} />
      )}
    </ThemeProvider>
  );
};

export default Form;
