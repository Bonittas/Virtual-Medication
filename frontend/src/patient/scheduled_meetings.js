import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios"; // Import Axios for HTTP requests
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { container, listItem, typography } from "./styles";

const Patient_Scheduled_Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    axios.get(`/api/meetings/${currentUser.uid}`) // Fetch meetings for current user
      .then((response) => {
        setMeetings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
      });
  }, [currentUser.uid]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Typography align="center" variant="h4" sx={typography}>
          Your Scheduled Appointments
        </Typography>
        <List>
          {meetings.map((meeting) => (
            <ListItem sx={listItem} key={meeting._id}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={9}>
                  <Typography>
                    Meeting ID: {meeting.meetingID} <br />
                    Scheduled At: {new Date(meeting.scheduledAt).toLocaleString()}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Button
                    variant="contained"
                    target="_blank"
                    href={`/patient/room/${meeting.meetingID}`}
                  >
                    Join
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

export default Patient_Scheduled_Meetings;
