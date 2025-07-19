// import libraries
import React from 'react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect } from '@jest/globals';

// import components
import SignOut from '../../../components/auth/SignOut';

expect.extend(toHaveNoViolations);

// Mocks
const mockLogoutRedirect = jest.fn();
jest.mock('@azure/msal-react', () => ({
  useMsal: () => ({
    instance: {
      logoutRedirect: mockLogoutRedirect,
    },
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('SignOut', () => {
  // Cleanups
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('OnRender_RendersSignOutButton', () => {
    // ARRANGE
    render(<SignOut />);

    // ASSERT
    expect(screen.getByRole('button', { name: 'auth.signOut' })).toBeInTheDocument();
  });

  test('OnClick_CallsLogoutRedirect', () => {
    // ARRANGE
    render(<SignOut />);

    // ACT
    const button = screen.getByRole('button', { name: 'auth.signOut' });
    fireEvent.click(button);

    // ASSERT
    expect(mockLogoutRedirect).toHaveBeenCalledTimes(1);
  });

  test('OnRender_HasNoAccessibilityViolations', async () => {
    // ARRANGE
    const { container } = render(<SignOut />);

    // ACT
    const results = await axe(container);

    // ASSERT
    expect(results).toHaveNoViolations();
  });
});
