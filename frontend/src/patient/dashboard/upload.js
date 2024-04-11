import React, { useState, useEffect } from "react";
import { Alert, Avatar, Button, LinearProgress } from "@mui/material";
import Title from "./title";
import { avatar } from "../styles";

const Upload = (props) => {
  const [patient, setPatient] = useState(null);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`/api/patients/${props.uid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }
        const patientData = await response.json();
        setPatient(patientData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPatient();
  }, [props.uid]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (image == null) {
      setImageError("Choose file before uploading!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", image);
      
      const response = await fetch(`/api/patients/${props.uid}/upload-image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setUrl(data.imageUrl);

      // Optionally update patient data with imageURL in MongoDB
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {patient && (
        <>
          <Title key={patient.uid}>{patient.name}</Title>
          <Avatar
            alt="Patient_Profile_Image"
            src={patient.imageURL}
            sx={avatar}
          />
          <br />
          {imageError && <Alert severity="error">{imageError}</Alert>}
          <br />
          <LinearProgress variant="determinate" value={progress} />
          <br />
          <input type="file" onChange={handleChange} />
          <br />
          <Button variant="contained" onClick={handleUpload}>
            Upload
          </Button>
        </>
      )}
    </>
  );
};

export default Upload;
