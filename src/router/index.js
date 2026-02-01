import { createRouter, createWebHistory } from 'vue-router'
import Pocetna from '../views/Pocetna.vue'

const routes = [
  { path: '/', name: 'Pocetna', component: Pocetna }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
