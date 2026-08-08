<script setup lang="ts">
import { computed } from 'vue'
import propsData from '../data/props.json'

interface PropDoc {
  name: string
  type: string
  required: boolean
  defaultValue: string | null
  description: string
}
interface ComponentDoc {
  displayName: string
  description?: string
  props: PropDoc[]
}

const props = defineProps<{ name: string }>()

const data = computed<ComponentDoc | undefined>(
  () => (propsData as Record<string, ComponentDoc>)[props.name],
)
const rows = computed<PropDoc[]>(() => data.value?.props ?? [])
</script>

<template>
  <div class="props-table">
    <table v-if="rows.length">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td>
            <code class="props-table__name">{{ row.name }}</code>
            <span v-if="row.required" class="props-table__req" title="Required">*</span>
          </td>
          <td><code class="props-table__type">{{ row.type }}</code></td>
          <td>
            <code v-if="row.defaultValue" class="props-table__default">{{ row.defaultValue }}</code>
            <span v-else class="props-table__dash">—</span>
          </td>
          <td>{{ row.description }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else class="props-table__empty">
      This component forwards native element props. It exposes no additional public props, or its
      props are documented inline above.
    </p>
  </div>
</template>

<style scoped>
.props-table {
  margin: 1rem 0 1.5rem;
  overflow-x: auto;
}
.props-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}
.props-table th,
.props-table td {
  text-align: left;
  vertical-align: top;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.props-table th {
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.props-table__name {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.props-table__req {
  color: var(--vp-c-danger-1, #f66);
  margin-inline-start: 2px;
}
.props-table__type {
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
  word-break: break-word;
}
.props-table__dash {
  color: var(--vp-c-text-3);
}
.props-table__empty {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>
