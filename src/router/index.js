import { createRouter, createWebHistory } from 'vue-router'
import PizzaPage from '@/views/PizzaPage.vue'
import HomePage from '@/views/HomePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pizze/:naziv',
      component: PizzaPage,
    },
    {
      path: '/',
      component: HomePage,
    },
  ],
})

export default router
