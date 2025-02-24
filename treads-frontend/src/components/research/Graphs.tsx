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

interface GraphProp {
  data: JSON[] 
}

const Graphs: React.FC<GraphProp> = ({data}) => {

  return (
    data &&
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