<template>
  <GlobalHeader :user="user" />
  <router-view />
  <GlobalFooter />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalHeader from '@/components/GlobalHeader.vue';
import GlobalFooter from '@/components/GlobalFooter.vue';
import { useStore } from '@/store';
import { getCategoryList } from '@/apis/category';
import { ContentActions } from '@/store/modules/content/types';
import { getPostList } from './apis/post';

export default defineComponent({
  components: {
    GlobalHeader,
    GlobalFooter,
  },
  name: 'App',
  setup() {
    // data ========================================================================================================================
    const store = useStore();

    // computed ========================================================================================================================
    const user = computed(() => store.state.account.user);

    // lifecycle ========================================================================================================================
    onMounted(async () => {
      try {
        const results = await Promise.all([await getCategoryList(), await getPostList()]);

        store.dispatch(ContentActions.UPDATE_CATEGORY_LIST, results[0]);
        store.dispatch(ContentActions.UPDATE_POST_LIST, results[1]);
      } catch (error) {
        console.error('获取 api 数据失败');
        console.error(error);
      }
    });

    // template data ========================================================================================================================
    return {
      user,
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
</style>
