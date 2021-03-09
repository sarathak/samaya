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
          <ion-button color="danger" fill="solid">
            <ion-icon :md="trashOutline" />
          </ion-button>
        </ion-col>
        <ion-col size="9">
          <ion-button type="submit" color="success" fill="solid" expand="block">
            Add task
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
  popoverController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { trashOutline } from "ionicons/icons";
export default defineComponent({
  name: "Modal",
  props: {
    //title: { type: String, default: "Super Modal" },
  },
  data() {
    return {
      title: "",
      trashOutline,
    };
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
  },
  methods: {
    dismissModal() {
      popoverController.dismiss();
    },
    submit(e) {
      e.preventDefault();
      this.$store.commit("addTask", { title: this.title });
      popoverController.dismiss();
      this.title = '';
    },
  },
});
</script>