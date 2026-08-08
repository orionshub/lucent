'use client'

// A client island importing an interactive, "use client" component (Dialog).
// Its presence proves the preserved "use client" boundary compiles under RSC.
import { Dialog } from '@lucent/react/dialog'
import { Button } from '@lucent/react/button'

export function ClientBits() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open dialog (client)</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Interactive island</Dialog.Title>
        <Dialog.Description>
          Focus trap, scroll lock, and ESC-to-close all run on the client.
        </Dialog.Description>
        <Dialog.Close asChild>
          <Button style={{ marginBlockStart: 16 }}>Close</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}
