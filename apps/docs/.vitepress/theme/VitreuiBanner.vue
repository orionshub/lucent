<script setup lang="ts">
import { ref, onMounted } from 'vue'

const KEY = 'vitreui-banner-dismissed'
const visible = ref(true)

// Keep VitePress's fixed nav offset in sync with the banner's presence.
function setTopHeight(px: number) {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--vp-layout-top-height', `${px}px`)
  }
}

onMounted(() => {
  try {
    if (localStorage.getItem(KEY) === '1') {
      visible.value = false
      setTopHeight(0)
    }
  } catch {
    /* ignore */
  }
})

function dismiss() {
  visible.value = false
  setTopHeight(0)
  try {
    localStorage.setItem(KEY, '1')
  } catch {
    /* ignore */
  }
}
</script>

<template>
  <div v-if="visible" class="vitreui-banner" role="region" aria-label="Package availability notice">
    <span class="vitreui-banner__text">
      <span aria-hidden="true">◈</span>
      Also available as
      <a
        class="vitreui-banner__pkg"
        href="https://www.npmjs.com/package/vitreui"
        target="_blank"
        rel="noreferrer"
      >vitreui</a>
      <span class="vitreui-banner__tail">— the same library under a shorter name.</span>
      <code class="vitreui-banner__cmd">npm i vitreui</code>
    </span>
    <button class="vitreui-banner__close" type="button" aria-label="Dismiss notice" @click="dismiss">
      ×
    </button>
  </div>
</template>

<style scoped>
.vitreui-banner {
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: 100;
  block-size: var(--vp-layout-top-height, 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding-inline: 3rem 2.5rem;
  font-size: 0.82rem;
  color: #06121f;
  background: linear-gradient(90deg, #22d3ee, #38bdf8 45%, #818cf8);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
}
.vitreui-banner__text {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  justify-content: center;
  font-weight: 500;
}
.vitreui-banner__pkg {
  font-weight: 700;
  color: #06121f;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.vitreui-banner__pkg:hover {
  color: #0b1a2b;
}
.vitreui-banner__cmd {
  background: rgba(6, 18, 31, 0.14);
  color: #06121f;
  padding: 1px 7px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
}
.vitreui-banner__close {
  position: absolute;
  inset-inline-end: 0.75rem;
  inset-block-start: 50%;
  transform: translateY(-50%);
  inline-size: 24px;
  block-size: 24px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #06121f;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
}
.vitreui-banner__close:hover {
  background: rgba(6, 18, 31, 0.12);
}

@media (max-width: 640px) {
  .vitreui-banner {
    font-size: 0.72rem;
    padding-inline: 1rem 2.25rem;
  }
  .vitreui-banner__cmd,
  .vitreui-banner__tail {
    display: none;
  }
}
</style>
