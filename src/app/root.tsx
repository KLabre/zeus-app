// import Libraries;
import './i18n/i18n';
import './app.css';
import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

// import hooks
import { useTranslation } from 'react-i18next';
import { useInitializeMsal } from './lib/hooks/useInitializeMsal';

// import types
import { msalConfig } from './lib/types/authConfig';

// import contexts
import { AuthProvider } from './lib/contexts/AuthContext';

// import routes and components
import type { Route } from './+types/root';
import { PageLayout } from './components/layout/PageLayout';
import AppLoader from './components/loading/AppLoader';

const msalInstance = new PublicClientApplication(msalConfig);

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // Let's configure the authentication before React Renders
  // This will keep the session consistent across tabs, automatically setting the active account, and avoiding race conditions during login
  const msalReady = useInitializeMsal(msalInstance);

  if (!msalReady) return <AppLoader />;

  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <PageLayout>
          <Outlet />
        </PageLayout>
      </AuthProvider>
    </MsalProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { t } = useTranslation();

  let message = t('error.default.message');
  let details = t('error.default.details');

  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? t('error.notFound.message') : 'Error';
    details = error.status === 404 ? t('error.notFound.details') : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
