import { createRouter, createWebHistory } from 'vue-router'
import Pocetna from '../views/Pocetna.vue'
import Prijava from '../views/Prijava_korisnika.vue'
import Registracija from '../views/Registracija_korisnika.vue'
import Volonteri from '@/views/Volonteri_prijava.vue'
import ProfilKorisnik from '../views/ProfilKorisnik.vue'
import Admin from '@/views/Admin.vue'
import DodajTurnir from '../views/DodajTurnir.vue'
import TurniriEsport from '../views/Turniri_esport_prikaz.vue'
import DrustveneIgre from '../views/Turniri_drustvene_prikaz.vue'
import Scoreboard from '../views/Scoreboard.vue'

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
  },
  {
    path: '/Volonteri_prijava',
    name: 'VolonteriPrijava',
    component: Volonteri
  },
  {
    path: '/ProfilKorisnik', 
    name: 'ProfilKorisnik',
    component: ProfilKorisnik
  },
  {
    path: '/Admin', 
    name: 'AdminProfil',
    component: Admin
  },
  {
    path: '/DodajTurnir',
    name: 'DodajTurnir',
    component: DodajTurnir
  },
  { 
    path: '/Turniri_esport_prikaz', 
    name: 'TurniriEsport', 
    component: TurniriEsport
  },
  { 
    path: '/Turniri_drustvene_prikaz',
    name: 'DruštveneIgre',
    component: DrustveneIgre
  },
  { 
    path: '/Scoreboard', 
    name: 'Scoreboard', 
    component: Scoreboard 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router