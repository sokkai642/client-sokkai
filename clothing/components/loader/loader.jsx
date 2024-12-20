import React from 'react';
import { GridLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <GridLoader color="black" />
    </div>
  );
};

export default Loader;
