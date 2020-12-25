<template>
  <div class="post-list">
    <div v-for="item of postList" :key="item.id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <router-link
          :to="{
            name: 'PostShow',
            params: {
              id: item.id,
            },
          }"
        >
          <h4>{{ item.title }}</h4>
        </router-link>
        <div class="row my-3 aign-items-center">
          <div v-if="item.image" class="col-3">
            <router-link
              :to="{
                name: 'PostShow',
                params: {
                  id: item.id,
                },
              }"
            >
              <img :src="item.image" :alt="item.title" class="w-100 avatar" />
            </router-link>
          </div>
          <div :class="[item.image ? 'col-9' : '']">
            {{ item.content }}
          </div>
          <span class="text-muted mt-3">{{ item.createdAt }}</span>
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
      type: Array as PropType<Post[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #101010;
}

.avatar {
  border-radius: 5px;
}
</style>
