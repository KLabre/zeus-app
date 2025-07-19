// useInitializeMsal.test.tsx

// Import libraries
import React from 'react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, beforeEach, test, expect, jest } from '@jest/globals';

// Import hook and MSAL types
import {
  EventType,
  PublicClientApplication,
  type AuthenticationResult,
  type AccountInfo,
} from '@azure/msal-browser';
import { useInitializeMsal } from '../../lib/hooks/useInitializeMsal';

// Test wrapper component that uses the hook
const TestComponent = ({ instance }: { instance: PublicClientApplication }) => {
  const msalReady = useInitializeMsal(instance);
  return <div>{msalReady ? 'MSAL Ready' : 'Initializing'}</div>;
};

describe('useInitializeMsal', () => {
  let mockMsalInstance: jest.Mocked<PublicClientApplication>;
  const mockAccount: AccountInfo = {
    homeAccountId: '1',
    environment: 'login.microsoftonline.com',
    tenantId: 'tenant-id',
    username: 'test@example.com',
    localAccountId: 'local-id',
  };

  const mockTokenResult: AuthenticationResult = {
    accessToken: 'fake-token',
    account: mockAccount,
    expiresOn: new Date(),
    idToken: 'fake-id-token',
    scopes: ['User.Read'],
    tenantId: 'tenant-id',
    tokenType: 'Bearer',
    uniqueId: 'uid',
    fromCache: false,
    authority: 'https://login.microsoftonline.com/common',
    // Required properties:
    idTokenClaims: {}, // you can leave empty or mock claims as needed
    correlationId: 'correlation-id',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockMsalInstance = {
      initialize: jest.fn().mockReturnValue({ success: true }),
      getAllAccounts: jest.fn().mockReturnValue([mockAccount]),
      getActiveAccount: jest.fn().mockReturnValue(null),
      setActiveAccount: jest.fn(),
      acquireTokenSilent: jest.fn().mockReturnValue(mockTokenResult),
      enableAccountStorageEvents: jest.fn(),
      addEventCallback: jest.fn(),
      // Additional unused methods mocked to avoid runtime error (no-op)
      getLogger: jest.fn(),
      getConfiguration: jest.fn(),
      getTokenCache: jest.fn(),
      acquireTokenPopup: jest.fn(),
      acquireTokenRedirect: jest.fn(),
      loginRedirect: jest.fn(),
      loginPopup: jest.fn(),
      logout: jest.fn(),
      logoutRedirect: jest.fn(),
      logoutPopup: jest.fn(),
      ssoSilent: jest.fn(),
    } as unknown as jest.Mocked<PublicClientApplication>;
  });

  test('OnSuccess_SetsReadyToTrue', async () => {
    render(<TestComponent instance={mockMsalInstance} />);

    expect(screen.getByText('Initializing')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('MSAL Ready')).toBeInTheDocument();
    });

    expect(mockMsalInstance.initialize).toHaveBeenCalled();
    expect(mockMsalInstance.getAllAccounts).toHaveBeenCalled();
    expect(mockMsalInstance.setActiveAccount).toHaveBeenCalledWith(mockAccount);
    expect(mockMsalInstance.acquireTokenSilent).toHaveBeenCalled();
    expect(mockMsalInstance.enableAccountStorageEvents).toHaveBeenCalled();
    expect(mockMsalInstance.addEventCallback).toHaveBeenCalled();
  });

  test('OnTokenAcquisitionFailure_StillSetsReady', async () => {
    mockMsalInstance.acquireTokenSilent.mockRejectedValue(new Error('Token acquisition failed'));

    render(<TestComponent instance={mockMsalInstance} />);

    await waitFor(() => {
      expect(screen.getByText('MSAL Ready')).toBeInTheDocument();
    });

    expect(mockMsalInstance.acquireTokenSilent).toHaveBeenCalled();
    expect(mockMsalInstance.setActiveAccount).toHaveBeenCalledTimes(1); // Called only with account[0]
  });

  test('OnLoginSuccessEvent_SetsNewActiveAccount', async () => {
    // eslint-disable-next-line no-unused-vars
    let capturedCallback: ((event: any) => void) | undefined;
    mockMsalInstance.addEventCallback.mockImplementation(cb => {
      capturedCallback = cb;
      return 'mock-callback-id';
    });

    render(<TestComponent instance={mockMsalInstance} />);

    await waitFor(() => {
      expect(screen.getByText('MSAL Ready')).toBeInTheDocument();
    });

    const newAccount: AccountInfo = {
      homeAccountId: '2',
      environment: 'login.microsoftonline.com',
      tenantId: 'tenant-id',
      username: 'new@example.com',
      localAccountId: 'local-id-2',
    };

    // Simulate a LOGIN_SUCCESS event
    capturedCallback?.({
      eventType: EventType.LOGIN_SUCCESS,
      payload: { account: newAccount },
    });

    expect(mockMsalInstance.setActiveAccount).toHaveBeenCalledWith(newAccount);
  });
});
