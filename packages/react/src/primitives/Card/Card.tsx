/**
 * Card — the flagship glass surface (LAYOUT-02)
 *
 * Composes GlassSurface. Server-safe (no hooks, no "use client").
 * Optional compound parts Card.Header / Card.Body / Card.Footer provide
 * conventional structure without requiring it.
 */
import React from 'react';
import { cx } from '../../utils/cx';
import { GlassSurface } from '../GlassSurface/GlassSurface';

export type CardVariant = 'elevated' | 'outline' | 'soft';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual emphasis. Defaults to `elevated`. */
  variant?: CardVariant;
  /** Inner padding scale. Defaults to `md`. */
  padding?: CardPadding;
  /** Render the single child, merging props/ref (via GlassSurface `asChild` semantics through `as`). */
  as?: React.ElementType;
}

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'elevated', padding = 'md', className, children, ...props },
  ref,
) {
  return (
    <GlassSurface
      ref={ref}
      className={cx(
        'lucent-card',
        `lucent-card--${variant}`,
        `lucent-card--pad-${padding}`,
        className,
      )}
      {...props}
    >
      {children}
    </GlassSurface>
  );
});
CardRoot.displayName = 'Card';

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardSectionProps>(function CardHeader(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cx('lucent-card__header', className)} {...props} />;
});
CardHeader.displayName = 'Card.Header';

const CardBody = React.forwardRef<HTMLDivElement, CardSectionProps>(function CardBody(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cx('lucent-card__body', className)} {...props} />;
});
CardBody.displayName = 'Card.Body';

const CardFooter = React.forwardRef<HTMLDivElement, CardSectionProps>(function CardFooter(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cx('lucent-card__footer', className)} {...props} />;
});
CardFooter.displayName = 'Card.Footer';

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
