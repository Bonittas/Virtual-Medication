import React, { useState } from "react";
import axios from "axios"; // Import Axios for HTTP requests

import {
  Button,
  Grid,
  Box,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

const Complete_Details = (props) => {
  const [name, setName] = useState("");
  const [medicalSpeciality, setMedicalSpeciality] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [degree, setDegree] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [yearOfReg, setYearOfReg] = useState("");
  const [stateMedicalCouncil, setStateMedicalCouncil] = useState("");
  const [experience, setExperience] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [error, setError] = useState("");

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/doctors/${props.uid}/details`, {
        name,
        medicalSpeciality,
        age,
        gender,
        degree,
        regNumber,
        yearOfReg,
        stateMedicalCouncil,
        experience,
        address1,
        address2,
        city,
        state,
        pincode,
        country,
        startTime,
        endTime,
      });
      // Handle successful update, e.g., show a success message
    } catch (error) {
      setError("Failed to update details.");
    }
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Complete/Edit Your Details</Typography>
            <Typography variant="subtitle1" gutterBottom>
              Be careful while editing the important details!
            </Typography>
          </Grid>
          {/* Other input fields */}
          {/* ... */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Start-Time"
                value={startTime}
                onChange={handleStartTimeChange}
                renderInput={(params) => (
                  <TextField
                    required
                    fullWidth
                    size="small"
                    {...params}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          {/* EDIT END TIME */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="End-Time"
                value={endTime}
                onChange={handleEndTimeChange}
                renderInput={(params) => (
                  <TextField
                    required
                    fullWidth
                    size="small"
                    {...params}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default Complete_Details;
