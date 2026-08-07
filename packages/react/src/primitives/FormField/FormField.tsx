/**
 * FormField — ARIA-wiring layout orchestrator (server-safe)
 *
 * Ties label + control + description + error together with three layout modes:
 *   stack (default) — label above the control
 *   inline — label to the left
 *   floating — CSS-only floating label (rises via :focus-within or [data-filled])
 *
 * No bundled validation engine — validate() is for simple cases only.
 * ARIA wiring (htmlFor/aria-describedby/aria-invalid) requires consumer-provided id.
 * Uses :has() for floating label CSS — no ~ sibling combinator (label precedes control in DOM).
 */
import React from 'react';
import { Label } from '../Label/Label';
import { cx } from '../../utils/cx';

export type FormFieldLayout = 'stack' | 'inline' | 'floating';

export interface FormFieldProps {
  /** Layout variant. Defaults to 'stack'. */
  layout?: FormFieldLayout;
  /** Label text rendered above/beside the control. */
  label?: React.ReactNode;
  /** Helper text shown below the control. */
  description?: string;
  /** Error message shown below the control (overrides validate() result). */
  error?: string;
  /** Whether the control is in an invalid state. */
  isInvalid?: boolean;
  /**
   * Lightweight inline validator. Called with the child control's value prop.
   * Returns an error string (shown) or null (no error).
   * For production forms, use react-hook-form/zod instead.
   * Requires id prop to be wired.
   */
  validate?: (value: unknown) => string | null;
  /**
   * The id to use for ARIA wiring (htmlFor on Label, aria-describedby on control).
   * When omitted, ARIA auto-wiring is skipped (document this constraint in usage).
   */
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  layout = 'stack',
  label,
  description,
  error,
  isInvalid,
  validate,
  id,
  children,
  className,
}: FormFieldProps) {
  // Compute error message from validate() if no explicit error prop
  const validateError =
    validate && id
      ? validate(
          React.isValidElement(children)
            ? (children.props as { value?: unknown }).value
            : undefined,
        )
      : null;

  const errorMessage = error || validateError || null;
  const hasError = Boolean(isInvalid || errorMessage);

  const descId = id && description ? `${id}-desc` : undefined;
  const errId = id && errorMessage ? `${id}-err` : undefined;

  const ariaDescribedBy =
    [descId, errId].filter(Boolean).join(' ') || undefined;

  // Inject ARIA props into the direct child control
  const child = React.Children.map(children, (c) => {
    if (!React.isValidElement(c) || !id) return c;
    return React.cloneElement(c as React.ReactElement<Record<string, unknown>>, {
      id,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': hasError || undefined,
      isInvalid: hasError || undefined,
    });
  });

  return (
    <div
      className={cx(
        'lucent-form-field',
        layout !== 'stack' && `lucent-form-field--${layout}`,
        className,
      )}
    >
      {label && (
        <Label htmlFor={id} className="lucent-label">
          {label}
        </Label>
      )}

      {child}

      {description && (
        <span id={descId} className="lucent-form-field__description">
          {description}
        </span>
      )}

      {errorMessage && (
        <span id={errId} className="lucent-form-field__error" role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
}

FormField.displayName = 'FormField';
