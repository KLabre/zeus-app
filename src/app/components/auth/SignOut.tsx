import React from 'react';

// Import hooks
import { useMsal } from '@azure/msal-react';
import { useTranslation } from 'react-i18next';

// Import components
import Button from '../Button/Button';

const SignOut: React.FC = () => {
  const { t } = useTranslation();
  const { instance } = useMsal();

  return <Button onClick={() => instance.logoutRedirect()}>{t('auth.signOut')}</Button>;
};

export default SignOut;
