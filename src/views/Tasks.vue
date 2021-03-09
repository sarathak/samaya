<template>
  <div>
    <ion-list class="task-container">

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
    <pre>
      {{task_tree}}
    </pre>
    <Tree :value="task_tree" @input="input">
      <template v-slot:default="{ node, tree, path }">
        <span>
          <b @click="tree.toggleFold(node, path)">
            {{ node.$folded ? "+" : "-" }}
          </b>
          {{ node.value }}
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
import { mapState,mapGetters } from "vuex";
import TaskEdit from "./TaskEdit";
import { Tree, Fold, Draggable, getPureTreeData } from "he-tree-vue";
export default {
  data() {
    return {
      addOutline,
      treeData: [
        { text: "node 1" },
        { text: "node 3" },
        { text: "node 4" },
        { text: "node 5" },
        { text: "node 2", children: [{ text: "node 2-1" }] },
      ],
    };
  },
  computed: mapGetters({
    task_tree: "task_tree",
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
    input(data) {
      this.$store.commit("moveTasks", getPureTreeData(data));
    },
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