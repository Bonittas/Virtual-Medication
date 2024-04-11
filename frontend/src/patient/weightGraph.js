import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Title from "./dashboard/title";

function createData(date, weight) {
  return { date, weight };
}

const WeightGraph = (props) => {
  const theme = useTheme();
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    const fetchWeights = async () => {
      try {
        const response = await axios.get(`/api/patients/${props.uid}/weights`);
        setWeights(response.data);
      } catch (error) {
        console.error("Error fetching weights:", error.message);
      }
    };
    fetchWeights();
  }, [props.uid]);

  const data = weights.map((weight) => {
    return createData(
      new Date(weight.sentAt.seconds * 1000).toLocaleDateString("en-US"),
      weight.weight
    );
  });

  return (
    <React.Fragment>
      <Title>Weight</Title>
      <ResponsiveContainer width="100%">
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Weight (kg)
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="weight"
            activeDot={{ r: 8 }}
            stroke={theme.palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default WeightGraph;
