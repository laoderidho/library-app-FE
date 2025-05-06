<template>
    <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <!-- <li class="inline-flex items-center">
                <a href="#"
                    class="inline-flex items-center text-lg font-medium text-black hover:text-blue-600 ">
                    Home
                </a>
            </li>
            <li>
                <div class="flex items-center">
                    <svg class="rtl:rotate-180 w-3 h-3 text-black mx-1" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 9 4-4-4-4" />
                    </svg>
                    <a href="#"
                        class="ms-1 text-lg font-medium text-black hover:text-blue-600 md:ms-2>Projects">Home</a>
                </div>
            </li> -->
        </ol>
    </nav>
</template>

<script setup lang="ts">
    defineProps({
        data: Array as () => Array<{ link: string; label: string }>
    })

    console.log('data', data)
</script>