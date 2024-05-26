import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using axios for API requests
import {
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../../../contexts/AuthContext";

const Chat = (props) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  // Functions to open and close dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Fetch all messages from your Express API
  useEffect(() => {
    axios.get(`/api/chats/${props.meetingID}`).then((response) => {
      setChats(response.data);
    });
  }, [props.meetingID]);

  // Send message function
  const sendMessage = (e) => {
    e.preventDefault();

    // Push message to your Express API
    axios
      .post(`/api/chats/${props.meetingID}`, {
        message: message,
        senderEmail: currentUser.email,
        senderUid: currentUser.uid,
        sentAt: new Date(),
      })
      .then(() => {
        setMessage("");
      });
  };

  return (
    <div>
      {/* Chat button */}
      <Tooltip title="Chat" placement="top">
        <IconButton onClick={handleClickOpen} style={{ color: "#ffffff" }}>
          <ChatIcon />
        </IconButton>
      </Tooltip>

      {/* Chat dialog box */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">CHAT</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <List>
              {chats.map((chat, index) => (
                <ListItem key={index} style={{ margin: "0" }}>
                  <Typography>
                    {chat.senderEmail}
                    <p>
                      <b>{chat.message}</b>
                    </p>
                  </Typography>
                </ListItem>
              ))}
            </List>
          </DialogContentText>

          {/* Form to send message */}
          <form onSubmit={sendMessage}>
            <TextField
              id="filled-basic"
              color="primary"
              placeholder="Enter message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <Button type="submit" startIcon={<SendIcon />} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Chat;
