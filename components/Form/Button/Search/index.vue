<template>
    <button
        type="button"
        class="btn-submit text-white bg-blue-800 hover:bg-blue-600 focus:ring-4 
            focus:outline-none focus:bg-blue-600 font-medium rounded-lg py-3
            text-sm h-10 w-35 hover:bg-black-600 flex justify-center items-center gap-2"
        @click="emit('click')"
    >
        <font-awesome-icon icon="search" />
        {{ name }}
    </button>
</template>


<script setup lang="ts">
    defineProps({
        name: String
    })

    const emit = defineEmits(["click"])
    
</script>


<style scoped>
    .btn-submit{
        cursor: pointer;   
    }
</style>