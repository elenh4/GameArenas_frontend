<template>
  <div style="background-color: #0a0e27; color: #00ffff; min-height: 100vh; font-family: Arial, sans-serif; padding: 20px; box-sizing: border-box;">
    
    <nav style="display: flex; justify-content: space-between; font-size: 11px; font-weight: bold; letter-spacing: 1px; color: #00ffff; padding: 10px 40px;">
      <div style="display: flex; gap: 30px;">
        <span style="color: #00ffff; cursor: pointer;" @click="Pocetna_stranica">POČETNA STRANICA</span>
        <span>SOCIAL GAMES TURNIRI</span>
      </div>
      <div style="display: flex; gap: 30px; color: #ff00ff; text-align: right;">
        <span>GAMING TURNIRI SCOREBOARD</span>
        <span v-if="!ulogiraniVolonter.ime" style="cursor: pointer; color: #ff00ff;" @click="Prijava_stranica">PRIJAVI SE</span>
        <span v-else style="cursor: pointer; color: #ff3333;" @click="odjaviSe">ODJAVI SE ({{ ulogiraniVolonter.ime }})</span>
      </div>
    </nav>

    <header style="text-align: center; margin-top: 20px;">
      <div style="text-align: center; margin-bottom: 5px;">
        <img :src="logo" alt="Game Arenas" style="display: block; margin: 0 auto; max-width: 450px; width: 100%; height: auto;">
      </div>
      <p style="font-size: 1.2rem; color: #ff00ff; margin: 0 0 40px 0; font-weight: bold; letter-spacing: 2px;">
        YOUR GAME YOUR ARENA
      </p>
    </header>

    <main>
      
      <div v-if="ulogiraniVolonter.ime" style="max-width: 800px; margin: 40px auto; padding: 30px; border: 4px solid; border-image: linear-gradient(to right, #00ffff, #ff00ff) 1; background-color: #0a0e27;">
        
        <h2 style="color: #00ffff; font-size: 1.5rem; margin-top: 0; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">
          KONTROLNA PLOČA: {{ ulogiraniVolonter.ime }} {{ ulogiraniVolonter.prezime }}
        </h2>
        <p style="color: #ff00ff; font-weight: bold; font-size: 1.1rem; margin-bottom: 20px;">
          Uspješno si kreirao/la volonterski račun i ušao/la u sustav!
        </p>

        <div style="background-color: #0f143c; border: 2px dashed #ff00ff; padding: 25px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 0 15px rgba(255, 0, 255, 0.2);">
          <h3 style="color: #ff00ff; margin-top: 0; font-size: 1.1rem; letter-spacing: 1px; display: flex; align-items: center; gap: 10px;">
            ⏳ STATUS PROFILA: ČEKA SE ODOBRENJE ADMINISTRATORA
          </h3>
          <p style="color: #ffffff; line-height: 1.6; font-size: 0.95rem; font-weight: bold; margin-bottom: 0;">
            Trenutno imaš osnovni pristup areni. Kako bi mogao/la vidjeti <span style="color: #00ffff;">napredne informacije o funkcioniranju turnira</span>, tablice, rasporede i administratorske ovlasti koje obični korisnici ne smiju vidjeti, administrator mora ručno odobriti tvoj profil. 
          </p>
        </div>

        <h3 style="color: #00ffff; font-size: 1.1rem; letter-spacing: 1px;">OSNOVNE INFORMACIJE O ARENI</h3>
        <p style="color: #ffffff; line-height: 1.6; opacity: 0.8;">
          Dobrodošao u sustav Game Arenas. Ovdje možeš pratiti javne rezultate turnira i urediti svoj profil. Nakon odobrenja admina, na ovom mjestu će ti se otključati tajni organizacijski moduli i koordinacija mečeva.
        </p>
      </div>

      <div v-else>
        <h2 style="text-align: center; color: #00ffff; font-size: 1.1rem; margin-bottom: 35px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">
          PRIJAVA ZA VOLONTERE
        </h2>
        
        <div style="display: flex; max-width: 1000px; margin: 0 auto; gap: 50px; align-items: flex-start; flex-wrap: wrap; justify-content: center;">
          
          <div style="width: 100%; max-width: 420px; padding: 30px 20px; border: 4px solid; border-image: linear-gradient(to bottom, #00ffff, #ff00ff) 1; background-color: #0a0e27;">
            <form @submit.prevent="volonter_registracija">
              
              <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
                <label style="color: #00ffff; font-size: 1rem; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">IME</label>
                <input v-model="volonter.firstName" type="text" required style="width: 100%; max-width: 280px; height: 40px; border-radius: 25px; border: none; padding: 0 20px; font-size: 1rem; text-align: center; color: #000000; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold;" />
              </div>

              <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
                <label style="color: #00ffff; font-size: 1rem; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">PREZIME</label>
                <input v-model="volonter.lastName" type="text" required style="width: 100%; max-width: 280px; height: 40px; border-radius: 25px; border: none; padding: 0 20px; font-size: 1rem; text-align: center; color: #000000; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold;" />
              </div>

              <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
                <label style="color: #00ffff; font-size: 1rem; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">E-MAIL</label>
                <input v-model="volonter.email" type="email" required style="width: 100%; max-width: 280px; height: 40px; border-radius: 25px; border: none; padding: 0 20px; font-size: 1rem; text-align: center; color: #000000; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold;" />
              </div>

              <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
                <label style="color: #00ffff; font-size: 1rem; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">LOZINKA</label>
                <input v-model="volonter.password" type="password" required style="width: 100%; max-width: 280px; height: 40px; border-radius: 25px; border: none; padding: 0 20px; font-size: 1rem; text-align: center; color: #000000; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold;" />
              </div>

              <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
                <label style="color: #00ffff; font-size: 1rem; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">POTVRDA LOZINKE</label>
                <input v-model="volonter.confirmPassword" type="password" required style="width: 100%; max-width: 280px; height: 40px; border-radius: 25px; border: none; padding: 0 20px; font-size: 1rem; text-align: center; color: #000000; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold;" />
              </div>

              <button type="submit" style="display: block; width: 100%; max-width: 180px; height: 45px; margin: 25px auto 0 auto; border-radius: 25px; border: none; font-size: 1.2rem; font-weight: bold; cursor: pointer; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); color: #000000; text-transform: uppercase; transition: all 0.3s ease;" onmouseover="this.style.filter='brightness(1.2)'; this.style.boxShadow='0 0 15px rgba(255, 0, 255, 0.5)';" onmouseout="this.style.filter='none'; this.style.boxShadow='none';">
                <span>REGISTRIRAJ SE</span>
              </button>
            </form>
          </div>

          <div style="flex: 1; max-width: 500px; display: flex; flex-direction: column; justify-content: space-between; min-height: 480px; padding-top: 20px;">
            <div style="display: flex; flex-direction: column; gap: 25px;">
              
              <div style="display: flex; flex-direction: column;">
                <label style="color: #00ffff; font-size: 1rem; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">IZABERI TIP TURNIRA</label>
                <select v-model="volonter.tournamentType" required style="width: 100%; height: 40px; border-radius: 25px; border: none; padding: 0 20px; font-size: 1rem; color: #000000; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold; appearance: none; text-align-last: center;">
                  <option value="" disabled selected hidden style="background-color: #0a0e27; color: #00ffff; font-weight: bold;">IZABERI...</option>
                  <option value="social" style="background-color: #0a0e27; color: #00ffff; font-weight: bold;">SOCIAL GAMES TURNIRI</option>
                  <option value="gaming" style="background-color: #0a0e27; color: #00ffff; font-weight: bold;">GAMING TURNIRI</option>
                  <option value="oba" style="background-color: #0a0e27; color: #00ffff; font-weight: bold;">OBA TIPA TURNIRA</option>
                </select>
              </div>

              <div style="display: flex; flex-direction: column;">
                <label style="color: #00ffff; font-size: 1rem; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">ZAŠTO ŽELIŠ VOLONTIRATI?</label>
                <textarea v-model="volonter.motivation" required rows="4" style="width: 100%; border-radius: 15px; border: none; padding: 15px; font-size: 1rem; color: #000000; background: linear-gradient(135deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold; resize: none; font-family: Arial, sans-serif;"></textarea>
              </div>

              <label style="display: flex; align-items: flex-start; gap: 15px; color: #ffffff; font-size: 14px; font-weight: bold; line-height: 1.4; letter-spacing: 0.5px; cursor: pointer;">
                <input type="checkbox" v-model="volonter.prihvacaUvjete" required style="margin-top: 3px; accent-color: #00ffff; width: 16px; height: 16px; flex-shrink: 0;" />
                <span>POTVRĐUJEM DA ŽELIM POMOĆI U ORGANIZACIJI ARENA TURNIRA KAO VOLONTER.</span>
              </label>
            </div>

            <div style="text-align: center; margin-top: 40px;">
              <p style="color: #00ffff; font-size: 1.4rem; font-weight: 900; letter-spacing: 1px; font-style: italic; text-shadow: 0 0 10px rgba(0, 255, 255, 0.4); margin: 0;">
                "BECAUSE EVERY GAME
              </p>
              <p style="color: #00ffff; font-size: 1.4rem; font-weight: 900; letter-spacing: 1px; font-style: italic; text-shadow: 0 0 10px rgba(0, 255, 255, 0.4); margin: 5px 0 0 0;">
                DESERVES A CHAMPION."
              </p>
            </div>
          </div>

        </div>
      </div>
      
    </main>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import GameArenasLogo from '@/assets/gamearenas_naslov1.png'

const logo = ref(GameArenasLogo)
const router = useRouter()

const ulogiraniVolonter = ref({ ime: '', prezime: '', uloga: '', odobren: false })

const volonter = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  tournamentType: '',
  motivation: '',
  prihvacaUvjete: false
})

onMounted(() => {
  const spremljeno = localStorage.getItem('trenutniKorisnik')
  if (spremljeno) {
    ulogiraniVolonter.value = JSON.parse(spremljeno)
  }
})

const volonter_registracija = async () => {
  if (volonter.password !== volonter.confirmPassword) {
    alert('Lozinka i potvrda lozinke se ne podudaraju!')
    return
  }

  try {
    await axios.post('http://localhost:3000/api/volonteri/register', {
      ime: volonter.firstName,
      prezime: volonter.lastName,
      email: volonter.email,
      lozinka: volonter.password,
      tipTurnira: volonter.tournamentType,
      motivacija: volonter.motivation,
      uloga: 'volonter'
    })

    const novi_korisnik = {
      ime: volonter.firstName,
      prezime: volonter.lastName,
      uloga: 'volonter',
      odobren: false
    }

    localStorage.setItem('trenutniKorisnik', JSON.stringify(novi_korisnik))
    ulogiraniVolonter.value = novi_korisnik

  } catch (error) {
    alert(error.response?.data?.message || 'Greška pri slanju prijave. Pokušajte ponovno.')
  }
}

const Pocetna_stranica = () => { router.push('/') }
const Prijava_stranica = () => { router.push('/prijava_stranica') }

const odjaviSe = () => {
    localStorage.removeItem('trenutniKorisnik')
  ulogiraniVolonter.value = { ime: '', prezime: '', uloga: '', odobren: false }
  router.push('/')
}
</script>