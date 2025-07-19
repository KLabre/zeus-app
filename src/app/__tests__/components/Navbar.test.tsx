// import libraries
import React from 'react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test, beforeEach, jest } from '@jest/globals';

// import component
import Navbar from '../../components/Navbar/Navbar';

expect.extend(toHaveNoViolations);

// mock react-router's Link
jest.mock('react-router', () => ({
  Link: ({ to, children, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// mock SignOut button (assume separately tested)
jest.mock('../../components/auth/SignOut', () => {
  const MockedSignIn: React.FC = () => <button>Mocked SignOut</button>;
  return {
    __esModule: true, // ⬅️ important if the component uses `export default`
    default: MockedSignIn,
  };
});

// mock Button to ensure it renders and is testable
jest.mock('../../components/Button/Button', () => {
  const MockedSignIn: React.FC = ({ onClick, children }: any) => (
    <button onClick={onClick}>{children}</button>
  );
  return {
    __esModule: true, // ⬅️ important if the component uses `export default`
    default: MockedSignIn,
  };
});

describe('Navbar', () => {
  const mockToggleTheme = jest.fn();

  const renderComponent = (isDarkMode: boolean = false) =>
    render(<Navbar onToggleTheme={mockToggleTheme} isDarkMode={isDarkMode} />);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('OnDefault_RendersLogoImageWithLink', () => {
    // ARRANGE
    renderComponent();

    // ASSERT
    const logo = screen.getByRole('img', { name: /logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/zeus-logo-dark.png');

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  test('OnDefault_RendersToggleThemeButton', () => {
    // ARRANGE
    renderComponent(false);

    // ASSERT
    const button = screen.getByRole('button', { name: 'Dark Mode' });
    expect(button).toBeInTheDocument();
  });

  test('OnDarkModeTrue_DisplaysLightModeText', () => {
    // ARRANGE
    renderComponent(true);

    // ASSERT
    const button = screen.getByRole('button', { name: 'Light Mode' });
    expect(button).toBeInTheDocument();
  });

  test('OnClick_ToggleThemeButtonTriggersHandler', async () => {
    // ARRANGE
    renderComponent(false);

    // ACT
    const button = screen.getByRole('button', { name: 'Dark Mode' });
    await userEvent.click(button);

    // ASSERT
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  test('OnDefault_RendersSignOutButton', () => {
    // ARRANGE
    renderComponent();

    // ASSERT
    const signOut = screen.getByRole('button', { name: 'Mocked SignOut' });
    expect(signOut).toBeInTheDocument();
  });

  test('OnRender_HasNoAccessibilityViolations', async () => {
    // ARRANGE
    const { container } = renderComponent();

    // ASSERT
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
