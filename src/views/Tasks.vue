<template>
  <div>
    <Tree :value="task_tree" @input="input">
      <template v-slot:default="{ node, tree, path }">
        <span>
          <ion-button
            fill="outline"
            v-if="node.children && node.children.length"
            @click="tree.toggleFold(node, path)"
          >
            <ion-icon
              slot="icon-only"
              :md="
                node.$folded
                  ? chevronDownCircleOutline
                  : chevronForwardCircleOutline
              "
            />
          </ion-button>
          {{ node.title }}
          <ion-button @click="taskEdit(node)" color="primary" fill="solid">
            <ion-icon slot="icon-only" :md="createOutline" />
          </ion-button>
          <ion-button @click="taskAdd(node.id)" color="primary" fill="solid">
            <ion-icon slot="icon-only" :md="addOutline" />
          </ion-button>
        </span>
      </template>
    </Tree>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="taskAdd()">
        <ion-icon :md="addOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <pre>{{ task_tree }}</pre>
  </div>
</template>

<script>
import { IonIcon, IonButton, popoverController } from "@ionic/vue";
import {
  addOutline,
  createOutline,
  chevronForwardCircleOutline,
  chevronDownCircleOutline,
} from "ionicons/icons";
import { mapGetters } from "vuex";
import TaskEdit from "./TaskEdit";
import { Tree, Fold, Draggable, getPureTreeData } from "he-tree-vue";
export default {
  data() {
    return {
      addOutline,
      createOutline,
      chevronForwardCircleOutline,
      chevronDownCircleOutline,
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
    IonIcon,
    IonButton,
    Tree: Tree.mixPlugins([Draggable, Fold]),
  },
  methods: {
    input(data) {
      this.$store.commit("moveTasks", getPureTreeData(data));
    },
    async taskEdit(task) {
      const modal = await popoverController.create({
        component: TaskEdit,
        cssClass: "my-custom-class",
        componentProps: {
          task,
        },
      });
      return modal.present();
    },
    async taskAdd(parent_id = null) {
      const modal = await popoverController.create({
        component: TaskEdit,
        cssClass: "my-custom-class",
        componentProps: {
          parent_id,
        },
      });
      return modal.present();
    },
  },
};
</script>

<style scoped>
</style>