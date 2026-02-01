<template>
  <div style="margin: 0; padding: 0; background: #0a0e27; color: #00ffff; font-family: Arial, sans-serif; min-height: 100vh;">
    <header style="padding: 10px 30px; border-bottom: 2px solid #00ffff;">
      <nav style="display: flex; justify-content: center; gap: 30px; margin-bottom: 10px; flex-wrap: wrap;">
        <a href="#" style="color: #00ffff; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 1px; transition: all 0.3s ease; cursor: pointer;" @mouseover="$event.target.style.color = '#ff00ff'; $event.target.style.textShadow = '0 0 10px #ff00ff'" @mouseout="$event.target.style.color = '#00ffff'; $event.target.style.textShadow = 'none'">
          POČETNA STRANICA
        </a>
        <a href="#" style="color: #00ffff; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 1px; transition: all 0.3s ease; cursor: pointer;" @mouseover="$event.target.style.color = '#ff00ff'; $event.target.style.textShadow = '0 0 10px #ff00ff'" @mouseout="$event.target.style.color = '#00ffff'; $event.target.style.textShadow = 'none'">
          SOCIAL GAMES
        </a>
        <a href="#" style="color: #00ffff; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 1px; transition: all 0.3s ease; cursor: pointer;" @mouseover="$event.target.style.color = '#ff00ff'; $event.target.style.textShadow = '0 0 10px #ff00ff'" @mouseout="$event.target.style.color = '#00ffff'; $event.target.style.textShadow = 'none'">
          TURNIRI
        </a>
        <div style="text-align: center; margin: 5px 0 30px 0;">
            <img :src="logo" alt="Game Arenas" style="display: block; margin: 0 auto; max-width: 500px; width: 100%; height: auto;">
        </div>

        <a href="#" style="color: #00ffff; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 1px; transition: all 0.3s ease; cursor: pointer;" @mouseover="$event.target.style.color = '#ff00ff'; $event.target.style.textShadow = '0 0 10px #ff00ff'" @mouseout="$event.target.style.color = '#00ffff'; $event.target.style.textShadow = 'none'">
          GAMING TURNIRI
        </a>
        <a href="#" style="color: #00ffff; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 1px; transition: all 0.3s ease; cursor: pointer;" @mouseover="$event.target.style.color = '#ff00ff'; $event.target.style.textShadow = '0 0 10px #ff00ff'" @mouseout="$event.target.style.color = '#00ffff'; $event.target.style.textShadow = 'none'">
          SCOREBOARD
        </a>
        <a href="#" style="color: #ff00ff; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 1px; transition: all 0.3s ease; cursor: pointer;" @mouseover="$event.target.style.textShadow = '0 0 10px #ff00ff'" @mouseout="$event.target.style.textShadow = 'none'">
          PRIJAVI SE
        </a>
      </nav>

    </header>

    
    <main style="display: flex; position: relative; padding: 40px; gap: 40px;">
     
      <div style="writing-mode: vertical-rl; text-orientation: mixed; font-size: 36px; font-weight: 900; color: #ff00ff; letter-spacing: 2px; display: flex; align-items: center; text-shadow: 0 0 15px rgba(255, 0, 255, 0.6); transform: scaleY(-1);">
        END YOUR GAME
      </div>

      
      <section style="flex: 1;">
        
        <div style="margin-bottom: 50px;">
          <h2 style="font-size: 32px; color: #00ffff; font-weight: 900; margin-bottom: 15px; letter-spacing: 2px; text-shadow: 0 0 10px #00ffff;">
            NOVOSTI
          </h2>
          <p style="background-color: #260c4f ;color: #fff; font-size: 14px; line-height: 1.6; letter-spacing: 0.5px;">
            SOFTVER "GAMEBOOST AI" ANALIZIRA PERFORMANSE PC-A I AUTOMATSKI OPTIMIZIRA POSTAVKE IGARA ZA NAJBOLJU GRAFIKU, BRZINU I GLATKOĆU.
          </p>
        </div>

        
        <div style="margin-top: 40px;">
          <h2 style="font-size: 32px; color: #00ffff; font-weight: 900; margin-bottom: 15px; letter-spacing: 2px; text-shadow: 0 0 10px #00ffff;">
            LIVE TURNIRI
          </h2>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 30px; margin-top: 20px;">
            <div v-for="tournament in tournaments" :key="tournament.id" style="display: flex; gap: 20px; background: rgba(255, 0, 255, 0.05); padding: 20px; border: 2px solid rgba(0, 255, 255, 0.3); border-radius: 5px; transition: all 0.3s ease; cursor: pointer;" @mouseover="$event.currentTarget.style.borderColor = '#00ffff'; $event.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.4)'; $event.currentTarget.style.background = 'rgba(255, 0, 255, 0.1)'" @mouseout="$event.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.3)'; $event.currentTarget.style.boxShadow = 'none'; $event.currentTarget.style.background = 'rgba(255, 0, 255, 0.05)'">
              
              <div style="width: 200px; height: 150px; background-size: cover; background-position: center; border-radius: 3px; flex-shrink: 0; border: 2px solid #00ffff;"
               :style="{ backgroundImage: `url(${tournament.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }"></div>  

              <div style="flex: 1; display: flex; flex-direction: column;">
                <h3 style="color: #00ffff; font-size: 18px; font-weight: bold; margin-bottom: 10px; text-transform: uppercase;">
                  {{ tournament.name }}
                </h3>

                <div style="color: #fff; font-size: 13px; margin-bottom: 15px; line-height: 1.8; font-weight: bold;">
                  <p style="margin: 5px 0;">
                    <span style="color: #00ffff;">IGRAČI</span> {{ tournament.players }}
                  </p>
                  <p style="margin: 5px 0;">
                    <span style="color: #00ffff;">PREOSTALO VREMENA</span> {{formatTime(tournament.endTime) }}
                  </p>
                </div>

                <div style="color: #fff; font-size: 13px;">
                  <p style="color: #fff; margin-bottom: 8px; font-weight: bold;">NAGRADE :</p>
                  <ol style="margin-left: 20px; color: #fff;">
                    <li v-for="(prize, index) in tournament.prizes" :key="index" style="margin: 3px 0; font-weight: bold;">
                      {{ prize }}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style="writing-mode: vertical-rl; text-orientation: mixed; font-size: 36px; font-weight: 900; color: #ff00ff; letter-spacing: 2px; display: flex; align-items: center; text-shadow: 0 0 15px rgba(255, 0, 255, 0.6);">
        LEAVE YOUR MARK
      </div>
    </main>
  </div>
</template>

<script>

import BubbleBuddies from '@/assets/BubbleBuddies.png'
import GameArenasLogo from '@/assets/gamearenas_naslov1.png'


export default {
  name: 'GameArenas',
  data() {
    return {
    logo: GameArenasLogo,
      tournaments: [
        {
          id: 1,
          name: 'Bubble Buddies',
          image: BubbleBuddies,
          players: '32/32',
          prizes: [
            '1.MJESTO 500 BODOVA',
            '2.MJESTO 250 BODOVA',
            '3.MJESTO 100 BODOVA'
          ]
        },
        {
          id: 2,
          name: 'Epic Quest',
          image: 'https://via.placeholder.com/200x150',
          players: '16/16',
          prizes: [
            '1.MJESTO 400 BODOVA',
            '2.MJESTO 200 BODOVA',
            '3.MJESTO 80 BODOVA'
          ]
        }
      ]
    }
  }, 

}
</script>

