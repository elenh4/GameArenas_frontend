import { createRouter, createWebHistory } from 'vue-router'
import Pocetna from '../views/Pocetna.vue'
import Prijava from '../views/Prijava_korisnika.vue'
import Registracija from '../views/Registracija_korisnika.vue'

const routes = [
  {
    path: '/',
    name: 'Pocetna',
    component: Pocetna
  },
  {
    path: '/Prijava_korisnika',
    name: 'Prijava',
    component: Prijava
  },
  {
    path: '/Registracija_korisnika',
    name: 'Registracija',
    component: Registracija
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router