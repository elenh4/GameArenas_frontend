<template>
  <div style="background-color: #0a0e27; color: #00ffff; min-height: 100vh; font-family: Arial, sans-serif; padding: 20px; box-sizing: border-box;">
    
    <nav style="display: flex; justify-content: space-between; font-size: 11px; font-weight: bold; letter-spacing: 1px; color: #00ffff; padding: 10px 40px;">
      <div style="display: flex; gap: 30px;">
        <span style="color: #00ffff; cursor: pointer;" @click="Pocetna_stranica">POČETNA STRANICA</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/Turniri_drustvene_prikaz')">SOCIAL GAMES</span>
      </div>
      <div style="display: flex; gap: 30px; color: #ff00ff; text-align: right;">
        <span>GAMING TURNIRI SCOREBOARD</span>
        <span @click="Registracija_korisnika" style="cursor: pointer;">REGISTRIRAJ SE</span>
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
      <h2 style="text-align: center; color: #00ffff; font-size: 1.1rem; margin-bottom: 25px; font-weight: bold; letter-spacing: 1px;">
        UNESITE PODATKE ZA PRIJAVU
      </h2>
      
      <div style="max-width: 420px; margin: 0 auto; padding: 40px 20px; border: 4px solid; border-image: linear-gradient(to bottom, #00ffff, #ff00ff) 1; background-color: #0a0e27;">
        <form @submit.prevent="prijavi_se">
          
          <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 30px;">
            <label for="email" style="color: #00ffff; font-size: 1.1rem; margin-bottom: 12px; font-weight: bold; letter-spacing: 1px;">E-MAIL</label>
            <input id="email" v-model="forma.email" type="email" required :disabled="ucitavanje_stranice" style="width: 100%; max-width: 280px; height: 45px; border-radius: 25px; border: none; padding: 0 20px; font-size: 1.1rem; text-align: center; color: #000000; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold;" />
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 30px;">
            <label for="password" style="color: #00ffff; font-size: 1.1rem; margin-bottom: 12px; font-weight: bold; letter-spacing: 1px;">LOZINKA</label>
            <input id="password" v-model="forma.password" type="password" required :disabled="ucitavanje_stranice" style="width: 100%; max-width: 280px; height: 45px; border-radius: 25px; border: none; padding: 0 20px; font-size: 1.1rem; text-align: center; color: #000000; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); outline: none; font-weight: bold;" />
          </div>

          <p v-if="errorMessage" style="color: #ff3333; text-align: center; margin-bottom: 15px; font-size: 0.9rem; font-weight: bold;">{{ errorMessage }}</p>

          <button type="submit" :disabled="ucitavanje_stranice" style="display: block; width: 100%; max-width: 180px; height: 45px; margin: 20px auto 0 auto; border-radius: 25px; border: none; font-size: 1.2rem; font-weight: bold; cursor: pointer; background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%); color: #000000;">
            <span v-if="ucitavanje_stranice">UČITAVANJE...</span>
            <span v-else>START</span>
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import GameArenasLogo from '@/assets/gamearenas_naslov1.png'

const logo = ref(GameArenasLogo)
const ucitavanje_stranice = ref(false)
const errorMessage = ref('')
const forma = reactive({ email: '', password: '' })

const router = useRouter()

const Pocetna_stranica = () => { router.push('/') }
const Registracija_korisnika = () => { router.push('/Registracija_korisnika') }

const prijavi_se = async () => {
  ucitavanje_stranice.value = true
  errorMessage.value = ''
  
  try {
    const response = await fetch('http://localhost:3000/api/korisnici/prijava', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: forma.email, lozinka: forma.password })
    })
    
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Neispravni podaci.')
    localStorage.setItem('trenutniKorisnik', JSON.stringify(data.user))
    localStorage.setItem('userId', data.user.id) 

    if (data.user.uloga === 'admin') {
    router.push('/Admin')
    }else {
    router.push('/ProfilKorisnik')
    }
    
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    ucitavanje_stranice.value = false
  }
}
</script>