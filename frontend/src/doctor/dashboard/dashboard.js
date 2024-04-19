import { Grid, Paper, Container } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../navbar";
import { container, paper } from "../styles";
import { upload } from "../../patient/styles";
import { Dashboard } from '@mui/icons-material/Dashboard';

const Doctor_Dashboard = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Grid container spacing={3}>
          {/* UPLOAD PROFILE IMAGE */}
         <p>Welcome to Doctor Dashboard</p>
        </Grid>
      </Container>
    </>
  );
};

export default Doctor_Dashboard;
