import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const Gender = (props) => {
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
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
      await axios.put(`/api/patients/${props.uid}`, {
        gender: gender,
        updatedAt: new Date(),
      });
      setOpen(false);
    } catch (error) {
      console.error("Error updating gender:", error);
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
        <DialogTitle id="scroll-dialog-title">Edit Gender</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="gender"
                    name="gender"
                    label="Gender"
                    fullWidth
                    select
                    autoComplete="gender"
                    size="small"
                    onChange={handleChangeGender}
                  >
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
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

export default Gender;
