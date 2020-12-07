<template>
  <template v-if="!loading">
    <GlobalHeader :user="user" />
    <router-view />
    <GlobalFooter />
  </template>
  <Loading v-else />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalHeader from '@/components/GlobalHeader.vue';
import GlobalFooter from '@/components/GlobalFooter.vue';
import { useStore } from '@/store';
import { getCategoryList } from '@/apis/category';
import { ContentActions } from '@/store/modules/content/types';
import { getPostList } from './apis/post';
import Loading from './components/Loading.vue';
import { AccountActions } from './store/modules/account/types';
import { getUserInfo } from '@/apis/account';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    GlobalHeader,
    GlobalFooter,
    Loading,
  },
  name: 'App',
  setup() {
    // data ========================================================================================================================
    const store = useStore();

    const router = useRouter();

    const loading = ref(true);

    // computed ========================================================================================================================
    const user = computed(() => store.state.account.user);

    // lifecycle ========================================================================================================================
    onMounted(async () => {
      try {
        // 获取分类数据和文章数据
        const results = await Promise.all([await getCategoryList(), await getPostList()]);
        store.dispatch(ContentActions.UPDATE_CATEGORY_LIST, results[0].data);
        store.dispatch(ContentActions.UPDATE_POST_LIST, results[1].data);

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          try {
            // 获取登陆的用户数据
            const userInfo = await getUserInfo();
            store.dispatch(AccountActions.UPDATE_USER, {
              isLogin: true,
              categoryId: userInfo.data.categoryId,
              name: userInfo.data.name,
            });
          } catch (error) {
            // 登陆状态已失效
            localStorage.removeItem('accessToken');
            console.error('获取 api 数据失败');
            console.error(error);
          }
        }

        loading.value = false;

        // 设置路由守卫
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

        // 订阅 vuex
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
      } catch (error) {
        console.error('获取 api 数据失败');
        console.error(error);
      }
    });

    // template data ========================================================================================================================
    return {
      user,
      loading,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.loading {
  width: 100vw;
  height: 100vh;
}
</style>
