import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import { Grid, Paper, Container, Typography, ListItem, List, Button } from "@mui/material";
import Navbar from "./navbar";
import { container, listItem, paper, typography } from "./styles";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/api/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleVerify = async (uid) => {
    try {
      await axios.put(`/api/patients/verify/${uid}`);

      // Handle success or navigate to another screen
      navigate("HomeScreen");
    } catch (error) {
      console.error("Error verifying patient:", error);
      // Handle error as needed
    }
  };

  const handleUnverify = async (uid) => {
    try {
      await axios.put(`/api/patients/unverify/${uid}`);
    } catch (error) {
      console.error("Error unverifying patient:", error);
      // Handle error as needed
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Grid container spacing={3}>
          {/* UNVERIFIED PATIENTS */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={typography}>
              Unverified/New Patients
            </Typography>
            <Paper sx={paper}>
              <List>
                {patients.map((patient) => {
                  if (!patient.isVerified)
                    return (
                      <ListItem sx={listItem}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography>
                              Email: {patient.email} <br />
                              Name: {patient.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Button
                              variant="contained"
                              onClick={() => handleVerify(patient.uid)}
                            >
                              Verify
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                })}
              </List>
            </Paper>
          </Grid>

          {/* VERIFIED PATIENTS */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={typography}>
              Verified Patients
            </Typography>
            <Paper sx={paper}>
              <List>
                {patients.map((patient) => {
                  if (patient.isVerified)
                    return (
                      <ListItem sx={listItem}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography>
                              Name: {patient.name} <br />
                              Age: {patient.age} <br />
                              Gender: {patient.gender} <br />
                              Blood Group: {patient.bloodGroup}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Button
                              variant="contained"
                              onClick={() => handleUnverify(patient.uid)}
                            >
                              Unverify
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Patients;
