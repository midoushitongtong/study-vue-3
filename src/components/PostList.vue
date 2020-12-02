<template>
  <div class="post-list">
    <div v-for="item of postList" :key="item.id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>{{ item.title }}</h4>
        <div class="row my-3 aign-items-center">
          <div v-if="item.image" class="col-3">
            <img :src="item.image" :alt="item.title" class="w-100 avatar" />
          </div>
          <p
            :class="{
              'col-9': item.image,
            }"
          >
            {{ item.content }}
          </p>
          <span class="text-muted">{{ item.createdAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Post } from '@/apis/post/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'PostList',
  props: {
    postList: {
      required: true,
      type: Array as PropType<Post[]>,
    },
  },
});
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 5px;
}
</style>
