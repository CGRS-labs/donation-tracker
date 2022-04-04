import React from 'react';
import Box from '@mui/material/Box';

import Logo from '../../styles/images/sunflower.svg';

const Sunflower = () => {
  return (
    <Box
      component="img"
      sx={{
        height: 233,
        width: 350,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
      }}
      alt="Sunflower"
      src={Logo}
    />
    
  );
};

export default Sunflower;