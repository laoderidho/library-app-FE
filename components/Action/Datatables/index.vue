<template>
  <div class="flex gap-2 my-1">
    <button
      class="px-2 py-1 bg-blue-500 text-white rounded"
      @click="$emit('edit', item)"
    >
      Edit
    </button>
    <button
      class="px-2 py-1 bg-red-500 text-white rounded"
      @click="$emit('delete', item)"
    >
      Delete
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: any
}>()

defineEmits(['edit', 'delete'])
</script>
