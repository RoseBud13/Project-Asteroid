import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/index.vue';

const history = createWebHistory(import.meta.env.BASE_URL);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue')
  }
];

const router = createRouter({ history, routes });

export default router;
