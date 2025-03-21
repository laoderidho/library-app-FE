<template>
    <button  type="button" class="btn-submit text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 
        focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg py-3
        text-xl w-100 hover:bg-black-600 flex justify-center"
        @click="emit('click')"
    >
    <div v-if="isLoading" class="mx-2 mt-1">
        <div class="w-5 h-5 border-4  border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
        {{ name }}
    </button>
</template>

<script setup lang="ts">
    defineProps({
        name: String,
        isLoading: Boolean
    })

    const emit = defineEmits(["click"])
    
</script>


<style scoped>
    .btn-submit{
        cursor: pointer;   
    }
</style>