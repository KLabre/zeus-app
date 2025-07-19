// useInitializeMsal.ts
import { useEffect, useState } from 'react';
import {
  EventType,
  PublicClientApplication,
  type AccountInfo,
  type AuthenticationResult,
} from '@azure/msal-browser';

export const useInitializeMsal = (msalInstance: PublicClientApplication) => {
  const [msalReady, setMsalReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await msalInstance.initialize();

      const accounts = msalInstance.getAllAccounts();
      if (!msalInstance.getActiveAccount() && accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
      }

      try {
        const result = await msalInstance.acquireTokenSilent({
          account: msalInstance.getActiveAccount() ?? accounts[0],
          scopes: ['User.Read'],
        });

        if (result.account) {
          msalInstance.setActiveAccount(result.account);
        }
      } catch {
        // console.debug('Silent token acquisition failed:', err);
      }

      msalInstance.enableAccountStorageEvents();

      msalInstance.addEventCallback(event => {
        if (
          event.eventType === EventType.LOGIN_SUCCESS &&
          event.payload &&
          (event.payload as AuthenticationResult).account
        ) {
          msalInstance.setActiveAccount(
            (event.payload as AuthenticationResult).account as AccountInfo,
          );
        }
      });

      setMsalReady(true);
    };

    init();
  }, []);

  return msalReady;
};
