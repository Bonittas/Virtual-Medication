
// Modified Controls.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./chat";
import Prescription from "./prescrption";

const Controls = () => {
  const [meetings, setMeetings] = useState([]);
  const [props, setProps] = useState({});
  const [meetingCode, setMeetingCode] = useState(""); // Define meetingCode

  useEffect(() => {
    axios.get("/api/meetings").then((response) => {
      setMeetings(response.data);
    });
  }, []);

  useEffect(() => {
    meetings.forEach((meeting) => {
      if (meeting.meetingID === meetingCode) {
        setProps({
          meetingID: meeting.meetingID,
          doctorUID: meeting.doctorUID,
          patientUID: meeting.patientUID,
        });
      }
    });
  }, [meetings, meetingCode]);

  return (
    <>
      {meetings.map((meeting) => {
        if (meeting.meetingID === meetingCode)
          return (
            <>
              <Chat {...props} />
              <Prescription {...props} />
              {/* Include other components here */}
            </>
          );
      })}
    </>
  );
};

export default Controls;
