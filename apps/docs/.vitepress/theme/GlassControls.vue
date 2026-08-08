<script setup lang="ts">
import { ref } from 'vue'
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
} from '@lucent/react/theme'

const open = ref(false)
const theme = ref<'dark' | 'light'>('dark')
const accent = ref<'cyan' | 'violet' | 'teal'>('cyan')
const density = ref<'airy' | 'balanced' | 'compact'>('airy')
const opacity = ref(GLASS_OPACITY_DEFAULT)
const blur = ref(12)
const solid = ref(false)
const rtl = ref(false)

function applyTheme() {
  setTheme(theme.value)
}
function applyAccent() {
  setAccent(accent.value)
}
function applyDensity() {
  setDensity(density.value)
}
function applyOpacity() {
  setGlassOpacity(Number(opacity.value))
}
function applyBlur() {
  setGlassBlur(Number(blur.value))
}
function applySolid() {
  setContrast(solid.value ? 'solid' : 'default')
}
function applyRtl() {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('dir', rtl.value ? 'rtl' : 'ltr')
  }
}

function reset() {
  theme.value = 'dark'
  accent.value = 'cyan'
  density.value = 'airy'
  opacity.value = GLASS_OPACITY_DEFAULT
  blur.value = 12
  solid.value = false
  rtl.value = false
  applyTheme()
  applyAccent()
  applyDensity()
  applyOpacity()
  applyBlur()
  applySolid()
  applyRtl()
}
</script>

<template>
  <ClientOnly>
    <div class="glass-controls" :class="{ 'is-open': open }">
      <button
        class="glass-controls__toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="glass-controls-panel"
        @click="open = !open"
      >
        <span aria-hidden="true">◈</span>
        <span>{{ open ? 'Hide' : 'Glass controls' }}</span>
      </button>

      <div v-show="open" id="glass-controls-panel" class="glass-controls__panel" role="group" aria-label="Runtime theme controls">
        <div class="glass-controls__row">
          <label>Theme</label>
          <select v-model="theme" @change="applyTheme">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div class="glass-controls__row">
          <label>Accent</label>
          <select v-model="accent" @change="applyAccent">
            <option value="cyan">Cyan</option>
            <option value="violet">Violet</option>
            <option value="teal">Teal</option>
          </select>
        </div>

        <div class="glass-controls__row">
          <label>Density</label>
          <select v-model="density" @change="applyDensity">
            <option value="airy">Airy</option>
            <option value="balanced">Balanced</option>
            <option value="compact">Compact</option>
          </select>
        </div>

        <div class="glass-controls__row">
          <label>Opacity <span class="glass-controls__val">{{ Number(opacity).toFixed(2) }}</span></label>
          <input
            type="range"
            :min="GLASS_OPACITY_MIN"
            :max="GLASS_OPACITY_MAX"
            step="0.01"
            v-model="opacity"
            @input="applyOpacity"
          />
        </div>

        <div class="glass-controls__row">
          <label>Blur <span class="glass-controls__val">{{ blur }}px</span></label>
          <input type="range" min="0" :max="GLASS_BLUR_MAX" step="1" v-model="blur" @input="applyBlur" />
        </div>

        <div class="glass-controls__row glass-controls__row--inline">
          <label><input type="checkbox" v-model="solid" @change="applySolid" /> Solid / high-contrast</label>
        </div>

        <div class="glass-controls__row glass-controls__row--inline">
          <label><input type="checkbox" v-model="rtl" @change="applyRtl" /> RTL direction</label>
        </div>

        <button class="glass-controls__reset" type="button" @click="reset">Reset</button>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.glass-controls {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 60;
  font-size: 0.8rem;
}
.glass-controls__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
}
.glass-controls__panel {
  margin-top: 0.5rem;
  width: 240px;
  padding: 0.9rem;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.glass-controls__row {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.glass-controls__row--inline label {
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 0.45rem;
}
.glass-controls__row label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  display: flex;
  justify-content: space-between;
}
.glass-controls__val {
  color: var(--vp-c-brand-1);
  font-variant-numeric: tabular-nums;
}
.glass-controls__row select,
.glass-controls__row input[type='range'] {
  width: 100%;
}
.glass-controls__reset {
  align-self: flex-start;
  padding: 0.35rem 0.7rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
}
</style>
