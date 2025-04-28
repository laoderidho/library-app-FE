<template>
    <div class="flex justify-center items-center h-screen">
        <div class="card">
            <div class="header">
                <h1 class="text-center text-5xl font-bold mt-5">Register</h1>
            </div>

            <div class="body flex ml-10 pt-10">
                <div class="w-xl">
                    <FormText name="Name" v-model="input.name" typeForm="text" 
                        @keydown.enter="" :isInvalid="validStates.name" 
                        :messageInvalid="messages.name" 
                    />
                    <FormText name="Email" v-model="input.email" typeForm="email" 
                        @keydown.enter="" :isInvalid="validStates.email" 
                        :messageInvalid="messages.email" 
                    />
                    <FormText name="No Telp" v-model="input.no_telp" typeForm="number" 
                        @keydown.enter="" :isInvalid="validStates.no_telp" 
                        :messageInvalid="messages.no_telp" 
                    />
                     <h1 class="text-lg font-bold">Sudah Daftar ? <span class="text-blue-500"><NuxtLink to="/auth/login">Masuk</NuxtLink></span> </h1>
                </div>

                <div class="w-xl ml-10">
                    <FormText name="No KTP" v-model="input.country_id" typeForm="number" 
                        @keydown.enter="" :isInvalid="validStates.country_id" 
                        :messageInvalid="messages.country_id" 
                    />
                    <FormText name="Password" v-model="input.password" :typeForm="ShowPassword ? 'text' : 'password'" 
                        @keydown.enter="" :isInvalid="validStates.password" 
                        :messageInvalid="messages.password" 
                    />
                    <FormText name="Confirm Password" v-model="input.confirmPassword" :typeForm="ShowPassword ? 'text' : 'password'" 
                        @keydown.enter="" :isInvalid="validStates.confirmPassword" 
                        :messageInvalid="messages.confirmPassword" 
                    />
                    <FormCheck name="Show Password" v-model="ShowPassword" />
                </div>
            </div>
            <div class="w-6xl ml-10">
                <FormTextarea label="Alamat" v-model="input.address" 
                    :isInvalid="validStates.address"
                    :messageInvalid="messages.address"
                    textPlaceholder="Masukkan Alamat"
                />
            </div>
            <div class="mx-10 mt-10">
                  <FormButton name="Register" @click="register" :isLoading="isLoading"/>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
    import { ref } from 'vue';
    import { ValidateNull, handleValidationErrors } from '~/utils/validateError';
    import { changeModeInvalid } from '~/utils/general';

    const { $api } = useNuxtApp();
    const ShowPassword = ref(false);
    const router = useRouter()

    // input ini berisi beberapa input yang diubah menjadi object supaya tidak banyak ref 
    const input = ref<Record<string, any>>({});
    const validStates = ref<Record<string, boolean>>({});
    const messages = ref<Record<string, string>>({});
    const isLoading = ref(false);

    let oldInput = {}

    const register = async () =>{
        isLoading.value = true
        // check if this value isNull
        const validateInputISNull = ValidateNull({
            input: input.value,
            validStates: validStates.value,
            messages: messages.value,
            fields: ["name", "email", "no_telp", "country_id", "password", "confirmPassword", "address"]
        });

        if(!validateInputISNull){
            isLoading.value = false
            return
        }

        try {
            const response = await $api('auth/register', {
                method: 'POST',
                body: {
                    name: input.value["name"],
                    email: input.value["email"],
                    no_telp: input.value["no_telp"],
                    country_id: input.value["country_id"],
                    password: input.value["password"],
                    confirmPassword: input.value["confirmPassword"],    
                    address: input.value["address"]
                }
            }) as any;

            if(response.status == 'success'){
                router.push({path: "/auth/login"})
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

    watch(input, (newValue) => {
        changeModeInvalid({
            input: newValue,
            validStates: validStates.value,
            oldValueInput: {...oldInput}
        })
        oldInput = {...newValue}
       
    }, { deep: true })
</script>



<style scoped>
    .card{
        width: 80rem;
        height: 45rem;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 10px;
    }
</style>