// import libraries
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test } from '@jest/globals';

// import component
import Button from '../../components/Button/Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  const mockOnClick = jest.fn();

  const renderComponent = (props = {}) =>
    render(
      <Button onClick={mockOnClick} {...props}>
        Click me
      </Button>,
    );

  test('OnDefault_RendersWithPrimaryStyles', () => {
    // ARRANGE
    renderComponent();

    const button = screen.getByRole('button', { name: 'Click me' });

    // ASSERT
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600');
    expect(button).not.toHaveClass('border'); // outline doesn't apply
    expect(button).not.toBeDisabled();
  });

  test('OnTypeOutline_RendersWithOutlineStyles', () => {
    // ARRANGE
    renderComponent({ type: 'outline' });

    // ASSERT
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('text-blue-600');
    expect(button).not.toBeDisabled();
  });

  test('OnDisabled_RendersWithDisabledStylesAndIsNotClickable', async () => {
    // ARRANGE
    renderComponent({ disabled: true });

    // ASSERT
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');

    await userEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('OnClick_TriggersOnClickHandler', async () => {
    // ARRANGE
    renderComponent();

    // ACT
    const button = screen.getByRole('button', { name: 'Click me' });
    await userEvent.click(button);

    // ASSERT
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('OnRender_HasNoAccessibilityViolations', async () => {
    // ARRANGE
    const { container } = renderComponent();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('OnCustomChildren_RendersCorrectly', () => {
    // ARRANGE
    render(
      <Button onClick={mockOnClick}>
        <span data-testid="custom-child">Custom Text</span>
      </Button>,
    );

    // ASSERT
    const customChild = screen.getByTestId('custom-child');
    expect(customChild).toHaveTextContent('Custom Text');
  });

  test('OnMultipleClicks_TriggersMultipleCalls', async () => {
    // ARRANGE
    renderComponent();

    // ACT
    const button = screen.getByRole('button', { name: 'Click me' });
    await userEvent.click(button);
    await userEvent.click(button);

    // ASSERT
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });
});
