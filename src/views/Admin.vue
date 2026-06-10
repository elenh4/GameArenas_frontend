<template>
  <div style="margin: 0; padding: 0; background: #0a0e27; color: #00ffff; font-family: Arial, sans-serif; min-height: 100vh;">
    
    <header style="padding: 10px 30px; border-bottom: 2px solid #00ffff;">
      <nav style="display: flex; justify-content: center; gap: 30px; margin-bottom: 10px; flex-wrap: wrap; align-items: center;">
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="idi_na_Pocetnu">POČETNA STRANICA</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px;">SOCIAL GAMES</span>

        <div style="text-align: center; margin: 5px 20px;">
          <img :src="logo" alt="Game Arenas" style="display: block; margin: 0 auto; max-width: 500px; width: 100%; height: auto;">
        </div>

        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="idi_na_turnir">ESPORT TURNIRI</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px;">SCOREBOARD</span>
        <button
          @click="odjavi_se"
          style="background: none; border: none; color: #ff4444; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer; padding: 0; font-family: inherit;"
          @mouseover="$event.target.style.textShadow = '0 0 10px #ff4444'"
          @mouseout="$event.target.style.textShadow = 'none'"
        >
          ADMIN ODJAVA
        </button>
      </nav>
    </header>

    <main style="padding: 40px; max-width: 1100px; margin: auto;">
      <h1 style="text-align: center; font-size: 40px; color: #ff00ff; text-shadow: 0 0 15px #ff00ff; margin-bottom: 40px; letter-spacing: 3px;">
        ADMIN UPRAVLJAČKA PLOČA
      </h1>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">

        <div style="border: 2px solid #00ffff; padding: 20px; background: rgba(0, 255, 255, 0.05);">
          <h2 style="color: #00ffff; border-bottom: 1px solid #00ffff; padding-bottom: 10px; letter-spacing: 1px;">AKTIVNI TURNIRI</h2>
          
          <div v-if="turniri.length === 0" style="color: #888; font-size: 13px; margin: 20px 0; text-align: center;">
            Nema aktivnih turnira.
          </div>

          <div v-for="t in turniri" :key="t._id" style="display: flex; justify-content: space-between; align-items: center; margin: 15px 0; background: #1a1a3a; padding: 10px;">
            <span style="font-weight: bold;">{{ t.naziv }}</span>
            <button style="background: #00ffff; border: none; cursor: pointer; font-weight: bold; padding: 5px 12px;">UREDI</button>
          </div>

          <button
            @click="router.push('/DodajTurnir')"
            style="width: 100%; padding: 12px; background: transparent; color: #00ffff; border: 1px solid #00ffff; margin-top: 10px; cursor: pointer; font-weight: bold; font-size: 13px; letter-spacing: 1px;"
            @mouseover="$event.target.style.background = 'rgba(0,255,255,0.1)'"
            @mouseout="$event.target.style.background = 'transparent'"
          >
            + DODAJ TURNIR
          </button>
        </div>

        <div style="border: 2px solid #00ffff; padding: 20px; background: rgba(0, 255, 255, 0.05);">
          <h2 style="color: #00ffff; border-bottom: 1px solid #00ffff; padding-bottom: 10px; letter-spacing: 1px;">
            REGISTRIRANI KORISNICI 
            <span style="color: #ff00ff; font-size: 14px;">({{ korisnici.length }})</span>
          </h2>

          <div v-if="korisnici.length === 0" style="color: #888; font-size: 13px; margin: 20px 0; text-align: center;">
            Nema registriranih korisnika.
          </div>

          <div style="max-height: 300px; overflow-y: auto;">
            <div v-for="user in korisnici" :key="user._id" style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0; border-bottom: 1px solid #333; padding-bottom: 8px;">
              <div>
                <span style="font-weight: bold; color: #00ffff;">{{ user.username }}</span>
                <span style="font-size: 12px; color: #888; margin-left: 8px;">({{ user.email }})</span>
              </div>
              <span style="font-size: 11px; color: #ff00ff; font-weight: bold;">{{ user.uloga?.toUpperCase() }}</span>
            </div>
          </div>
        </div>

        <div style="border: 2px solid #ff00ff; padding: 20px; background: rgba(255, 0, 255, 0.05); grid-column: 1 / -1;">
          <h2 style="color: #ff00ff; border-bottom: 1px solid #ff00ff; padding-bottom: 10px; letter-spacing: 1px;">SCOREBOARD</h2>
          
          <div v-if="korisnici.length === 0" style="color: #888; font-size: 13px; margin: 20px 0; text-align: center;">
            Nema podataka za scoreboard.
          </div>

          <table v-else style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <thead>
              <tr style="color: #ff00ff; border-bottom: 1px solid #ff00ff;">
                <th style="text-align: left; padding: 8px;">#</th>
                <th style="text-align: left; padding: 8px;">USERNAME</th>
                <th style="text-align: left; padding: 8px;">EMAIL</th>
                <th style="text-align: left; padding: 8px;">ULOGA</th>
                <th style="text-align: left; padding: 8px;">DATUM REGISTRACIJE</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in korisnici" :key="user._id" style="border-bottom: 1px solid #1a1a3a;">
                <td style="padding: 8px; color: #ff00ff; font-weight: bold;">{{ index + 1 }}</td>
                <td style="padding: 8px; color: #fff; font-weight: bold;">{{ user.username }}</td>
                <td style="padding: 8px; color: #888;">{{ user.email }}</td>
                <td style="padding: 8px; color: #00ffff;">{{ user.uloga?.toUpperCase() }}</td>
                <td style="padding: 8px; color: #888;">{{ new Date(user.createdAt).toLocaleDateString('hr-HR') }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import GameArenasLogo from '@/assets/gamearenas_naslov1.png';
import Turniri_esport_prikaz from './Turniri_esport_prikaz.vue';

const logo = ref(GameArenasLogo);
const router = useRouter();

const turniri = ref([]);
const korisnici = ref([]);

const dohvatiPodatke = async () => {
  try {
    const resKorisnici = await axios.get('http://localhost:3000/api/korisnici');
    korisnici.value = resKorisnici.data;
  } catch (error) {
    console.error('Greška pri dohvatu korisnika:', error);
  }

  try {
    const resTurniri = await axios.get('http://localhost:3000/api/turniri');
    turniri.value = resTurniri.data;
  } catch (error) {
    console.error('Greška pri dohvatu turnira:', error);
  }
};

const idi_na_Pocetnu = () => router.push('/');
const idi_na_turnir = () => router.push('/Turniri_esport_prikaz');
const odjavi_se = () => {
  localStorage.clear();
  router.push('/');
};

onMounted(() => {
  dohvatiPodatke();
});
</script>