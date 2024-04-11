import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  Button,
  Grid,
  Box,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import Title from "./title";

const theme = createTheme();

const Complete_Details = (props) => {
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [nameError, setNameError] = useState("");
  const [bloodGroupError, setBloodGroupError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [countryError, setCountryError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError("");
    setAgeError("");
    setGenderError("");
    setAddressError("");
    setCityError("");
    setStateError("");
    setPincodeError("");
    setCountryError("");

    // Validate form fields
    if (!name) {
      setNameError("Name is Required");
      return;
    }
    if (!bloodGroup) {
      setBloodGroupError("Blood group is Required");
      return;
    }
    if (!age) {
      setAgeError("Age is Required");
      return;
    }
    if (!gender) {
      setGenderError("Gender is Required");
      return;
    }
    if (!address1 || !address2) {
      setAddressError("Address is Required");
      return;
    }
    if (!city) {
      setCityError("City is Required");
      return;
    }
    if (!state) {
      setStateError("State is Required");
      return;
    }
    if (!pincode) {
      setPincodeError("Pincode is Required");
      return;
    }
    if (!country) {
      setCountryError("Country is Required");
      return;
    }

    try {
      // Send data to backend API
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: props.uid,
          name,
          bloodGroup,
          age,
          gender,
          address1,
          address2,
          city,
          state,
          pincode,
          country,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      // You can perform any additional actions here after successful submission
      console.log("Data submitted successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {nameError && <Alert severity="error">{nameError}</Alert>}
          {bloodGroupError && <Alert severity="error">{bloodGroupError}</Alert>}
          {ageError && <Alert severity="error">{ageError}</Alert>}
          {genderError && <Alert severity="error">{genderError}</Alert>}
          {addressError && <Alert severity="error">{addressError}</Alert>}
          {cityError && <Alert severity="error">{cityError}</Alert>}
          {stateError && <Alert severity="error">{stateError}</Alert>}
          {pincodeError && <Alert severity="error">{pincodeError}</Alert>}
          {countryError && <Alert severity="error">{countryError}</Alert>}
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Title>Complete/Edit Your Details</Title>
              <Typography variant="subtitle1" gutterBottom>
                Changes will be reflected in your profile
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Name"
                name="Name"
                label="Name"
                fullWidth
                size="small"
                onChange={(e) => setName(e.target.value)}
                error={!!nameError}
              />
            </Grid>
            {/* Add other form fields similarly */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </ThemeProvider>
  );
};

export default Complete_Details;
