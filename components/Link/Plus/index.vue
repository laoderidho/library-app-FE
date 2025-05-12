<template>
        <NuxtLink :to="link" class="m-10 text-xl btn bg-blue-500 text-white px-3 py-3 hover:bg-blue-400 rounded"> <font-awesome-icon icon="plus"/> {{ label }}</NuxtLink>
</template>

<script setup lang="ts">
    defineProps({
        link: String,
        label: String
    })
</script>