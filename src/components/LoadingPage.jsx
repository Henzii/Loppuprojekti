import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

const LoadingPage = () => (
  <Backdrop open>
    <CircularProgress size={100} />
  </Backdrop>
);
export default LoadingPage;
