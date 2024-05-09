import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../actions/admin/admin_authActions"
import { box, signinGrid } from "./styles";
import {
  Avatar,
  Button,
  CssBaseline,
  Box,
  Link,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const Admin_Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const authError = useSelector((state) => state.auth.error);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    if (email === "") {
      setEmailError("Email is required");
      return;
    }
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
      navigate("/admin-dashboard"); // Redirect to dashboard upon successful login
    } catch (error) {
      console.error("Sign in error:", error);
      setEmailError("Login error");
      setEmailError("Incorrect email or password. Please try again.");
  };
}
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={signinGrid} />
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <Box sx={box}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
             Admin Sign in
            </Typography>

            <Box component="form" noValidate onSubmit={handleSignin} sx={{ mt: 1 }}>
              {emailError && <Alert severity="error">{emailError}</Alert>}
              {passwordError && <Alert severity="error">{passwordError}</Alert>}
              {loginSuccess && <Alert severity="success">Login successful!</Alert>}

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

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>

              <Typography
                component="h1"
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold" }}
              ></Typography>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
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

export default Admin_Signin;
