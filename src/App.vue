<template>
  <template v-if="!loading">
    <GlobalHeader />
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
import { useRoute, useRouter } from 'vue-router';
import { getUserInfo } from './apis/account';
import { AccountActions } from './store/modules/account/types';

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

    const route = useRoute();

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

        // 初始化登陆状态
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

            console.log('获取登陆状态成功');
          } catch (error) {
            // 登陆状态已失效
            localStorage.removeItem('accessToken');
            if (route.meta?.requiredLogin) {
              router.replace({
                name: 'Login',
              });
            }

            // 判断当前页面是否需要登录
            if (route.meta?.requiredLogin) {
              router.replace({
                name: 'Login',
              });
            }

            console.error('登陆状态已失效');
          }
        } else {
          // 判断当前页面是否需要登录
          if (route.meta?.requiredLogin) {
            router.replace({
              name: 'Login',
            });
          }
        }

        // 设置路由守卫
        router.beforeEach(async (to, from, next) => {
          const { user } = store.state.account;
          const { requiredLogin } = to.meta;

          if (requiredLogin) {
            if (user) {
              next();
            } else {
              next({
                name: 'Login',
              });
            }
          } else {
            next();
          }
        });

        loading.value = false;
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
