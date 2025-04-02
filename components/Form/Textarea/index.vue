<template>
    <div >
        <label for="message" class="block mb-2 text-lg font-medium text-gray-900 dark:text-black">{{ label }}</label>
        <textarea id="message" rows="4" class="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border
         border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400
         dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="textPlaceholder"
          @input="(event) => {const target = event.target as HTMLInputElement; $emit('update:modelValue', target.value)}" 
          ></textarea>
          <p v-if="isInvalid" class="text-red-600">{{ messageInvalid }}</p>
    </div>
</template>

<script lang="ts" setup>
    defineProps({
        label: String,
        isInvalid: Boolean,
        messageInvalid: String,
        textPlaceholder: String,
        modelValue: String
    })
</script>