import React from 'react';

// Import hooks
import { useTranslation } from 'react-i18next';

// import components
import SignIn from '../auth/SignIn';

// This component serves as the home page for unauthenticated users
const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="pt-16 p-4 container mx-auto">
        <main className="flex items-center justify-center pt-16 pb-4">
          <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
            <header className="flex flex-col items-center gap-9">
              <div className="w-[500px] max-w-[100vw] p-4"></div>
              <p className="text-7xl">{t('app.title')}</p>
              <p className="text-3xl">{t('app.description')}</p>
              <SignIn />
            </header>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
