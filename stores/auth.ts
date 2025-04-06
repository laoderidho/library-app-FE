import { defineStore } from 'pinia'

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: '',
        role: ''
    }),
    persist: true,
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setRole(role: string) {
            this.role = role
        },
        clear() {
            this.token = ''
            this.role = ''
        }
    },
    getters: {
        getToken: (state) => state.token,
        getRole: (state) => state.role
    }
})