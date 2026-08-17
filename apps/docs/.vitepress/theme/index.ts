import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import ReactIsland from './ReactIsland.vue'
import PropsTable from './PropsTable.vue'
import GlassControls from './GlassControls.vue'
import VitreuiBanner from './VitreuiBanner.vue'
import Demo from './Demo.vue'

// The library's compiled CSS — the one-time import consumers make.
// Loaded once here so every live example on the docs renders themed glass.
import '@orionshub/lucent/styles.css'
import '@orionshub/lucent/theme.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // Sticky vitreui notice + floating runtime-controls panel, on every page.
      'layout-top': () => [h(VitreuiBanner), h(GlassControls)],
    })
  },
  enhanceApp({ app }) {
    app.component('ReactIsland', ReactIsland)
    app.component('PropsTable', PropsTable)
    app.component('Demo', Demo)
    app.component('GlassControls', GlassControls)
  },
} satisfies Theme
