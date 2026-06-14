<template>
  <div style="margin: 0; padding: 0; background: #0a0e27; color: #00ffff; font-family: Arial, sans-serif; min-height: 100vh;">
    
    <header style="padding: 10px 30px; border-bottom: 2px solid #00ffff;">
      <nav style="display: flex; justify-content: center; gap: 30px; margin-bottom: 10px; flex-wrap: wrap; align-items: center;">
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="idi_na_Pocetnu">POČETNA STRANICA</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/Turniri_drustvene_prikaz')">SOCIAL GAMES</span>

        <div style="text-align: center; margin: 5px 20px;">
          <img :src="logo" alt="Game Arenas" style="display: block; margin: 0 auto; max-width: 500px; width: 100%; height: auto;">
        </div>

        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="idi_na_turnir">ESPORT TURNIRI</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="idi_na_scoreboard">SCOREBOARD</span>
        <button
          @click="odjavi_se"
          style="background: none; border: none; color: #ff4444; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer; padding: 0; font-family: inherit;"
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

        <div>
          <div style="border: 2px solid #00ffff; padding: 20px; background: rgba(0, 255, 255, 0.05);">
            <h2 style="color: #00ffff; border-bottom: 1px solid #00ffff; padding-bottom: 10px; letter-spacing: 1px;">AKTIVNI TURNIRI</h2>
            <div v-for="t in aktivniTurniri" :key="t._id" style="margin: 15px 0; background: #1a1a3a; padding: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: bold;">{{ t.naziv }}</span>
                <button @click="ucitajSudionike(t._id)" style="background: #00ffff; border: none; cursor: pointer; font-weight: bold; padding: 5px 12px;">SUDIONICI</button>
              </div>
              <div v-if="aktivniTurnirId === t._id" style="margin-top: 10px; font-size: 12px; border-top: 1px solid #333; padding-top: 10px;">
                <div v-for="user in sudionici" :key="user._id" style="color: #fff; margin-bottom: 5px;">{{ user.username }}</div>
              </div>
            </div>
            <button @click="router.push('/DodajTurnir')" style="width: 100%; padding: 12px; background: transparent; color: #00ffff; border: 1px solid #00ffff; margin-top: 10px; cursor: pointer; font-weight: bold; font-size: 13px;">+ DODAJ TURNIR</button>
          </div>

          <div style="border: 2px solid #888; padding: 20px; background: rgba(136, 136, 136, 0.05); margin-top: 20px;">
            <h2 style="color: #888; border-bottom: 1px solid #888; padding-bottom: 10px; letter-spacing: 1px;">PROŠLI TURNIRI</h2>
            <div v-for="t in prosliTurniri" :key="t._id" style="margin: 15px 0; background: #0a0a1a; padding: 10px; color: #888;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <span style="font-weight: bold; color: #fff;">{{ t.naziv }}</span>
                  <span style="font-size: 12px; margin-left: 10px;">({{ new Date(t.datum).toLocaleDateString('hr-HR') }})</span>
                </div>
                <button @click="ucitajSudionike(t._id)" style="background: #888; color: #000; border: none; cursor: pointer; font-weight: bold; padding: 5px 10px; font-size: 11px;">
                  SUDIONICI
                </button>
              </div>
              <div v-if="aktivniTurnirId === t._id" style="margin-top: 10px; font-size: 12px; border-top: 1px solid #333; padding-top: 10px; color: #fff;">
                <div v-for="user in sudionici" :key="user._id" style="margin-bottom: 5px; color: #00ffff;">{{ user.username }}</div>
                <div v-if="sudionici.length === 0" style="color: #888;">Nema sudionika.</div>
              </div>
            </div>
          </div>
        </div>

        <div style="border: 2px solid #00ffff; padding: 20px; background: rgba(0, 255, 255, 0.05);">
          <h2 style="color: #00ffff; border-bottom: 1px solid #00ffff; padding-bottom: 10px; letter-spacing: 1px;">
            REGISTRIRANI KORISNICI 
            <span style="color: #ff00ff; font-size: 14px;">({{ korisnici.length }})</span>
          </h2>
          <div style="max-height: 500px; overflow-y: auto;">
            <div v-for="user in korisnici" :key="user._id" style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0; border-bottom: 1px solid #333; padding-bottom: 8px;">
              <span style="font-weight: bold; color: #00ffff; cursor: pointer;" @click="router.push(`/ProfilKorisnik/${user._id}`)">{{ user.username }}</span>
              <span style="font-size: 11px; color: #ff00ff; font-weight: bold;">{{ user.uloga?.toUpperCase() }}</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import GameArenasLogo from '@/assets/gamearenas_naslov1.png';

const logo = ref(GameArenasLogo);
const router = useRouter();

const turniri = ref([]);
const korisnici = ref([]);
const sudionici = ref([]);
const aktivniTurnirId = ref(null);

const aktivniTurniri = computed(() => {
  const danas = new Date();
  return turniri.value.filter(t => new Date(t.datum) >= danas);
});

const prosliTurniri = computed(() => {
  const danas = new Date();
  return turniri.value.filter(t => new Date(t.datum) < danas);
});

const dohvatiPodatke = async () => {
  try {
    const resKorisnici = await axios.get('http://localhost:3000/api/korisnici');
    korisnici.value = resKorisnici.data;
    const resTurniri = await axios.get('http://localhost:3000/api/turniri');
    turniri.value = resTurniri.data;
  } catch (error) {
    console.error(error);
  }
};

const ucitajSudionike = async (id) => {
  if (aktivniTurnirId.value === id) {
    aktivniTurnirId.value = null;
    return;
  }
  try {
    const res = await axios.get(`http://localhost:3000/api/turniri/${id}/sudionici`);
    sudionici.value = res.data;
    aktivniTurnirId.value = id;
  } catch (error) {
    console.error(error);
  }
};

const idi_na_Pocetnu = () => router.push('/');
const idi_na_turnir = () => router.push('/Turniri_esport_prikaz');
const idi_na_scoreboard = () => router.push('/Scoreboard');

const odjavi_se = () => {
  localStorage.clear();
  router.push('/');
};

onMounted(dohvatiPodatke);
</script>