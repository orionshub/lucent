// A Server Component (no "use client"). Imports server-safe components via their
// per-component subpath exports (the RSC-safe path — the root barrel bundles the
// client theme provider and is intended for client trees) and composes an
// interactive client island.
import { Card } from '@lucent/react/card'
import { Button } from '@lucent/react/button'
import { Heading } from '@lucent/react/heading'
import { Text } from '@lucent/react/text'
import { ClientBits } from './ClientBits'

export default function Page() {
  return (
    <main style={{ padding: 32 }}>
      <Card variant="elevated" padding="md">
        <Card.Header>
          <Heading size="heading">Lucent × Next.js App Router</Heading>
        </Card.Header>
        <Card.Body>
          <Text muted>
            This page is a Server Component. Card, Button, Heading, and Text render on the server
            with no client bundle. The dialog below is a client island.
          </Text>
        </Card.Body>
        <Card.Footer>
          <Button>Server-safe button</Button>
          <ClientBits />
        </Card.Footer>
      </Card>
    </main>
  )
}
