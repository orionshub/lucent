# Reduced Motion

All animation in Lucent is **CSS-only** — there is no animation runtime dependency. Every transition
and keyframe is gated so that users who prefer reduced motion get a still, instant experience.

## How it works

Motion is wrapped in a `prefers-reduced-motion` guard. Enter/exit and shimmer/spin animations are
defined under `no-preference` and disabled under `reduce`:

```css
@media (prefers-reduced-motion: no-preference) {
  .lucent-accordion__content { animation: lucent-accordion-down 200ms ease; }
}

@media (prefers-reduced-motion: reduce) {
  .lucent-spinner,
  .lucent-skeleton { animation: none; }
}
```

## What this affects

- **Disclosure** (Accordion, Collapsible) — height transitions become instant.
- **Overlays** (Dialog, Popover, Tooltip, Menus, Toast) — enter/exit fades/scales are removed.
- **Feedback** (Spinner, Skeleton, Progress) — spin/shimmer stop; the component still communicates
  state via ARIA (`role="status"`, `aria-busy`, `aria-live`).

## Testing

Enable "Reduce motion" in your OS accessibility settings, or emulate it in DevTools
(Rendering → *Emulate CSS media feature `prefers-reduced-motion`*), then interact with the components
on this site. Nothing should animate, and every component should remain fully functional.
