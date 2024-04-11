import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { Button, Container,Grid, List, ListItem, Typography } from "@mui/material";
import { container, listItem, typography } from "./styles";
import Appointments from "./appointments";
import Feedback from "./feedback";

const Past_Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetching appointments from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/appointments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // You may need to include any necessary authentication tokens here
          // For example:
          // Authorization: `Bearer ${token}`,
        });
        if (response.ok) {
          const data = await response.json();
          setAppointments(data.appointments);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Typography variant="h4" align="center">
          Past Appointments
        </Typography>
        <List>
          {appointments.map((appointment) => (
                <ListItem sx={listItem}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <b>Mode:</b> {appointment.mode} <br />
                      <b>Slot:</b>{" "}
                      {new Date(
                        appointment.timeSlot.seconds * 1000
                      ).toLocaleDateString("en-US")}
                      ,
                      {new Date(
                        appointment.timeSlot.seconds * 1000
                      ).getHours()}
                      :
                      {new Date(
                        appointment.timeSlot.seconds * 1000
                      ).getMinutes()}
                      <br />
                      <b>Symptoms:</b> {appointment.symptoms}
                    </Typography>
                    <Typography>
                      <b>Prescription: </b>
                      <Appointments
                        appointmentID={appointment.id}
                        doctorUID={appointment.doctorUID}
                        patientUID={appointment.patientUID}
                      />
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <b>Feedback: </b>
                      <Feedback
                        appointmentID={appointment.id}
                        doctorUID={appointment.doctorUID}
                        patientUID={appointment.patientUID}
                      />
                    </Typography>

                    <Button
                      variant="contained"
                      href={`/doctor_profile/${appointment.doctorUID}`}
                      target="_blank"
                    >
                      See Doctor
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Past_Appointments;
