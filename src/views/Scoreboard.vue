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

            <span style="color: #ff00ff; font-size: 12px; font-weight: bold; letter-spacing: 1px;">SCOREBOARD</span>

            <template v-if="jePrijavljen">
            <button @click="router.push('/ProfilKorisnik')" style="background: none; border: none; color: #00ffff; font-size: 12px; font-weight: bold; cursor: pointer;">
                TVOJ PROFIL ({{ trenutniKorisnik.username }})
            </button>
            <button @click="odjavi_se" style="background: none; border: none; color: #ff00ff; font-size: 12px; font-weight: bold; cursor: pointer;">
                ODJAVI SE
            </button>
            </template>
            <button v-else @click="router.push('/Prijava_korisnika')" style="background: none; border: none; color: #ff00ff; font-size: 12px; font-weight: bold; cursor: pointer;">
            PRIJAVI SE
            </button>
        </nav>
        </header>

        <main style="padding: 40px; max-width: 1000px; margin: auto;">
        <h1 style="text-align: center; color: #ff00ff; font-size: 40px; letter-spacing: 3px; margin-bottom: 40px; text-shadow: 0 0 15px #ff00ff;">
            SCOREBOARD
        </h1>

        <div style="border: 2px solid #00ffff; background: rgba(0, 255, 255, 0.05); padding: 20px;">
            <table style="width: 100%; border-collapse: collapse; color: white; font-size: 14px;">
            <thead>
                <tr style="border-bottom: 2px solid #00ffff; color: #00ffff;">
                <th style="padding: 15px; text-align: left;">KORISNIK</th>
                <th style="padding: 15px; text-align: center;">BODOVI</th>
                <th style="padding: 15px; text-align: center;">LEAGUE</th>
                <th v-if="isAdmin" style="padding: 15px; text-align: center;">AKCIJA</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in sortiraniKorisnici" :key="user._id" style="border-bottom: 1px solid #1a1a3a;">
                <td 
                    style="padding: 15px; cursor: pointer; color: #ffffff; text-decoration: none; transition: 0.3s;" 
                    onmouseover="this.style.color='#00ffff'; this.style.textDecoration='underline';" 
                    onmouseout="this.style.color='#ffffff'; this.style.textDecoration='none';"
                    @click="router.push(`/ProfilKorisnik/${user._id}`)"
                >
                    {{ user.username }}
                </td>

                <td style="padding: 15px; text-align: center; font-weight: bold; color: #ff00ff;">
                    <span v-if="korisnikZaIzmjenu !== user._id">{{ user.bodovi || 0 }}</span>
                    <input v-else type="number" v-model="noviBodovi" style="background: #1a1a3a; color: #00ffff; border: 1px solid #00ffff; width: 60px; text-align: center;">
                </td>
                
                <td style="padding: 15px; text-align: center;">
                    <span :style="{ color: odrediRang(user.bodovi || 0).boja, fontWeight: 'bold' }">
                    {{ odrediRang(user.bodovi || 0).naziv }}
                    </span>
                </td>

                <td v-if="isAdmin" style="padding: 15px; text-align: center;">
                    <button v-if="korisnikZaIzmjenu !== user._id" @click="pokreniUredivanje(user)" style="background: #00ffff; border: none; cursor: pointer; padding: 5px 10px; font-weight: bold;">UREDI</button>
                    <div v-else>
                    <button @click="spremiBodove(user._id)" style="background: #00ff00; border: none; cursor: pointer; padding: 5px 10px; margin-right: 5px;">SPREMI</button>
                    <button @click="ponistiIzmjenu" style="background: #ff4444; border: none; cursor: pointer; padding: 5px 10px;">X</button>
                    </div>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import GameArenasLogo from '@/assets/gamearenas_naslov1.png';

const router = useRouter();
const logo = ref(GameArenasLogo);
const korisnici = ref([]);
const korisnikZaIzmjenu = ref(null);
const noviBodovi = ref(0);

const trenutniKorisnik = ref(JSON.parse(localStorage.getItem('trenutniKorisnik')));
const jePrijavljen = computed(() => !!trenutniKorisnik.value);
const isAdmin = computed(() => trenutniKorisnik.value?.uloga === 'admin');

const sortiraniKorisnici = computed(() => {
    return [...korisnici.value].sort((a, b) => (b.bodovi || 0) - (a.bodovi || 0));
});

const odrediRang = (bodovi) => {
    if (bodovi >= 2000) return { naziv: 'PLATINUM', boja: '#e5e4e2' };
    if (bodovi >= 1000) return { naziv: 'GOLD', boja: '#ffd700' };
    if (bodovi >= 500) return { naziv: 'SILVER', boja: '#c0c0c0' };
    if (bodovi >= 200) return { naziv: 'BRONZE', boja: '#cd7f32' };
    return { naziv: 'NO LEAGUE', boja: '#7f8c8d' };
};

const dohvatiRezultate = async () => {
    try {
        const res = await axios.get('http://localhost:3000/api/korisnici');
        korisnici.value = res.data;
    } catch (err) {
        console.error(err);
    }
};

const pokreniUredivanje = (user) => {
    korisnikZaIzmjenu.value = user._id;
    noviBodovi.value = user.bodovi || 0;
};

const ponistiIzmjenu = () => {
    korisnikZaIzmjenu.value = null;
};

const spremiBodove = async (userId) => {
    try {
        await axios.patch(`http://localhost:3000/api/scoreboard/${userId}/bodovi`, {
            bodovi: noviBodovi.value
        });
        korisnikZaIzmjenu.value = null;
        dohvatiRezultate();
    } catch (err) {
        console.error(err);
    }
};

const odjavi_se = () => {
    localStorage.removeItem('trenutniKorisnik');
    trenutniKorisnik.value = null;
    router.push('/');
};

onMounted(dohvatiRezultate);
</script>