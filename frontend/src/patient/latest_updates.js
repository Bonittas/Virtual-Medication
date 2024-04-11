import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Paper,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "./navbar";
import { container, transparentPaper, typography } from "./styles";

const Patient_Latest_Updates = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" sx={typography}>
              Latest Updates
            </Typography>
            <Paper sx={transparentPaper}>
              {posts.map((post) => (
                <div key={post.id} sx={{ width: "100%" }}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="h6" sx={{ width: "75%", flexShrink: 0 }}>
                        {post.title}
                      </Typography>
                      <Typography variant="subtitle2">
                        {new Date(post.createdAt).toLocaleString()}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <img src={post.imageURL} height="150vh" width="200vw" alt={post.title} />
                      <br />
                      <Typography variant="body">{post.body}</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <br />
                </div>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Patient_Latest_Updates;
