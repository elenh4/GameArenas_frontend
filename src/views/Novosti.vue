<template>
    <div style="margin: 0; padding: 0; background: #0a0e27; color: #00ffff; font-family: Arial, sans-serif; min-height: 100vh;">
        <header style="padding: 10px 30px; border-bottom: 2px solid #00ffff;">
        <nav style="display: flex; justify-content: center; gap: 30px; margin-bottom: 10px; flex-wrap: wrap; align-items: center;">
            <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/')">POČETNA STRANICA</span>
            <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/Turniri_drustvene_prikaz')">SOCIAL GAMES</span>
            <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/Turniri_esport_prikaz')">ESPORT TURNIRI</span>
            <div style="text-align: center; margin: 5px 20px;">
            <img :src="logo" alt="Game Arenas" style="display: block; margin: 0 auto; max-width: 500px; width: 100%; height: auto;">
            </div>
            <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/Scoreboard')">SCOREBOARD</span>
            <template v-if="jePrijavljen">
            <button @click="router.push('/ProfilKorisnik')" style="background: none; border: none; color: #00ffff; font-size: 12px; font-weight: bold; cursor: pointer;">PROFIL ({{ trenutniKorisnik.username }})</button>
            <button @click="odjavi_se" style="background: none; border: none; color: #ff00ff; font-size: 12px; font-weight: bold; cursor: pointer;">ODJAVI SE</button>
            </template>
            <button v-else @click="router.push('/Prijava_korisnika')" style="background: none; border: none; color: #ff00ff; font-size: 12px; font-weight: bold; cursor: pointer;">PRIJAVI SE</button>
        </nav>
        </header>

        <main style="display: flex; position: relative; padding: 40px; gap: 40px;">
        <div style="writing-mode: vertical-rl; transform: scaleY(-1); font-size: 36px; font-weight: 900; color: #ff00ff; letter-spacing: 2px;">LATEST NEWS</div>

        <section style="flex: 1;">
            <h2 style="font-size: 32px; color: #00ffff; margin-bottom: 30px; letter-spacing: 2px;">ESPORT NOVOSTI</h2>

            <div v-if="trenutniKorisnik?.uloga === 'admin'" style="margin-bottom: 40px; border: 2px dashed #ff00ff; padding: 20px; background: rgba(255, 0, 255, 0.05);">
            <input v-model="nova.naslov" placeholder="Naslov novosti" style="display:block; width:100%; margin-bottom:10px; padding:10px; background:#0a0e27; border:1px solid #00ffff; color:#fff;">
            <input v-model="nova.datum" type="date" style="display:block; width:100%; margin-bottom:10px; padding:10px; background:#0a0e27; border:1px solid #00ffff; color:#fff;">
            <textarea v-model="nova.sadrzaj" placeholder="Sadržaj novosti" rows="4" style="display:block; width:100%; margin-bottom:10px; padding:10px; background:#0a0e27; border:1px solid #00ffff; color:#fff;"></textarea>
            <button @click="spremiNovost" style="padding:10px 20px; background:#ff00ff; border:none; color:#fff; font-weight:bold; cursor:pointer;">OBJAVI VIJEST</button>
            </div>
            
            <div v-if="novosti.length === 0" style="color: #fff;">Trenutno nema novih vijesti.</div>
            <div v-else style="display: flex; flex-direction: column; gap: 30px;">
            <div v-for="n in novosti" :key="n._id" style="background: rgba(255, 0, 255, 0.05); padding: 25px; border: 2px solid rgba(0, 255, 255, 0.3);">
                <h3 style="color: #00ffff; font-size: 22px; margin-top: 0;">{{ n.naslov }}</h3>
                <p style="color: #ff00ff; font-size: 12px; margin-bottom: 15px;">DATUM: {{ n.datum }}</p>
                <p style="color: #fff; font-size: 15px; line-height: 1.6;">{{ n.sadrzaj }}</p>
            </div>
            </div>
        </section>

        <div style="writing-mode: vertical-rl; font-size: 36px; font-weight: 900; color: #ff00ff; letter-spacing: 2px;">STAY UPDATED</div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import GameArenasLogo from '@/assets/gamearenas_naslov1.png'

const logo = ref(GameArenasLogo)
const router = useRouter()
const novosti = ref([])
const nova = ref({ naslov: '', sadrzaj: '', datum: '' })
const trenutniKorisnik = ref(JSON.parse(localStorage.getItem('trenutniKorisnik')))
const jePrijavljen = computed(() => !!trenutniKorisnik.value)

const dohvatiNovosti = async () => {
    try {
        const res = await axios.get('http://localhost:3000/api/novosti')
        novosti.value = res.data
    } catch (error) {
        console.error("Greška pri dohvatu:", error)
    }
}

const spremiNovost = async () => {
    try {
        await axios.post('http://localhost:3000/api/novosti', nova.value)
        nova.value = { naslov: '', sadrzaj: '', datum: '' }
        dohvatiNovosti()
    } catch (error) {
        console.error("Greška pri spremanju:", error)
    }
}

const odjavi_se = () => {
    localStorage.clear()
    trenutniKorisnik.value = null
    router.push('/')
}

onMounted(dohvatiNovosti)
</script>