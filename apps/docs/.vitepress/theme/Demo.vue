<script setup lang="ts">
defineProps<{ name: string; title?: string }>()
</script>

<template>
  <figure class="lucent-demo">
    <figcaption v-if="title" class="lucent-demo__caption">{{ title }}</figcaption>
    <div class="lucent-demo__stage">
      <ReactIsland :name="name" />
    </div>
  </figure>
</template>

<style scoped>
.lucent-demo {
  margin: 1.25rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  overflow: hidden;
  /* Background + shadow live in custom.css so they can adapt to the active
     light/dark appearance. */
}
.lucent-demo__caption {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  padding: 0.6rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.lucent-demo__stage {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1.5rem;
  min-height: 96px;
}
</style>
