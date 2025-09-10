// import libraries
import React from 'react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test, beforeEach, jest } from '@jest/globals';

// import component
import AppLogo from '../../../components/navbar/AppLogo';

// import contexts
import { useTheme } from '../../../lib/contexts/ThemeContext';

expect.extend(toHaveNoViolations);

// mock react-router's Link
jest.mock('react-router', () => ({
  Link: ({ to, children, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Mock the useTheme hook
jest.mock('../../../lib/contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('AppLogo', () => {
  const renderComponent = () => render(<AppLogo />);

  beforeEach(() => {
    jest.resetAllMocks();

    (useTheme as jest.Mock).mockReturnValue({
      mode: 'light',
    });
  });

  test('OnDefault_RendersImageWithLinkToHome', () => {
    // ARRANGE
    renderComponent();

    // ASSERT
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');

    const img = screen.getByAltText('Logo') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('mr-2 w-20');
    expect(img.src).toContain('zeus-logo-light.png');
  });

  test('OnDark_RendersDarkImage', async () => {
    // ARRANGE
    (useTheme as jest.Mock).mockReturnValue({
      mode: 'dark',
    });

    // ACT
    renderComponent();

    // ASSERT
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');

    const img = screen.getByAltText('Logo') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('zeus-logo-dark.png');
  });

  // TODO:
  // eslint-disable-next-line jest/no-commented-out-tests
  // test('OnClick_NavigatesToHome', () => {
  // });

  test('OnRender_HasNoAccessibilityViolations', async () => {
    // ARRANGE
    const { container } = renderComponent();

    // ASSERT
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
