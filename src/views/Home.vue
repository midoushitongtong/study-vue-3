<template>
  <div class="container">
    <section class="py-1 mb-3 text-center">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="@/assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="mt-3">随心写作，自由表达</h2>
          <div class="mt-3">
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </div>
        </div>
      </div>
    </section>
    <div class="mb-3">
      <h4 class="text-center">发现精彩</h4>
    </div>
    <CategoryList :categoryList="categoryList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getCategoryList } from '@/apis/category';
import { Category } from '@/apis/category/types';
import CategoryList from '@/components/CategoryList.vue';

export default defineComponent({
  name: 'App',
  components: {
    CategoryList,
  },
  setup() {
    // data ========================================================================================================================
    const categoryList = ref<Category[]>([]);

    // lifecycle ========================================================================================================================
    onMounted(async () => {
      try {
        const result = await getCategoryList();

        categoryList.value = result;
      } catch (error) {
        console.log(error);
      }
    });

    // template data ========================================================================================================================
    return {
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
