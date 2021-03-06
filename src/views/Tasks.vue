<template>
  <ion-list class="task-container">

    <ion-reorder-group  v-for="group in groups" :key="group.name" :disabled="false" @ionItemReorder="doReorder($event,group)">
      <ion-list-header>{{group.name}}</ion-list-header>

      <ion-item v-for="task in group.tasks" :key="task.id">
        <ion-label>
          {{ task.value }}
        </ion-label>
        <ion-reorder slot="end"></ion-reorder>
      </ion-item>
    </ion-reorder-group>


  </ion-list>
</template>

<script>
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonReorder,
  IonReorderGroup,
  IonList,
  IonListHeader,
} from "@ionic/vue";

import { play, pause } from "ionicons/icons";
import { mapState } from "vuex";
const WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const getTasksDate = (date, tasks) => {
  return tasks.filter(
    (x) =>
      x.date.getMonth() == date.getMonth() &&
      x.date.getFullYear() == date.getFullYear() &&
      x.date.getDate() == date.getDate()
  );
};
export default {
  computed: {
    groups() {
      const groups = [];
      for (let i = 0; i < 6; i++) {
        const date = new Date();
        date.setDate(date.getDate()+i)
        groups.push({
          name: WEEKDAYS[date.getDay()],
          tasks: getTasksDate(date,this.tasks),
          date,
        });
      }
      return groups;
    },
  },
  data() {
    let tomorrow = new Date();
    tomorrow.setDate(7);
    return {
      tasks: [
        {
          value: "Apples",
          height: 69,
          background: "#eb5757",
          id: 101,
          date: new Date(),
        },
        {
          value: "Bananas",
          height: 63,
          background: "#eb5757",
          id: 102,
          date: new Date(),
        },
        {
          value: "Cherries",
          height: 87,
          background: "#eb5757",
          id: 103,
          date: new Date(),
        },
        {
          value: "Dragon Fruit",
          height: 71,
          background: "#eb5757",
          id: 104,
          date: new Date(),
        },
        {
          value: "Potatoes",
          height: 58,
          background: "#9b51e1",
          id: 106,
          date: new Date(),
        },
        {
          value: "Broccoli",
          height: 114,
          background: "#9b51e1",
          id: 107,
          date: new Date(),
        },
        {
          value: "Potatoes 2 ",
          height: 58,
          background: "#9b51e1",
          id: 109,
          date: tomorrow,
        },
        {
          value: "Broccoli 2",
          height: 114,
          background: "#9b51e1",
          id: 108,
          date: tomorrow,
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
    IonList,
    IonIcon,
    IonItem,
    IonLabel,
    IonReorder,
    IonReorderGroup,
    IonListHeader,
  },
  methods: {
    doReorder(event,group) {
      console.info(event);
      console.log(
        "Dragged from index",
        event.detail.from,
        "to",
        event.detail.to,
        group.name,
      );
      const [item] = this.tasks.splice(event.detail.from, 1);
      item.date = group.date;
      this.tasks.splice(event.detail.to, 0, item);
      event.detail.complete();
    },
  },
};
</script>

<style scoped>
.task-container {
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