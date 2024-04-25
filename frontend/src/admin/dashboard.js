import React from "react";
import { Grid, Paper, Container, Typography } from "@mui/material";
import Navbar from "./navbar";
import { container, paper, typography } from "./styles";

const Admin_Dashboard = () => {
  const handleNavigation = (route) => {
    // Navigate to the specified route
    // Implement navigation logic here
    console.log("Navigating to", route);
  };

  return (
    <>
      <div className="mb-4"><Navbar /> </div>
      <Container maxWidth="lg" sx={container}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" sx={typography}>
              ADMIN DASHBOARD
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={paper}>
              <Typography variant="h6">
                <b>Your job is to: </b>
                <br />
                Verify doctors by visiting the National Medical Council Page{" "}
                <br />
                Keep a check on patients <br />
                Create new posts/updates for all users <br />
                Read feedbacks and respond to them!
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Admin_Dashboard;
