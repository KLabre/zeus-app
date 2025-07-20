// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router';

// import hooks
import { useTheme } from '~/lib/contexts/ThemeContext';

const AppLogo: React.FC = () => {
  const { mode } = useTheme();
  return (
    <Link to="/" className="flex items-center">
      <img src={`/images/zeus-logo-${mode}.png`} alt="Logo" className="mr-2 w-20" />
    </Link>
  );
};

export default AppLogo;
