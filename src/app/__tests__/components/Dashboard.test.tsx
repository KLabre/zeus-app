// import libraries
import React from 'react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { axe, toHaveNoViolations } from 'jest-axe';
import { beforeEach, describe, expect, test, jest } from '@jest/globals';

// import components
import Dashboard from '../../components/Dashboard/Dashboard';

// Mock translation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    // Return the key plus interpolation for predictable testing
    t: (key: string, options?: { [key: string]: any }) =>
      key.includes('{{name}}') || options?.name ? `${key} ${options?.name ?? ''}`.trim() : key,
  }),
}));

import { useAuth } from '../../lib/contexts/AuthContext';

// Mock AuthContext hook
jest.mock('../../lib/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

expect.extend(toHaveNoViolations);

describe('Dashboard', () => {
  const mockUsername = 'JohnDoe';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  const renderComponent = () => render(<Dashboard />);

  test('OnDefault_RendersWelcomeTitleWithUsername', () => {
    // ARRANGE
    (useAuth as jest.Mock).mockReturnValue({ username: mockUsername });

    // ACT
    renderComponent();

    // ASSERT
    // Since t returns key plus username, check rendered heading contains username
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('welcome.title JohnDoe');
  });

  test('OnMissingUsername_RendersWelcomeTitleWithoutName', () => {
    // ARRANGE
    (useAuth as jest.Mock).mockReturnValue({ username: undefined });

    // ACT
    renderComponent();

    // ASSERT
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('welcome.title');
  });

  test('OnDefault_HasNoAccessibilityViolations', async () => {
    // ARRANGE
    (useAuth as jest.Mock).mockReturnValue({ username: mockUsername });

    const { container } = renderComponent();

    // ASSERT
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Negative test: simulate useAuth returning null or no object
  test('OnNoAuthContext_ReturnsEmptyUsernameWithoutCrash', () => {
    // ARRANGE
    (useAuth as jest.Mock).mockReturnValue(null);

    // ACT
    renderComponent();

    // ASSERT
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    // Without username, should render key without name
    expect(heading).toHaveTextContent('welcome.title');
  });
});
