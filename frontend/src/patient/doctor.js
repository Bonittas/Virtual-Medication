import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import BookAppointment from "./book_appointment";
import Ratings from "../doctor/ratings";
import Reviews from "../doctor/reviews";

const Doctor = () => {
  const [doctor, setDoctor] = useState(null);
  const location = useLocation();
  const uid = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`/api/doctors/${uid}`);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctor();
  }, [uid]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        {doctor && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography align="center" variant="h4">
                {doctor.name}
              </Typography>
            </Grid>

            {/* AVATAR */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper>
                <Avatar
                  alt="Doctor's Profile Picture"
                  src={doctor.imageURL}
                  sx={{ width: 100, height: 100, m: 2 }}
                />
                <BookAppointment
                  doctorUID={uid}
                  startTime={doctor.startTime}
                  endTime={doctor.endTime}
                />
              </Paper>
            </Grid>

            {/* PROFILE */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper>
                <>
                  <Typography>Name: {doctor.name}</Typography>
                  <Typography>Medical Speciality: {doctor.medicalSpeciality}</Typography>
                  <Typography>Experience: {doctor.experience} years</Typography>
                  <Typography>Age: {doctor.age} years</Typography>
                  <Typography>Gender: {doctor.gender}</Typography>
                  <Typography>Degree: {doctor.degree}</Typography>
                  <Typography>
                    Address: {doctor.address1}, {doctor.address2}, {doctor.city}, {doctor.state}, {doctor.country}, {doctor.pincode}
                  </Typography>
                  <Typography>
                    Time Slot: {new Date(doctor.startTime.seconds * 1000).getHours()}:{new Date(doctor.startTime.seconds * 1000).getMinutes()}0 - {new Date(doctor.endTime.seconds * 1000).getHours()}:{new Date(doctor.endTime.seconds * 1000).getMinutes()}0 hrs
                  </Typography>
                </>
              </Paper>
            </Grid>

            {/* RATINGS */}
            <Grid item xs={12}>
              <Ratings uid={doctor.uid} />
            </Grid>

            {/* REVIEWS */}
            <Grid item xs={12}>
              <Reviews uid={doctor.uid} />
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Doctor;
