<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>New task</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="dismissModal()">Close</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <form @submit="submit">
      <ion-item>
        <ion-label position="floating">Title</ion-label>
        <ion-input v-model="title" :autofocus="true"></ion-input>
      </ion-item>
      <ion-row>
        <ion-col size="3">
          <ion-button @click="remove" color="danger" fill="solid" v-if="!add_new">
            <ion-icon :md="trashOutline" slot="icon-only" />
          </ion-button>
        </ion-col>
        <ion-col size="9">
          <ion-button type="submit" color="success" fill="solid" expand="block">
            Save
          </ion-button>
        </ion-col>
      </ion-row>
    </form>
  </ion-content>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonInput,
  IonRow,
  IonCol,
  IonLabel,
  popoverController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { trashOutline } from "ionicons/icons";
export default defineComponent({
  name: "Modal",
  props: ["parent_id", "task"],
  data() {
    return {
      task_id: null,
      title: "",
      trashOutline,
    };
  },
  computed:{
    add_new(){
      return !this.task_id;
    },
  },
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonIcon,
    IonInput,
    IonRow,
    IonLabel,
    IonCol,
  },
  methods: {
    dismissModal() {
      popoverController.dismiss();
    },
    submit(e) {
      e.preventDefault();
      this.$store.commit("addTask", {
        title: this.title,
        parent_id: this.parent_id,
        id: this.task_id,
      });
      popoverController.dismiss();
      this.title = "";
    },
    remove() {
      this.$store.commit("removeTask", this.task_id);
      popoverController.dismiss();
    },
  },
  watch: {
    task: {
      immediate: true,
      handler(task) {
        
        console.info("task", task);
        if (task) {
          this.title = task.title;
          this.task_id = task.id;
        } else this.task_id = null;
      },
    },
  },
});
</script>