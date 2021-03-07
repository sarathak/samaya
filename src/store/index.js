import { createStore } from 'vuex'
import actions from './actions';
import mutations from './mutations';

const createNewStore = function () {
    const store = new createStore({
        state: {
            timer: 25*60,
            timer_mode:'timer',
            timer_running:false,
            tasks:[
                {
                    value: "Apples",
                    height: 69,
                    background: "#eb5757",
                    id: 101,
                  },
                  {
                    value: "Bananas",
                    height: 63,
                    background: "#eb5757",
                    id: 102,
                  },
                  {
                    value: "Cherries",
                    height: 87,
                    background: "#eb5757",
                    id: 103,
                  },
            ]
        },
        actions,
        mutations,
    })
    return store;
}
export default createNewStore;