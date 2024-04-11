import React, { useState, useEffect } from "react";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notifications = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetching unread count from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/notifications", {
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
          setUnreadCount(data.unreadCount);
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
    <Badge badgeContent={unreadCount} color="error">
      <NotificationsIcon />
    </Badge>
  );
};

export default Notifications;
