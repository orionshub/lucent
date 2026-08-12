/* eslint-disable */
// Live examples — Overlays.
import {
  Dialog,
  AlertDialog,
  Popover,
  Tooltip,
  TooltipProvider,
  HoverCard,
  DropdownMenu,
  ContextMenu,
  Button,
  Box,
  Text,
  Link,
} from '@orionshub/lucent'

const row: React.CSSProperties = { display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }

// #region dialog-basic
export function DialogBasic() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild><Button>Open dialog</Button></Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>Focus is trapped and returned; ESC closes; page scroll locks.</Dialog.Description>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBlockStart: 24 }}>
          <Dialog.Close asChild><Button variant="ghost">Cancel</Button></Dialog.Close>
          <Dialog.Close asChild><Button>Save</Button></Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
// #endregion

// #region alert-dialog-basic
export function AlertDialogBasic() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild><Button variant="outline">Delete…</Button></AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete item?</AlertDialog.Title>
        <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBlockStart: 24 }}>
          <AlertDialog.Cancel asChild><Button variant="ghost">Cancel</Button></AlertDialog.Cancel>
          <AlertDialog.Action asChild><Button>Delete</Button></AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
// #endregion

// #region popover-basic
export function PopoverBasic() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild><Button>Open popover</Button></Popover.Trigger>
      <Popover.Content aria-label="Details">
        <Text>Collision-aware glass surface with an arrow.</Text>
      </Popover.Content>
    </Popover.Root>
  )
}
// #endregion

// #region tooltip-basic
export function TooltipBasic() {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild><Button variant="ghost">Hover or focus me</Button></Tooltip.Trigger>
        <Tooltip.Content>Opens on hover and focus</Tooltip.Content>
      </Tooltip.Root>
    </TooltipProvider>
  )
}
// #endregion

// #region hover-card-basic
export function HoverCardBasic() {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild><Link href="#">@lucent</Link></HoverCard.Trigger>
      <HoverCard.Content><Text>Glassmorphic React components — polish without weight.</Text></HoverCard.Content>
    </HoverCard.Root>
  )
}
// #endregion

// #region dropdown-menu-basic
export function DropdownMenuBasic() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild><Button>Menu</Button></DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Actions</DropdownMenu.Label>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item variant="destructive">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
// #endregion

// #region context-menu-basic
export function ContextMenuBasic() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <Box p={4} style={{ border: '1px dashed hsl(var(--lucent-border))', borderRadius: 10 }}>
          <Text muted>Right-click here</Text>
        </Box>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>Copy</ContextMenu.Item>
        <ContextMenu.Item>Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item variant="destructive">Remove</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}
// #endregion
