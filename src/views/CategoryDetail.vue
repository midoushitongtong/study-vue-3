<template>
  <div class="container" v-if="!loading">
    <div class="mb-4 mx-auto">
      <div class="row">
        <div class="col-3 pr-3">
          <img :src="category.avatar" :alt="category.title" class="w-100 avatar" />
        </div>
        <div class="col-9 pl-3">
          <h4 class="title">{{ category.title }}</h4>
          <p class="text-muted">{{ category.description }}</p>
        </div>
      </div>
    </div>
    <PostList :postList="postList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getCategoryList } from '@/apis/category';
import { Category } from '@/apis/category/types';
import { getPostList } from '@/apis/post';
import { Post } from '@/apis/post/types';
import PostList from '@/components/PostList.vue';

export default defineComponent({
  name: 'CategoryDetail',
  components: {
    PostList,
  },
  setup() {
    // data ========================================================================================================================
    const route = useRoute();
    const loading = ref(true);
    const category = ref<Category | undefined>(undefined);
    const postList = ref<Post[]>([]);

    const currentId = +route.params.id;

    onMounted(async () => {
      try {
        const categoryListResult = await getCategoryList();
        const categoryResult = categoryListResult.find((item) => item.id === currentId);
        if (categoryResult) {
          if (!categoryResult.avatar) {
            categoryResult.avatar = require('@/assets/column.jpg');
          }
        } else {
          throw new Error('找不到此分类');
        }

        category.value = categoryResult;

        try {
          const postListResult = await getPostList();
          postList.value = postListResult.filter((item) => item.categoryId === currentId);

          loading.value = false;
        } catch (error) {
          console.log('(api) 获取文章列表失败');
          console.log(error);
        }
      } catch (error) {
        console.log('(api) 获取分类详情失败');
        console.log(error);
      }
    });

    // template data ========================================================================================================================
    return {
      loading,
      category,
      postList,
    };
  },
});
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 5px;
}

.title {
  margin-top: 10px;
  @media (max-width: 576px) {
    margin-top: 0;
  }
}
</style>
