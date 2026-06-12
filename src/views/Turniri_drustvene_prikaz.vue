<template>
  <div style="margin: 0; padding: 0; background: #0a0e27; color: #00ffff; font-family: Arial, sans-serif; min-height: 100vh;">
    
    <header style="padding: 10px 30px; border-bottom: 2px solid #00ffff;">
      <nav style="display: flex; justify-content: center; gap: 30px; margin-bottom: 10px; flex-wrap: wrap; align-items: center;">
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/')">POČETNA STRANICA</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/Turniri_drustvene_prikaz')">SOCIAL GAMES</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px;">TURNIRI</span>

        <div style="text-align: center; margin: 5px 20px;">
          <img :src="logo" alt="Game Arenas" style="display: block; margin: 0 auto; max-width: 500px; width: 100%; height: auto;">
        </div>

        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer;" @click="router.push('/Turniri_esport_prikaz')">GAMING TURNIRI</span>
        <span style="color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px;">SCOREBOARD</span>

        <template v-if="jePrijavljen">
          <button @click="idi_na_profil" style="background: none; border: none; color: #00ffff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer; padding: 0; font-family: inherit;">
            TVOJ PROFIL ({{ trenutniKorisnik.username }})
          </button>
          <button @click="odjavi_se" style="background: none; border: none; color: #ff00ff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer; padding: 0; font-family: inherit;">
            ODJAVI SE
          </button>
        </template>
        <button v-else @click="router.push('/Prijava_korisnika')" style="background: none; border: none; color: #ff00ff; font-size: 12px; font-weight: bold; letter-spacing: 1px; cursor: pointer; padding: 0; font-family: inherit;">
          PRIJAVI SE
        </button>
      </nav>
    </header>

    <main style="padding: 40px;">
      <h1 style="text-align: center; font-size: 40px; color: #ff00ff; text-shadow: 0 0 15px #ff00ff; margin-bottom: 10px; letter-spacing: 3px;">
        DRUŠTVENE IGRE TURNIRI
      </h1>
      <p style="text-align: center; color: #00ffff; font-size: 13px; letter-spacing: 2px; margin-bottom: 40px;">
        SOCIAL · FUN · COMMUNITY
      </p>

      <div v-if="ucitavanje" style="text-align: center; color: #00ffff; font-size: 18px; margin-top: 60px;">
        UČITAVANJE TURNIRA...
      </div>

      <div v-else-if="turniri.length === 0" style="text-align: center; color: #888; font-size: 16px; margin-top: 60px;">
        Trenutno nema aktivnih društvenih turnira.
      </div>

      <div v-else style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto;">
        <div v-for="t in turniri" :key="t._id" style="border: 2px solid #ff00ff; background: rgba(255, 0, 255, 0.05); padding: 25px; display: flex; flex-direction: column; gap: 15px;">
          <div style="width: 100%; height: 180px; background: #1a1a3a; border: 1px solid #ff00ff; overflow: hidden; display: flex; align-items: center; justify-content: center;">
            <img v-if="t.url" :src="t.url" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <h2 style="color: #ff00ff; font-size: 20px; font-weight: bold; letter-spacing: 1px; margin: 0; text-transform: uppercase;">{{ t.naziv }}</h2>
          <div style="color: #fff; font-size: 13px; line-height: 2; font-weight: bold;">
            <p style="margin: 0;"><span style="color: #ff00ff;">DATUM : </span>{{ t.datum }}</p>
            <p style="margin: 0;"><span style="color: #ff00ff;">VRIJEME : </span>{{ t.vrijeme }}</p>
            <p style="margin: 0;"><span style="color: #ff00ff;">MAX IGRAČA : </span>{{ t.maxIgraca }}</p>
            <p style="margin: 0;"><span style="color: #ff00ff;">PRIJAVLJENI : </span>{{ t.prijavljeni?.length || 0 }} / {{ t.maxIgraca }}</p>
          </div>
          <div v-if="t.nagrade && t.nagrade.length > 0">
            <p style="color: #00ffff; font-weight: bold; font-size: 13px; margin-bottom: 5px;">NAGRADE :</p>
            <ol style="margin: 0; padding-left: 20px; color: #fff; font-size: 13px;">
              <li v-for="(nagrada, index) in t.nagrade" :key="index" style="margin: 3px 0; font-weight: bold;">{{ nagrada }}</li>
            </ol>
          </div>
          <button
            style="width: 100%; padding: 12px; background: linear-gradient(90deg, #00ffff, #ff00ff); color: #000; border: none; font-size: 13px; font-weight: bold; cursor: pointer; letter-spacing: 1px; margin-top: auto;"
            @mouseover="$event.target.style.opacity = '0.8'"
            @mouseout="$event.target.style.opacity = '1'"
            @click="prijaviSeNaTurnir(t._id)">
            PRIJAVI SE NA TURNIR
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

