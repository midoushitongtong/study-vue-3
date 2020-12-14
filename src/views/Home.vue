<template>
  <div class="container">
    <section class="py-1 mb-3 text-center">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="@/assets/images/callout.svg" alt="callout" class="w-50" />
          <h2 class="mt-3">随心写作，自由表达</h2>
          <div class="mt-3">
            <RouterLink to="/post/add" class="btn btn-primary my-2">开始写文章</RouterLink>
          </div>
        </div>
      </div>
    </section>
    <div class="mb-3">
      <h4 class="text-center">发现精彩</h4>
    </div>
    <Loading v-if="isLoading" />
    <CategoryList v-else :categoryList="categoryList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
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

    const categoryList = ref<Category[]>([]);

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

    // lifecycle ========================================================================================================================
    onMounted(() => {
      iniData();
    });

    // template data ========================================================================================================================
    return {
      isLoading,
      categoryList,
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
