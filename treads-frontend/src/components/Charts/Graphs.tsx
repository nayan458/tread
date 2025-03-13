import React, { useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Typography, Box } from '@mui/material';

interface GraphProp {
  data: JSON[];
  xaxis_title: string;
  yaxis_title: string;
  gene: string;
}

const Graphs: React.FC<GraphProp> = ({
  data,
  xaxis_title,
  yaxis_title,
  gene,
}) => {
  const geneDataKey = gene.toLowerCase();

  useEffect(() => {
    if (data && data.length > 0) {
      console.log('First data item:', data[0]);
      console.log('Available keys:', Object.keys(data[0]));
      console.log('Looking for gene key:', geneDataKey);
      console.log('Value exists?', geneDataKey in data[0]);
    }
  }, [data, geneDataKey]);

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <Box className="w-full py-4">
      <Typography
        variant="subtitle1"
        align="center"
        gutterBottom
        className="px-8"
      >
        {xaxis_title}
      </Typography>

      <Box className="flex">
        {/* Y-axis title on the left */}
        <Typography
          variant="subtitle1"
          sx={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            textAlign: 'center',
            marginRight: '8px',
          }}
        >
          {yaxis_title}
        </Typography>

        {/* Chart container */}
        <Box className="flex-grow h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 30,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="nonDrugTarget"
                name="Non-Drug Target"
                fill="#2e8b57"
                fillOpacity={0.6}
              />
              <Bar
                dataKey="drugTarget"
                name="Drug Target"
                fill="#b0e0e6"
                fillOpacity={0.6}
              />
              {/* Must use the lowercase key exactly as it appears in the data */}
              <Bar
                dataKey={geneDataKey}
                name={gene} // Keep the display name as the original gene ID
                fill="#20b2aa"
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Graphs;
