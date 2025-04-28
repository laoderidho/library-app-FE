import { userId, adminId } from "~/utils/variable"

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore()
    const role = auth.getRole
    const token = auth.getToken

    // Jangan cek apa-apa kalau user di halaman login atau forbidden
    if (to.path === '/auth/login' || to.path === '/forbidden' || to.path === '/auth/register') {
        return
    }
    // Kalau belum login, redirect ke login
    if (role == '') {
        return navigateTo('/auth/login')
    }
    
    // Kalau user biasa akses halaman admin
    if (role == userId && to.path.startsWith('/admin')) {
        return navigateTo('/forbidden')
    }

    // Kalau admin akses halaman user
    if (role == adminId && to.path.startsWith('/user')) {
        return navigateTo('/forbidden')
    }
})
