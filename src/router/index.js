import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '',
    component: () => import ('../views/Index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
