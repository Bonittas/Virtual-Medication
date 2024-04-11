import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import { Alert, Avatar, Button, LinearProgress } from "@mui/material";
import Title from "./title";
import { avatar } from "../styles";

const Upload = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState("");

  // FETCHING DOCTOR'S DATA FROM DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchData();
  }, []);

  // FUNCTION TO HANDLE CHANGE IN IMAGE SELECTED TO UPLOAD
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // FUNCTION TO HANDLE UPLOAD OF IMAGE TO DB AND STORAGE
  const handleUpload = async () => {
    if (image == null) {
      setImageError("Choose file before uploading!");
      return; // Exit the function if no image is selected
    }

    try {
      // Implement your API call to upload image to the server and update the doctor's document
      // Replace '/api/upload' with the correct endpoint URL
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setProgress(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      });

      setUrl(response.data.imageUrl);
      setImageError("");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <React.Fragment>
      {doctors.map((doctor) => {
        if (doctor.uid === props.uid)
          return (
            <React.Fragment key={doctor.uid}>
              {/* DOCTOR'S NAME */}
              <Title>{doctor.name}</Title>

              {/* DOCTOR'S PROFILE PICTURE */}
              <Avatar alt="Doctor_Profile_Image" src={doctor.imageURL} sx={avatar} />
              <br />
              {imageError && <Alert severity="error">{imageError}</Alert>}
              <br />
              {/* UPLOADING IMAGE PROGRESS BAR */}
              <LinearProgress variant="determinate" value={progress} />
              <br />
              {/* FILE INPUT OPTION */}
              <input type="file" onChange={handleChange} />
              <br />
              {/* UPLOAD IMAGE BUTTON */}
              <Button variant="contained" onClick={handleUpload}>
                Upload
              </Button>
            </React.Fragment>
          );
        return null; // Ensure a unique key is provided for each child in an array or iterator
      })}
    </React.Fragment>
  );
};

export default Upload;
