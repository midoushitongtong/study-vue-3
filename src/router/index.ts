import { getUserInfo } from '@/apis/account';
import store from '@/store';
import { AccountActions } from '@/store/modules/account/types';
import { AppActions } from '@/store/modules/app/types';
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
    name: 'PostAdd',
    meta: {
      requiredLogin: true,
    },
    component: () => import(/* webpackChunkName: "post-operation" */ '@/views/PostOperation.vue'),
  },
  {
    path: '/post/edit/:id',
    name: 'PostEdit',
    meta: {
      requiredLogin: true,
    },
    component: () => import(/* webpackChunkName: "post-operation" */ '@/views/PostOperation.vue'),
  },
  {
    path: '/post/:id',
    name: 'PostShow',
    component: () => import(/* webpackChunkName: "post-show" */ '@/views/PostShow.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 设置路由守卫
router.beforeEach(async (to, from, next) => {
  const accessToken = localStorage.getItem('accessToken');
  const { user } = store.state.account;
  const { initDataComplete } = store.state.app;
  const { requiredLogin } = to.meta;

  if (requiredLogin) {
    if (accessToken) {
      if (user) {
        next();
      } else {
        try {
          // 获取登陆的用户数据
          const userInfo = await getUserInfo();

          store.dispatch(AccountActions.UPDATE_USER, {
            id: userInfo.data.id,
            name: userInfo.data.name,
          });

          console.log('获取登陆状态成功');

          next();
        } catch (error) {
          // 登陆状态已失效
          localStorage.removeItem('accessToken');

          console.error('登陆状态已失效');

          next({
            name: 'Login',
          });
        }
      }
    } else {
      next({
        name: 'Login',
      });
    }
  } else {
    next();
  }

  if (!initDataComplete) {
    store.dispatch(AppActions.UPDATE_INIT_DATA_COMPLETE, true);
  }
});

export default router;
