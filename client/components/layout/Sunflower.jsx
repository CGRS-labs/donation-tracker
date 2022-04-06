import React from 'react';
import Box from '@mui/material/Box';

import Logo from '../../styles/images/sunflower_white.svg';

const Sunflower = ({height, width}) => {
  return (
    <Box
      component="img"
      sx={{
        height: {height},
        width: {width}
      }}
      alt="Sunflower"
      src={Logo}
    />
    
  );
};

export default Sunflower;