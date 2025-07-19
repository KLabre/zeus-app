// import libraries
import React from 'react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { beforeEach, describe, expect, test, jest } from '@jest/globals';

// import components
import Home from '../../components/Home/Home';

expect.extend(toHaveNoViolations);

// Mock i18next translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    // Stubbed translations return the keys so we can test presence, not copy
    t: (key: string) => key,
  }),
}));

// Mock SignIn component to avoid testing its internals
jest.mock('../../components/auth/SignIn', () => {
  const MockedSignIn: React.FC = () => <button>Mocked SignIn Button</button>;
  return {
    __esModule: true, // important if the component uses `export default`
    default: MockedSignIn,
  };
});

describe('Home', () => {
  const renderComponent = () => render(<Home />);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('OnDefault_RendersTitle', () => {
    // ARRANGE
    renderComponent();

    // ASSERT
    const title = screen.getByText('app.title');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('P');
    expect(title).toHaveClass('text-7xl');
  });

  test('OnDefault_RendersDescription', () => {
    // ARRANGE
    renderComponent();

    // ASSERT
    const description = screen.getByText('app.description');
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe('P');
    expect(description).toHaveClass('text-3xl');
  });

  test('OnDefault_RendersSignInComponent', () => {
    // ARRANGE
    renderComponent();

    // ASSERT
    const signInButton = screen.getByRole('button', { name: 'Mocked SignIn Button' });
    expect(signInButton).toBeInTheDocument();
  });

  test('OnDefault_HasNoAccessibilityViolations', async () => {
    // ARRANGE
    const { container } = renderComponent();

    // ASSERT
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
