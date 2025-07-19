// src/components/Navbar.tsx
import React from 'react';

// Import components
import { Link } from 'react-router'; // If you're using react-router for navigation
import Button from '../Button/Button';
import SignOut from '../auth/SignOut';

interface NavbarProps {
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleTheme, isDarkMode }) => {
  return (
    <nav className="bg-gray-800 p-2 sm:p-2 flex justify-between items-center shadow-md">
      <Link to="/" className="flex items-center">
        <img src="/images/zeus-logo-dark.png" alt="Logo" className="w-20 mr-2" />
      </Link>
      <div className="flex items-center space-x-4">
        <Button onClick={onToggleTheme} type="outline">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
        <SignOut />
      </div>
    </nav>
  );
};

export default Navbar;
