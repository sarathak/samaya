<template>
<div class="task-container">
  <div :style="'width:'+(task_cols.length*200)+'px'">
    <SlickList
      v-model:list="task_cols"
      class="task-col-container"
            axis="x"
      lock-axis="x"
      use-drag-handle
      useWindowAsScrollContainer
    >
      <SlickItem
        v-for="(col, index) in task_cols"
        :key="col.id"
        :index="index"
        class="task-col"
      >
        <header>
          <DragHandle />
          {{ col.name }}
          ({{ col.items.length }})
        </header>
        <SlickList
          v-model:list="col.items"
          axis="y"
          class="tasks-list"
          group="produce"
        >
          <SlickItem
            v-for="(item, index) in col.items"
            :key="item"
            :index="index"
            :item="item"
            class="task"
          >
            <div class="task-inner">
              {{ item.value }}
            </div>
          </SlickItem>
        </SlickList>
      </SlickItem>
    </SlickList>

    <pre>
        {{ task_cols }}
    </pre>
  </div>
  </div>
</template>

<script>
import { SlickList, SlickItem } from "vue-slicksort";
import DragHandle from "./lib/DragHandle.vue";

import { play, pause } from "ionicons/icons";
import { mapState } from "vuex";

export default {
  data() {
    return {
      task_cols: [
        {
          name: "todo",
          id:1,
          items: [
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
            {
              value: "Dragon Fruit",
              height: 71,
              background: "#eb5757",
              id: 104,
            },
          ],
        },
        {
          name: "completed",
          id:2,
          items: [
            {
              value: "Potatoes",
              height: 58,
              background: "#9b51e1",
              id: 106,
            },
            {
              value: "Broccoli",
              height: 114,
              background: "#9b51e1",
              id: 107,
            },
          ],
        },
        {
          name: "testing",
          id:3,
          items: [
            {
              value: "Potatoes 2 ",
              height: 58,
              background: "#9b51e1",
              id: 109,
            },
            {
              value: "Broccoli 2",
              height: 114,
              background: "#9b51e1",
              id: 108,
            },
          ],
        },
      ],
    };
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
    SlickItem,
    SlickList,
    DragHandle,
  },
  methods: {
    onInsert(event) {
      this.items.splice(event.index, 0, event.data);
    },
  },
};
</script>

<style scoped>
.task-container{
  overflow: auto;
}
.task-col-container {
  display: flex;
  align-items: start;
  border-radius: 20px;
}
.task-col {
  width: 200px;
  padding: 5px;
  background: #eee;
  align-self: stretch;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
}
.task-col > header {
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 1.5rem;
  font-weight: bold;
}

.tasks-list {
  height: 500px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.task {
  height: 30px;
  /* border: 1px solid #000; */
  background: #fff;
  border-radius: 5px;
  padding: 5px 15px;
  margin-bottom: 5px;
}
</style>