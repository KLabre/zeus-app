// src/components/Navbar.tsx
import React from 'react';
// import { useTranslation } from 'react-i18next';

// import mui
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import IconButton from '@mui/material/IconButton';

// import hooks
import { useTheme } from '~/lib/contexts/ThemeContext';

// import Button from '../Button/Button';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <IconButton onClick={toggleTheme} color="primary" size="small">
      {isDark ? <DarkModeIcon /> : <WbSunnyIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
