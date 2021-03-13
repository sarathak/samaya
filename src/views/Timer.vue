<template>
  <ion-card id="container">
    <div>
      <div class="timer-container">
        <div class="timer" @click="toggleRun()">
          <span class="time-count">{{ minute }}:{{ second }}</span>
          <span class="play-pause">
            <ion-icon name="play-outline" :md="timer_running ? pause : play" />
          </span>
        </div>
        <div class="timer-control">
          <ion-button
            @click="updateMode('timer')"
            color="primary"
            shape="round"
            expand="block"
            :fill="timer_mode == 'timer' ? 'solid' : 'outline'"
            >Pomodoro</ion-button>
          <ion-button
            @click="updateMode('brake_short')"
            color="secondary"
            shape="round"
            expand="block"
            :fill="timer_mode == 'brake_short' ? 'solid' : 'outline'"
            >Short brake</ion-button>       
          <ion-button
            @click="updateMode('brake_long')"
            color="tertiary"
            shape="round"
            expand="block"
            :fill="timer_mode == 'brake_long' ? 'solid' : 'outline'"
            >Long brake</ion-button>  
          
        </div>
      </div>
    </div>
  </ion-card>
</template>

<script>
import { IonIcon, IonCard } from "@ionic/vue";
import { play, pause } from "ionicons/icons";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      play,
      pause,
    };
  },
  computed: {
    timer_mode: {
      get() {
        return this.$store.state.timer_mode;
      },
      set(value) {
        this.$store.dispatch("updateMode", value);
      },
    },
    ...mapState({
      timer: "timer",
      timer_running: "timer_running",
      minute() {
        return ("0" + ~~(this.timer / 60)).slice(-2);
      },
      second() {
        return ("0" + (this.timer % 60)).slice(-2);
      },
    }),
  },
  mounted() {
    // this.tm = setInterval(() => {
    //     if(!this.running)
    //     return;
    //     this.$nextTick(()=>{
    //         this.time --;
    //     })
    // }, 1000);
  },
  components: {
    IonIcon,
    IonCard,
  },
  methods: {
    ...mapActions(['updateMode']),
    toggleRun() {
      // this.running = !this.running;
      if (!this.timer_running) this.$store.dispatch("startTimer");
      else this.$store.dispatch("stopTimer");
    },
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
.timer-control {
  position: absolute;
  right: 0;
  height: 100%;
  top: 0;
}
.timer-control .radio {
  margin-bottom: 5px;
}
.radio label {
  padding: 0;
}
.radio input {
  display: none;
}
.radio input:checked + span {
  background: #2dd36f;
}
.radio span {
  padding: 5px 15px;
  background: #ffc409;
  color: #fff;
  display: block;
}
</style>