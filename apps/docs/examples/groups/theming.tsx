/* eslint-disable */
// Live examples — Theming.
import { Fragment } from 'react'
import { LucentProvider, useLucent, ThemePanel, GlassSurface, Text, Heading } from '@lucent/react'

// #region lucent-provider-basic
function AxisReadout() {
  const { theme, accent, density, glassOpacity, glassBlur, contrast } = useLucent()
  const axes = { theme, accent, density, glassOpacity, glassBlur, contrast }
  return (
    <dl style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '4px 16px', margin: 0 }}>
      {Object.entries(axes).map(([k, v]) => (
        <Fragment key={k}>
          <dt style={{ opacity: 0.7 }}>{k}</dt>
          <dd style={{ margin: 0, fontWeight: 600 }}>{String(v)}</dd>
        </Fragment>
      ))}
    </dl>
  )
}

export function LucentProviderBasic() {
  return (
    <LucentProvider>
      <GlassSurface style={{ padding: 16, borderRadius: 12 }}>
        <AxisReadout />
      </GlassSurface>
    </LucentProvider>
  )
}
// #endregion

// #region theme-panel-basic
export function ThemePanelBasic() {
  return (
    <LucentProvider>
      <div style={{ maxWidth: 340 }}>
        <ThemePanel />
      </div>
    </LucentProvider>
  )
}
// #endregion

// #region glass-surface-basic
export function GlassSurfaceBasic() {
  return (
    <GlassSurface style={{ padding: 20, borderRadius: 14, maxWidth: 320 }}>
      <Heading size="heading">Frosted glass</Heading>
      <Text muted>Capped-blur translucency with a luminous edge and an opaque `@supports` fallback.</Text>
    </GlassSurface>
  )
}
// #endregion
