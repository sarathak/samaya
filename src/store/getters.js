export default {
    task_tree(state){
        const tasks = JSON.parse(JSON.stringify(state.tasks));
        const tree_map = {};
        for(let task of tasks){
            task.children  = [];
            tree_map[task.id] = task;
        }
        for(let task of tasks){
            if(task.parent_id){
                tree_map[task.parent_id].children.push(task);
            }
        }
        const task_tree = tasks.filter(x=>x.parent_id == null);

        return task_tree;
    }
}