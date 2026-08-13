import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('starter application', () => {
  it('shows the project setup path', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Your product starts here.' })).toBeInTheDocument();
    expect(screen.getByText('PRODUCT.md')).toBeInTheDocument();
    expect(screen.getByText('DESIGN.md')).toBeInTheDocument();
    expect(screen.getByText('.design/BRIEF.md')).toBeInTheDocument();
  });
});
