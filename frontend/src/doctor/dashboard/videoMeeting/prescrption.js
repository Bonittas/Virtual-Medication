import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using axios for API requests
import {
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import MedicationIcon from "@mui/icons-material/Medication";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../../../contexts/AuthContext";

const Prescription = (props) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const [prescription, setPrescription] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  var doctorName = "";
  var doctorSpeciality = "";
  var patientName = "";
  var patientAge = "";
  var patientGender = "";

  var date = new Date().toLocaleDateString("en-US");

  // Fetch doctors from your Express API
  useEffect(() => {
    axios.get("/api/doctors").then((response) => {
      setDoctors(response.data);
    });
  }, []);

  // Fetch patients from your Express API
  useEffect(() => {
    axios.get("/api/patients").then((response) => {
      setPatients(response.data);
    });
  }, []);

  // Fetch prescriptions from your Express API
  useEffect(() => {
    axios.get(`/api/prescriptions/${props.meetingID}`).then((response) => {
      setPrescriptions(response.data);
    });
  }, [props.meetingID]);

  // Functions to open and close dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Send prescription function
  const sendPrescription = (e) => {
    e.preventDefault();

    // Push prescription to your Express API
    axios
      .post(`/api/prescriptions/${props.meetingID}`, {
        prescription: prescription,
        senderUid: props.doctorUID,
        senderEmail: currentUser.email,
        sentAt: new Date(),
        appointmentID: props.meetingID,
      })
      .then(() => {
        setPrescription("");
      });
  };

  // Download prescription function
  const downloadPrescription = () => {
    // Your download logic here
  };

  return (
    <div>
      {/* Prescription button */}
      <Tooltip title="Prescription" placement="top">
        <IconButton onClick={handleClickOpen} style={{ color: "#ffffff" }}>
          <MedicationIcon />
        </IconButton>
      </Tooltip>

      {/* Prescription dialog box */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">PRESCRIPTION</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <List>
              <ListItem style={{ margin: "0" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {currentUser.email}
                </Typography>
              </ListItem>
              {prescriptions.map((prescript, index) => (
                <ListItem key={index} style={{ margin: "0" }}>
                  <Typography>{prescript.prescription}</Typography>
                </ListItem>
              ))}
            </List>
          </DialogContentText>

          {/* Form to write prescription */}
          <form onSubmit={sendPrescription}>
            <TextField
              id="outlined"
              required
              label="Prescription"
              color="primary"
              placeholder="Enter prescription..."
              value={prescription}
              onChange={(e) => {
                setPrescription(e.target.value);
              }}
            />
            <Button type="submit" startIcon={<SendIcon />} />
          </form>
        </DialogContent>
        <DialogActions>
          {/* Download report button */}
          <Button
            onClick={downloadPrescription}
            style={{
              textTransform: "none",
              margin: "2%",
            }}
            // startIcon={<DownloadIcon />}
          >
            Download Prescription
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Prescription;
