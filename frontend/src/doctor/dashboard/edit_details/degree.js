import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const Degree = (props) => {
  const [open, setOpen] = useState(false);
  const [degree, setDegree] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Implement your API call to update the doctor's degree
      const response = await axios.put(`/api/doctors/${props.uid}`, {
        degree: degree,
        updatedAt: new Date(),
      });
      console.log("Doctor's degree updated successfully:", response.data);
      setOpen(false);
    } catch (error) {
      console.error("Error updating doctor's degree:", error);
    }
  };

  return (
    <>
      <Button startIcon={<EditIcon />} onClick={handleClickOpen}></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { position: "fixed", top: 0, m: 0 } }}
      >
        <DialogTitle>Edit Degree</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
              <Grid container spacing={1}>
                {/* EDIT DEGREE */}
                <Grid item xs={12}>
                  <TextField
                    required
                    id="Degree"
                    name="Degree"
                    label="Degree"
                    fullWidth
                    size="small"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Edit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Degree;
