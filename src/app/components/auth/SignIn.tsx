import React from 'react';

// Import hooks
import { useMsal } from '@azure/msal-react';
import { useTranslation } from 'react-i18next';

// Import components
import Button from '../Button/Button';

const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const { instance } = useMsal();

  const handleLogin = () => {
    if (instance?.loginRedirect) {
      instance.loginRedirect();
    }
  };

  return <Button onClick={handleLogin}>{t('auth.signIn')}</Button>;
};

export default SignIn;
