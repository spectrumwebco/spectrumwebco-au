/// <vitest environment="happy-dom" />
// app/routes/_index.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Index from './_index'; // Import the component we want to test

describe('Index Route Component', () => {
  it('should render the welcome heading', () => {
    render(<Index />);
    // Check if the main heading is present
    const headingElement = screen.getByRole('heading', {
      name: /Welcome to Spectrum Web Co \(Remix Version\)/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it('should render the placeholder paragraph', () => {
    render(<Index />);
    // Check for one of the paragraphs
    const paragraphElement = screen.getByText(
      /This is a placeholder page for your new Remix application./i
    );
    expect(paragraphElement).toBeInTheDocument();
  });
});
