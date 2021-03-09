<template>
  <div>
    <Tree :value="task_tree" @input="input">
      <template v-slot:default="{ node, tree, path }">
        <span>
          <b @click="tree.toggleFold(node, path)">
            {{ node.$folded ? "+" : "-" }}
          </b>
          {{ node.title }}
        </span>
      </template>
    </Tree>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button   @click="taskEdit()">
        <ion-icon :md="addOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <pre>{{task_tree}}</pre>
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
import { mapState, mapGetters } from "vuex";
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
       
        },
      });
      return modal.present();
    },
  },
};
</script>

<style scoped>
</style>