import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue'),
  },
  {
    path: '/category/:id',
    name: 'CategoryDetail',
    component: () => import(/* webpackChunkName: "category-detail" */ '@/views/CategoryDetail.vue'),
  },
  {
    path: '/post/add',
    name: 'CreatePost',
    meta: {
      requiredLogin: true,
    },
    component: () => import(/* webpackChunkName: "create-post" */ '@/views/CreatePost.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
