import * as React from 'react';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';

// Define your protein family data
const proteinFamilyData = [
  {
    label: 'Ligand-gated ion channel (TC 1.A.9)',
    value: 22.2,
  },
  {
    label: 'G-protein coupled receptor 1',
    value: 21.4,
  },
  {
    label: 'Cytochrome P450',
    value: 12.8,
  },
  {
    label: 'Sodium channel (TC 1.A.1.10)',
    value: 8.55,
  },
  {
    label: 'Glutamate-gated ion channel (TC 1.A.10.1)',
    value: 7.69,
  },
  {
    label: 'Transient receptor (TC 1.A.4)',
    value: 5.13,
  },
  {
    label: 'Calcium channel alpha-1 subunit (TC 1.A.1.11)',
    value: 5.13,
  },
  {
    label: 'Potassium channel',
    value: 4.27,
  },
  {
    label: 'UDP-glycosyltransferase',
    value: 4.27,
  },
  {
    label: 'Aldo/keto reductase',
    value: 3.42,
  },
  {
    label: 'ABC transporter superfamily',
    value: 2.56,
  },
  {
    label: 'Major facilitator (TC 2.A.1) superfamily',
    value: 2.56,
  },
];

// export const valueFormatter = (item: { value: number }) => `${item.value}%`;

const ProteinPieChart: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <PieChart
        height={400}
        series={[
          {
            data: proteinFamilyData,
            innerRadius: 65,
            arcLabel: (params) => params.label?.split(' ')[0] ?? '',
            arcLabelMinAngle: 10,
            // valueFormatter,
          },
        ]}
        margin={{ top: 20, bottom: 20, left: 20, right: 160 }}
        slotProps={{
          legend: {
            direction: 'column',
            position: { vertical: 'middle', horizontal: 'right' },
            padding: 0,
            labelStyle: {
              fontSize: 12,
            },
          },
        }}
      />
    </Box>
  );
}

export default ProteinPieChart;