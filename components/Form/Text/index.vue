<template>
    <div class="mb-5">
        <div class="relative w-100">
            <input :value="modelValue"  :type="typeForm" @input="(event) => {const target = event.target as HTMLInputElement; $emit('update:modelValue', target.value)}" 
                :id="name" 
                :class="[
                'block px-2.5 pb-2.5 pt-4 w-full text-lg text-black bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 peer',
                isInvalid ? 'border-red-600 focus:border-red-600 dark:border-red-600 dark:focus:border-red-600' 
                          : 'border-gray-300 focus:border-black dark:border-gray-600 dark:focus:border-blue-600'
                ]"
                placeholder=" " />
            <label :for="name" class="absolute text-lg text-black dark:text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] 
                bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-focus:dark:text-black
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                {{ name }}
            </label>
        </div>
        <p v-if="isInvalid" class="text-red-600">{{ messageInvalid }}</p>
    </div>
</template>


<script setup lang="ts">
    defineProps({
        name: String,
        modelValue: String,
        typeForm: String,
        isInvalid: Boolean,
        messageInvalid: String
    })

    defineEmits(['update:modelValue'])
</script>