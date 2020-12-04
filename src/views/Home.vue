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
    <CategoryList :categoryList="categoryList" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import CategoryList from '@/components/CategoryList.vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'App',
  components: {
    CategoryList,
  },
  setup() {
    // data ========================================================================================================================
    const store = useStore();

    // computed ========================================================================================================================
    const categoryList = computed(() => store.state.content.categoryList);

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
