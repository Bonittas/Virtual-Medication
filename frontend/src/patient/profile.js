import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { Container, Typography, Grid, Paper, Avatar } from "@mui/material";
import axios from "axios"; // Import Axios for HTTP requests
import BPGraph from "./bpGraph";
import WeightGraph from "./weightGraph";
import Title from "./dashboard/title";
import { upload, paper, avatar } from "./styles";

const Patient_Profile = () => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const response = await axios.get("/api/patient/profile");
        if (response.status === 200) {
          setPatient(response.data);
        } else {
          console.error("Failed to fetch patient profile");
        }
      } catch (error) {
        console.error("Error fetching patient profile:", error);
      }
    };
    fetchPatientProfile();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        {patient && (
          <Grid container spacing={3}>
            {/* PATIENT'S PROFILE IMAGE */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper sx={upload}>
                <Title>{patient.name}</Title>
                <Avatar
                  alt="Patient_Profile_Image"
                  src={patient.imageURL}
                  sx={avatar}
                />
              </Paper>
            </Grid>

            {/* PATIENT'S PROFILE */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper sx={paper}>
                <Title>Profile</Title>
                <Typography sx={{ fontStyle: "italic" }}>
                  (You can update these details by going to the dashboard tab)
                </Typography>
                <Typography>Name: {patient.name}</Typography>
                <Typography>Age: {patient.age}</Typography>
                <Typography>Gender: {patient.gender}</Typography>
                <Typography>Blood Group: {patient.bloodGroup}</Typography>
                <Typography>
                  Address: {patient.address1}, {patient.address2},{" "}
                  {patient.city}, {patient.state}, {patient.country}
                </Typography>
                <Typography>Pincode: {patient.pincode}</Typography>
                <Typography variant="subtitle2">
                  Last updated at:{" "}
                  {new Date(patient.updatedAt).toLocaleString()}
                </Typography>
              </Paper>
            </Grid>

            {/* GRAPHS */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 275,
                }}
              >
                <BPGraph uid={patient.uid} />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 275,
                }}
              >
                <WeightGraph uid={patient.uid} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Patient_Profile;
