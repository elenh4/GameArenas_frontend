<template>
  <div style="margin: 0; padding: 0; background: #0a0e27; color: #00ffff; font-family: Arial, sans-serif; min-height: 100vh;">
    <header style="padding: 10px 30px; border-bottom: 2px solid #00ffff;">
      <nav style="display: flex; justify-content: center; gap: 30px; margin-bottom: 10px; align-items: center;">
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; cursor: pointer;" @click="idi_na_Pocetnu">POČETNA STRANICA</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px;" @click="drustvene_igrice_prikaz">SOCIAL GAMES</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/Turniri_esport_prikaz')">ESPORT TURNIRI</span>
        <img :src="logo" alt="Game Arenas" style="max-width: 400px;">
        <br>
        <br>
        <br>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px;" @click="idi_na_scoreboard">SCOREBOARD</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; cursor: pointer;" @click="odjavi_se">ODJAVI SE</span>
      </nav>
    </header>

    <main style="padding: 40px; display: flex; flex-direction: column; align-items: center;">
      <h1 style="font-size: 48px; color: #00ffff; text-shadow: 0 0 15px #00ffff; margin-bottom: 40px; letter-spacing: 3px;">TVOJ PROFIL</h1>

      <div style="display: flex; gap: 60px; align-items: flex-start; max-width: 900px; width: 100%;">
        
        <div style="flex: 1; color: #00ffff; font-weight: bold; font-size: 20px; line-height: 2;">
          <p>USERNAME : <span style="color: #fff;">{{ user.username }}</span></p>
          <p>DRŽAVA : <span style="color: #fff;">{{ user.drzava }}</span></p>
          <p>LEAGUE : <span style="color: #fff;">{{ user.league }}</span></p>
          
          <h2 style="color: #ff00ff; margin-top: 30px; font-size: 24px; text-shadow: 0 0 10px #ff00ff;">AKTIVNI TURNIRI :</h2>
          <div style="margin-top: 15px; font-size: 16px; color: #fff;">
            <p v-if="aktivniTurniri.length === 0" style="color: #888; font-size: 14px;">Niste prijavljeni ni na jedan turnir.</p>
            <div v-for="t in aktivniTurniri" :key="t._id" style="margin-bottom: 15px; border-bottom: 1px solid #1a1a3a; padding-bottom: 10px;">
              <p style="margin: 0; color: #00ffff; font-weight: bold;">{{ t.naziv }}</p>
              <p style="margin: 0; font-size: 13px; color: #888;">{{ t.datum }} u {{ t.vrijeme }}</p>
              <p style="margin: 0; font-size: 12px; color: #ff00ff;">{{ t.vrsta.toUpperCase() }}</p>
            </div>
          </div>
        </div>

        <div style="width: 200px; height: 200px; background: #1a1a3a; border: 2px solid #00ffff; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 50px;">👤</span>
        </div>

        <div style="width: 280px; border: 2px solid #00ffff; padding: 15px; background: rgba(0, 255, 255, 0.05); text-align: center;">
          <h3 style="color: #00ffff; margin-bottom: 10px;">SLJEDEĆI TURNIR</h3>
          <div v-if="aktivniTurniri.length > 0">
            <div style="width: 100%; height: 150px; background: #1a1a3a; border: 1px solid #00ffff; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
              <img v-if="aktivniTurniri[0].url" :src="aktivniTurniri[0].url" style="width: 100%; height: 100%; object-fit: cover;" />
              <span v-else style="font-size: 40px;">🎮</span>
            </div>
            <p style="color: #fff; font-weight: bold; margin-bottom: 5px;">{{ aktivniTurniri[0].naziv }}</p>
            <p style="color: #adff2f; font-weight: bold;">{{ aktivniTurniri[0].datum }} {{ aktivniTurniri[0].vrijeme }}</p>
          </div>
          <p v-else style="color: #888; font-size: 13px;">Nema nadolazećih turnira.</p>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import GameArenasLogo from '@/assets/gamearenas_naslov1.png'

const logo = ref(GameArenasLogo)
const router = useRouter()

const spremljeniKorisnik = JSON.parse(localStorage.getItem('trenutniKorisnik'))

if (!spremljeniKorisnik) {
  router.push('/Prijava_korisnika')
} else if (spremljeniKorisnik.uloga === 'admin') {
  router.push('/Admin')
}

const user = ref({
  username: spremljeniKorisnik?.username || 'Korisnik',
  drzava: 'HRVATSKA',
  league: 'BRONZE'
})

const aktivniTurniri = ref([])

const dohvatiMojeTurnire = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/turniri')
    aktivniTurniri.value = res.data.filter(t =>
      t.prijavljeni && t.prijavljeni.includes(spremljeniKorisnik?.id)
    )
  } catch (error) {
    console.error('Greška pri dohvatu turnira:', error)
  }
}

const idi_na_Pocetnu = () => {router.push('/')}
const idi_na_scoreboard=() =>{ router.push('/Scoreboard')}
const Turniri_esport_prikaz =() => { router.push('/Turniri_esport_prikaz')}
const drustvene_igrice_prikaz = () => { router.push('/Turniri_drustvene_prikaz')}

const odjavi_se = () => {
  localStorage.removeItem('trenutniKorisnik')
  localStorage.removeItem('userId')
  router.push('/')
}

onMounted(() => {
  dohvatiMojeTurnire()
})
</script>