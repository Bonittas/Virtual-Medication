import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
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

const Chat = (props) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/api/meetings/${props.meetingID}/chats`, {
        message: message,
        senderEmail: currentUser.email,
        senderUid: currentUser.uid,
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`/api/meetings/${props.meetingID}/chats`);
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, [props.meetingID]);

  return (
    <div>
      <Tooltip title="Chat" placement="top">
        <IconButton onClick={handleClickOpen} style={{ color: "#ffffff" }}>
          <ChatIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">CHAT</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <List>
              {chats.map((chat, index) => (
                <ListItem key={index}>
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
          <form onSubmit={sendMessage}>
            <TextField
              id="filled-basic"
              color="primary"
              placeholder="Enter message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
