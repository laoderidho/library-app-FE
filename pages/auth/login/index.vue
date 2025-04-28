<template>
    <div class="flex justify-center items-center h-screen">
        <div class="card">

            <div class="header ">
                <h1 class="text-center text-5xl font-bold mt-5">Login</h1>
            </div>

            <div class="w-full mt-3 flex justify-center">
                <AlertTextDanger :isAlertDanger="wrongPassword" :message="messageWrongPassword" />
            </div>

            <div class="body flex items-center flex-col pt-10">
                <!-- form text from Compponent in file Form/Text -->
                 <div class="w-100">
                    <FormText ref="emailRef" name="Email" v-model="input.email" typeForm="email" 
                        :isInvalid="validStates.email" 
                        :messageInvalid="messages.email" 
                    />
                     <FormText ref="passwordRef" name="Password" 
                        v-model="input.password" 
                        :typeForm="ShowPassword ? 'text' : 'password'" 
                        :isInvalid="validStates.password" 
                        :messageInvalid="messages.password"
                    />
                 </div>
            </div>

            <div class="footer mx-10">
                <FormCheck name="Show Password" v-model="ShowPassword" />
                <h1 class="text-lg font-bold">Belum Daftar? <span class="text-blue-500"><NuxtLink to="/auth/register">Daftar Sekarang</NuxtLink></span> </h1>
                <div class="mt-10"></div>
            </div>
            <div class="footer mx-10">
                 <FormButton name="Login" @click="login" :isLoading="isLoading"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useAuthStore } from '~/stores/auth';
    import { handleValidationErrors, ValidateNull } from '~/utils/validateError';
    import { userId, adminId } from '~/utils/variable';

    const { $api } = useNuxtApp();
    // pinia state management
    const auth = useAuthStore();

    // this input containe fields in form 
    const input = ref<Record<string, any>>({});
    const validStates = ref<Record<string, boolean>>({});
    const messages = ref<Record<string, string>>({});
    
    const ShowPassword = ref(false);
    const isLoading = ref(false);

    const wrongPassword = ref(false);
    const messageWrongPassword = ref('');

    // declare input is not null
    const elemenFormValue = ["email", "password"]

    const login = async () =>{
        isLoading.value = true

        // check if this value isNull
        const validateInputISNull = ValidateNull({
            input: input.value,
            validStates: validStates.value,
            messages: messages.value,
            fields: elemenFormValue
        });

        if(!validateInputISNull){
            isLoading.value = false
            return
        }
       
        try {
            const response = await $api('auth/login',{
                method: 'POST',
                body: {
                    email: input.value["email"],
                    password: input.value["password"]
                }
            }) as any

            if(response.status == 'success'){
                auth.setToken(response.token)
                auth.setRole(response.role)
            }
            
            if(auth.getRole == userId){
                await navigateTo('/user/home')
            }else if(auth.getRole == adminId){
                await navigateTo('/admin/home')
            }
            isLoading.value = false
        } catch (error: any) {
            isLoading.value = false

            handleValidationErrors(error, {
                input: input.value,
                validStates: validStates.value,
                messages: messages.value
            })

            if(error.status == 401){
                wrongPassword.value = true
                messageWrongPassword.value = error._data.message
            }
        }
    }

    onMounted(async ()=>{

       const token = auth.getToken
        console.log(token)
    })

    watch(wrongPassword, (value) =>{
        if(value){
            setTimeout(() => {
                wrongPassword.value = false
                messageWrongPassword.value = ''
            }, 3000);
        }
    })
</script>


<style scoped>
    .card{
        width: 30rem;
        height: 30rem;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 10px;
    }
</style>