import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';

beforeEach(() => {
  window.location.hash = '#/';
  window.scrollTo = vi.fn();
  window.requestAnimationFrame = (callback: FrameRequestCallback) => {
    callback(0);
    return 0;
  };
  Element.prototype.scrollIntoView = vi.fn();
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

afterEach(cleanup);

describe('AtelierOS site', () => {
  it('renders the required primary destinations and repository link', () => {
    render(<App />);
    const primaryNavigation = screen.getByRole('navigation', { name: 'Primary navigation' });

    expect(screen.getByRole('heading', { level: 1, name: /design agents forget.*your repo doesn’t/i })).toBeInTheDocument();
    expect(within(primaryNavigation).getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '#/docs');
    expect(within(primaryNavigation).getByRole('link', { name: 'Changelog' })).toHaveAttribute('href', '#/changelog');
    expect(within(primaryNavigation).getByRole('link', { name: 'Live demo' })).toHaveAttribute('href', '#/demo');
    expect(within(primaryNavigation).getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/MinhTuan2405/AtelierOS',
    );
  });

  it('changes pages when the hash route changes', () => {
    render(<App />);

    act(() => {
      window.location.hash = '#/docs';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(screen.getByRole('heading', { level: 1, name: 'Documentation' })).toBeInTheDocument();
  });

  it('composes a route from the selected surface', () => {
    window.location.hash = '#/demo';
    render(<App />);

    fireEvent.change(screen.getByLabelText('What are you designing?'), {
      target: { value: 'dashboard' },
    });

    expect(screen.getByText('dashboard.md')).toBeInTheDocument();
    expect(screen.getByText(/density, scanability, data integrity/i)).toBeInTheDocument();
  });

  it('labels inherited profiles without inventing a profile file', () => {
    window.location.hash = '#/demo';
    render(<App />);

    fireEvent.change(screen.getByLabelText('What are you designing?'), {
      target: { value: 'redesign' },
    });

    expect(screen.getByText('Inherited product-category profile')).toBeInTheDocument();
    expect(screen.queryByText('host surface profile.md')).not.toBeInTheDocument();
  });
});
