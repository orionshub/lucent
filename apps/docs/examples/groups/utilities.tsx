/* eslint-disable */
// Live examples — Utilities. Each export is mounted as a client-only React island.
import { Slot, VisuallyHidden, AccessibleIcon, Portal, Button, GlassSurface, Text } from '@lucent/react'
import { useState } from 'react'

const row: React.CSSProperties = { display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }

// #region slot-basic
export function SlotBasic() {
  return (
    <Slot className="lucent-button lucent-button--solid lucent-button--md">
      <a href="#slot-demo">Rendered as an anchor via Slot</a>
    </Slot>
  )
}
// #endregion

// #region visually-hidden-basic
export function VisuallyHiddenBasic() {
  return (
    <Button>
      <span aria-hidden>★</span>
      <VisuallyHidden>Add to favourites</VisuallyHidden>
    </Button>
  )
}
// #endregion

// #region accessible-icon-basic
export function AccessibleIconBasic() {
  return (
    <Button variant="outline">
      <AccessibleIcon label="Settings">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
      </AccessibleIcon>
    </Button>
  )
}
// #endregion

// #region portal-basic
export function PortalBasic() {
  const [open, setOpen] = useState(false)
  return (
    <div style={row}>
      <Button onClick={() => setOpen((v) => !v)}>{open ? 'Close' : 'Open'} portal</Button>
      {open && (
        <Portal>
          <GlassSurface
            style={{ position: 'fixed', right: 24, bottom: 96, padding: 16, borderRadius: 12, maxWidth: 260 }}
          >
            <Text>Rendered into document.body — still themed from :root.</Text>
          </GlassSurface>
        </Portal>
      )}
    </div>
  )
}
// #endregion
