import React from 'react';

// Import components
import CircularProgress from '@mui/material/CircularProgress';

const AppLoader: React.FC = () => {
  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
  );
};

export default AppLoader;
