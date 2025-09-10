import Alert from '@mui/material/Alert';
import React from 'react';

// import hooks
import { Trans } from 'react-i18next';

const ErrorFallback: React.FC = () => {
  return (
    <Alert severity="error">
      <Trans i18nKey={'error.errorBoundaryFallback.message'} components={{ bold: <strong /> }} />
    </Alert>
  );
};

export default ErrorFallback;
