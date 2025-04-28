<template>
    <nav class="navbar bg-white border-gray-200 dark:bg-white dark:border-gray-700 mb-10">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/img/library-icon.png" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Library App</span>
            </a>
            <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white
             dark:bg-white md:dark:bg-white dark:border-gray-700">
                <li>
                    <NuxtLink class="block py-2 px-3 text-black text-xl menu-item" active-class="active" to="/admin/home">Home</NuxtLink>
                </li>
                <li>
                     <NuxtLink class="block py-2 px-3 text-black text-xl menu-item" active-class="active" to="/admin/dashboard">Dashboard</NuxtLink>
                </li>
                <li>
                     <NuxtLink class="block py-2 px-3 text-black text-xl menu-item" active-class="active" to="/admin/book">Book</NuxtLink>
                </li>
                <li>
                     <NuxtLink class="block py-2 px-3 text-black text-xl menu-item" active-class="active" to="/admin/user">User</NuxtLink>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    <slot></slot>

</template>


<style scoped>
    .navbar{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    
    
    /* Kelas umum untuk menu item */
    .menu-item {
        display: inline-block;
        position: relative;
        padding-bottom: 1px; /* ruang untuk garis bawah */
        cursor: pointer;
        font-size: 1rem; /* Atur ukuran font sesuai kebutuhan */
    }

    /* Garis bawah pada elemen yang aktif, statis */
    .menu-item.active {
        border-bottom: 2px solid black;
        padding-bottom: 1px; /* Pastikan garis bawahnya rapi */
    }

    /* Animasi untuk garis bawah saat hover, hanya untuk yang tidak aktif */
    .menu-item:not(.active)::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: black;
        transition: width 0.3s ease;
    }

    /* Munculkan garis bawah saat hover pada menu yang tidak aktif */
    .menu-item:not(.active):hover::after {
        width: 100%;
    }
</style>


<script setup>
    
</script>