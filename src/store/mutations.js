
export default {
    updateTime(state,time){
        state.timer = time;
    },
    stopTimer(state){
        state.timer_running = false;
    },
    startTimer(state){
        state.timer_running = true;
    },        
    updateMode(state,timer_mode){
        state.timer_mode = timer_mode;
        if(timer_mode == 'timer')
        state.timer = 25*60;
        else if(timer_mode == 'brake_short')
        state.timer = 5*60;     
        else if(timer_mode == 'brake_long')
        state.timer = 15*60;                
    },    
    moveTasks(state,task_tree){
        const tasks = [];
        task_tree.forEach(x=>x.parent_id = null);
        while(task_tree.length){
            const task = task_tree.shift();
            if(task.children ){
                while(task.children.length ){
                    const child_task = task.children.shift();
                    child_task.parent_id = task.id;
                    task_tree.push(child_task)
                }
            }
            task.children =[];
            tasks.push(task);
        }
        state.tasks = tasks;
    },
    addTask(state,{title}){
        const {tasks} = state;
        let id = tasks.reduce((prev,task)=>{
            return Math.max(prev,task.id);
        },0);
        const task = {id:id+1,title};
        tasks.push(task);

    }
}