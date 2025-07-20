// import Libraries;
import '../../app.css';
import React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

// import hooks
import { useTranslation } from 'react-i18next';

// import routes and components
import { Helmet } from 'react-helmet';
import Navbar from '../navbar/Navbar';
import Home from '../Home/Home';

export function PageLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t('app.title')}</title>
        <meta name="description" content={t('app.description')} />
      </Helmet>
      <AuthenticatedTemplate>
        <Navbar />
        {children}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Home />
      </UnauthenticatedTemplate>
    </div>
  );
}
