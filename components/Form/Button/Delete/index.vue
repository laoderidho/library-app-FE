<template>
    <button  type="button" class="btn-submit text-white bg-red-600 
      hover:bg-red-400 focus:ring-4 
        focus:outline-none  font-medium rounded-lg py-3
        text-xl w-full hover:bg-black-600 flex justify-center"
        @click="emit('click')"
    >
    <font-awesome-icon icon="trash" />  {{ name }}
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