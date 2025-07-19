// import Libraries;
import '../../app.css';
import React, { useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

// import hooks
import { useTranslation } from 'react-i18next';

// import routes and components
import { Helmet } from 'react-helmet';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';

export function PageLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <Helmet>
        <title>{t('app.title')}</title>
        <meta name="description" content={t('app.description')} />
      </Helmet>
      <AuthenticatedTemplate>
        <Navbar
          onToggleTheme={() => handleThemeToggle()} // TODO: Implement theme toggle with context
          isDarkMode={isDarkMode}
        />
        {children}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Home />
      </UnauthenticatedTemplate>
    </div>
  );
}
