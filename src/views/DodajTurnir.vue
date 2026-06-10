<template>
  <div style="margin: 0; padding: 0; background: #0a0e27; color: #00ffff; font-family: Arial, sans-serif; min-height: 100vh;">
    
    <header style="padding: 10px 30px; border-bottom: 2px solid #00ffff;">
      <nav style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; font-weight: bold; cursor: pointer; color: #00ffff;" @click="router.push('/Admin')">← POVRATAK NA ADMIN</span>
        <img :src="logo" alt="Game Arenas" style="max-width: 150px;">
        <span style="color: #ff4444; font-size: 12px; font-weight: bold; cursor: pointer;" @click="odjavi_se">ADMIN ODJAVA</span>
      </nav>
    </header>

    <main style="padding: 40px; max-width: 700px; margin: auto;">
      <h1 style="text-align: center; font-size: 36px; color: #ff00ff; text-shadow: 0 0 15px #ff00ff; margin-bottom: 40px; letter-spacing: 2px;">
        DODAJ NOVI TURNIR
      </h1>

      <div style="border: 4px solid; border-image: linear-gradient(to bottom, #00ffff, #ff00ff) 1; padding: 40px; background: rgba(0, 255, 255, 0.03);">
    
        <div style="margin-bottom: 25px;">
          <label style="display: block; color: #00ffff; font-size: 13px; font-weight: bold; letter-spacing: 1px; margin-bottom: 10px;">NAZIV TURNIRA</label>
          <input
            v-model="forma.naziv"
            type="text"
            placeholder="Unesite naziv..."
            style="width: 100%; height: 45px; background: #1a1a3a; border: 1px solid #00ffff; color: #fff; padding: 0 15px; font-size: 14px; box-sizing: border-box; outline: none;"
          />
        </div>
        <div style="margin-bottom: 25px;">
          <label style="display: block; color: #00ffff; font-size: 13px; font-weight: bold; letter-spacing: 1px; margin-bottom: 10px;">VRSTA TURNIRA</label>
          <div style="display: flex; gap: 15px;">
            <button
              @click="forma.vrsta = 'social'"
              :style="forma.vrsta === 'social'
                ? 'flex: 1; padding: 12px; background: #00ffff; color: #000; border: none; font-weight: bold; font-size: 13px; cursor: pointer; letter-spacing: 1px;'
                : 'flex: 1; padding: 12px; background: transparent; color: #00ffff; border: 1px solid #00ffff; font-weight: bold; font-size: 13px; cursor: pointer; letter-spacing: 1px;'"
            >
              SOCIAL GAMES
            </button>
            <button
              @click="forma.vrsta = 'esport'"
              :style="forma.vrsta === 'esport'
                ? 'flex: 1; padding: 12px; background: #ff00ff; color: #000; border: none; font-weight: bold; font-size: 13px; cursor: pointer; letter-spacing: 1px;'
                : 'flex: 1; padding: 12px; background: transparent; color: #ff00ff; border: 1px solid #ff00ff; font-weight: bold; font-size: 13px; cursor: pointer; letter-spacing: 1px;'"
            >
              ESPORT / GAMING
            </button>
          </div>
        </div>
        <div style="margin-bottom: 25px;">
          <label style="display: block; color: #00ffff; font-size: 13px; font-weight: bold; letter-spacing: 1px; margin-bottom: 10px;">MAKSIMALAN BROJ IGRAČA</label>
          <select
            v-model="forma.maxIgraca"
            style="width: 100%; height: 45px; background: #1a1a3a; border: 1px solid #00ffff; color: #fff; padding: 0 15px; font-size: 14px; outline: none;"
          >
            <option value="" disabled>Odaberi broj igrača...</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="64">64</option>
            <option value="128">128</option>
          </select>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
          <div>
            <label style="display: block; color: #00ffff; font-size: 13px; font-weight: bold; letter-spacing: 1px; margin-bottom: 10px;">DATUM</label>
            <input
              v-model="forma.datum"
              type="date"
              style="width: 100%; height: 45px; background: #1a1a3a; border: 1px solid #00ffff; color: #fff; padding: 0 15px; font-size: 14px; box-sizing: border-box; outline: none;"
            />
          </div>
          <div>
            <label style="display: block; color: #00ffff; font-size: 13px; font-weight: bold; letter-spacing: 1px; margin-bottom: 10px;">VRIJEME POČETKA</label>
            <input
              v-model="forma.vrijeme"
              type="time"
              style="width: 100%; height: 45px; background: #1a1a3a; border: 1px solid #00ffff; color: #fff; padding: 0 15px; font-size: 14px; box-sizing: border-box; outline: none;"
            />
          </div>
        </div>
        <div style="margin-bottom: 25px;">
          <label style="display: block; color: #00ffff; font-size: 13px; font-weight: bold; letter-spacing: 1px; margin-bottom: 10px;">NAGRADE</label>
          <div v-for="(nagrada, index) in forma.nagrade" :key="index" style="display: flex; gap: 10px; margin-bottom: 10px; align-items: center;">
            <span style="color: #ff00ff; font-weight: bold; font-size: 13px; min-width: 30px;">{{ index + 1 }}.</span>
            <input
              v-model="forma.nagrade[index]"
              type="text"
              :placeholder="`${index + 1}. mjesto nagrada...`"
              style="flex: 1; height: 40px; background: #1a1a3a; border: 1px solid #00ffff; color: #fff; padding: 0 15px; font-size: 13px; outline: none;"
            />
            <button
              v-if="forma.nagrade.length > 1"
              @click="ukloniNagradu(index)"
              style="background: #ff4444; border: none; color: #fff; width: 35px; height: 35px; cursor: pointer; font-size: 16px; font-weight: bold;"
            >×</button>
          </div>
          <button
            @click="dodajNagradu"
            style="background: transparent; border: 1px dashed #00ffff; color: #00ffff; padding: 8px 20px; cursor: pointer; font-size: 12px; font-weight: bold; letter-spacing: 1px; margin-top: 5px;"
          >+ DODAJ NAGRADU</button>
        </div>
        <div style="margin-bottom: 35px;">
          <label style="display: block; color: #00ffff; font-size: 13px; font-weight: bold; letter-spacing: 1px; margin-bottom: 10px;">SERVER turnira (URL)</label>
          <input
            v-model="forma.url"
            type="text"
            placeholder=""
            style="width: 100%; height: 45px; background: #1a1a3a; border: 1px solid #00ffff; color: #fff; padding: 0 15px; font-size: 14px; box-sizing: border-box; outline: none;"
          />
        </div>
        <p v-if="greska" style="color: #ff4444; text-align: center; font-weight: bold; margin-bottom: 15px;">{{ greska }}</p>

        <div style="display: flex; gap: 15px;">
          <button
            @click="router.push('/Admin')"
            style="flex: 1; padding: 15px; background: transparent; color: #888; border: 1px solid #888; font-size: 14px; font-weight: bold; cursor: pointer; letter-spacing: 1px;"
          >ODUSTANI</button>
          <button
            @click="spremiTurnir"
            :disabled="ucitavanje"
            style="flex: 2; padding: 15px; background: linear-gradient(90deg, #ff00ff, #00ffff); color: #000; border: none; font-size: 14px; font-weight: bold; cursor: pointer; letter-spacing: 1px;"
          >
            {{ ucitavanje ? 'SPREMANJE...' : 'SPREMI TURNIR' }}
          </button>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import GameArenasLogo from '@/assets/gamearenas_naslov1.png'

const logo = ref(GameArenasLogo)
const router = useRouter()
const ucitavanje = ref(false)
const greska = ref('')

const forma = reactive({
    naziv: '',
    vrsta: 'social',
    maxIgraca: '',
    datum: '',
    vrijeme: '',
    nagrade: ['', '', ''],
    url: ''
})

const dodajNagradu = () => {
    forma.nagrade.push('')
}

const ukloniNagradu = (index) => {
    forma.nagrade.splice(index, 1)
}

const spremiTurnir = async () => {
    greska.value = ''

    if (!forma.naziv || !forma.maxIgraca || !forma.datum || !forma.vrijeme) {
        greska.value = 'Molimo ispunite sva obavezna polja!'
        return
    }

    ucitavanje.value = true

    try {
        await axios.post('http://localhost:3000/api/turniri', {
        naziv: forma.naziv,
        vrsta: forma.vrsta,
        maxIgraca: forma.maxIgraca,
        datum: forma.datum,
        vrijeme: forma.vrijeme,
        nagrade: forma.nagrade.filter(n => n.trim() !== ''),
        url: forma.url
        }, {
        headers: { 'user-id': localStorage.getItem('userId') }
        })

        router.push('/Admin')

    } catch (error) {
        greska.value = error.response?.data?.message || 'Greška pri spremanju turnira.'
    } finally {
        ucitavanje.value = false
    }
}

const odjavi_se = () => {
  localStorage.clear()
  router.push('/')
}
</script>