import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const divStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'black',
  opacity: 0.6,
  zIndex: 1000,
};

const spinnerStyle = {
  position: 'absolute',
  margin: 'auto',
  top: '15px',
  right: '15px',
  backgroundColor: '#EEEEEE',
  borderRadius: '5px',
  zIndex: 1001,
};

export const LoaderHandler = () => (
  <div>
    <div style={divStyle} />
    <div style={spinnerStyle}>
      <CircularProgress thickness={5} size={70} />
    </div>
  </div>
);

export default LoaderHandler;
