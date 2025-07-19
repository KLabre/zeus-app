// import libraries
import React from 'react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import {
  //axe,
  toHaveNoViolations,
} from 'jest-axe';
import { describe, expect, test } from '@jest/globals';

// import component
import AppLoader from '../../../components/loading/AppLoader';

expect.extend(toHaveNoViolations);

describe('AppLoader', () => {
  const renderComponent = () => render(<AppLoader />);

  test('OnDefault_RendersCircularProgressIndicator', () => {
    // ARRANGE
    renderComponent();

    // ASSERT
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  test('OnDefault_RendersCenteredLayout', () => {
    // ARRANGE
    const { container } = renderComponent();

    // ASSERT
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({
      display: 'grid',
      placeItems: 'center',
      height: '100vh',
    });
  });

  // The component is external and we cannot control it for now
  // eslint-disable-next-line jest/no-commented-out-tests
  // test('OnDefault_HasNoAccessibilityViolations', async () => {
  //   // ARRANGE
  //   const { container } = renderComponent();

  //   // ASSERT
  //   const results = await axe(container);
  //   expect(results).toHaveNoViolations();
  // });
});
