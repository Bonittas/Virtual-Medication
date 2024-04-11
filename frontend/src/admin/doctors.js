import { useState, useEffect } from "react";
import axios from "axios";

import {
  Grid,
  Paper,
  Container,
  Typography,
  ListItem,
  List,
  Button,
} from "@mui/material";
import Navbar from "./navbar";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleVerify = async (email) => {
    try {
      await axios.put(`/api/doctors/verify/${email}`);
      console.log("Doctor verified successfully!");
    } catch (error) {
      console.error("Error verifying doctor:", error);
    }
  };

  const handleUnverify = async (email) => {
    try {
      await axios.put(`/api/doctors/unverify/${email}`);
      console.log("Doctor unverified successfully!");
    } catch (error) {
      console.error("Error un-verifying doctor:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">Unverified Doctors</Typography>
            <Paper>
              <List>
                {doctors.map((doctor) => (
                  <ListItem key={doctor._id}>
                    <Typography>
                      Name: {doctor.name} <br />
                      Age: {doctor.age} years <br />
                      Gender: {doctor.gender} <br />
                      Medical Speciality: {doctor.medicalSpeciality} <br />
                      Degree: {doctor.degree} <br />
                      Experience: {doctor.experience} years <br />
                      Reg. No.: {doctor.regNumber} <br />
                      State Medical Council: {doctor.stateMedicalCouncil}{" "}
                      <br />
                      Address: {doctor.address1}, {doctor.address2},{" "}
                      {doctor.city}, {doctor.state}, {doctor.country},{" "}
                      {doctor.pincode}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleVerify(doctor.email)}
                    >
                      Verify
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5">Verified Doctors</Typography>
            <Paper>
              <List>
                {doctors.map((doctor) => (
                  <ListItem key={doctor._id}>
                    <Typography>
                      Name: {doctor.name} <br />
                      Age: {doctor.age} years <br />
                      Gender: {doctor.gender} <br />
                      Medical Speciality: {doctor.medicalSpeciality} <br />
                      Degree: {doctor.degree} <br />
                      Experience: {doctor.experience} years <br />
                      Reg. No.: {doctor.regNumber} <br />
                      State Medical Council: {doctor.stateMedicalCouncil}{" "}
                      <br />
                      Address: {doctor.address1}, {doctor.address2},{" "}
                      {doctor.city}, {doctor.state}, {doctor.country},{" "}
                      {doctor.pincode}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleUnverify(doctor.email)}
                    >
                      Unverify
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Doctors;
