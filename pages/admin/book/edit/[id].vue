<template>
     <div class="container mx-auto">
        <BreadCrumb :data="routeLink" />

        <div class="flex justify-between ">
            <h1 class="m-10 text-2xl font-bold">Edit Buku</h1>
        </div>

        <div class="la-card-large mx-10 rounded-sm">
            <div class="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                <FormText name="title" label="Judul" v-model="input.title" typeForm="text" 
                :isInvalid="validStates.title"
                :messageInvalid="messages.title" />

                <FormText name="author" label="Pengarang" v-model="input.author" typeForm="text" 
                :isInvalid="validStates.author"
                :messageInvalid="messages.author" />

                <FormText name="publisher" label="Penerbit" v-model="input.publisher" typeForm="text" 
                :isInvalid="validStates.publisher"
                :messageInvalid="messages.publisher" />

                <FormText name="photo" label="Foto" v-model="input.photo" typeForm="text" 
                :isInvalid="validStates.photo"
                :messageInvalid="messages.photo" />

                <div class="col-span-2">
                    <FormTextarea label="Deskripsi" v-model="input.description"
                    :isInvalid="validStates.description"
                    :messageInvalid="messages.description"
                    textPlaceholder="Masukkan Deskripsi Buku" />
                </div>

                <div class="col-span-2">
                    <FormButton name="Simpan Perubahan" @click="save" :isLoading="isLoading" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    //import
    const route = useRoute()
    const router = useRouter()
    const { $api } = useNuxtApp()
    import { handleValidationErrors, ValidateNull } from '~/utils/validateError';
    import { toast } from 'vue3-toastify'


    // Ref
    const input = ref<Record<string, any>>({});
    const validStates = ref<Record<string, boolean>>({});
    const messages = ref<Record<string, string>>({});
    const isLoading = ref(false);
    const token = useAuthStore().getToken
    const params = route.params.id


    // Route Link
    const routeLink = [
        {
            link: '/admin/book',
            label: 'Book'
        },
        {
            link: '',
            label: 'Edit Book'
        }
    ]

    const save = async () =>{
        isLoading.value = true
         // check if this value isNull
         const validateInputISNull = ValidateNull({
            input: input.value,
            validStates: validStates.value,
            messages: messages.value,
            fields: ["title", "author", "publisher", "description"]
        });

        if(!validateInputISNull){
            isLoading.value = false
            return
        }

        try {
            const response = await $api(`admin/book/update-book/${params}`, {
                method: 'POST',
                body: {
                    title: input.value["title"],
                    author: input.value["author"],
                    publisher: input.value["publisher"],
                    description: input.value["description"],
                    photo: input.value["photo"]
                },
                headers: {
                    Authorization: `${token}`
                }
            }) as any;

            if(response.status == 'success'){
                toast.success('Berhasil Mengubah buku')

                setTimeout(() => {
                    router.push({path: "/admin/book"})
                }, 1000);
            }

            isLoading.value = false
        } catch (error: any) {
            isLoading.value = false

            handleValidationErrors(error, {
                input: input.value,
                validStates: validStates.value,
                messages: messages.value
            })
        }
    }

    const getData = async () => {
        await $api(`admin/book/get-book/${params}`, {
            method: 'GET',
            headers: {
                Authorization: `${token}`
            }
        }).then((res: any) => {
            input.value = res.data
        }).catch(() => {
            
        })
    }

    // Mounted
    onMounted(() => {
        getData()
    })

   // Define Layouting
   definePageMeta({
        layout: 'admin'
    })
</script>