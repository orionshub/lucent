"use client";

/**
 * Accordion — Radix Accordion with CSS-only height animation (LAYOUT-04)
 *
 * Supports type="single" and type="multiple". Content height animates using
 * the Radix `--radix-accordion-content-height` custom property — no JS
 * measurement. Carries "use client".
 */
import React from 'react';
import { Accordion as RadixAccordion } from 'radix-ui';
import { cx } from '../../utils/cx';

export type AccordionRootProps = React.ComponentPropsWithoutRef<typeof RadixAccordion.Root>;
const AccordionRoot: typeof RadixAccordion.Root = RadixAccordion.Root;

export type AccordionItemProps = React.ComponentPropsWithoutRef<typeof RadixAccordion.Item>;
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Item>,
  AccordionItemProps
>(function AccordionItem({ className, ...props }, ref) {
  return <RadixAccordion.Item ref={ref} className={cx('lucent-accordion__item', className)} {...props} />;
});
AccordionItem.displayName = 'Accordion.Item';

export type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>;
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Trigger>,
  AccordionTriggerProps
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <RadixAccordion.Header className="lucent-accordion__header">
      <RadixAccordion.Trigger ref={ref} className={cx('lucent-accordion__trigger', className)} {...props}>
        {children}
        <svg
          className="lucent-accordion__chevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  );
});
AccordionTrigger.displayName = 'Accordion.Trigger';

export type AccordionContentProps = React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>;
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Content>,
  AccordionContentProps
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <RadixAccordion.Content ref={ref} className={cx('lucent-accordion__content', className)} {...props}>
      <div className="lucent-accordion__content-inner">{children}</div>
    </RadixAccordion.Content>
  );
});
AccordionContent.displayName = 'Accordion.Content';

export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
