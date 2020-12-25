<template>
  <div class="container">
    <section class="py-1 mb-3 text-center">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="@/assets/images/callout.svg" alt="callout" class="w-50" />
          <h2 class="mt-3">随心写作，自由表达</h2>
          <div class="mt-3">
            <router-link to="/post/add" class="btn btn-primary my-2">开始写文章</router-link>
          </div>
        </div>
      </div>
    </section>
    <div class="mb-3">
      <h4 class="text-center">发现精彩</h4>
    </div>
    <Loading v-if="isLoading" />
    <template v-else>
      <div class="scroll-view" ref="scrollView">
        <CategoryList :categoryList="categoryList" />
      </div>
      <Loading v-if="isLoadMore" :coverScreen="false" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import Loading from '@/components/Loading.vue';
import CategoryList from '@/components/CategoryList.vue';
import { getCategoryList } from '@/apis/category';
import { Category } from '@/apis/category/types';

export default defineComponent({
  name: 'Home',
  components: {
    Loading,
    CategoryList,
  },
  setup() {
    // data ========================================================================================================================
    const isLoading = ref(true);

    const isLoadMore = ref(false);

    const categoryList = ref<Category[]>([]);

    const scrollView = ref<HTMLDivElement>(null);

    // method ========================================================================================================================
    // 获取分类数据
    const iniData = async () => {
      try {
        isLoading.value = true;
        const result = await getCategoryList();
        categoryList.value = result.data;
        isLoading.value = false;
      } catch (error) {
        console.error('获取 api 数据失败');
        console.error(error);
      }
    };

    const loadMoreData = async () => {
      if (isLoadMore.value) {
        return;
      }

      isLoadMore.value = true;

      setTimeout(async () => {
        const result = await getCategoryList();
        categoryList.value = categoryList.value.concat(result.data);
        isLoadMore.value = false;
      }, 500);
    };

    const handleScroll = (): void => {
      if (scrollView.value) {
        if (scrollView.value.getBoundingClientRect().bottom < window.innerHeight + 300) {
          loadMoreData();
        }
      }
    };

    // lifecycle ========================================================================================================================
    onMounted(() => {
      iniData();
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    // template data ========================================================================================================================
    return {
      isLoading,
      categoryList,
      scrollView,
      isLoadMore,
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
