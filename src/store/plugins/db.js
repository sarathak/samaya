import Dexie from 'dexie';

export default function dbPlugin(store) {
    const db = new Dexie("samaya");
    db.version(1).stores({
        tasks: "++id"
    });
    db.tasks.toArray().then((tasks)=>{
        store.commit('tasksUpdate',tasks);
    })
    store.subscribe(({ type, payload }) => {
        // console.info('update', type, payload)
        if ( ['addTask','moveTasks'].indexOf(type) >-1) {
            const { tasks } = store.state;
            db.tasks.bulkPut(JSON.parse(JSON.stringify(tasks)));
        }
        else if(type == 'removeTask'){
            const { tasks } = store.state;
            if(tasks.findIndex(x => x.parent_id == payload)==-1){
                db.tasks.delete(payload);
            }
        }
    })

}