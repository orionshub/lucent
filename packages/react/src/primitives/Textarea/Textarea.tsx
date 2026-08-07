/**
 * Textarea — glass wrapper div + native textarea (server-safe)
 *
 * Same glass-on-wrapper pattern as Input (D3-01 correction).
 * aria-invalid on both wrapper AND native textarea (D3-03).
 */
import React from 'react';
import { cx } from '../../utils/cx';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Marks the textarea as invalid — applies danger border colour. */
  isInvalid?: boolean;
  /** Extra className for the outer wrapper div. */
  wrapperClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ isInvalid, className, wrapperClassName, value, ...props }, ref) {
    const isFilled = value !== undefined && value !== '';
    return (
      <div
        className={cx(
          'lucent-textarea-wrapper',
          isInvalid && 'lucent-textarea-wrapper--invalid',
          wrapperClassName,
        )}
        aria-invalid={isInvalid || undefined}
        data-filled={isFilled ? '' : undefined}
      >
        <textarea
          ref={ref}
          className={cx('lucent-textarea', className)}
          aria-invalid={isInvalid || undefined}
          value={value}
          {...props}
        />
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
