<template>
    <div class="flex items-center mb-4">
        <input :id="name" type="checkbox" :checked="modelValue" @input="(event) => {const target = event.target as HTMLInputElement; $emit('update:modelValue', target.checked)}" 
            class="w-4 h-4 text-blue-600 bg-white border-gray-300 
            rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-white dark:border-gray-600">
        <label :for="name" class="ms-2 text-lg font-medium text-black dark:text-black">{{ name }}</label>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        name: String,
        modelValue: Boolean,
    })

    defineEmits(['update:modelValue'])
</script>