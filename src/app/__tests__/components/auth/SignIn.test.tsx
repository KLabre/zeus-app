// import libraries
import React from 'react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useMsal } from '@azure/msal-react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { beforeEach, describe, expect, test } from '@jest/globals';

// import components
import SignIn from '../../../components/auth/SignIn';

expect.extend(toHaveNoViolations);

jest.mock('@azure/msal-react', () => ({
  useMsal: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    // We shall test expected key so content does not break functionality
    // Actual translation should be testing in e2e testing.
    t: (key: string) => key,
  }),
}));

describe('SignIn', () => {
  const mockLoginRedirect = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    (useMsal as jest.Mock).mockReturnValue({
      instance: {
        loginRedirect: mockLoginRedirect,
        loginPopup: jest.fn(),
      },
    });
  });

  const renderComponent = () => render(<SignIn />);

  test('OnDefault_RendersAButtonForSignIn', () => {
    // ARRANGE
    renderComponent();

    // ASSERT
    const button = screen.getByRole('button', { name: 'auth.signIn' });
    expect(button).toBeInTheDocument();
  });

  test('OnDefault_HasNoAccessibilityViolations', async () => {
    // ARRANGE
    const { container } = renderComponent();
    const results = await axe(container);

    // ASSERT
    expect(results).toHaveNoViolations();
  });

  test('OnClick_RedirectsToLogin', async () => {
    // ARRANGE
    renderComponent();

    // ACT
    const button = screen.getByRole('button', { name: 'auth.signIn' });
    await userEvent.click(button);

    // ASSERT
    expect(mockLoginRedirect).toHaveBeenCalledTimes(1);
  });

  test('OnInstanceMissing_DoesNotRedirect', async () => {
    // ARRANGE
    (useMsal as jest.Mock).mockReturnValue({ instance: null });
    renderComponent();

    // ACT
    const button = screen.getByRole('button', { name: 'auth.signIn' });
    await userEvent.click(button);

    // ASSERT
    expect(mockLoginRedirect).not.toHaveBeenCalled();
  });
});
