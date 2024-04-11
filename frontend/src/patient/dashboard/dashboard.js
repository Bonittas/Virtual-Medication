import React, { useEffect, useState } from "react";
import { Grid, Paper, Container } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../navbar";
import Form from "./form";
import Upload from "./upload";
import { container, paper, upload } from "../styles";

const Patient_Dashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    // Redirect to login page if currentUser is null
    // You can use the useHistory hook here to redirect
    // Example: history.push("/login");
    return null;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Grid container spacing={3}>
          {/* UPLOAD PROFILE PICTURE */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper sx={upload}>
              <Upload uid={currentUser.uid} />
            </Paper>
          </Grid>

          {/* UPDATE DETAILS */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={paper}>
              <Form uid={currentUser.uid} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Patient_Dashboard;
