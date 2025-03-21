<template>
    <div class="container">
        <div class="card">
            <div class="header ">
                <h1 class="text-center text-5xl font-bold mt-5">Login</h1>
            </div>
            <div class="body flex items-center flex-col pt-10">
                <!-- form text di ambil dari components -->
                <FormText name="Email" v-model="Email" typeForm="text" />
                <FormText name="Password" v-model="password" :typeForm="ShowPassword ? 'text' : 'password'" />
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
    import { ref } from 'vue';

    const Email = ref('');
    const password = ref('');
    const ShowPassword = ref(false);
    const isLoading = ref(false);

    const login = () =>{
        isLoading.value = true
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