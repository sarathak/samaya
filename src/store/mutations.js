
export default {
    updateTime(state, time) {
        state.timer = time;
        // if(time == 0){}
    },
    stopTimer(state) {
        state.timer_running = false;
    },
    startTimer(state) {
        state.timer_running = true;
    },
    updateMode(state, timer_mode) {
        state.timer_mode = timer_mode;
        if (timer_mode == 'timer')
            state.timer = 25 * 60;
        else if (timer_mode == 'brake_short')
            state.timer = 5 * 60;
        else if (timer_mode == 'brake_long')
            state.timer = 15 * 60;
    },
    pomodoroComplete(state){
        state.pomodoros +=1;
    },
    moveTasks(state, task_tree) {
        const tasks = [];
        task_tree.forEach(x => x.parent_id = null);
        while (task_tree.length) {
            const task = task_tree.shift();
            if (task.children) {
                while (task.children.length) {
                    const child_task = task.children.shift();
                    child_task.parent_id = task.id;
                    task_tree.push(child_task)
                }
            }
            task.children = [];
            tasks.push(task);
        }
        state.tasks = tasks;
    },
    addTask(state, { title,parent_id,id }) {
        const  tasks = [...state.tasks];
        if(id) { // edit
            const index = tasks.findIndex(x=>x.id== id);
            tasks[index] = {...tasks[index],title}
            
        }else{ // add
            let max_id = tasks.reduce((prev, task) => {
                return Math.max(prev, task.id);
            }, 0);
            const task = { id: max_id + 1, title,parent_id };
            tasks.push(task);
        }
        state.tasks = tasks;


    },
    removeTask(state, id) {
        const { tasks } = state;
        if (tasks.find(x => x.parent_id == id))
            return console.info("Please delete all sub task and try agin")
        state.tasks = tasks.filter(x => x.id != id);

    }
}