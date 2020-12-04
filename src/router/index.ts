import store from '@/store';
import { AccountActions } from '@/store/modules/account/types';
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

router.beforeEach((to, from, next) => {
  if (to.meta?.requiredLogin && !store.state.account.user.isLogin) {
    // 此路由需要登录才能访问
    next({
      replace: true,
      name: 'Login',
    });

    console.log('此路由需要登录才能访问, 已跳转到登录页面');
  } else if (to.name === 'Login' && store.state.account.user.isLogin) {
    // 如果已登录还继续访问登录页, 跳转到首页
    next({
      replace: true,
      name: 'Home',
    });

    console.log('当前访问登录页面, 但已经登陆了, 已跳转到首页');
  } else {
    next();
  }
});

store.subscribe((item) => {
  if (item.type === AccountActions.UPDATE_USER) {
    if (router.currentRoute.value.meta?.requiredLogin) {
      // 如果退出登录了, 刚好当前停留的页面又需要登录, 跳转到登录页
      router.replace({
        name: 'Login',
      });

      console.log('当前页面需要登录, 已跳转到登录页面');
    }
  }
});

export default router;
