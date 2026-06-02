<template>
  <div style="background-color: #0a0e27; color: #00ffff; min-height: 100vh; font-family: Arial, sans-serif; padding: 20px; box-sizing: border-box;">
    
    <nav style="display: flex; justify-content: space-between; font-size: 11px; font-weight: bold; letter-spacing: 1px; color: #00ffff; padding: 10px 40px;">
      <div style="display: flex; gap: 30px;">
        <span style="color: #00ffff; cursor: pointer;" @click="Pocetna_stranica">POČETNA STRANICA</span>
        <span style="cursor: pointer;">SOCIAL GAMES TURNIRI</span>
      </div>
      <div style="display: flex; gap: 30px; color: #ff00ff; text-align: right;">
        <span style="cursor: pointer; color: #ff00ff;">GAMING TURNIRI SCOREBOARD</span>
        <span style="color: #00ffff; cursor: pointer;" @click="router.push('/Volonteri_prijava')">PRIJAVI SE KAO VOLONTER</span>
        <span style="cursor: pointer; color: #ff00ff;" @click="Prijava_stranica">PRIJAVI SE</span>
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
      <h2 style="text-align: center; color: #00ffff; font-size: 1.1rem; margin-bottom: 35px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">
        UNESITE PODATKE ZA REGISTRACIJU
      </h2>
      
      <div style="display: flex; max-width: 1000px; margin: 0 auto; gap: 50px; align-items: flex-start; flex-wrap: wrap; justify-content: center;">
        
        <div style="width: 100%; max-width: 420px; padding: 30px 20px; border: 4px solid; border-image: linear-gradient(to bottom, #00ffff, #ff00ff) 1; background-color: #0a0e27;">
          <form @submit.prevent="krivi_podaci">
            
            <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
              <label for="ime" style="color: #00ffff; font-size: 1rem; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">IME</label>
              <input id="ime" v-model="user.firstName" type="text" required style="width: 100%; max-width: 280px; height: 40px; border-radius: 25px; border: none; padding: 0 20px; font-size: 1rem; text-align: center; color: #000000; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold;" />
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
              <label for="prezime" style="color: #00ffff; font-size: 1rem; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">PREZIME</label>
              <input id="prezime" v-model="user.lastName" type="text" required style="width: 100%; max-width: 280px; height: 40px; border-radius: 25px; border: none; padding: 0 20px; font-size: 1rem; text-align: center; color: #000000; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold;" />
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
              <label for="email" style="color: #00ffff; font-size: 1rem; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">E-MAIL</label>
              <input id="email" v-model="user.email" type="email" required style="width: 100%; max-width: 280px; height: 40px; border-radius: 25px; border: none; padding: 0 20px; font-size: 1rem; text-align: center; color: #000000; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold;" />
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
              <label for="password" style="color: #00ffff; font-size: 1rem; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">LOZINKA</label>
              <input id="password" v-model="user.password" type="password" required style="width: 100%; max-width: 280px; height: 40px; border-radius: 25px; border: none; padding: 0 20px; font-size: 1rem; text-align: center; color: #000000; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold;" />
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
              <label for="confirmPassword" style="color: #00ffff; font-size: 1rem; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">POTVRDA LOZINKE</label>
              <input id="confirmPassword" v-model="user.confirmPassword" type="password" required style="width: 100%; max-width: 280px; height: 40px; border-radius: 25px; border: none; padding: 0 20px; font-size: 1rem; text-align: center; color: #000000; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold;" />
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 25px;">
              <label for="username" style="color: #00ffff; font-size: 1rem; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">USERNAME</label>
              <input id="username" v-model="user.username" type="text" required style="width: 100%; max-width: 280px; height: 40px; border-radius: 25px; border: none; padding: 0 20px; font-size: 1rem; text-align: center; color: #000000; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold;" />
            </div>

            <button type="submit" style="display: block; width: 100%; max-width: 180px; height: 45px; margin: 10px auto 0 auto; border-radius: 25px; border: none; font-size: 1.2rem; font-weight: bold; cursor: pointer; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); color: #000000; text-transform: uppercase;">
              <span>REGISTRACIJA</span>
            </button>
          </form>
        </div>

        <div style="flex: 1; max-width: 500px; display: flex; flex-direction: column; justify-content: space-between; min-height: 440px; padding-top: 20px;">
          
          <div style="display: flex; flex-direction: column; gap: 35px;">
            <label style="display: flex; align-items: flex-start; gap: 15px; color: #ffffff; font-size: 14px; font-weight: bold; line-height: 1.4; letter-spacing: 0.5px; cursor: pointer;">
              <input type="checkbox" v-model="user.prihvacaUvjete" required style="margin-top: 3px; accent-color: #00ffff; width: 16px; height: 16px; flex-shrink: 0;" />
              <span>REGISTRACIJOM POTVRĐUJEM DA PRIHVAĆAM UVJETE KORIŠTENJA I POLITIKU PRIVATNOSTI PLATFORME.</span>
            </label>

            <label style="display: flex; align-items: flex-start; gap: 15px; color: #ffffff; font-size: 14px; font-weight: bold; line-height: 1.4; letter-spacing: 0.5px; cursor: pointer;">
              <input type="checkbox" v-model="user.prihvacaNewsletter" style="margin-top: 3px; accent-color: #00ffff; width: 16px; height: 16px; flex-shrink: 0;" />
              <span>SLAŽEM SE S PRIMITKOM OBAVIJESTI I NEWSLETTERA.</span>
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
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import GameArenasLogo from '@/assets/gamearenas_naslov1.png'

const Pocetna_stranica = () => {router.push('/')}
const Prijava_stranica = () => {router.push('/Prijava_korisnika' )}

const logo = ref(GameArenasLogo)
const router = useRouter()

const user = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
  prihvacaUvjete: false,
  prihvacaNewsletter: false
})

const krivi_podaci = async () => {
  if (user.password !== user.confirmPassword) {
    alert('Lozinka i ponovna lozinka se ne podudaraju!')
    return
  }

  try {
    await axios.post('http://localhost:3000/api/korisnici/registracija', {
      ime: user.firstName,
      prezime: user.lastName,
      email: user.email,
      lozinka: user.password,
      username: user.username,
      newsletter: user.prihvacaNewsletter
    })

    router.push('/Registarcija_uspjesna')

  } catch (error) {
    alert(
      error.response?.data?.message ||
      'Greška pri registraciji. Pokušajte ponovno.'
    )
  }
}

</script>

