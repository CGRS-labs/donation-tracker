import React from 'react';
import { SvgIcon as MuiSvgIcon, SvgIconProps, styled } from '@mui/material';
import {ReactComponent as SunflowerLogo} from '../../styles/assets/sunflower_white.svg';

const SvgIcon = styled(MuiSvgIcon, {
  name: 'Sunflower',
  shouldForwardProp: (prop) => prop !== 'fill',
})(() => ({
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin:  'round',
  strokeWidth:  '2.25px',
}));

SvgIcon.defaultProps = {
  viewBox: '0 0 24 24',
  focusable: 'false',
  'aria-hidden': 'true',
};

const Sunflower = (props) => {
  return (
    <SvgIcon {...props}>
      <SunflowerLogo />
    </SvgIcon>
  );
};

export default Sunflower;