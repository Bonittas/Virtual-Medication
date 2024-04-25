import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for HTTP requests

import {
  createTheme,
  ThemeProvider,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import Title from "../title";
import Age from "./age";
import Address from "./address";
import Degree from "./degree";
import Experience from "./experience";
import TimeSlot from "./timeSlot";

const theme = createTheme();

const Edit_Details = (props) => {
  const [doctorData, setDoctorData] = useState(null);

  // FETCHING DOCTOR'S DATA FROM SERVER
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`/api/doctors/${props.uid}`);
        setDoctorData(response.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [props.uid]);

  if (!doctorData) {
    return <Typography variant="h6">Doctor data not found</Typography>;
  }

  const { name, gender, medicalSpeciality, experience, age, degree, address1, address2, city, state, country, pincode, startTime, endTime, updatedAt } = doctorData;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Title>Your Profile has been verified!</Title>
            <Typography variant="subtitle2" gutterBottom>
              (You can still edit your details)
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>Name: {name}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>Gender: {gender}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>
              Medical Speciality: {medicalSpeciality}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={10}>
                <Typography>
                  Experience: {experience} years
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Experience uid={props.uid} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={10}>
                <Typography>Age: {age} years</Typography>
              </Grid>
              <Grid item xs={2}>
                <Age uid={props.uid} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={10}>
                <Typography>Degree: {degree}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Degree uid={props.uid} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={10}>
                <Typography>
                  Address: {address1}, {address2},
                  <br />
                  {city}, {state}, {country},{" "}
                  {pincode}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Address uid={props.uid} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={10}>
                <Typography>
                  Time Slot :{" "}
                  {new Date(startTime * 1000).getHours()}:
                  {new Date(startTime * 1000).getMinutes()}
                  0 - {new Date(endTime * 1000).getHours()}
                  :{new Date(endTime * 1000).getMinutes()}0
                  hrs
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TimeSlot uid={props.uid} />
              </Grid>
            </Grid>
          </Grid>

          <br />
          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Last updated at:
              {new Date(updatedAt * 1000).toLocaleDateString("en-US")}
              ,{new Date(updatedAt * 1000).getHours()}:
              {new Date(updatedAt * 1000).getMinutes()}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Edit_Details;
