<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps<{ name: string }>()

const host = ref<HTMLElement | null>(null)
let root: { unmount: () => void } | null = null

async function mount() {
  if (!host.value) return
  const [{ createRoot }, React, registry] = await Promise.all([
    import('react-dom/client'),
    import('react'),
    import('../../examples/registry'),
  ])
  const loader = registry.examples[props.name]
  if (!loader) {
    host.value.innerHTML =
      `<p class="react-island__missing">Missing example: <code>${props.name}</code></p>`
    return
  }
  const mod = await loader()
  const Example = mod.default ?? mod
  root = createRoot(host.value)
  root.render(React.createElement(Example))
}

function unmount() {
  if (root) {
    root.unmount()
    root = null
  }
}

onMounted(mount)
onBeforeUnmount(unmount)

// Re-mount if the example id changes (e.g. client-side nav reusing the node).
watch(
  () => props.name,
  () => {
    unmount()
    mount()
  },
)
</script>

<template>
  <!-- onMounted only runs client-side, so React mounts into this div after
       hydration. SSR renders an empty placeholder — proving pages don't need
       the React runtime to statically render. -->
  <div ref="host" class="react-island" />
</template>

<style scoped>
.react-island {
  display: block;
}
:deep(.react-island__missing) {
  color: var(--vp-c-danger-1, #f66);
  font-size: 0.85rem;
}
</style>
