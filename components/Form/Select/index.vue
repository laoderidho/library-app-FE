<template>
  <div class="my-5">
    <label :for="selectLabel" class="block text-lg font-medium text-gray-900 dark:text-black">
      {{ label }}
    </label>
    <select
      :id="selectLabel"
      v-model="selectedValue"
      :name="nameSelect"
      @change="$emit('update:modelValue', selectedValue)"
      class="bg-gray-50 border border-gray-300 text-black text-lg rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
             dark:bg-white dark:border-black/25 dark:placeholder-gray-400
             dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option v-for="(item, index) in data" :key="index" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  label: String,
  selectLabel: String,
  data: Array as () => Array<{ label: number; value: string }>,
  valueSelect: String, 
  nameSelect: String,
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const selectedValue = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal;
});
</script>
