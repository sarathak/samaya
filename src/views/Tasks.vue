<template>
  <div>
    <SlickList
      v-model:list="task_cols"
      axis="x"
      class="task-col-container"
      group="cols"
      use-drag-handle
      useWindowAsScrollContainer
    >
      <SlickItem
        v-for="(col, index) in task_cols"
        :key="index"
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
</template>

<script>
import { SlickList, SlickItem } from "vue-slicksort";
import DragHandle from './lib/DragHandle.vue';

import { play, pause } from "ionicons/icons";
import { mapState } from "vuex";

export default {
  data() {
    return {
      task_cols: [
        {
          name:'todo',
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
          name:'completed',
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
.task-col-container {
  display: flex;
  align-items: start;
}
.task-col {
  width: 400px;
  margin: 10px;
  padding: 10px;
  background: #eee;
  border-radius: 20px;
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
}
</style>