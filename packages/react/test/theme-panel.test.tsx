/**
 * theme-panel.test.tsx — ThemePanel interaction + a11y tests (FND-05, FND-04)
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { LucentProvider } from '../src/theme/LucentProvider';
import { ThemePanel } from '../src/theme/ThemePanel';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LucentProvider persist={false}>{children}</LucentProvider>;
}

describe('ThemePanel (FND-05, FND-04, D-08)', () => {

  describe('All controls are present (UI-SPEC copywriting contract)', () => {
    it('renders Theme control', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      expect(screen.getByLabelText(/Theme/i)).toBeInTheDocument();
    });

    it('renders Accent control', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      expect(screen.getByLabelText(/Accent/i)).toBeInTheDocument();
    });

    it('renders Glass transparency slider', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      expect(screen.getByLabelText(/Glass transparency/i)).toBeInTheDocument();
    });

    it('renders transparency helper text', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      expect(screen.getByText(/Lower this if text is hard to read/i)).toBeInTheDocument();
    });

    it('renders Blur intensity slider', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      expect(screen.getByLabelText(/Blur intensity/i)).toBeInTheDocument();
    });

    it('renders blur helper text', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      expect(screen.getByText(/Purely visual — readability never depends on it/i)).toBeInTheDocument();
    });

    it('renders Density control', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      expect(screen.getByLabelText(/Density/i)).toBeInTheDocument();
    });

    it('renders Solid mode toggle', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      expect(screen.getByLabelText(/Solid mode/i)).toBeInTheDocument();
    });

    it('renders solid mode helper text', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      expect(screen.getByText(/Makes every surface opaque/i)).toBeInTheDocument();
    });

    it('renders Reset to defaults button', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      expect(screen.getByRole('button', { name: /Reset to defaults/i })).toBeInTheDocument();
    });
  });

  describe('Transparency slider behaviour', () => {
    it('adjusting the slider writes --lucent-glass-opacity on documentElement', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      const slider = screen.getByLabelText(/Glass transparency/i);
      fireEvent.change(slider, { target: { value: '0.9' } });
      const cssVal = document.documentElement.style.getPropertyValue('--lucent-glass-opacity');
      expect(parseFloat(cssVal)).toBeCloseTo(0.9);
    });

    it('shows near-floor warning when transparency is at the floor (0.60)', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      const slider = screen.getByLabelText(/Glass transparency/i);
      fireEvent.change(slider, { target: { value: '0.60' } });
      // Warning should now be visible
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByRole('alert').textContent).toMatch(/minimum transparency/i);
    });

    it('no warning when transparency is well above the floor (0.90)', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      const slider = screen.getByLabelText(/Glass transparency/i);
      fireEvent.change(slider, { target: { value: '0.9' } });
      expect(screen.queryByRole('alert')).toBeNull();
    });
  });

  describe('Solid mode toggle', () => {
    it('checking the toggle sets data-contrast="solid"', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      const toggle = screen.getByLabelText(/Solid mode/i);
      fireEvent.click(toggle);
      expect(document.documentElement.getAttribute('data-contrast')).toBe('solid');
    });

    it('unchecking the toggle removes data-contrast', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      const toggle = screen.getByLabelText(/Solid mode/i);
      fireEvent.click(toggle); // check
      fireEvent.click(toggle); // uncheck
      expect(document.documentElement.getAttribute('data-contrast')).toBeNull();
    });
  });

  describe('Reset', () => {
    it('Reset to defaults button resets all axes', () => {
      render(<ThemePanel />, { wrapper: Wrapper });
      // Change something
      const opacitySlider = screen.getByLabelText(/Glass transparency/i);
      fireEvent.change(opacitySlider, { target: { value: '0.65' } });
      // Reset
      fireEvent.click(screen.getByRole('button', { name: /Reset to defaults/i }));
      // Opacity should be back to 0.72
      const cssVal = document.documentElement.style.getPropertyValue('--lucent-glass-opacity');
      expect(parseFloat(cssVal)).toBeCloseTo(0.72);
    });
  });

  describe('Accessibility', () => {
    it('passes axe a11y check', async () => {
      const { container } = render(
        <main>
          <ThemePanel />
        </main>,
        { wrapper: Wrapper },
      );
      await expect(container).toHaveNoViolations();
    });
  });

});
