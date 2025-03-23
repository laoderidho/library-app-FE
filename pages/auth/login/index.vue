<template>
    <div class="container">
        <div class="card">

            <div class="header ">
                <h1 class="text-center text-5xl font-bold mt-5">Login</h1>
            </div>

            <div class="w-full mt-3 flex justify-center">
                <AlertTextDanger :isAlertDanger="wrongPassword" :message="messageWrongPassword" />
            </div>

            <div class="body flex items-center flex-col pt-10">
                <!-- form text di ambil dari components -->
                <FormText ref="emailInput" name="Email" v-model="input.email" typeForm="email" 
                    @keydown.enter="focusPass" :isInvalid="validStates.email" 
                    :messageInvalid="messages.email" 
                />
                <FormText ref="passwordInput" name="Password" 
                    v-model="input.password" 
                    :typeForm="ShowPassword ? 'text' : 'password'" 
                    @keydown.enter="login" :isInvalid="validStates.password" 
                    :messageInvalid="messages.password"
                />
            </div>

            <div class="footer mx-10">
                <FormCheck name="Show Password" v-model="ShowPassword" />
                <div class="mt-10"></div>
                <FormButton name="Login" @click="login" :isLoading="isLoading"/>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, nextTick } from 'vue';
    const { $api } = useNuxtApp();

    // input ini berisi beberapa input yang diubah menjadi object supaya tidak banyak ref 
    const input = ref<Record<string, any>>({});
    const validStates = ref<Record<string, boolean>>({});
    const messages = ref<Record<string, string>>({});
    
    const ShowPassword = ref(false);
    const isLoading = ref(false);

    const wrongPassword = ref(false);
    const messageWrongPassword = ref('');

    const emailInput = ref<HTMLElement | null>(null);
    const passwordInput = ref<HTMLElement | null>(null);

    const focusPass = async () =>{
        await nextTick()
        // @ts-ignore
        passwordInput.value?.$el?.querySelector('input')?.focus();
    }

    const login = async () =>{
        isLoading.value = true
        try {
            const response = await $api('auth/login',{
                method: 'POST',
                body: {
                    email: input.value["email"],
                    password: input.value["password"]
                }
            })
            isLoading.value = false
        } catch (error: any) {
            isLoading.value = false

            if(error.status == 400){
                for(const key in error._data.message){
                    if(input.value[key]){
                        // @ts-ignore
                        input.value[key].$el?.querySelector('input')?.focus();
                        validStates.value[key] = true
                        messages.value[key] = error._data.message[key]
                    }
                }
            }

            if(error.status == 401){
                wrongPassword.value = true
                messageWrongPassword.value = error._data.message
            }
        }
    }


</script>


<style scoped>
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
    }
    .card{
        width: 30rem;
        height: 30rem;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 10px;
    }
</style>