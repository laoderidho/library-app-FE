<template>
    <h1 class="m-10 text-2xl font-bold">Data User</h1>
    
    <div class="la-card-large m-10 rounded-sm">
        <div class="mb-10">
            <div class="m-10 pt-10 flex justify-between items-center">
                <h1 class="text-2xl font-bold">Data User</h1>
                <div class="w-100 h-10 flex justify-between">
                    <FormSearch 
                        name="keyword" 
                        v-model="input.keyword"
                        typeForm="text"
                        :isInvalid="false"
                        :messageInvalid="''"
                    />
                    <FormButtonSearch name="Search" @click="search" />
                </div>
                
            </div>
            
            <div class="m-10 pb-10">
                <EasyDataTable
                    :headers="headers"
                    :items="items"
                    border-cell
                    buttons-pagination
                    :rows-per-page="10"
                >
                    <template #item-action="{ roleId, id, name }">
                        <button @click="openModal(roleId, id, name)" class="px-2 my-1 py-1 bg-blue-500 text-white rounded">
                                Edit
                        </button>
                         <Modal :show="isModalOpen" @close="closeModal">
                            <h2 class="text-xl font-bold mb-4">Ubah Role</h2>
                            <p class="text-lg font-bold text-center">{{ input.name }}</p>
                            <FormSelect 
                                label="Role" 
                                selectLabel="role" 
                                :data="roleData.value" 
                                v-model="input.role"
                            />

                            <div>
                                <FormButton name="Simpan" @click="saveRole(input.id)" class="mt-4" :is-loading="isloading" />
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
    import { toast } from 'vue3-toastify';

    const { $api } = useNuxtApp()
    const auth = useAuthStore()

     // this input containe fields in form 
    const input = ref<Record<string, any>>({});
    const isloading = ref(false)

    import type { Header, Item } from "vue3-easy-data-table"
    const headers: Header[] = [
        { text: 'id', value: 'id' },
        { text: 'email', value: 'email' },
        { text: 'nama', value: 'name' },
        { text: 'no Hp', value: 'no_telp' },
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

    const saveRole = async (id: number) => {
        isloading.value = true
        try {
            await $api('admin/data/user/change-role', {
                method: 'POST',
                headers: {
                    Authorization: `${auth.getToken}`
                },
                body: {
                    id: id,
                    roleId: input.value.role
                }
            }) as any
            isloading.value = false
            getData()
            await useAsyncData('userData', getData)
            isModalOpen.value = false
            toast.success("Berhasil!", {
                autoClose: 2000,
            })
        } catch (error) {
            
        }
    }

    const search = async () => {
        const response = await $api('admin/data/user/get-user-by-keyword', {
            method: 'POST',
            headers: {
                Authorization: `${auth.getToken}`
            },
            body: {
                keyword: input.value.keyword
            }
        }) as { data: Array<any> }
        await useAsyncData('userData', () => Promise.resolve(response.data))
        items.value = response.data
    }

    // modal variable
    const isModalOpen = ref(false)
    const openModal = (roleId: number, id: number, name: string) => {
        isModalOpen.value = true
        input.value.role = roleId
        input.value.id = id
        input.value.name = name
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

    .toast {
        position: fixed;
        top: 5rem;
        right: 1rem;
        z-index: 9999;
    }
</style>

