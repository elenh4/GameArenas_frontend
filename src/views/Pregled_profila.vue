<template>
    <div style="margin: 0; padding: 0; background: #0a0e27; color: #00ffff; font-family: Arial, sans-serif; min-height: 100vh; padding: 40px;">
        <main style="max-width: 900px; margin: auto; display: flex; flex-direction: column; align-items: center;">
        <h1 style="font-size: 48px; color: #ff00ff; text-shadow: 0 0 15px #ff00ff; margin-bottom: 40px;">PROFIL IGRAČA</h1>

        <div style="display: flex; gap: 60px; align-items: flex-start; width: 100%;">
            <div style="flex: 1; color: #00ffff; font-weight: bold; font-size: 20px;">
            <p>USERNAME : <span style="color: #fff;">{{ prikazaniUser.username }}</span></p>
            <p>BODOVI : <span style="color: #fff;">{{ prikazaniUser.bodovi || 0 }}</span></p>
            <p>LEAGUE : 
                <span :style="{ color: odredi_ligu(prikazaniUser.bodovi || 0).boja, fontWeight: 'bold' }">
                {{ odredi_ligu(prikazaniUser.bodovi || 0).naziv }}
                </span>
            </p>

            <div style="margin-top: 30px;">
                <h3 style="color: #ff00ff;">AKTIVNI TURNIRI:</h3>
                <div v-if="prikazaniUser.turniri && prikazaniUser.turniri.length > 0">
                <div v-for="t in prikazaniUser.turniri" :key="t._id" style="background: #1a1a3a; padding: 10px; margin-bottom: 10px; border-left: 3px solid #00ffff; font-size: 14px;">
                    <p style="margin: 0; color: #fff;">{{ t.naziv }}</p>
                    <p style="margin: 0; font-size: 12px; color: #888;">{{ t.datum }} - {{ t.vrsta }}</p>
                </div>
                </div>
                <p v-else style="font-size: 14px; color: #666;">Korisnik nije prijavljen ni na jedan turnir.</p>
            </div>
            
            <div v-if="jeAdmin" style="margin-top: 30px;">
                <div style="padding: 15px; border: 1px solid #00ffff; border-radius: 5px; background: rgba(0, 255, 255, 0.05);">
                <h3 style="color: #00ffff; margin-top: 0; font-size: 18px;">IZMJENA BODOVA</h3>
                <input v-model="noviBodovi" type="number" style="background: #1a1a3a; color: #00ffff; border: 1px solid #00ffff; padding: 5px; width: 80px;">
                <button @click="azurirajBodove" style="background: #00ff00; border: none; margin-left: 10px; cursor: pointer; padding: 5px 10px; font-weight: bold;">SPREMI</button>
                </div>

                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ff0000;">
                <button @click="obrisiKorisnika" style="background: transparent; color: #ff0000; border: 1px solid #ff0000; cursor: pointer; padding: 10px 20px; font-weight: bold; width: 100%;">
                    OBRIŠI KORISNIČKI RAČUN
                </button>
                </div>
            </div>
            </div>

            <div style="width: 200px; height: 200px; background: #1a1a3a; border: 2px solid #00ffff; display: flex; align-items: center; justify-content: center; font-size: 80px;">
            👤
            </div>
        </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { API_URL } from '@/config/api'

const route = useRoute();
const router = useRouter();
const prikazaniUser = ref({});
const noviBodovi = ref(0);

const trenutniKorisnik = JSON.parse(localStorage.getItem('trenutniKorisnik'));
const jeAdmin = computed(() => trenutniKorisnik?.uloga === 'admin');

const odredi_ligu = (bodovi) => {
    if (bodovi >= 2000) return { naziv: 'PLATINUM', boja: '#e5e4e2' };
    if (bodovi >= 1000) return { naziv: 'GOLD', boja: '#ffd700' };
    if (bodovi >= 500) return { naziv: 'SILVER', boja: '#c0c0c0' };
    if (bodovi >= 200) return { naziv: 'BRONZE', boja: '#cd7f32' };
    return { naziv: 'NO LEAGUE', boja: '#7f8c8d' };
};

const dohvatiProfil = async () => {
    try {
        const userId = route.params.id;
        const res = await axios.get(`${API_URL}/api/profil/${userId}`);
        prikazaniUser.value = res.data;
        noviBodovi.value = res.data.bodovi;
    } catch (error) {
        console.error("Greška pri dohvatu profila", error);
    }
};

const azurirajBodove = async () => {
    if (!jeAdmin.value) return;
    try {
        await axios.patch(`${API_URL}/api/scoreboard/${prikazaniUser.value._id}/bodovi`, {
        bodovi: noviBodovi.value
        });
        dohvatiProfil();
    } catch (error) {
        console.error(error);
    }
};


onMounted(dohvatiProfil);
</script>