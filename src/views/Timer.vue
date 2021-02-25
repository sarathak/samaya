<template>
  <ion-card id="container">
    <div>
      <div class="timer-container">
        <div class="timer" @click="toggleRun()">
          <span class="time-count">{{ minute }}:{{ second }}</span>
          <span class="play-pause">
            <ion-icon name="play-outline" :md="running?pause:play" />
          </span>
        </div>
      </div>
    </div>
  </ion-card>
</template>

<script lang="js">
import {
    IonIcon,
    IonCard,
} from "@ionic/vue";
import { 
  play,
  pause 
} from 'ionicons/icons';

export default {
  name: "Folder",
  data(){
      return {
          running:false,
          play,
          pause,
          time:25*60,
      }
  },
  computed:{
      minute(){
          return ('0'+~~(this.time/60)).slice(-2)
      },
      second(){
          return ('0'+(this.time%60)).slice(-2)
      },      
  },
  mounted(){
      this.tm = setInterval(() => {
          if(!this.running)
          return;

          this.$nextTick(()=>{
              this.time --;
          })
      }, 1000);
  },
  components: {
      IonIcon,
      IonCard
  },
  methods:{
    toggleRun(){
      this.running = !this.running;

    }
  }
};
</script>

<style scoped>
.timer-container {
  display: flex;
  justify-content: center;
  padding: 10px;
}
.timer {
  border: 2px solid var(--ion-color-primary);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.timer .time-count {
  font-size: 36px;
  font-weight: bold;
}
.play-pause {
  position: absolute;
  bottom: 20px;
  font-size: 30px;
  background: none;
}
.play-pause ion-icon {
  color: var(--ion-color-primary);
}
</style>