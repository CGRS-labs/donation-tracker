import React from 'react';
import Box from '@mui/material/Box';

import Logo from '../../assets/images/sunflower_white.svg';

const Sunflower = ({ height, width }) => {
  return (
    <Box
      component="img"
      sx={{
        height: { height },
        width: { width }
      }}
      alt="Sunflower"
      src={'http://localhost:3000/images/sunflower_white.svg'}
    />

  );
};

export default Sunflower;