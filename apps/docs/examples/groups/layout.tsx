/* eslint-disable */
// Live examples — Layout.
import { Box, Flex, Grid, Card, ScrollArea, Accordion, Collapsible, Tabs, Badge, Button, Text, Heading } from '@lucent/react'

const cell: React.CSSProperties = {
  background: 'hsl(var(--lucent-surface))',
  border: '1px solid hsl(var(--lucent-border))',
  borderRadius: 8,
  textAlign: 'center',
}

// #region box-basic
export function BoxBasic() {
  return (
    <Flex gap={2} wrap="wrap">
      <Box p={2} style={cell}>p=2</Box>
      <Box p={3} style={cell}>p=3</Box>
      <Box p={4} style={cell}>p=4</Box>
    </Flex>
  )
}
// #endregion

// #region flex-basic
export function FlexBasic() {
  return (
    <Flex gap={2} wrap="wrap" align="center">
      <Badge>Flex</Badge>
      <Badge tone="accent">gap 2</Badge>
      <Badge tone="danger">wrap</Badge>
    </Flex>
  )
}
// #endregion

// #region grid-basic
export function GridBasic() {
  return (
    <Grid columns={3} gap={2} style={{ width: 280 }}>
      <Box p={3} style={cell}>1</Box>
      <Box p={3} style={cell}>2</Box>
      <Box p={3} style={cell}>3</Box>
    </Grid>
  )
}
// #endregion

// #region card-basic
export function CardBasic() {
  return (
    <Card variant="elevated" padding="md" style={{ maxWidth: 320 }}>
      <Card.Header><Heading size="heading">Glass Card</Heading></Card.Header>
      <Card.Body><Text muted>Header / Body / Footer sections on the flagship glass surface.</Text></Card.Body>
      <Card.Footer><Button size="sm">Action</Button></Card.Footer>
    </Card>
  )
}
// #endregion

// #region scroll-area-basic
export function ScrollAreaBasic() {
  return (
    <ScrollArea style={{ blockSize: 120, width: 300, borderRadius: 10, border: '1px solid hsl(var(--lucent-border))' }}>
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <Text key={i} muted>Row {i + 1} — native scrolling, custom glass scrollbar.</Text>
        ))}
      </div>
    </ScrollArea>
  )
}
// #endregion

// #region accordion-basic
export function AccordionBasic() {
  return (
    <Accordion.Root type="single" collapsible style={{ width: 320 }}>
      <Accordion.Item value="a">
        <Accordion.Trigger>What is glassmorphism?</Accordion.Trigger>
        <Accordion.Content>A frosted, translucent surface with a luminous edge.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="b">
        <Accordion.Trigger>Is motion reduced-safe?</Accordion.Trigger>
        <Accordion.Content>Yes — animation honors prefers-reduced-motion.</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
// #endregion

// #region collapsible-basic
export function CollapsibleBasic() {
  return (
    <Collapsible.Root style={{ width: 320 }}>
      <Collapsible.Trigger>Toggle details</Collapsible.Trigger>
      <Collapsible.Content><Text muted>Height animates with CSS only.</Text></Collapsible.Content>
    </Collapsible.Root>
  )
}
// #endregion

// #region tabs-basic
export function TabsBasic() {
  return (
    <Tabs.Root defaultValue="overview" style={{ width: 320 }}>
      <Tabs.List aria-label="Sections">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="specs">Specs</Tabs.Trigger>
        <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview"><Text muted>Roving focus, orientation, and RTL.</Text></Tabs.Content>
      <Tabs.Content value="specs"><Text muted>Automatic activation by default.</Text></Tabs.Content>
      <Tabs.Content value="reviews"><Text muted>Panels swap with no layout shift.</Text></Tabs.Content>
    </Tabs.Root>
  )
}
// #endregion
