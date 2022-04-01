import React from 'react';

const ICON = 'M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z';

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

function Pin({ size = 32, onClick }) {
  return (
    <svg height={size} viewBox="0 0 24 24" style={pinStyle} onClick={onClick}>
      <path d={ICON} />
    </svg>
  );
}

export default React.memo(Pin);