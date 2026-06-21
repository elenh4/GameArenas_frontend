<template>
  <div style="margin: 0; padding: 0; background: #0a0e27; color: #00ffff; font-family: Arial, sans-serif; min-height: 100vh;">
    <header style="padding: 10px 30px; border-bottom: 2px solid #00ffff;">
      <nav style="display: flex; justify-content: center; gap: 30px; margin-bottom: 10px; flex-wrap: wrap; align-items: center;">
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="idi_na_Pocetnu">POČETNA STRANICA</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="drustvene_igrice_prikaz">SOCIAL GAMES</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/Turniri_esport_prikaz')">ESPORT TURNIRI</span>
        <div style="text-align: center; margin: 5px 20px;">
          <img :src="logo" alt="Game Arenas" style="display: block; margin: 0 auto; max-width: 500px; width: 100%; height: auto;">
        </div>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="idi_na_scoreboard">SCOREBOARD</span>
        <template v-if="jePrijavljen">
          <button @click="router.push('/ProfilKorisnik')" style="background: none; border: none; color: #00ffff; font-size: 12px; font-weight: bold; cursor: pointer;">PROFIL ({{ trenutniKorisnik.username }})</button>
          <button @click="odjavi_se" style="background: none; border: none; color: #ff00ff; font-size: 12px; font-weight: bold; cursor: pointer;">ODJAVI SE</button>
        </template>
        <button v-else @click="prijava_stranica" style="background: none; border: none; color: #ff00ff; font-size: 12px; font-weight: bold; cursor: pointer;">PRIJAVI SE</button>
      </nav>
    </header>

    <main style="display: flex; position: relative; padding: 40px; gap: 40px;">
      <div style="writing-mode: vertical-rl; transform: scaleY(-1); font-size: 36px; font-weight: 900; color: #ff00ff; letter-spacing: 2px;">END YOUR GAME</div>

      <section style="flex: 1;">
        <div style="margin-bottom: 50px; cursor: pointer; border: 1px solid #ff00ff; padding: 15px;" @click="router.push('/Novosti')">
          <h2 style="font-size: 32px; color: #00ffff; margin-bottom: 15px; letter-spacing: 2px;">NOVOSTI</h2>
          <p style="color: #fff; font-size: 14px;">KLIKNI OVDJE ZA PREGLED NAJNOVIJIH VIJESTI IZ SVIJETA ESPORTA.</p>
        </div>

        <div>
          <h2 style="font-size: 32px; color: #00ffff; margin-bottom: 20px; letter-spacing: 2px;">LIVE TURNIRI</h2>
          <div v-if="turniri.length === 0" style="color: #fff;">Trenutno nema aktivnih turnira.</div>
          <div v-else style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 30px;">
            <div v-for="t in turniri" :key="t._id" style="display: flex; gap: 20px; background: rgba(255, 0, 255, 0.05); padding: 20px; border: 2px solid rgba(0, 255, 255, 0.3);">
              <div style="width: 200px; height: 150px; background-size: cover; border: 2px solid #00ffff;" :style="{ backgroundImage: `url(${t.url})` }"></div>
              <div style="flex: 1;">
                <h3 style="color: #00ffff; font-size: 18px;">{{ t.naziv }}</h3>
                <p style="color: #fff; font-size: 13px;">DATUM: {{ t.datum }}</p>
                <div v-if="t.nagrade && t.nagrade.length > 0">
                  <p style="color: #fff; font-size: 13px;">NAGRADE:</p>
                  <ul style="color: #fff; font-size: 12px;">
                    <li v-for="(n, i) in t.nagrade" :key="i">{{ n }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style="writing-mode: vertical-rl; font-size: 36px; font-weight: 900; color: #ff00ff; letter-spacing: 2px;">LEAVE YOUR MARK</div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { API_URL } from '@/config/api'
import GameArenasLogo from '@/assets/gamearenas_naslov1.png'

const logo = ref(GameArenasLogo)
const router = useRouter()
const turniri = ref([])
const trenutniKorisnik = ref(JSON.parse(localStorage.getItem('trenutniKorisnik')))
const jePrijavljen = computed(() => !!trenutniKorisnik.value)

const dohvatiPodatke = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/turniri`)
    const danas = new Date()
    danas.setHours(0, 0, 0, 0) 
    turniri.value = res.data.filter(t => {
      const datumTurnira = new Date(t.datum)
      return t.zavrsen === false && datumTurnira >= danas
    })
  } catch (error) {
    console.error("Greška pri dohvatu turnira:", error)
  }
}

const prijava_stranica = () => router.push('/Prijava_korisnika')
const idi_na_Pocetnu = () => router.push('/')
const drustvene_igrice_prikaz = () => router.push('/Turniri_drustvene_prikaz')
const idi_na_scoreboard = () => router.push('/Scoreboard')
const odjavi_se = () => {
  localStorage.clear()
  trenutniKorisnik.value = null
  router.push('/')
}

onMounted(dohvatiPodatke)
</script>