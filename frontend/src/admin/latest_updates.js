import { useState, useEffect } from "react";
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

const LatestUpdates = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
        console.log("Posts: ", response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Latest Updates
            </Typography>
            <Paper>
              {posts.map((post) => (
                <div key={post._id}>
                  <Accordion sx={{ width: "100%" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography
                        variant="h6"
                        sx={{ width: "75%", flexShrink: 0 }}
                      >
                        {post.title}
                      </Typography>
                      <Typography variant="subtitle2">
                        {new Date(post.createdAt).toLocaleDateString(
                          "en-US"
                        )},{" "}
                        {new Date(post.createdAt).getHours()}:
                        {new Date(post.createdAt).getMinutes()} hrs
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <img
                        src={`${post.imageURL}`}
                        height="150vh"
                        width="200vw"
                        alt="post"
                      />
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

export default LatestUpdates;
