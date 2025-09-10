// src/components/Navbar.tsx
import React from 'react';

// import components
import Stack from '@mui/material/Stack';
import SignOut from '../auth/SignOut';
import ThemeToggle from './ThemeToggle';
import AppLogo from './AppLogo';
import ErrorBoundary from '../error/ErrorBoundary';

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between bg-white p-2 shadow-md sm:p-2 dark:bg-slate-950">
      <ErrorBoundary>
        <AppLogo />
      </ErrorBoundary>
      <Stack direction="row" spacing={2}>
        <ErrorBoundary>
          <ThemeToggle />
        </ErrorBoundary>
        <ErrorBoundary>
          <SignOut />
        </ErrorBoundary>
      </Stack>
    </nav>
  );
};

export default Navbar;
