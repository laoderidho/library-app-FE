import tailwindcss from "@tailwindcss/vite"
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  vite:{
    plugins: [
      tailwindcss()
    ], 
  },

  runtimeConfig: {
    public: {
      SERVER_API: process.env.NUXT_PUBLIC_SERVER_API
    }
  },

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  plugins: [
    '~/plugins/flowbite.client.ts',
    {src: '~/plugins/easy-data-table.ts', mode: 'client'}
  ], 
  css: [
    'vue3-easy-data-table/dist/style.css',
  ]
})