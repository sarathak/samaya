import { createStore } from 'vuex'
import actions from './actions';
import mutations from './mutations';

const createNewStore = function () {
    const store = new createStore({
        state: {
            timer: 25*60,
            timer_mode:'timer',
            timer_running:false,
        },
        actions,
        mutations,
    })
    return store;
}
export default createNewStore;