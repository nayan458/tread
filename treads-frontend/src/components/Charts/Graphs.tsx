import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Typography, Box } from '@mui/material';

interface GraphProp {
  data: JSON[],
  xaxis_title: string,
  yaxis_title: string,
  gene: string
}

const Graphs: React.FC<GraphProp> = ({data, xaxis_title, yaxis_title}) => {
  // Increase margins to accommodate titles
  return (
    data &&
    <Box className="w-full py-4">
      <Typography variant="subtitle1" align="center" gutterBottom className="px-8">
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
            marginRight: '8px'
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
              <Bar dataKey="nonDrugTarget" name="Non-Drug Target" fill="#2e8b57" fillOpacity={0.6} />
              <Bar dataKey="drugTarget" name="Drug Target" fill="#b0e0e6" fillOpacity={0.6} />
              <Bar dataKey="vdac1" name="vdac1" fill="#20b2aa" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Graphs;