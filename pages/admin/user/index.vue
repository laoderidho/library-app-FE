<template>
    <h1 class="m-10 text-2xl font-bold">User Data</h1>

    <div class="la-card-large m-10 rounded-sm">
        <div class="mb-10">
            <div class="m-10 pt-10">
                <h1 class="text-2xl font-bold">Data User</h1>
            </div>
            
            <div class="m-10 pb-10">
                <EasyDataTable
                    :headers="headers"
                    :items="items"
                    border-cell
                    buttons-pagination
                    :rows-per-page="10"
                >
                    <template #item-action="{ id }">
                        <button @click="openModal" class="px-2 my-1 py-1 bg-blue-500 text-white rounded">
                                Edit
                        </button>
                         <Modal :show="isModalOpen" @close="closeModal">
                            <h2 class="text-xl font-bold mb-4">Ubah Role</h2>
                            <FormSelect label="Role" selectLabel="role" :data="roleData.value" :value="id"/>
                        </Modal>
                    </template>
                </EasyDataTable>
            </div>
           
        </div>
        
    </div>

</template>


<script setup lang="ts">
    import { ref } from 'vue'
    const { $api } = useNuxtApp()
    const auth = useAuthStore()

    import type { Header, Item } from "vue3-easy-data-table"
    const headers: Header[] = [
        { text: 'id', value: 'id' },
        { text: 'email', value: 'email' },
        { text: 'nama', value: 'no_telp' },
        { text: 'no Hp', value: 'email' },
        { text: 'role', value: 'roleName' },
        { text: 'action', value: 'action' }
    ]
    const items: Item = ref<any>([])

    const roleData = ref<any>([])

    const getData = async () => {
        const data = await $api('admin/data/user/get-user', {
            method: 'GET',
            headers: {
                Authorization: `${auth.getToken}`
            }
        }) as { data: Array<any> }
        return data.data
    }

    const getRole = async () => {
        const data = await $api('admin/data/user/get-role', {
            method: 'GET',
            headers: {
                Authorization: `${auth.getToken}`
            }
        }) as { data: Array<any> }
        return data.data
    }

    // modal variable
    const isModalOpen = ref(false)
    const openModal = () => {
        isModalOpen.value = true
    }
    const closeModal = () => {
        isModalOpen.value = false
    }

    const { data } = await useAsyncData('userData', getData)
    items.value = data

    const { data: role } = await useAsyncData('roleData', getRole)
    roleData.value = role

    definePageMeta({
        layout: 'admin'
    })
</script>

<style scoped>
    .header-text{
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }
</style>

