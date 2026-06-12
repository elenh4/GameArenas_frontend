<template>
  <div style="margin: 0; padding: 0; background: #0a0e27; color: #00ffff; font-family: Arial, sans-serif; min-height: 100vh;">
    
    <header style="padding: 10px 30px; border-bottom: 2px solid #00ffff;">
      <nav style="display: flex; justify-content: center; gap: 30px; margin-bottom: 10px; flex-wrap: wrap; align-items: center;">
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/')">POČETNA STRANICA</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px;">SOCIAL GAMES</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px;">TURNIRI</span>

        <div style="text-align: center; margin: 5px 20px;">
          <img :src="logo" alt="Game Arenas" style="display: block; margin: 0 auto; max-width: 500px; width: 100%; height: auto;">
        </div>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px;">SCOREBOARD</span>

        <template v-if="jePrijavljen">
          <button @click="idi_na_profil" style="background: none; border: none; color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer; padding: 0; font-family: inherit;">
            TVOJ PROFIL ({{ trenutniKorisnik.username }})
          </button>
          <button @click="odjavi_se" style="background: none; border: none; color: #ff00ff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer; padding: 0; font-family: inherit;">
            ODJAVI SE
          </button>
        </template>
        <button v-else @click="router.push('/Prijava_korisnika')" style="background: none; border: none; color: #ff00ff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer; padding: 0; font-family: inherit;">
          PRIJAVI SE
        </button>
      </nav>
    </header>

    <main style="padding: 40px;">
      <h1 style="text-align: center; font-size: 40px; color: #ff00ff; text-shadow: 0 0 15px #ff00ff; margin-bottom: 10px; letter-spacing: 3px;">
        ESPORT TURNIRI
      </h1>
      <p style="text-align: center; color: #00ffff; font-size: 13px; letter-spacing: 2px; margin-bottom: 40px;">
        GAMING · COMPETITIVE · ESPORT
      </p>

      <div v-if="ucitavanje" style="text-align: center; color: #00ffff; font-size: 18px; margin-top: 60px;">
        UČITAVANJE TURNIRA...
      </div>

      <div v-else-if="turniri.length === 0" style="text-align: center; color: #888; font-size: 16px; margin-top: 60px;">
        Trenutno nema aktivnih esport turnira.
      </div>

      
          </div>
          <h2 style="color: #00ffff; font-size: 20px; font-weight: bold; letter-spacing: 1px; margin: 0; text-transform: uppercase;">{{ t.naziv }}</h2>
          <div style="color: #fff; font-size: 13px; line-height: 2; font-weight: bold;">
            <p style="margin: 0;"><span style="color: #00ffff;">DATUM : </span>{{ t.datum }}</p>
            <p style="margin: 0;"><span style="color: #00ffff;">VRIJEME : </span>{{ t.vrijeme }}</p>
            <p style="margin: 0;"><span style="color: #00ffff;">MAX IGRAČA : </span>{{ t.maxIgraca }}</p>
          </div>
          <div v-if="t.nagrade && t.nagrade.length > 0">
            <p style="color: #ff00ff; font-weight: bold; font-size: 13px; margin-bottom: 5px;">NAGRADE :</p>
            <ol style="margin: 0; padding-left: 20px; color: #fff; font-size: 13px;">
              <li v-for="(nagrada, index) in t.nagrade" :key="index" style="margin: 3px 0; font-weight: bold;">{{ nagrada }}</li>
            </ol>
          </div>
          <button
            style="width: 100%; padding: 12px; background: linear-gradient(90deg, #ff00ff, #00ffff); color: #000; border: none; font-size: 13px; font-weight: bold; cursor: pointer; letter-spacing: 1px; margin-top: auto;"
            @mouseover="$event.target.style.opacity = '0.8'"
            @mouseout="$event.target.style.opacity = '1'"
            @click="prijaviSeNaTurnir(t._id)">
            PRIJAVI SE NA TURNIR
            </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import GameArenasLogo from '@/assets/gamearenas_naslov1.png'

const logo = ref(GameArenasLogo)
const router = useRouter()
const ucitavanje = ref(true)
const turniri = ref([])

const trenutniKorisnik = ref(JSON.parse(localStorage.getItem('trenutniKorisnik')))
const jePrijavljen = computed(() => !!trenutniKorisnik.value)

const idi_na_profil = () => {
    if (trenutniKorisnik.value?.uloga === 'admin') {
        router.push('/Admin')
    } else {
        router.push('/ProfilKorisnik')
    }
}

const odjavi_se = () => {
    localStorage.removeItem('trenutniKorisnik')
    localStorage.removeItem('userId')
    trenutniKorisnik.value = null
    router.push('/')
}

const dohvatiTurnire = async () => {
    try {
        const res = await axios.get('http://localhost:3000/api/turniri')
        turniri.value = res.data.filter(t => t.vrsta === 'esport')
    } catch (error) {
        console.error('Greška pri dohvatu turnira:', error)
    } finally {
        ucitavanje.value = false
    }
}

onMounted(() => {
    dohvatiTurnire()
})

const prijaviSeNaTurnir = async (turnirId) => {
    if (!trenutniKorisnik.value) {
        router.push('/Prijava_korisnika')
        return
    }
    try {
        const res = await axios.post(`http://localhost:3000/api/turniri/${turnirId}/prijava`, {
            userId: trenutniKorisnik.value.id
        })
        alert(res.data.message)
        dohvatiTurnire()
    } catch (error) {
        alert(error.response?.data?.message || 'Greška pri prijavi.')
    }
}
</script>