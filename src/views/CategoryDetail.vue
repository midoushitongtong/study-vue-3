<template>
  <div class="container" v-if="category">
    <div class="mb-4 mx-auto">
      <div class="row">
        <div class="col-2 pr-3">
          <img :src="enhanceAvatar(category?.avatar)" :alt="category.title" class="w-100 avatar" />
        </div>
        <div class="col-10 pl-3">
          <h4 class="title">{{ category.title }}</h4>
          <p class="text-muted">{{ category.description }}</p>
        </div>
      </div>
    </div>
    <hr />
    <PostList :postList="postList" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import PostList from '@/components/PostList.vue';
import { useStore } from '@/store';
import { ContentGetters } from '@/store/modules/content/types';
import { Category } from '@/apis/category/types';
import { Post } from '@/apis/post/types';

export default defineComponent({
  name: 'CategoryDetail',
  components: {
    PostList,
  },
  setup() {
    // data ========================================================================================================================
    const route = useRoute();
    const store = useStore();
    const currentId = +route.params.id;

    // computed ========================================================================================================================
    const category = computed<Category>(() =>
      store.getters[ContentGetters.CATEROTY_BY_CATEGORY_ID](currentId)
    );
    const postList = computed<Post[]>(() =>
      store.getters[ContentGetters.POST_LIST_BY_CATEGORY_ID](currentId)
    );

    // method ========================================================================================================================
    const enhanceAvatar = (avatar?: string) => avatar || require('@/assets/images/column.jpg');

    // template data ========================================================================================================================
    return {
      category,
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
