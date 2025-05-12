import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Ikon yang ingin dipakai
import { faUser, faHome, faSearch, faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

// Tambahkan ikon ke library
library.add(faUser, faHome, faSearch, faPlus, faPen, faTrash)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
