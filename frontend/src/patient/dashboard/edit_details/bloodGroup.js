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
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const BloodGroup = (props) => {
  const [open, setOpen] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("");

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
      await axios.put(`/api/patients/${props.uid}`, {
        bloodGroup: bloodGroup,
        updatedAt: new Date(),
      });
      setOpen(false);
    } catch (error) {
      console.error("Error updating blood group:", error);
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
        <DialogTitle>Edit BloodGroup</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="BloodGroup"
                    name="BloodGroup"
                    label="BloodGroup"
                    fullWidth
                    size="small"
                    onChange={(e) => setBloodGroup(e.target.value)}
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

export default BloodGroup;
