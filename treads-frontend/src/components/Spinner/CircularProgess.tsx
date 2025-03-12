import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const CircularProgess: React.FC = () => {
  return (
    <>
      <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        <CircularProgress size={24} sx={{ color: 'white' }} />
      </Box>
    </>
  );
};

export default CircularProgess;
