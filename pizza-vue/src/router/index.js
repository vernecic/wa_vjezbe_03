import { createRouter, createWebHistory } from 'vue-router'
import PizzaPage from '@/views/PizzaPage.vue'
import HomePage from '@/views/HomePage.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
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
    {
      path: '/prijava',
      component: Login,
    },
    {
      path: '/registracija',
      component: Register,
    },
  ],
})

export default router
