<template>
  <Loading v-if="isLoading" />
  <div v-else class="container">
    <template v-if="postDetail">
      <div class="image" v-if="postDetail.image">
        <img :src="postDetail.image" />
      </div>
      <h4 class="my-5">{{ postDetail.title }}</h4>
      <div class="base-info py-3 d-flex align-items-center justify-content-between">
        <div>
          <span class="text-secondary">作者: </span><b>{{ postDetail.author.name }}</b>
        </div>
        <div class="text-secondary">{{ postDetail.createdAt }}</div>
      </div>
      <div class="mt-5 content" v-html="postDetail.content"></div>
      <div v-if="isAuthor" class="action mt-5">
        <RouterLink
          :to="{
            name: 'PostEdit',
            params: {
              id: postDetail.id,
            },
          }"
        >
          <button class="btn btn-primary">编辑</button>
        </RouterLink>
        <button class="btn ml-3 btn-danger">删除</button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';
import { getPostDetail } from '@/apis/post';
import { PostDetail } from '@/apis/post/types';
import { useStore } from '@/store';

export default defineComponent({
  name: 'PostOperation',
  components: {
    Loading,
  },
  setup() {
    // data ========================================================================================================================
    const isLoading = ref(true);

    const postDetail = ref<PostDetail | null>(null);

    const route = useRoute();

    const store = useStore();

    // method ========================================================================================================================
    const initData = async () => {
      try {
        if (route.params.id && typeof route.params.id === 'string') {
          const result = await getPostDetail(route.params.id);

          postDetail.value = result.data;

          isLoading.value = false;
        }
      } catch (error) {
        console.error('获取 api 数据失败');
        console.error(error);
      }
    };

    // computed ========================================================================================================================
    const isAuthor = computed(() => {
      if (postDetail.value && store.state.account.user) {
        return postDetail.value.author.id === store.state.account.user.id;
      }

      return false;
    });

    // lifycycle ========================================================================================================================
    onMounted(() => {
      initData();
    });

    // template data ========================================================================================================================
    return {
      isLoading,
      isAuthor,
      postDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  max-width: 690px;
  img {
    max-width: 100%;
  }
  .base-info {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .content {
    white-space: pre-wrap;
  }
}
</style>
