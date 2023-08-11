import React from 'react';
import { Button } from '@mui/material';

const DynamicButton = ({ label, variant, size , onClick , sx}) => {
  return (
    <Button variant={variant} size={size} onClick={onClick} sx= {sx}>
      {label}
    </Button>
  );
};

export default DynamicButton;
