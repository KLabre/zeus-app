// src/components/Navbar.tsx
import React from 'react';

// import components
import Stack from '@mui/material/Stack';
import SignOut from '../auth/SignOut';
import ThemeToggle from './ThemeToggle';
import AppLogo from './AppLogo';

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between bg-white p-2 shadow-md sm:p-2 dark:bg-slate-950">
      <AppLogo />
      <Stack direction="row" spacing={2}>
        <ThemeToggle />
        <SignOut />
      </Stack>
    </nav>
  );
};

export default Navbar;
