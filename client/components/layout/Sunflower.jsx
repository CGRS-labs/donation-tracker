import React from 'react';
import Box from '@mui/material/Box';

import Logo from '../../styles/images/sunflower_white.svg';

const Sunflower = () => {
  return (
    <Box
      component="img"
      sx={{
        height: 48,
        width: 48,
      }}
      alt="Sunflower"
      src={Logo}
    />
    
  );
};

export default Sunflower;