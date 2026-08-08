/* eslint-disable */
// Live examples — Feedback.
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Toast, ToastProvider, Spinner, Skeleton, EmptyState, Button } from '@lucent/react'

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

// #region toast-basic
export function ToastBasic() {
  const [open, setOpen] = useState(false)
  return (
    <ToastProvider swipeDirection="right">
      <Button onClick={() => { setOpen(false); requestAnimationFrame(() => setOpen(true)) }}>
        Show toast
      </Button>
      <Toast.Root open={open} onOpenChange={setOpen} tone="success" duration={4000}>
        <Toast.Title>Saved</Toast.Title>
        <Toast.Description>Your changes were saved successfully.</Toast.Description>
        <Toast.Close aria-label="Dismiss" style={{ marginInlineStart: 'auto' }}>×</Toast.Close>
      </Toast.Root>
      {/* Render the Viewport at the app root — outside any backdrop-filter/transform
          ancestor, which would otherwise trap its position:fixed. */}
      {typeof document !== 'undefined' && createPortal(<Toast.Viewport />, document.body)}
    </ToastProvider>
  )
}
// #endregion

// #region spinner-basic
export function SpinnerBasic() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
}
// #endregion

// #region skeleton-basic
export function SkeletonBasic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280 }}>
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="rect" height={48} />
    </div>
  )
}
// #endregion

// #region empty-state-basic
export function EmptyStateBasic() {
  return (
    <EmptyState
      icon={<PlusIcon />}
      title="No projects yet"
      description="Create your first project to get started."
      action={<Button size="sm">New project</Button>}
    />
  )
}
// #endregion
