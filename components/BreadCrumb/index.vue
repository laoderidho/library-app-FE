<template>
    <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li v-for="(item, index) in data || []" :key="index" class="inline-flex items-center">
                <NuxtLink
                    :to="item.link"
                    class="inline-flex items-center text-lg font-medium text-black hover:text-blue-600 ">
                    {{ item.label }}
                </NuxtLink>
                <svg v-if="index !== (data ?? []).length - 1" class="rtl:rotate-180 w-3 h-3 text-black mx-1"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 9 4-4-4-4" />
                </svg>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
   const props =  defineProps({
        data: Array as () => Array<{ link: string; label: string }>
    })

    console.log('data', props.data)
</script>