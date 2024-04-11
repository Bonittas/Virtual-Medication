import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Chat from "./chat";
import Prescription from "./prescription";
import Feedback from "./feedback";

const Controls = () => {
  const [meetings, setMeetings] = useState([]);
  const location = useLocation();
  const meetingCode = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get("/api/meetings");
        setMeetings(response.data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };
    fetchMeetings();
  }, []);

  const currentMeeting = meetings.find((meeting) => meeting.meetingID === meetingCode);

  return (
    <>
      {currentMeeting && (
        <>
          <Chat meetingID={currentMeeting.meetingID} />
          <Prescription meetingID={currentMeeting.meetingID} />
          <Feedback meetingID={currentMeeting.meetingID} />
        </>
      )}
    </>
  );
};

export default Controls;
