import React from 'react';

// Import hooks
import { useTranslation } from 'react-i18next';

// import contexts
import { useAuth } from '../../lib/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  // Make it component safe for missing or null useAuth before destructuring
  const auth = useAuth() || {};
  const { username } = auth;

  return (
    <main className="m-5">
      <h1 className="text-4xl">{t('welcome.title', { name: username })}</h1>
      {/* TODO: RBAC
      <p>Your roles: {roles.join(', ')}</p>
      {hasRole('Admin') ? <p>You have access to admin tools.</p> : <p>Standard access only.</p>} */}
    </main>
  );
};

export default Dashboard;
