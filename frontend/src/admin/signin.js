import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  Box,
  Paper,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useState } from "react";
import axios from "axios"; // Use axios or any other library for making HTTP requests

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { box, signinGrid } from "./styles";

const theme = createTheme();

const Admin_Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleSignin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setEmailError("All fields are required!");
      return;
    }

    try {
      // Make HTTP POST request to your MERN backend's signin endpoint
      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });

      // Redirect to dashboard upon successful signin
      navigate("/admin/dashboard");
    } catch (err) {
      // Handle errors
      console.error("Signin failed:", err.response.data.message);
      setEmailError("Invalid credentials");
      setPasswordError("Invalid credentials");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={signinGrid} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={box}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Admin Sign in
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSignin}
              sx={{ mt: 1 }}
            >
              {/* ERROR ALERTS */}
              {emailError && <Alert severity="error">{emailError}</Alert>}
              {passwordError && <Alert severity="error">{passwordError}</Alert>}

              {/* EMAIL TEXTFIELD */}
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
                error={emailError}
              />

              {/* PASSWORD TEXTFIELD */}
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
                error={passwordError}
              />

              {/* SIGN IN BUTTON */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
            <Typography>
              Lost credentials? Kindly contact the office.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Admin_Signin;
