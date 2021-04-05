import { playTimerComplete } from "@/libs/audio";
// let worker ;

export default {
    startTimer(store,) {
        store.commit('startTimer',);
       
        // worker.onmessage = function() {
        //     store.dispatch('updateTime');
        // };
        // timer = setInterval(() => store.dispatch('updateTime'), 1000)
    },
    timeTick({state,dispatch}){
        if(state.timer_running)
        dispatch('updateTime');
    },
    updateTime(store) {
        const { timer } = store.state;// todo:time 0
        if (timer == 0) {
            let { pomodoros, timer_mode } = store.state;// todo:time 0
            pomodoros += 1;
            let mode = timer_mode == 'timer' ? pomodoros % 4 == 0 ? 'brake_long' : 'brake_short' : 'timer';
            if (timer_mode == 'timer') {
                store.commit('pomodoroComplete');
            }
            store.dispatch('updateMode', mode);
            playTimerComplete();
        }
        else
            store.commit('updateTime', timer - 1);
    },
    stopTimer(store,) {
        store.commit('stopTimer',);
    },
    updateMode(store, timer_mode) {
        store.dispatch('stopTimer');
        store.commit('updateMode', timer_mode);

    },

}