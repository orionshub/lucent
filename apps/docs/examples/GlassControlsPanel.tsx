/* eslint-disable */
// The docs' runtime controls panel — built from Lucent's OWN components
// (Select, Slider, Switch, Button, GlassSurface) so the docs dogfood the library.
// Mounted as a client-only React island by GlassControls.vue.
import { useEffect, useState } from 'react'
import {
  setTheme,
  setAccent,
  setDensity,
  setGlassOpacity,
  setGlassBlur,
  setContrast,
  GLASS_OPACITY_DEFAULT,
  GLASS_OPACITY_MIN,
  GLASS_OPACITY_MAX,
  GLASS_BLUR_MAX,
  GlassSurface,
  Button,
  Slider,
  Switch,
  Text,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectItem,
} from '@lucent/react'

type Theme = 'dark' | 'light'
type Accent = 'cyan' | 'violet' | 'teal'
type Density = 'airy' | 'balanced' | 'compact'

function attr(name: string, fallback: string) {
  if (typeof document === 'undefined') return fallback
  return document.documentElement.getAttribute(name) || fallback
}
function varNum(name: string, fallback: number) {
  if (typeof document === 'undefined') return fallback
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name))
  return Number.isFinite(v) ? v : fallback
}

const inlineRow: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <Text size="label" muted>{label}</Text>
      {children}
    </div>
  )
}

function Choice({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string
  onChange: (v: string) => void
  options: [string, string][]
  ariaLabel: string
}) {
  return (
    <SelectRoot value={value} onValueChange={onChange}>
      <SelectTrigger aria-label={ariaLabel} style={{ inlineSize: '100%' }}>
        <SelectValue />
        <SelectIcon />
      </SelectTrigger>
      <SelectContent>
        {options.map(([v, l]) => (
          <SelectItem key={v} value={v}>
            {l}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}

export default function GlassControlsPanel() {
  const [open, setOpen] = useState(false)
  const [theme, setThemeState] = useState<Theme>(() => attr('data-theme', 'dark') as Theme)
  const [accent, setAccentState] = useState<Accent>(() => attr('data-accent', 'cyan') as Accent)
  const [density, setDensityState] = useState<Density>(() => attr('data-density', 'airy') as Density)
  const [opacity, setOpacity] = useState(() => varNum('--lucent-glass-opacity', GLASS_OPACITY_DEFAULT))
  const [blur, setBlur] = useState(() => varNum('--lucent-glass-blur', 12))
  const [solid, setSolid] = useState(() => attr('data-contrast', 'default') === 'solid')
  const [rtl, setRtl] = useState(() => attr('dir', 'ltr') === 'rtl')

  // Keep the Theme control in sync when the VitePress sun/moon toggle flips data-theme.
  useEffect(() => {
    if (typeof document === 'undefined') return
    const el = document.documentElement
    const obs = new MutationObserver(() => {
      const t = (el.getAttribute('data-theme') || 'dark') as Theme
      setThemeState((prev) => (prev === t ? prev : t))
    })
    obs.observe(el, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  function applyRtl(v: boolean) {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', v ? 'rtl' : 'ltr')
    }
  }

  function reset() {
    setTheme('dark'); setThemeState('dark')
    setAccent('cyan'); setAccentState('cyan')
    setDensity('airy'); setDensityState('airy')
    setGlassOpacity(GLASS_OPACITY_DEFAULT); setOpacity(GLASS_OPACITY_DEFAULT)
    setGlassBlur(12); setBlur(12)
    setContrast('default'); setSolid(false)
    applyRtl(false); setRtl(false)
  }

  return (
    <div style={{ position: 'fixed', insetInlineEnd: 16, insetBlockEnd: 16, zIndex: 40, fontFamily: 'var(--lucent-font-sans)' }}>
      {open && (
        <GlassSurface
          style={{
            width: 264,
            padding: 16,
            borderRadius: 16,
            marginBlockEnd: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            maxBlockSize: 'min(70vh, 560px)',
            overflowY: 'auto',
          }}
        >
          <Field label="Theme">
            <Choice
              ariaLabel="Theme"
              value={theme}
              onChange={(v) => { setTheme(v); setThemeState(v as Theme) }}
              options={[['dark', 'Dark'], ['light', 'Light']]}
            />
          </Field>

          <Field label="Accent">
            <Choice
              ariaLabel="Accent colour"
              value={accent}
              onChange={(v) => { setAccent(v); setAccentState(v as Accent) }}
              options={[['cyan', 'Cyan'], ['violet', 'Violet'], ['teal', 'Teal']]}
            />
          </Field>

          <Field label="Density">
            <Choice
              ariaLabel="Density"
              value={density}
              onChange={(v) => { setDensity(v); setDensityState(v as Density) }}
              options={[['airy', 'Airy'], ['balanced', 'Balanced'], ['compact', 'Compact']]}
            />
          </Field>

          <Field label={`Glass opacity — ${opacity.toFixed(2)}`}>
            <Slider
              aria-label="Glass opacity"
              value={[opacity]}
              min={GLASS_OPACITY_MIN}
              max={GLASS_OPACITY_MAX}
              step={0.01}
              onValueChange={(v) => { setGlassOpacity(v[0]); setOpacity(v[0]) }}
            />
          </Field>

          <Field label={`Glass blur — ${Math.round(blur)}px`}>
            <Slider
              aria-label="Glass blur"
              value={[blur]}
              min={0}
              max={GLASS_BLUR_MAX}
              step={1}
              onValueChange={(v) => { setGlassBlur(v[0]); setBlur(v[0]) }}
            />
          </Field>

          <label style={inlineRow}>
            <Switch
              aria-label="Solid / high-contrast mode"
              checked={solid}
              onCheckedChange={(c) => { setContrast(c ? 'solid' : 'default'); setSolid(c) }}
            />
            <Text size="label">Solid / high-contrast</Text>
          </label>

          <label style={inlineRow}>
            <Switch
              aria-label="RTL direction"
              checked={rtl}
              onCheckedChange={(c) => { applyRtl(c); setRtl(c) }}
            />
            <Text size="label">RTL direction</Text>
          </label>

          <Button size="sm" variant="soft" onClick={reset} style={{ alignSelf: 'flex-start' }}>
            Reset
          </Button>
        </GlassSurface>
      )}

      <Button variant="solid" size="sm" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span aria-hidden style={{ marginInlineEnd: 6 }}>◈</span>
        {open ? 'Hide controls' : 'Glass controls'}
      </Button>
    </div>
  )
}
