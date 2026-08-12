<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useData } from 'vitepress'
import { setTheme } from '@lucent/react/theme'

// The panel UI itself is a React island built from Lucent's own components
// (Select / Slider / Switch / Button / GlassSurface) — the docs dogfood the library.
// This Vue wrapper mounts it client-side and keeps Lucent's theme in lock-step
// with the VitePress light/dark appearance toggle.

const { isDark } = useData()
const host = ref<HTMLElement | null>(null)
let root: { unmount: () => void } | null = null

watch(isDark, (dark) => setTheme(dark ? 'dark' : 'light'), { immediate: true })

onMounted(async () => {
  if (!host.value) return
  const [{ createRoot }, React, mod] = await Promise.all([
    import('react-dom/client'),
    import('react'),
    import('../../examples/GlassControlsPanel'),
  ])
  root = createRoot(host.value)
  root.render(React.createElement(mod.default))
})

onBeforeUnmount(() => {
  if (root) {
    root.unmount()
    root = null
  }
})
</script>

<template>
  <div ref="host" />
</template>
