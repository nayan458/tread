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

const Graphs: React.FC = () => {
  const data = [
    { name: 'A', nonDrugTarget: 39.23, drugTarget: 40.35, vdac1: 21 },
    { name: 'C', nonDrugTarget: 12.92, drugTarget: 12.83, vdac1: 2 },
    { name: 'D', nonDrugTarget: 26.37, drugTarget: 27.84, vdac1: 14 },
    { name: 'E', nonDrugTarget: 40.33, drugTarget: 37.45, vdac1: 15 },
    { name: 'F', nonDrugTarget: 19.94, drugTarget: 23.37, vdac1: 14 },
    { name: 'G', nonDrugTarget: 36.34, drugTarget: 40.02, vdac1: 32 },
    { name: 'H', nonDrugTarget: 14.89, drugTarget: 13.86, vdac1: 3 },
    { name: 'I', nonDrugTarget: 23.64, drugTarget: 28.10, vdac1: 11 },
    { name: 'K', nonDrugTarget: 32.30, drugTarget: 31.28, vdac1: 25 },
    { name: 'L', nonDrugTarget: 55.76, drugTarget: 56.74, vdac1: 28 },
    { name: 'M', nonDrugTarget: 11.67, drugTarget: 13.56, vdac1: 3 },
    { name: 'N', nonDrugTarget: 19.86, drugTarget: 21.54, vdac1: 19 },
    { name: 'P', nonDrugTarget: 35.88, drugTarget: 33.05, vdac1: 6 },
    { name: 'Q', nonDrugTarget: 27.27, drugTarget: 24.17, vdac1: 8 },
    { name: 'R', nonDrugTarget: 31.89, drugTarget: 30.50, vdac1: 7 },
    { name: 'S', nonDrugTarget: 47.44, drugTarget: 42.90, vdac1: 18 },
    { name: 'T', nonDrugTarget: 29.82, drugTarget: 31.49, vdac1: 30 },
    { name: 'V', nonDrugTarget: 32.85, drugTarget: 37.02, vdac1: 12 },
    { name: 'W', nonDrugTarget: 6.67, drugTarget: 7.75, vdac1: 4 },
    { name: 'Y', nonDrugTarget: 14.56, drugTarget: 17.20, vdac1: 11 }
  ];

  return (
    <div className="w-full h-[500px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name"
            label={{ 
              value: 'Amino Acids',
              position: 'bottom',
              offset: 0
            }}
          />
          <YAxis
            label={{ 
              value: 'Frequency',
              angle: -90,
              position: 'insideLeft'
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="nonDrugTarget" name="Non-Drug Target" fill="#2e8b57" fillOpacity={0.6} />
          <Bar dataKey="drugTarget" name="Drug Target" fill="#b0e0e6" fillOpacity={0.6} />
          <Bar dataKey="vdac1" name="VDAC1" fill="#20b2aa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphs;