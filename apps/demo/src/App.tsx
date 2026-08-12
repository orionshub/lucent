import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  LucentProvider,
  GlassSurface,
  ThemePanel,
  useLucent,
  Button,
  IconButton,
  Link,
  Badge,
  Avatar,
  Separator,
  Kbd,
  Text,
  Heading,
  // Phase 3 — form controls
  Label,
  Input,
  Textarea,
  FormField,
  Checkbox,
  Switch,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  RadioGroup,
  RadioGroupItem,
  Slider,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectItem,
  // Phase 4 — layout & static data
  Box,
  Flex,
  Grid,
  Card,
  ScrollArea,
  Accordion,
  Collapsible,
  Tabs,
  Table,
  Callout,
  Progress,
  AvatarGroup,
  // Phase 5 — overlays
  Dialog,
  AlertDialog,
  Popover,
  Tooltip,
  TooltipProvider,
  HoverCard,
  DropdownMenu,
  ContextMenu,
  // Phase 6 — feedback & toast
  Toast,
  ToastProvider,
  Spinner,
  Skeleton,
  EmptyState,
} from '@orionshub/lucent';
import './style.css';

/* ─── Icons (bring-your-own — Lucent ships none) ─────────────────────── */

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/* ─── Phase 6: Toast trigger demo (needs local open state) ───────────── */

function ToastDemo() {
  const [open, setOpen] = useState(false);
  return (
    <ToastProvider swipeDirection="right">
      <Button onClick={() => { setOpen(false); requestAnimationFrame(() => setOpen(true)); }}>
        Show toast
      </Button>
      <Toast.Root open={open} onOpenChange={setOpen} tone="success" duration={4000}>
        <Toast.Title>Saved</Toast.Title>
        <Toast.Description>Your changes were saved successfully.</Toast.Description>
        <Toast.Close aria-label="Dismiss" style={{ marginInlineStart: 'auto' }}>×</Toast.Close>
      </Toast.Root>
      {/* The Viewport must live outside any backdrop-filter/transform ancestor
          (those create a containing block that traps position:fixed). Portaling
          to <body> is the demo's way of placing it at the app root. */}
      {createPortal(<Toast.Viewport />, document.body)}
    </ToastProvider>
  );
}

/* ─── Keyboard shortcut demo ─────────────────────────────────────────── */

function ShortcutDemo() {
  const [metaActive, setMetaActive] = useState(false);
  const [kActive, setKActive] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Meta' || e.key === 'Control') setMetaActive(true);
      if (e.key === 'k' || e.key === 'K') setKActive(true);
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setTriggered(true);
        setTimeout(() => setTriggered(false), 1200);
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      if (e.key === 'Meta' || e.key === 'Control') setMetaActive(false);
      if (e.key === 'k' || e.key === 'K') setKActive(false);
    }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const activeStyle: React.CSSProperties = {
    background: 'hsl(var(--lucent-accent) / 0.2)',
    borderColor: 'hsl(var(--lucent-accent))',
    color: 'hsl(var(--lucent-accent))',
    transform: 'translateY(1px)',
    transition: 'all 80ms ease',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Text size="label" muted>
        Press{' '}
        <Kbd style={metaActive ? activeStyle : undefined}>⌘</Kbd>
        {' '}<Kbd style={kActive ? activeStyle : undefined}>K</Kbd>
        {' '}to trigger the shortcut
      </Text>
      <div
        style={{
          padding: '0.75rem 1rem',
          borderRadius: 'var(--lucent-radius-md)',
          background: triggered
            ? 'hsl(var(--lucent-accent) / 0.12)'
            : 'hsl(var(--lucent-surface) / 0.5)',
          border: `1px solid ${triggered ? 'hsl(var(--lucent-accent) / 0.4)' : 'hsl(var(--lucent-border))'}`,
          color: triggered ? 'hsl(var(--lucent-accent))' : 'hsl(var(--lucent-on-surface-muted))',
          fontSize: 13,
          transition: 'all 200ms ease',
        }}
      >
        {triggered ? '⚡ Command palette triggered!' : 'Waiting for ⌘K…'}
      </div>
    </div>
  );
}

/* ─── Background canvas ──────────────────────────────────────────────── */

const bgStyle: React.CSSProperties = {
  minHeight: '100dvh',
//   background: 'hsl(var(--lucent-bg))',
  background: 'url("https://picsum.photos/1920/1080") no-repeat center center fixed',
  color: 'hsl(var(--lucent-on-bg))',
  fontFamily: 'var(--lucent-font-sans)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '2rem',
  gap: '2rem',
  transition: 'background var(--lucent-duration-base) var(--lucent-ease-standard)',
};

/* ─── Demo cards ─────────────────────────────────────────────────────── */

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <GlassSurface
      style={{
        padding: '1.5rem',
        maxWidth: '480px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: 'var(--lucent-type-heading-size, 20px)',
          fontWeight: 'var(--lucent-type-heading-weight, 600)',
          color: 'hsl(var(--lucent-on-surface))',
        }}
      >
        {title}
      </h2>
      {children}
    </GlassSurface>
  );
}

/* ─── Token grid ─────────────────────────────────────────────────────── */

function TokenGrid() {
  const swatches = [
    { label: 'accent', var: '--lucent-accent' },
    { label: 'surface', var: '--lucent-surface' },
    { label: 'bg', var: '--lucent-bg' },
    { label: 'border', var: '--lucent-border' },
    { label: 'danger', var: '--lucent-danger' },
  ];
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      {swatches.map((s) => (
        <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: 'var(--lucent-radius-md)',
              background: `hsl(var(${s.var}))`,
              border: '1px solid hsl(var(--lucent-border))',
            }}
          />
          <span style={{ fontSize: 11, color: 'hsl(var(--lucent-on-surface-muted))' }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Controls showcase ─────────────────────────────────────────────── */

function AxisValues() {
  const { theme, accent, density, glassOpacity, glassBlur, contrast } = useLucent();
  const rows: [string, string][] = [
    ['theme', theme],
    ['accent', accent],
    ['density', density],
    ['glassOpacity', glassOpacity.toFixed(2)],
    ['glassBlur', glassBlur + 'px'],
    ['contrast', contrast],
  ];
  return (
    <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 12px' }}>
      {rows.map(([k, v]) => (
        <React.Fragment key={k}>
          <dt style={{ color: 'hsl(var(--lucent-on-surface-muted))', fontSize: 13 }}>{k}</dt>
          <dd style={{ margin: 0, fontWeight: 600, color: 'hsl(var(--lucent-accent))', fontSize: 13 }}>{v}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

/* ─── App ────────────────────────────────────────────────────────────── */

export default function App() {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <LucentProvider>
      <div style={bgStyle}>

        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            margin: '0 0 4px',
            fontSize: 'var(--lucent-type-display-size, 28px)',
            fontWeight: 600,
            color: 'hsl(var(--lucent-on-bg))',
            letterSpacing: '-0.02em',
          }}>
            Lucent
          </h1>
          <p style={{ margin: 0, color: 'hsl(var(--lucent-on-surface-muted))', fontSize: 14 }}>
            Glassmorphic React component library — component showcase
          </p>
          <button
            onClick={() => setShowPanel((v) => !v)}
            style={{
              marginTop: '1rem',
              padding: '6px 16px',
              background: `hsl(var(--lucent-accent) / 0.15)`,
              border: `1px solid hsl(var(--lucent-accent) / 0.4)`,
              borderRadius: 'var(--lucent-radius-md)',
              color: 'hsl(var(--lucent-accent))',
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
              fontFamily: 'var(--lucent-font-sans)',
              transition: 'background var(--lucent-duration-fast) var(--lucent-ease-standard)',
            }}
          >
            {showPanel ? 'Close' : 'Open'} Theme Panel ⚙
          </button>
        </div>

        {/* Theme Panel */}
        {showPanel && (
          <div style={{ width: '100%', maxWidth: 360 }}>
            <ThemePanel />
          </div>
        )}

        {/* Glass surfaces */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: 1000 }}>

          <DemoCard title="Current theming axes">
            <AxisValues />
            <p style={{ margin: 0, fontSize: 12, color: 'hsl(var(--lucent-on-surface-muted))' }}>
              Open the Theme Panel above to change any axis at runtime — glass surfaces repaint instantly via CSS cascade, with zero React re-render.
            </p>
          </DemoCard>

          <DemoCard title="Colour tokens">
            <TokenGrid />
            <p style={{ margin: 0, fontSize: 12, color: 'hsl(var(--lucent-on-surface-muted))' }}>
              Switch accent (Cyan → Violet → Teal) in the panel.
            </p>
          </DemoCard>

          <DemoCard title="Glass surface">
            <GlassSurface
              style={{
                padding: '1rem',
                borderRadius: 'var(--lucent-radius-lg)',
                background: `hsl(var(--lucent-accent) / 0.08)`,
              }}
            >
              <p style={{ margin: 0, fontSize: 14, color: 'hsl(var(--lucent-on-surface))' }}>
                A nested glass surface. Drag the transparency slider to see blur + opacity change live.
              </p>
            </GlassSurface>
          </DemoCard>

          <DemoCard title="Type scale">
            {(['display', 'heading', 'body', 'label'] as const).map((role) => (
              <p
                key={role}
                style={{
                  margin: 0,
                  fontSize: `var(--lucent-type-${role}-size)`,
                  fontWeight: `var(--lucent-type-${role}-weight)`,
                  lineHeight: `var(--lucent-type-${role}-leading)`,
                  letterSpacing: `var(--lucent-type-${role}-tracking)`,
                  color: 'hsl(var(--lucent-on-surface))',
                }}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)} — The quick brown fox
              </p>
            ))}
          </DemoCard>

          {/* ─── Phase 2: Buttons ───────────────────────────────── */}
          <DemoCard title="Buttons — variants">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button variant="solid">Solid</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button loading>Loading</Button>
              <Button startIcon={<PlusIcon />}>With icon</Button>
              <Button asChild>
                <a href="#link">As link (asChild)</a>
              </Button>
            </div>
          </DemoCard>

          {/* ─── Phase 2: IconButtons ───────────────────────────── */}
          <DemoCard title="Icon buttons">
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <IconButton icon={<PlusIcon />} aria-label="Add" variant="solid" />
              <IconButton icon={<PlusIcon />} label="Add (soft)" variant="soft" />
              <IconButton icon={<PlusIcon />} aria-label="Add (outline)" variant="outline" />
              <IconButton icon={<PlusIcon />} aria-label="Add (ghost)" variant="ghost" />
              <IconButton icon={<PlusIcon />} aria-label="Small" size="sm" variant="outline" />
              <IconButton icon={<PlusIcon />} aria-label="Large" size="lg" variant="outline" />
            </div>
            <Text size="label" muted>Every icon button has a compile-time-enforced accessible name.</Text>
          </DemoCard>

          {/* ─── Phase 2: Badges ────────────────────────────────── */}
          <DemoCard title="Badges — tones × variants">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge tone="neutral">Neutral</Badge>
              <Badge tone="accent">Accent</Badge>
              <Badge tone="danger">Danger</Badge>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge tone="accent" variant="soft">Soft</Badge>
              <Badge tone="accent" variant="solid">Solid</Badge>
              <Badge tone="accent" variant="outline">Outline</Badge>
            </div>
          </DemoCard>

          {/* ─── Phase 2: Avatars ───────────────────────────────── */}
          <DemoCard title="Avatars">
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Avatar src="https://i.pravatar.cc/80?img=1" alt="Ada" fallback="AD" />
              <Avatar src="https://i.pravatar.cc/80?img=5" alt="Ben" fallback="BN" />
              <Avatar fallback="JD" />
              <Avatar fallback="+3" />
            </div>
            <Text size="label" muted>Images with graceful initials fallback.</Text>
          </DemoCard>

          {/* ─── Phase 2: Text, Link, Kbd, Separator ────────────── */}
          <DemoCard title="Text, links & keys">
            <Heading size="heading" as="h3">A heading</Heading>
            <Text>
              Body text with an{' '}
              <Link href="https://example.com" target="_blank">external link</Link>{' '}
              (safe rel + new-tab cue) and an{' '}
              <Link href="#internal">internal link</Link>.
            </Text>
            <Separator />
            <ShortcutDemo />
          </DemoCard>

          {/* ─── Phase 3: Label + Input + Textarea ───────────────── */}
          <DemoCard title="Label, Input, Textarea">
            <FormField label="Name" id="demo-name">
              <Input id="demo-name" placeholder="Enter your name" />
            </FormField>
            <FormField label="Email" id="demo-email" description="We'll never share your email.">
              <Input id="demo-email" type="email" placeholder="you@example.com" startIcon={<span style={{fontSize:12}}>@</span>} />
            </FormField>
            <FormField label="Message" id="demo-msg">
              <Textarea id="demo-msg" placeholder="Say something…" rows={3} />
            </FormField>
            <FormField
              label="Required field"
              id="demo-req"
              error="This field is required"
              isInvalid
            >
              <Input id="demo-req" placeholder="Can't be empty" />
            </FormField>
          </DemoCard>

          {/* ─── Phase 3: Floating label ──────────────────────────── */}
          <DemoCard title="Floating label">
            <FormField layout="floating" label="Full name" id="demo-float">
              <Input id="demo-float" placeholder=" " />
            </FormField>
            <Text size="label" muted>Click inside — the label rises. Fill the field and blur — it stays raised.</Text>
          </DemoCard>

          {/* ─── Phase 3: Checkbox + Switch ──────────────────────── */}
          <DemoCard title="Checkbox + Switch">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Checkbox aria-label="Accept terms" defaultChecked id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Checkbox aria-label="Indeterminate" checked="indeterminate" id="indet" />
                <Label htmlFor="indet">Indeterminate state</Label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Switch aria-label="Dark mode" defaultChecked id="dark-mode" />
                <Label htmlFor="dark-mode">Dark mode</Label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Switch aria-label="Notifications" id="notifs" />
                <Label htmlFor="notifs">Enable notifications</Label>
              </div>
            </div>
          </DemoCard>

          {/* ─── Phase 3: Radio group ────────────────────────────── */}
          <DemoCard title="Radio Group">
            <RadioGroup aria-label="Plan" defaultValue="pro">
              <RadioGroupItem value="free" aria-label="Free" label="Free — $0/month" />
              <RadioGroupItem value="pro" aria-label="Pro" label="Pro — $12/month" />
              <RadioGroupItem value="enterprise" aria-label="Enterprise" label="Enterprise — custom" />
            </RadioGroup>
          </DemoCard>

          {/* ─── Phase 3: Toggle group ────────────────────────────── */}
          <DemoCard title="Toggle + Toggle Group">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Toggle aria-label="Bold" defaultPressed><b>B</b></Toggle>
              <Toggle aria-label="Italic"><i>I</i></Toggle>
              <Toggle aria-label="Underline"><u>U</u></Toggle>
            </div>
            <ToggleGroup type="single" aria-label="Text alignment" defaultValue="left">
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
          </DemoCard>

          {/* ─── Phase 3: Slider ─────────────────────────────────── */}
          <DemoCard title="Slider">
            <FormField label="Volume" id="demo-volume">
              <Slider
                aria-label="Volume"
                defaultValue={[60]}
                min={0}
                max={100}
                step={1}
                getValueLabel={(v) => `${v}%`}
                style={{ paddingBlock: '0.5rem' }}
              />
            </FormField>
            <FormField label="Price range" id="demo-price">
              <Slider
                aria-label="Price range"
                defaultValue={[20, 80]}
                min={0}
                max={100}
                step={5}
                getValueLabel={(v) => `$${v}`}
                style={{ paddingBlock: '0.5rem' }}
              />
            </FormField>
          </DemoCard>

          {/* ─── Phase 3: Select ─────────────────────────────────── */}
          <DemoCard title="Select">
            <FormField label="Accent colour" id="demo-accent-select">
              <SelectRoot defaultValue="cyan">
                <SelectTrigger style={{ inlineSize: '100%' }}>
                  <SelectValue placeholder="Pick an accent…" />
                  <SelectIcon />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cyan">Cyan (default)</SelectItem>
                  <SelectItem value="violet">Violet</SelectItem>
                  <SelectItem value="teal">Teal</SelectItem>
                </SelectContent>
              </SelectRoot>
            </FormField>
            <FormField label="Framework" id="demo-fw">
              <SelectRoot>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a framework…" />
                  <SelectIcon />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="svelte">Svelte</SelectItem>
                  <SelectItem value="angular" disabled>Angular (coming soon)</SelectItem>
                </SelectContent>
              </SelectRoot>
            </FormField>
          </DemoCard>

          {/* ─── Phase 4: Layout primitives ───────────────────────── */}
          <DemoCard title="Box / Flex / Grid">
            <Flex gap={2} wrap="wrap" align="center">
              <Badge>Flex</Badge>
              <Badge tone="accent">gap 2</Badge>
              <Badge tone="danger">wrap</Badge>
            </Flex>
            <Grid columns={3} gap={2} style={{ marginBlockStart: '0.75rem' }}>
              <Box p={2} style={{ background: 'hsl(var(--lucent-surface))', borderRadius: 8, textAlign: 'center' }}>1</Box>
              <Box p={2} style={{ background: 'hsl(var(--lucent-surface))', borderRadius: 8, textAlign: 'center' }}>2</Box>
              <Box p={2} style={{ background: 'hsl(var(--lucent-surface))', borderRadius: 8, textAlign: 'center' }}>3</Box>
            </Grid>
          </DemoCard>

          {/* ─── Phase 4: Card ────────────────────────────────────── */}
          <DemoCard title="Card (flagship glass)">
            <Card variant="elevated" padding="md">
              <Card.Header><Heading size="heading">Glass Card</Heading></Card.Header>
              <Card.Body><Text muted>Composed from GlassSurface with elevated / outline / soft variants.</Text></Card.Body>
              <Card.Footer><Button size="sm">Action</Button></Card.Footer>
            </Card>
          </DemoCard>

          {/* ─── Phase 4: Tabs ────────────────────────────────────── */}
          <DemoCard title="Tabs">
            <Tabs.Root defaultValue="overview">
              <Tabs.List aria-label="Sections">
                <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                <Tabs.Trigger value="specs">Specs</Tabs.Trigger>
                <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="overview"><Text muted>Roving focus, orientation, and RTL supported.</Text></Tabs.Content>
              <Tabs.Content value="specs"><Text muted>Automatic activation by default.</Text></Tabs.Content>
              <Tabs.Content value="reviews"><Text muted>Panels swap with no layout shift.</Text></Tabs.Content>
            </Tabs.Root>
          </DemoCard>

          {/* ─── Phase 4: Accordion + Collapsible ─────────────────── */}
          <DemoCard title="Accordion + Collapsible">
            <Accordion.Root type="single" collapsible>
              <Accordion.Item value="a">
                <Accordion.Trigger>What is glassmorphism?</Accordion.Trigger>
                <Accordion.Content>A frosted, translucent surface with a luminous edge.</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="b">
                <Accordion.Trigger>Is motion reduced-safe?</Accordion.Trigger>
                <Accordion.Content>Yes — all animation honors prefers-reduced-motion.</Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
            <Collapsible.Root style={{ marginBlockStart: '0.75rem' }}>
              <Collapsible.Trigger>Toggle details</Collapsible.Trigger>
              <Collapsible.Content><Text muted>Height animates with CSS only.</Text></Collapsible.Content>
            </Collapsible.Root>
          </DemoCard>

          {/* ─── Phase 4: Scroll Area ─────────────────────────────── */}
          <DemoCard title="Scroll Area">
            <ScrollArea style={{ blockSize: 120, borderRadius: 10, border: '1px solid hsl(var(--lucent-border))' }}>
              <div style={{ padding: '0.75rem' }}>
                {Array.from({ length: 12 }, (_, i) => (
                  <Text key={i} muted>Row {i + 1} — custom glass scrollbar, native scrolling preserved.</Text>
                ))}
              </div>
            </ScrollArea>
          </DemoCard>

          {/* ─── Phase 4: Table ───────────────────────────────────── */}
          <DemoCard title="Table">
            <Table>
              <Table.Caption>Quarterly revenue</Table.Caption>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Quarter</Table.Head>
                  <Table.Head>Revenue</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row><Table.Head scope="row">Q1</Table.Head><Table.Cell>$1.2M</Table.Cell></Table.Row>
                <Table.Row><Table.Head scope="row">Q2</Table.Head><Table.Cell>$1.8M</Table.Cell></Table.Row>
              </Table.Body>
            </Table>
          </DemoCard>

          {/* ─── Phase 4: Callout ─────────────────────────────────── */}
          <DemoCard title="Callout / Alert">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Callout tone="info">A neutral, static note.</Callout>
              <Callout tone="success">Saved successfully.</Callout>
              <Callout tone="danger" urgent>Something went wrong (role=alert).</Callout>
            </div>
          </DemoCard>

          {/* ─── Phase 4: Progress ────────────────────────────────── */}
          <DemoCard title="Progress">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Progress aria-label="Upload" value={64} />
              <Progress aria-label="Loading" />
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Progress aria-label="Sync" variant="circular" value={72} />
                <Progress aria-label="Working" variant="circular" />
              </div>
            </div>
          </DemoCard>

          {/* ─── Phase 4: Avatar Group ────────────────────────────── */}
          <DemoCard title="Avatar Group">
            <AvatarGroup max={3}>
              <Avatar fallback="AB" alt="Ada B" />
              <Avatar fallback="CD" alt="Carl D" />
              <Avatar fallback="EF" alt="Eve F" />
              <Avatar fallback="GH" alt="Gus H" />
              <Avatar fallback="IJ" alt="Ivy J" />
            </AvatarGroup>
          </DemoCard>

          {/* ─── Phase 5: Dialog + Alert Dialog ───────────────────── */}
          <DemoCard title="Dialog + Alert Dialog">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Dialog.Root>
                <Dialog.Trigger asChild><Button>Open dialog</Button></Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Title>Edit profile</Dialog.Title>
                  <Dialog.Description>Focus is trapped and returned; ESC closes; the page scroll locks.</Dialog.Description>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBlockStart: '1.5rem' }}>
                    <Dialog.Close asChild><Button variant="ghost">Cancel</Button></Dialog.Close>
                    <Dialog.Close asChild><Button>Save</Button></Dialog.Close>
                  </div>
                </Dialog.Content>
              </Dialog.Root>
              <AlertDialog.Root>
                <AlertDialog.Trigger asChild><Button variant="outline">Delete…</Button></AlertDialog.Trigger>
                <AlertDialog.Content>
                  <AlertDialog.Title>Delete item?</AlertDialog.Title>
                  <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
                  <div className="lucent-alert-dialog__actions">
                    <AlertDialog.Cancel asChild><Button variant="ghost">Cancel</Button></AlertDialog.Cancel>
                    <AlertDialog.Action asChild><Button>Delete</Button></AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Root>
            </div>
          </DemoCard>

          {/* ─── Phase 5: Popover · Tooltip · Hover Card ──────────── */}
          <DemoCard title="Popover · Tooltip · Hover Card">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Popover.Root>
                <Popover.Trigger asChild><Button>Popover</Button></Popover.Trigger>
                <Popover.Content aria-label="Details">
                  <Text>Collision-aware glass surface with an arrow.</Text>
                </Popover.Content>
              </Popover.Root>
              <TooltipProvider delayDuration={200}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild><Button variant="ghost">Hover me</Button></Tooltip.Trigger>
                  <Tooltip.Content>Opens on hover and focus</Tooltip.Content>
                </Tooltip.Root>
              </TooltipProvider>
              <HoverCard.Root>
                <HoverCard.Trigger asChild><Link href="#">@lucent</Link></HoverCard.Trigger>
                <HoverCard.Content><Text>Glassmorphic React components — polish without weight.</Text></HoverCard.Content>
              </HoverCard.Root>
            </div>
          </DemoCard>

          {/* ─── Phase 5: Menus ───────────────────────────────────── */}
          <DemoCard title="Dropdown + Context Menu">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
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
              <ContextMenu.Root>
                <ContextMenu.Trigger asChild>
                  <Box p={3} style={{ border: '1px dashed hsl(var(--lucent-border))', borderRadius: 10 }}>
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
            </div>
          </DemoCard>

          {/* ─── Phase 6: Toast ───────────────────────────────────── */}
          <DemoCard title="Toast">
            <ToastDemo />
          </DemoCard>

          {/* ─── Phase 6: Spinner + Skeleton ──────────────────────── */}
          <DemoCard title="Spinner + Skeleton">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBlockEnd: '0.75rem' }}>
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="rect" height={48} />
            </div>
          </DemoCard>

          {/* ─── Phase 6: Empty State ─────────────────────────────── */}
          <DemoCard title="Empty State">
            <EmptyState
              icon={<PlusIcon />}
              title="No projects yet"
              description="Create your first project to get started."
              action={<Button size="sm">New project</Button>}
            />
          </DemoCard>

        </div>
      </div>
    </LucentProvider>
  );
}
