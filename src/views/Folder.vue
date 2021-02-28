<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <Timer />
      <Tasks />
      <ion-reorder-group :disabled="false">
        <!-- Default reorder icon, start aligned items -->
        <ion-item>
          <ion-reorder slot="start"></ion-reorder>
          <ion-label> Item 3 </ion-label>
        </ion-item>
        <ion-item>
          <ion-reorder slot="start"></ion-reorder>
          <ion-label> Item 4 </ion-label>
        </ion-item>
      </ion-reorder-group>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonReorder,
  IonReorderGroup,
  // IonCard,
  IonLabel,
} from "@ionic/vue";
import Timer from './Timer';
import Tasks from './Tasks';

export default {
  name: "Folder",
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonReorder,
    IonReorderGroup,
    IonItem,
    IonLabel,
    Timer,
    Tasks,
  },
};
</script>

<style scoped>
.timer-container{
  display: flex;
  justify-content: center;
  padding: 10px;
}
.timer {
  border: 2px solid var(--ion-color-primary);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.timer .time-count {
  font-size: 36px;
  font-weight: bold;
}
</style>