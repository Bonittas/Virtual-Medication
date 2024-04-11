import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  Box,
  Paper,
  Link,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios"; // Import Axios for HTTP requests
import { signIn } from "../actions/patient_authActions";
import { box, signinGrid } from "./styles";

const theme = createTheme();

const Patient_Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authError = useSelector((state) => state.auth.error);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
  
    const handleSignin = async (e) => {
      e.preventDefault();
      setEmailError("");
      setPasswordError("");
    
      if (email === "") {
        setEmailError("Email is required");
        return;
      }
    
      // Regular expression for email validation
      const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.match(emailFormat)) {
        setEmailError("Please enter a valid email address");
        return;
      }
    
      if (password === "") {
        setPasswordError("Password is required");
        return;
      }
    
      try {
        await dispatch(signIn(email, password));
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setEmailError(error.response.data.message);
        } else {
          setEmailError("An error occurred. Please try again later.");
        }
      }
    };
    
  
    useEffect(() => {
      if (isLoggedIn) {
        navigate("/patient/dashboard");
      }
    }, [isLoggedIn, navigate]);
  


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={signinGrid} />
        <Grid item xs={12} sm={8} md={5}  elevation={6} square>
          <Box sx={box}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Patient Sign in
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSignin}
              sx={{ mt: 1 }}
            >
              {authError && <Alert severity="error">{authError}</Alert>}
              {emailError && <Alert severity="error">{emailError}</Alert>}
              {passwordError && <Alert severity="error">{passwordError}</Alert>}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(emailError)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(passwordError)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Typography
                component="h1"
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
              </Typography>

             

              <Grid container>
             
                <Grid item>
                  <Link href="/patient-signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default Patient_Signin;
