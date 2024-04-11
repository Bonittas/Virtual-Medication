import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IconButton,
  Button,
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
import DownloadIcon from "@mui/icons-material/Download";
import { jsPDF } from "jspdf";

const Prescription = (props) => {
  const [open, setOpen] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`/api/meetings/${props.meetingID}/prescriptions`);
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };
    fetchPrescriptions();
  }, [props.meetingID]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadPrescription = () => {
    var doc = new jsPDF();
    var i = 20;
    var j = 120;
    var date = new Date().toLocaleDateString("en-US");

    doc.setFontSize("15");
    doc.addImage("/images/Medicare.png", "PNG", 5, 5, 200, 15);
    doc.text("Date: ", 20, 30);
    doc.text(date, 50, 30);

    prescriptions.forEach((prescript) => {
      doc.text(prescript.prescription, i, j);
      j += 10;
    });

    doc.save("doctor_prescription.pdf");
  };

  return (
    <div>
      <Tooltip title="Prescription" placement="top">
        <IconButton onClick={handleClickOpen} style={{ color: "#ffffff" }}>
          <MedicationIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">PRESCRIPTION</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <List>
              {prescriptions.map((prescript, index) => (
                <ListItem key={index}>
                  <Typography>{prescript.prescription}</Typography>
                </ListItem>
              ))}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={downloadPrescription}
            style={{ textTransform: "none", margin: "2%" }}
            startIcon={<DownloadIcon />}
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
