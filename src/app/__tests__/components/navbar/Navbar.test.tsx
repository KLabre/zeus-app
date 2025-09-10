// import libraries
import React from 'react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test, beforeEach, jest } from '@jest/globals';

// import component
import Navbar from '../../../components/navbar/Navbar';

expect.extend(toHaveNoViolations);

// mock child components to isolate test scope
jest.mock('../../../components/auth/SignOut', () => {
  const MockedSignIn: React.FC = () => <div>SignOutMock</div>;
  return {
    __esModule: true,
    default: MockedSignIn,
  };
});

jest.mock('../../../components/navbar/ThemeToggle', () => {
  const MockedThemeToggle: React.FC = () => <div>ThemeToggleMock</div>;
  return {
    __esModule: true,
    default: MockedThemeToggle,
  };
});

jest.mock('../../../components/navbar/AppLogo', () => {
  const MockedAppLogo: React.FC = () => <div>AppLogoMock</div>;
  return {
    __esModule: true,
    default: MockedAppLogo,
  };
});

describe('Navbar', () => {
  const renderComponent = () => render(<Navbar />);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('OnDefault_RendersExpectedComponents', () => {
    // ARRANGE
    renderComponent();

    // ASSERT
    expect(screen.getByText('AppLogoMock')).toBeInTheDocument();
    expect(screen.getByText('ThemeToggleMock')).toBeInTheDocument();
    expect(screen.getByText('SignOutMock')).toBeInTheDocument();
  });

  test('OnRender_HasNoAccessibilityViolations', async () => {
    // ARRANGE
    const { container } = renderComponent();

    // ASSERT
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
