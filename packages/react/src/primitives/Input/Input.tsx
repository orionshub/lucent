/**
 * Input — glass wrapper div + native input (server-safe)
 *
 * The glass recipe goes on the wrapper <div>, NOT on <input> directly —
 * UA stylesheets interfere with backdrop-filter on replaced form elements
 * (RESEARCH Pattern 3 correction, D3-01).
 *
 * aria-invalid is set on BOTH the wrapper div (CSS border hook) AND the inner
 * input element (AT like VoiceOver/NVDA look for aria-invalid on the actual
 * form control, D3-03).
 *
 * asChild uses Slot+Slottable so react-hook-form register() spreads work.
 */
import React from 'react';
import { Slot, Slottable } from '../../utils/Slot/slot';
import { cx } from '../../utils/cx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Marks the input as invalid — applies danger border colour. */
  isInvalid?: boolean;
  /** Icon before the input text. Rendered aria-hidden. */
  startIcon?: React.ReactNode;
  /** Icon after the input text. Rendered aria-hidden. */
  endIcon?: React.ReactNode;
  /** Render the inner element as the single child element (for react-hook-form). */
  asChild?: boolean;
  /** Extra className for the outer wrapper div. */
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      isInvalid,
      startIcon,
      endIcon,
      asChild = false,
      className,
      wrapperClassName,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) {
    const Comp = asChild ? Slot : 'input';
    const isFilled = value !== undefined && value !== '';

    return (
      <div
        className={cx(
          'lucent-input-wrapper',
          isInvalid && 'lucent-input-wrapper--invalid',
          wrapperClassName,
        )}
        aria-invalid={isInvalid || undefined}
        data-filled={isFilled ? '' : undefined}
      >
        {startIcon ? (
          <span className="lucent-input__icon lucent-input__icon--start" aria-hidden="true">
            {startIcon}
          </span>
        ) : null}

        <Slottable>
          <Comp
            ref={ref}
            className={cx('lucent-input', className)}
            aria-invalid={isInvalid || undefined}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            {...props}
          />
        </Slottable>

        {endIcon ? (
          <span className="lucent-input__icon lucent-input__icon--end" aria-hidden="true">
            {endIcon}
          </span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
