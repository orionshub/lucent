import React, { useState, useEffect } from 'react';
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
} from '@lucent/react';
import './style.css';

/* ─── Icons (bring-your-own — Lucent ships none) ─────────────────────── */

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
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
            Glassmorphic React component library — Phase 1 demo
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

        </div>
      </div>
    </LucentProvider>
  );
}
