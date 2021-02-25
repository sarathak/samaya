<template>
  <ion-card id="container">
    <div>
      <div class="timer-container">
        <div class="timer">
          <span class="time-count">{{minute}}:{{second}}</span>
          <button class="play-pause">
            <ion-icon name="play-outline" :md="play" />
          </button>
        </div>
      </div>
    </div>
  </ion-card>
</template>

<script lang="js">
import {
    IonIcon
} from "@ionic/vue";
import { play } from 'ionicons/icons';

export default {
  name: "Folder",
  data(){
      return {
          play,
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
          this.$nextTick(()=>{
              this.time --;
          })
      }, 100);
  },
  components: {
      IonIcon
  },
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