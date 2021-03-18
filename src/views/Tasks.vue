<template>
  <div>
    <ion-card>
      <div class="task-list">
        <Tree :value="task_tree" @input="input">
          <template v-slot:default="{ node }">
            <div class="task">
              <div class="task-left">
                <!--
                <button
                  fill="none"
                  shape="round"
                  class="toggle-open"
                  v-if="node.children.length"
                  @click="tree.toggleFold(node, path)"
                >
                  <ion-icon
                    :md="
                      node.$folded
                        ? chevronDownCircleOutline
                        : chevronForwardCircleOutline
                    "
                  />
                </button> -->
                <ion-checkbox
                  v-if="!node.children.length"
                  class="todo-check"
                  color="success"
                  :checked="node.completed"
                  @update:modelValue="toggleCompleted($event, node.id)"
                ></ion-checkbox>
              </div>

              <div class="task-center">
                <ion-text color="dark">
                  <h4>{{ node.title }}</h4>
                </ion-text>
              </div>

              <div class="task-right">
                <ion-buttons slot="primary">
                  <ion-button color="danger" @click="taskEdit(node)">
                    <ion-icon
                      slot="icon-only"
                      :md="ellipsisHorizontal"
                    ></ion-icon>
                  </ion-button>

                  <!--<ion-button
                    @click="taskEdit(node)"
                    color="primary"
                    fill="solid"
                  >
                    <ion-icon slot="icon-only" :md="createOutline" />
                  </ion-button>
                  <ion-button
                    @click="taskAdd(node.id)"
                    color="primary"
                    fill="solid"
                  >
                    <ion-icon slot="icon-only" :md="addOutline" />
                  </ion-button>-->
                </ion-buttons>
              </div>
            </div>
          </template>
        </Tree>
      </div>
    </ion-card>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="taskAdd()">
        <ion-icon :md="addOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </div>
</template>

<script>
import {
  IonIcon,
  IonButton,
  IonCard,
  IonButtons,
  IonCheckbox,
  popoverController,
} from "@ionic/vue";
import {
  addOutline,
  createOutline,
  chevronForwardCircleOutline,
  chevronDownCircleOutline,
  ellipsisHorizontal,
} from "ionicons/icons";
import { mapGetters } from "vuex";
import TaskEdit from "./TaskEdit";
import {
  Tree,
  // Fold,
  Draggable,
  getPureTreeData,
} from "he-tree-vue";
export default {
  data() {
    return {
      addOutline,
      createOutline,
      chevronForwardCircleOutline,
      chevronDownCircleOutline,
      ellipsisHorizontal,
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
    IonCard,
    IonIcon,
    IonButton,
    IonButtons,
    IonCheckbox,
    Tree: Tree.mixPlugins([Draggable]),
  },
  methods: {
    input(data) {
      this.$store.commit("moveTasks", getPureTreeData(data));
    },
    toggleCompleted(completed, task_id) {
      this.$store.commit("addTask", {
        completed,
        id: task_id,
      });
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
.task-left {
}
.toggle-open {
  font-size: 35px;
  background: none;
  color: var(--ion-color-secondary);
}
.toggle-open:active {
  background: var(--ion-color-light);
}

.todo-check {
  width: 35px;
  height: 35px;
}
.task-list {
  background: #f0f4fd;
  padding: 10px;
}
.task {
  display: flex;
}
.task-center {
  flex-grow: 1;
  padding: 0 5px;
}
.task-center h4 {
  margin: 4px 2px;
}
</style>