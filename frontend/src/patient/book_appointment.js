import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const BookAppointment = (props) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("");
  const [mode, setMode] = useState("");
  const [timeSlot, setTimeSlot] = useState(new Date());
  const [symptoms, setSymptoms] = useState("");
  const [timeError, setTimeError] = useState("");
  const { currentUser } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
    setScroll("paper");
    setTimeError("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const descriptionElement = document.getElementById("scroll-dialog-description");
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      timeSlot.getHours() < new Date(props.startTime.seconds * 1000).getHours() ||
      timeSlot.getHours() > new Date(props.endTime.seconds * 1000).getHours()
    ) {
      setTimeError("Please enter time in the time slot of the doctor!");
    } else {
      try {
        await axios.post("/api/appointments", {
          mode,
          timeSlot,
          symptoms,
          doctorUID: props.doctorUID,
          patientUID: currentUser.uid,
        });
        setOpen(false);
      } catch (error) {
        console.error("Error creating appointment:", error);
      }
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Book Appointment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{ sx: { position: "fixed", top: 0, m: 0 } }}
      >
        <DialogTitle id="scroll-dialog-title">Book Appointment</DialogTitle>
        <form onSubmit={handleSubmit}>
          {timeError && <Alert severity="error">{timeError}</Alert>}
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              {/* Form fields */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Book</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default BookAppointment;
