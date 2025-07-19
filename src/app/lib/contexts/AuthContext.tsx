import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import type { AccountInfo, IdTokenClaims } from '@azure/msal-browser';

type AuthContextType = {
  account: AccountInfo | null;
  idTokenClaims: IdTokenClaims | null;
  name: string | null;
  email: string | null;
  username: string | null;
  roles: string[];
  // we will use it in the future
  // eslint-disable-next-line no-unused-vars
  hasRole: (role: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { instance } = useMsal();
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [claims, setClaims] = useState<IdTokenClaims | null>(null);

  useEffect(() => {
    const active = instance.getActiveAccount();
    setAccount(active ?? null);

    const claimsFromActive = active?.idTokenClaims ?? null;
    setClaims(claimsFromActive as IdTokenClaims | null);
  }, [instance]);

  const roles: string[] = (claims?.roles ?? []) as string[];

  const value: AuthContextType = {
    account,
    idTokenClaims: claims,
    name: (claims?.name as string) ?? null,
    username: (claims?.preferred_username as string) ?? null,
    email: (claims?.preferred_username as string) ?? null,
    roles,
    hasRole: role => roles.includes(role),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
