import React, { useState, useEffect } from "react";
import axios from "axios";
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

const BPGraph = (props) => {
  const [sugarLevels, setSugarLevels] = useState([]);

  useEffect(() => {
    const fetchSugarLevels = async () => {
      try {
        const response = await axios.get(`/api/patients/${props.uid}/bloodSugarLevel`);
        setSugarLevels(response.data);
      } catch (error) {
        console.error("Error fetching blood sugar levels:", error);
      }
    };

    fetchSugarLevels();
  }, [props.uid]);

  const data = sugarLevels.map((sugar) => ({
    date: new Date(sugar.sentAt.seconds * 1000).toLocaleDateString("en-US"),
    sugarLevel: sugar.sugarLevel,
  }));

  return (
    <React.Fragment>
      <Title>Blood Sugar Level</Title>
      <ResponsiveContainer width="100%">
        <LineChart data={data} margin={{ top: 16, right: 16, bottom: 0, left: 24 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
              Sugar-Level (mg/dL)
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="sugarLevel"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default BPGraph;
