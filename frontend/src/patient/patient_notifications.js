import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { Button, Container, List, ListItem, Typography } from "@mui/material";

const Patient_Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Fetching notifications from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/patient/notifications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // You may need to include any necessary authentication tokens here
          // For example:
          // Authorization: `Bearer ${token}`,
        });
        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications);
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Typography variant="h4" align="center">
          Notifications
        </Typography>
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id}>
              {/* Render notification details */}
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Patient_Notifications;
