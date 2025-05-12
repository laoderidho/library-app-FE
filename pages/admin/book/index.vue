<template>
    <div class="flex justify-between ">
        <h1 class="m-10 text-2xl font-bold">Data Buku</h1>
        <LinkPlus link="/admin/book/add" label="Tambah Buku" />
    </div>
    
    <div class="la-card-large mx-10 rounded-sm">
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
                    <template #item-action="{ id, title }">
                        <div class="flex items-center gap-4">
                            <div class="w-full">
                                <LinkEdit :link="`/admin/book/edit/${id}`" label="Edit" />
                            </div>
                            <div class="w-50">
                                <FormButtonDelete @click="openModal(id, title)" name="Hapus"/>
                            </div>
                        </div>

                        <Modal :show="isModalOpen" @close="closeModal">
                            <h2 class="text-xl font-bold mb-4">Yakin Ingin menghapus Buku {{ input.title }}</h2>

                            <div>
                                <FormButton name="ya" @click="deleteBook(input.id)" class="mt-4" :is-loading="isloading" />
                            </div>
                        </Modal>
                    </template>
                </EasyDataTable>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import type { Header, Item } from "vue3-easy-data-table"
    import { toast } from 'vue3-toastify'
    
    const { $api } = useNuxtApp()
    const auth = useAuthStore()

    // Items and Header vue3-easy-data-table

    const headers: Header[] = [
        { text: 'id', value: 'id' },
        { text: 'Judul', value: 'title' },
        { text: 'Pengarang', value: 'author' },
        { text: 'Photo', value: 'photo' },
        { text: 'action', value: 'action', width: 300  }
    ]

    const items: Item = ref<any>([])

    // Ref
    const input = ref<Record<string, any>>({});
    const isloading = ref(false)
    
    // modal variable
    const isModalOpen = ref(false)

    const openModal = (id: number, title: string) => {
        isModalOpen.value = true
        input.value.id = id
        input.value.title = title
    }

    const closeModal = () => {
        isModalOpen.value = false
    }

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


    const deleteBook = async (id: number) => {
        isloading.value = true
        try {
            await $api(`admin/book/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `${auth.getToken}`
                },
                body: {
                    id: id
                }
            }).then((res: any) => {
                return res.data
            }).catch((err: any) => {
                toast.error('Gagal menghapus buku')
            })
            isloading.value = false
            getData()
            items.value = await getData()
            isModalOpen.value = false
            toast.success("Berhasil!", {
                autoClose: 2000,
            })
        } catch (error) {
            
        }
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