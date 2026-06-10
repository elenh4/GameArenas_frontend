<template>
  <div style="margin: 0; padding: 0; background: #0a0e27; color: #00ffff; font-family: Arial, sans-serif; min-height: 100vh;">
    <header style="padding: 10px 30px; border-bottom: 2px solid #00ffff;">
      <nav style="display: flex; justify-content: center; gap: 30px; margin-bottom: 10px; align-items: center;">
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; cursor: pointer;" @click="idi_na_Pocetnu">POČETNA STRANICA</span>
        <img :src="logo" alt="Game Arenas" style="max-width: 200px;">
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; cursor: pointer;" @click="odjavi_se">
  ODJAVI SE
</span>
      </nav>
    </header>

    <main style="padding: 40px; display: flex; flex-direction: column; align-items: center;">
      <h1 style="font-size: 48px; color: #00ffff; text-shadow: 0 0 15px #00ffff; margin-bottom: 40px; letter-spacing: 3px;">TVOJ PROFIL</h1>

      <div style="display: flex; gap: 60px; align-items: flex-start; max-width: 900px; width: 100%;">
        
        <div style="flex: 1; color: #00ffff; font-weight: bold; font-size: 20px; line-height: 2;">
          <p>USERNAME : <span style="color: #fff;">{{ user.username }}</span></p>
          <p>DRŽAVA : <span style="color: #fff;">{{ user.drzava }}</span></p>
          <p>LEAGUE : <span style="color: #fff;">{{ user.league }}</span></p>
          
          <h2 style="color: #ff00ff; margin-top: 30px; font-size: 24px; text-shadow: 0 0 10px #ff00ff;">POVIJEST TURNIRA :</h2>
          <div style="margin-top: 15px; font-size: 16px; color: #fff;">
            <p v-for="t in tournamentHistory" :key="t.id" style="margin-bottom: 8px;">
              <span style="color: #00ffff;">{{ t.ime }}</span> {{ t.datum }} - {{ t.place }}
            </p>
          </div>
        </div>

        <div style="width: 200px; height: 200px; background: #1a1a3a; border: 2px solid #00ffff; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 50px;">👤</span>
        </div>

        <div style="width: 280px; border: 2px solid #00ffff; padding: 15px; background: rgba(0, 255, 255, 0.05); text-align: center;">
          <img :src="activeTournament.image" style="width: 100%; border: 1px solid #00ffff; margin-bottom: 15px;">
          <h3 style="color: #00ffff; margin-bottom: 10px;">AKTIVAN TURNIR</h3>
          <p style="color: #adff2f; font-weight: bold;">{{ activeTournament.date }} {{ activeTournament.time }}</p>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' 
import GameArenasLogo from '@/assets/gamearenas_naslov1.png'
import TournamentImage from '@/assets/island-hoppers.png' 

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

const tournamentHistory = ref([
  { id: 1, ime: 'ISLAND HOPPERS', datum: '07/01/2026', place: '3RD PLACE' },
  { id: 2, ime: 'MAGICAL MEADOW', datum: '03/01/2026', place: '15TH PLACE' },
  { id: 3, ime: 'TASTY MATCH', datum: '28/12/2025', place: '1ST PLACE' }
])

const activeTournament = ref({
  image: TournamentImage,
  date: '17/01/2026',
  time: '6PM'
})

const idi_na_Pocetnu = () => {
  router.push('/') 
}

const odjavi_se = () => {
  localStorage.removeItem('trenutniKorisnik')
  localStorage.removeItem('userId')
  router.push('/')
}
</script>