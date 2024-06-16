import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Box,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios"; 
import { signUp } from "../actions/doctor_authActions";
import { box, signupGrid } from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const Doctor_Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const NAME_REGEX = /^[A-Za-z]+$/;

  const handleSignup = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setEmailError("");
    setNameError("");
  
    if (name === "") {
      setNameError("Name is required");
      return;
    }
  
    if (!NAME_REGEX.test(name.trim())) {
      setNameError("Name should contain only alphabetic characters");
      return;
    }
  
    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("Please enter a valid email address");
      return;
    }
  
    if (password === "") {
      setPasswordError("Password is required");
      return;
    }
  
    if (!PASSWORD_REGEX.test(password)) {
      setPasswordError("Password must contain at least 8 characters, including uppercase, lowercase, and numbers");
      return;
    }
  
    if (password !== cpassword) {
      setPasswordError("Passwords do not match");
      return;
    }
  
    try {
      await dispatch(signUp(name, email, password)); 
      setSuccessMessage("Sign up successful! Redirecting to login page...");
      setTimeout(() => {
        navigate("/doctor-signin");
      }, 2000);
    } catch (error) {
      console.error("Error during signup:", error);
      // Show signup failed error message
      setSuccessMessage("");
      setNameError("Signup failed. Please try again later.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={signupGrid} />
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <Box sx={box}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Doctor Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSignup}>
              {successMessage && <Alert severity="success">{successMessage}</Alert>}
              {nameError && <Alert severity="error">{nameError}</Alert>}
              {emailError && <Alert severity="error">{emailError}</Alert>}
              {passwordError && <Alert severity="error">{passwordError}</Alert>}

              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    name="Name"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    value={name}
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                    error={Boolean(nameError)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(emailError)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={Boolean(passwordError)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Confirm Password"
                    type="password"
                    id="cpassword"
                    autoComplete="confirm-password"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
              >
                Sign Up
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/doctor-signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Doctor_Signup;
