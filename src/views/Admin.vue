<template>
  <div style="margin: 0; padding: 0; background: #0a0e27; color: #00ffff; font-family: Arial, sans-serif; min-height: 100vh;">
    
    <header style="padding: 10px 30px; border-bottom: 2px solid #00ffff;">
      <nav style="display: flex; justify-content: center; gap: 30px; margin-bottom: 10px; flex-wrap: wrap; align-items: center;">
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/')">POČETNA STRANICA</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/Turniri_drustvene_prikaz')">SOCIAL GAMES</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/Turniri_esport_prikaz')">GAMING TURNIRI</span>

        <div style="text-align: center; margin: 5px 20px;">
          <img :src="logo" alt="Game Arenas" style="display: block; margin: 0 auto; max-width: 500px; width: 100%; height: auto;">
        </div>

        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/Scoreboard')">SCOREBOARD</span>
        <button
          @click="odjavi_se"
          style="background: none; border: none; color: #ff4444; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer; padding: 0; font-family: inherit;"
        >
          ADMIN ODJAVA
        </button>
      </nav>
    </header>

    <main style="padding: 40px; max-width: 1200px; margin: auto;">
      <h1 style="text-align: center; font-size: 40px; color: #ff00ff; text-shadow: 0 0 15px #ff00ff; margin-bottom: 40px; letter-spacing: 3px;">
        ADMIN UPRAVLJAČKA PLOČA
      </h1>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px;">
        <div style="border: 2px solid #00ffff; padding: 20px; background: rgba(0, 255, 255, 0.05);">
          <h2 style="color: #00ffff; border-bottom: 1px solid #00ffff; padding-bottom: 10px; letter-spacing: 1px;">AKTIVNI TURNIRI</h2>
          
          <div v-if="turniri.length === 0" style="color: #888; font-size: 13px; margin: 20px 0; text-align: center;">
            Nema aktivnih turnira.
          </div>

          <div v-for="t in turniri" :key="t._id" style="display: flex; justify-content: space-between; align-items: center; margin: 15px 0; background: #1a1a3a; padding: 10px;">
            <div>
              <span style="font-weight: bold; color: #fff;">{{ t.naziv }}</span>
              <span style="font-size: 11px; color: #888; margin-left: 10px;">{{ t.datum }} {{ t.vrijeme }}</span>
            </div>
            <div style="display: flex; gap: 8px;">
              <span style="font-size: 11px; color: #ff00ff; font-weight: bold;">{{ t.prijavljeni?.length || 0 }}/{{ t.maxIgraca }}</span>
              <button style="background: #00ffff; border: none; cursor: pointer; font-weight: bold; padding: 4px 10px; font-size: 11px;">UREDI</button>
            </div>
          </div>

          <button
            @click="router.push('/DodajTurnir')"
            style="width: 100%; padding: 12px; background: transparent; color: #00ffff; border: 1px solid #00ffff; margin-top: 10px; cursor: pointer; font-weight: bold; font-size: 13px; letter-spacing: 1px;"
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

      </div>
      <div style="border: 2px solid #ffaa00; padding: 20px; background: rgba(255, 170, 0, 0.05); margin-bottom: 40px;">
        <h2 style="color: #ffaa00; border-bottom: 1px solid #ffaa00; padding-bottom: 10px; letter-spacing: 1px; display: flex; align-items: center; gap: 15px;">
          ZAHTJEVI VOLONTERA
          <span v-if="neodobreniVolonteri.length > 0" style="background: #ff4444; color: #fff; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 13px;">
            {{ neodobreniVolonteri.length }}
          </span>
        </h2>

        <div v-if="neodobreniVolonteri.length === 0" style="color: #888; font-size: 13px; margin: 20px 0; text-align: center;">
          Nema novih zahtjeva za odobrenje.
        </div>

        <div v-for="v in neodobreniVolonteri" :key="v._id" style="display: flex; justify-content: space-between; align-items: center; margin: 15px 0; background: #1a1a3a; padding: 15px; border-left: 3px solid #ffaa00;">
          <div>
            <p style="margin: 0; font-weight: bold; color: #fff;">{{ v.ime }} {{ v.prezime }}</p>
            <p style="margin: 3px 0; font-size: 12px; color: #888;">{{ v.email }}</p>
            <p style="margin: 3px 0; font-size: 12px; color: #ffaa00;">{{ v.username }}</p>
          </div>
          <div style="display: flex; gap: 10px;">
            <button
              @click="odobriVolontera(v._id)"
              style="background: #00ff88; border: none; cursor: pointer; font-weight: bold; padding: 8px 16px; font-size: 12px; color: #000; letter-spacing: 1px;"
            >
              ODOBRI
            </button>
            <button
              @click="odbijVolontera(v._id)"
              style="background: #ff4444; border: none; cursor: pointer; font-weight: bold; padding: 8px 16px; font-size: 12px; color: #fff; letter-spacing: 1px;"
            >
              ODBIJ
            </button>
          </div>
        </div>
      </div>
      <div style="border: 2px solid #ff00ff; padding: 20px; background: rgba(255, 0, 255, 0.05); margin-bottom: 40px;">
        <h2 style="color: #ff00ff; border-bottom: 1px solid #ff00ff; padding-bottom: 10px; letter-spacing: 1px;">ZAVRŠENI TURNIRI - UPIS REZULTATA</h2>

        <div v-if="zavrseniTurniri.length === 0" style="color: #888; font-size: 13px; margin: 20px 0; text-align: center;">
          Nema završenih turnira za upis rezultata.
        </div>

        <div v-for="t in zavrseniTurniri" :key="t._id" style="margin-bottom: 30px; background: #1a1a3a; padding: 20px;">
          <h3 style="color: #ff00ff; margin: 0 0 15px 0;">{{ t.naziv }} — {{ t.datum }} {{ t.vrijeme }}</h3>
          
          <p style="color: #888; font-size: 13px; margin-bottom: 15px;">Prijavljeni igrači: {{ t.prijavljeni?.length || 0 }}</p>

          <div v-if="!t.zavrsen">
            <div v-for="(igrac, index) in t.prijavljeni" :key="igrac._id" style="display: flex; gap: 15px; align-items: center; margin-bottom: 10px;">
              <span style="color: #ff00ff; font-weight: bold; min-width: 30px;">{{ index + 1 }}.</span>
              <span style="color: #fff; font-weight: bold; flex: 1;">{{ igrac.username }}</span>
              <input
                v-model="rezultati[t._id + '_' + igrac._id]"
                type="number"
                placeholder="Bodovi"
                style="width: 100px; height: 35px; background: #0a0e27; border: 1px solid #ff00ff; color: #fff; padding: 0 10px; font-size: 13px; outline: none;"
              />
            </div>

            <button
              @click="upisiRezultate(t)"
              style="margin-top: 15px; padding: 10px 25px; background: linear-gradient(90deg, #ff00ff, #00ffff); color: #000; border: none; font-weight: bold; cursor: pointer; font-size: 13px; letter-spacing: 1px;"
            >
              SPREMI REZULTATE
            </button>
          </div>

          <div v-else style="color: #00ff88; font-weight: bold; font-size: 13px;">
            ✓ Rezultati već upisani
          </div>
        </div>
      </div>
      <div style="border: 2px solid #00ffff; padding: 20px; background: rgba(0, 255, 255, 0.05);">
        <h2 style="color: #00ffff; border-bottom: 1px solid #00ffff; padding-bottom: 10px; letter-spacing: 1px;">SCOREBOARD</h2>

        <div v-if="korisnici.length === 0" style="color: #888; font-size: 13px; margin: 20px 0; text-align: center;">
          Nema podataka.
        </div>

        <table v-else style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="color: #ff00ff; border-bottom: 1px solid #ff00ff;">
              <th style="text-align: left; padding: 8px;">#</th>
              <th style="text-align: left; padding: 8px;">USERNAME</th>
              <th style="text-align: left; padding: 8px;">EMAIL</th>
              <th style="text-align: left; padding: 8px;">ULOGA</th>
              <th style="text-align: right; padding: 8px;">BODOVI</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in korisniciPoRedoslijedu" :key="user._id" style="border-bottom: 1px solid #1a1a3a;">
              <td style="padding: 8px; color: #ff00ff; font-weight: bold;">{{ index + 1 }}</td>
              <td style="padding: 8px; color: #fff; font-weight: bold;">{{ user.username }}</td>
              <td style="padding: 8px; color: #888;">{{ user.email }}</td>
              <td style="padding: 8px; color: #00ffff;">{{ user.uloga?.toUpperCase() }}</td>
              <td style="padding: 8px; color: #00ffff; font-weight: bold; text-align: right;">{{ user.bodovi || 0 }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import GameArenasLogo from '@/assets/gamearenas_naslov1.png'
import { API_URL } from '@/config/api'

const logo = ref(GameArenasLogo)
const router = useRouter()

const turniri = ref([])
const zavrseniTurniri = ref([])
const korisnici = ref([])
const neodobreniVolonteri = ref([])
const rezultati = ref({})

const korisniciPoRedoslijedu = computed(() =>
  [...korisnici.value].sort((a, b) => (b.bodovi || 0) - (a.bodovi || 0))
)

const dohvatiPodatke = async () => {
  try {
    const resKorisnici = await axios.get(`${API_URL}/api/korisnici`)
    korisnici.value = resKorisnici.data
  } catch (error) {
    console.error('Greška pri dohvatu korisnika:', error)
  }

  try {
    const resTurniri = await axios.get(`${API_URL}/api/turniri`)
    const svi = resTurniri.data

    const sad = new Date()
    turniri.value = svi.filter(t => {
      const vrijemeTurnira = new Date(`${t.datum}T${t.vrijeme}`)
      return vrijemeTurnira > sad
    })
    zavrseniTurniri.value = svi.filter(t => {
      const vrijemeTurnira = new Date(`${t.datum}T${t.vrijeme}`)
      return vrijemeTurnira <= sad
    })
  } catch (error) {
    console.error('Greška pri dohvatu turnira:', error)
  }

  try {
    const resVolonteri = await axios.get(`${API_URL}/api/korisnici/volonteri/neodobreni`)
    neodobreniVolonteri.value = resVolonteri.data
  } catch (error) {
    console.error('Greška pri dohvatu volontera:', error)
  }
}

const odobriVolontera = async (id) => {
  try {
    await axios.post(`${API_URL}/api/korisnici/volonteri/${id}/odobri`)
    alert('Volonter odobren!')
    dohvatiPodatke()
  } catch (error) {
    alert('Greška pri odobravanju.')
  }
}

const odbijVolontera = async (id) => {
  try {
    await axios.delete(`${API_URL}/api/korisnici/${id}`)
    alert('Volonter odbijen i obrisan.')
    dohvatiPodatke()
  } catch (error) {
    alert('Greška pri odbijanju.')
  }
}

const upisiRezultate = async (turnir) => {
  try {
    const rezultatiZaTurnir = turnir.prijavljeni.map(igrac => ({
      korisnikId: igrac._id,
      bodovi: parseInt(rezultati.value[turnir._id + '_' + igrac._id] || 0)
    }))

    await axios.post(`${API_URL}/api/turniri/${turnir._id}/rezultati`, {
      rezultati: rezultatiZaTurnir
    })

    alert('Rezultati uspješno upisani!')
    dohvatiPodatke()
  } catch (error) {
    alert('Greška pri upisu rezultata.')
  }
}

const odjavi_se = () => {
  localStorage.clear()
  router.push('/')
}

onMounted(() => {
  dohvatiPodatke()
})
</script>