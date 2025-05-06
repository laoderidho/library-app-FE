<template>
    <h1 class="m-10 text-2xl font-bold">Data Buku</h1>

    <div class="la-card-large m-10 rounded-sm">
        <div class="mb-10">
            <div class="m-10 pt-10 flex justify-between items-center">
                <h1 class="text-2xl font-bold">Data Buku</h1>
                <div class="w-100 h-10 flex justify-between">
                    <FormSearch name="keyword" v-model="input.keyword" typeForm="text" :isInvalid="false"
                        :messageInvalid="''" />
                    <FormButtonSearch name="Search" @click="search" />
                </div>

            </div>

            <div class="m-10 pb-10">
                <EasyDataTable :headers="headers" :items="items" border-cell buttons-pagination :rows-per-page="10">
                    <template #item-photo="{ photo }">
                        <a :href="photo" target="_blank">
                            <img :src="photo" alt="Book Photo" class="w-20 h-20 py-2 object-cover rounded-lg" />
                        </a>
                    </template>
                </EasyDataTable>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import type { Header, Item } from "vue3-easy-data-table"
    
    const { $api } = useNuxtApp()
    const auth = useAuthStore()

    // Items and Header vue3-easy-data-table

    const headers: Header[] = [
        { text: 'id', value: 'id' },
        { text: 'Judul', value: 'title' },
        { text: 'Pengarang', value: 'author' },
        { text: 'Photo', value: 'photo' },
    ]

    const items: Item = ref<any>([])

    // Ref
    const input = ref<Record<string, any>>({});

    // API
    const getData = async () => {
        const data = await $api('admin/book/get-book', {
            method: 'GET',
            headers: {
                Authorization: `${auth.getToken}`
            }
        }).then((res: any) => {
            return res.data
        }).catch((err: any) => {
            console.log(err)
            toast.error('Gagal mendapatkan data buku')
        })

        return data
    }

    const search = async () =>{
        const data = await $api('admin/book/search-book', {
            method: 'POST',
            headers: {
                Authorization: `${auth.getToken}`
            },
            body: {
                keyword: input.value.keyword
            }
        }).then((res: any) => {
            return res.data
        }).catch((err: any) => {
            toast.error('Gagal mendapatkan data buku')
        })

        items.value = data
    }

    // Mounted
    onMounted(async () => {
        const data = await getData()
        items.value = data 
    })

    // Define Layouting
    definePageMeta({
        layout: 'admin'
    })
</script>