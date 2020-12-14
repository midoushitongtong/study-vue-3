<template>
  <Loading v-if="isLoading" />
  <div class="container" v-else>
    <div class="mb-4 mx-auto">
      <div class="row">
        <div class="col-2 pr-3">
          <img
            :src="enhanceAvatar(categoryDetail?.avatar)"
            :alt="categoryDetail.title"
            class="w-100 avatar"
          />
        </div>
        <div class="col-10 pl-3">
          <h4 class="title">{{ categoryDetail.title }}</h4>
          <p class="text-muted">{{ categoryDetail.description }}</p>
        </div>
      </div>
    </div>
    <hr />
    <PostList :postList="postList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import PostList from '@/components/PostList.vue';
import { getCategoryDetial } from '@/apis/category';
import { getPostList } from '@/apis/post';
import { CategoryDetail } from '@/apis/category/types';
import { Post } from '@/apis/post/types';
import Loading from '@/components/Loading.vue';

export default defineComponent({
  name: 'CategoryDetail',
  components: {
    PostList,
    Loading,
  },
  setup() {
    // data ========================================================================================================================
    const isLoading = ref<boolean>(true);

    const categoryDetail = ref<CategoryDetail | null>(null);

    const postList = ref<Post[]>([]);

    const route = useRoute();

    // method ========================================================================================================================
    const enhanceAvatar = (avatar?: string) => avatar || require('@/assets/images/column.jpg');

    // 获取分类数据和文章数据
    const iniData = async () => {
      try {
        if (route.params.id && typeof route.params.id === 'string') {
          isLoading.value = true;
          const result = await getCategoryDetial(route.params.id);
          const result2 = await getPostList(route.params.id);
          categoryDetail.value = result.data;
          postList.value = result2.data;
          isLoading.value = false;
        }
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
      categoryDetail,
      postList,
      enhanceAvatar,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/media.scss';

.avatar {
  border-radius: 5px;
}

.title {
  margin-top: 10px;
  @include deviceType('mobile') {
    margin-top: 0;
  }
}
</style>
