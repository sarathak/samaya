import { createStore } from 'vuex'
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import dbPlugin from './plugins/db';

const createNewStore = function () {
    const store = new createStore({
        state: {
            timer: 25*60,
            timer_mode:'timer',
            timer_running:false,
            pomodoros :0,
            tasks:[
                // {
                //     title: "Apples",
                //     height: 69,
                //     background: "#eb5757",
                //     id: 1,                    
                //   },
                //   {
                //     title: "Bananas",
                //     height: 63,
                //     background: "#eb5757",
                //     id: 2,
                //   },
                //   {
                //     title: "Cherries",
                //     height: 87,
                //     background: "#eb5757",
                //     id: 3,
                //     parent_id:2
                //   },
            ]
        },
        actions,
        mutations,
        getters,
        plugins:[dbPlugin,]
    })
    return store;
}
export default createNewStore;