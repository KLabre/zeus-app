// src/components/Navbar.tsx
import React from 'react';

// import mui
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import IconButton from '@mui/material/IconButton';

// import hooks
import { useTheme } from '../../lib/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div data-testid="toggle-theme-button">
      <IconButton onClick={toggleTheme} color="primary" size="small">
        {isDark ? <DarkModeIcon /> : <WbSunnyIcon />}
      </IconButton>
    </div>
  );
};

export default ThemeToggle;
