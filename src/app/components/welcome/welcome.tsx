// Import hooks
import { useTranslation } from 'react-i18next';

export function Welcome() {
  const { t } = useTranslation();

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4"></div>
          <p className="text-7xl">{t('routes.home.title')}</p>
          <p className="text-3xl">{t('routes.home.description')}</p>
        </header>
        <div className="max-w-[300px] w-full space-y-6 px-4"></div>
      </div>
    </main>
  );
}
