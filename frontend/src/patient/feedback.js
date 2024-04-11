import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

const Feedback = (props) => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`/api/doctors/${props.doctorUID}/feedbacks`);
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, [props.doctorUID]);

  return (
    <>
      {feedback.map((feed) => {
        if (props.meetingID === feed.id)
          return (
            <Typography key={feed.id}>
              {feed.rating}/5 <br />
              {feed.review}
            </Typography>
          );
      })}
    </>
  );
};

export default Feedback;
