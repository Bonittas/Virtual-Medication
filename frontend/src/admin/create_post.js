import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Container,
  LinearProgress,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import Navbar from "./navbar";
import { container, paper, typography } from "./styles";
import axios from "axios"; // Use axios or any other library for making HTTP requests

const Create_Post = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("image", image);

      // Make HTTP POST request to your MERN backend's create post endpoint
      await axios.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/latest-updates");
    } catch (error) {
      console.error("An error occurred:", error);
      // handleGeneralError(error); // Handle unexpected errors
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Typography variant="h4" align="center" sx={typography}>
          Create Post
        </Typography>
        <Paper sx={paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                id="Title"
                name="Title"
                label="Title"
                fullWidth
                size="small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="Body"
                name="Body"
                label="Body"
                fullWidth
                multiline
                size="small"
                rows={10}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={progress} />
              <br />
              <input type="file" onChange={handleChange} />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" onClick={handleCreate}>
                Create
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default Create_Post;
