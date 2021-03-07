<template>
  <div>
    <ion-list class="task-container">
      <ion-reorder-group :disabled="false" @ionItemReorder="doReorder($event)">
        <ion-item v-for="task in tasks" :key="task.id">
          <ion-label>
            {{ task.value }}
          </ion-label>
          <ion-reorder slot="end"></ion-reorder>
        </ion-item>
      </ion-reorder-group>
      <ion-item>
        <ion-label>
          <ion-button
            @click="taskEdit()"
            color="success"
            shape="round"
            fill="outline"
          >
            <ion-icon slot="start" :md="addOutline" />
            Add task
          </ion-button>
        </ion-label>
      </ion-item>
    </ion-list>
    <Tree :value="treeData">
      <template v-slot:default="{ node, tree, path }">
        <span>
          <b @click="tree.toggleFold(node, path)">
            {{ node.$folded ? "+" : "-" }}
          </b>
          {{ node.text }}
        </span>
      </template>
    </Tree>
  </div>
</template>

<script>
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonReorder,
  IonReorderGroup,
  IonList,
  IonButton,
  popoverController,
} from "@ionic/vue";
import { addOutline } from "ionicons/icons";
import { mapState } from "vuex";
import TaskEdit from "./TaskEdit";
import {
  Tree,
  Fold,
  Draggable,
} from "he-tree-vue";
export default {
  data() {
    return {
      addOutline,
      treeData: [
        { text: "node 1" },
        { text: "node 2", children: [{ text: "node 2-1" }] },
      ],
    };
  },
  computed: mapState({
    tasks: "tasks",
  }),

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
    IonButton,
    Tree: Tree.mixPlugins([Draggable, Fold]),
  },
  methods: {
    doReorder(event) {
      console.info(event);
      console.log(
        "Dragged from index",
        event.detail.from,
        "to",
        event.detail.to
      );
      this.$store.dispatch("moveTask", {
        from: event.detail.from,
        to: event.detail.to,
      });

      event.detail.complete();
    },
    async taskEdit() {
      const modal = await popoverController.create({
        component: TaskEdit,
        cssClass: "my-custom-class",
        componentProps: {
          title: "New Title",
        },
      });
      return modal.present();
    },
  },
};
</script>

<style scoped>
</style>