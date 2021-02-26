let timer = null;
export default {
    startTimer(store,){
        store.commit('startTimer',);
        timer = setInterval(()=>{
            const {timer} = store.state;// todo:time 0
            store.commit('updateTime',timer-1);
        },1000)
    },
    stopTimer(store,){
        clearInterval(timer);
        store.commit('stopTimer',);
    },
    updateMode(store,timer_mode){
        store.dispatch('stopTimer');
        store.commit('updateMode',timer_mode);

    }
}