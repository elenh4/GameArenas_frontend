<template>
  <div style="margin: 0; padding: 0; background: #0a0e27; color: #00ffff; font-family: Arial, sans-serif; min-height: 100vh;">
    <header style="padding: 10px 30px; border-bottom: 2px solid #00ffff;">
      <nav style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; font-weight: bold; cursor: pointer;" @click="idi_na_Pocetnu">POVRATAK NA SAJT</span>
        <img :src="logo" alt="Game Arenas" style="max-width: 150px;">
        <span style="color: #ff4444; font-size: 12px; font-weight: bold; cursor: pointer;" @click="odjavi_se">ADMIN ODJAVA</span>
      </nav>
    </header>

    <main style="padding: 40px; max-width: 1100px; margin: auto;">
      <h1 style="text-align: center; font-size: 40px; color: #ff00ff; text-shadow: 0 0 15px #ff00ff; margin-bottom: 40px;">ADMIN UPRAVLJAČKA PLOČA</h1>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
        
        <div style="border: 2px solid #00ffff; padding: 20px; background: rgba(0, 255, 255, 0.05);">
          <h2 style="color: #00ffff; border-bottom: 1px solid #00ffff; padding-bottom: 10px;">AKTIVNI TURNIRI</h2>
          <div v-for="t in turniri" :key="t.id" style="display: flex; justify-content: space-between; margin: 15px 0; background: #1a1a3a; padding: 10px;">
            <span>{{ t.ime }}</span>
            <button style="background: #00ffff; border: none; cursor: pointer; font-weight: bold;">UREDI</button>
          </div>
          <button style="width: 100%; padding: 10px; background: transparent; color: #00ffff; border: 1px solid #00ffff; margin-top: 10px; cursor: pointer;">+ DODAJ TURNIR</button>
        </div>

        <div style="border: 2px solid #00ffff; padding: 20px; background: rgba(0, 255, 255, 0.05);">
          <h2 style="color: #00ffff; border-bottom: 1px solid #00ffff; padding-bottom: 10px;">REGISTRIRANI KORISNICI</h2>
          <div style="max-height: 250px; overflow-y: auto;">
            <p v-for="user in korisnici" :key="user.id" style="margin: 10px 0; border-bottom: 1px solid #333;">
              {{ user.username }} <span style="font-size: 12px; color: #888;">({{ user.email }})</span>
            </p>
          </div>
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

const logo = ref(GameArenasLogo);
const router = useRouter();

const turniri = ref([]);
const korisnici = ref([]);

const dohvatiPodatke = async () => {
    try {
        const adminId = localStorage.getItem('userId');
        
        const res = await axios.get('/api/admin/dashboard-data', {
            headers: { 'user-id': adminId }
        });
        
        turniri.value = res.data.turniri;
        korisnici.value = res.data.korisnici;
    } catch (error) {
        console.error('Greška pri dohvatu podataka:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
            router.push('/');
        }
    }
};

const idi_na_Pocetnu = () => router.push('/');

const odjavi_se = () => {
    localStorage.clear();
    router.push('/');
};

onMounted(() => {
    dohvatiPodatke();
});
</script>