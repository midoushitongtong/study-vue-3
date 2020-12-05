<template>
  <div class="row">
    <div v-for="item of categoryList" :key="item.id" class="col-md-3 col-sm-4 col-6 mb-4">
      <div class="card shadow-sm">
        <div class="card-body text-center">
          <RouterLink
            :to="{
              name: 'CategoryDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img :src="enhanceAvatar(item?.avatar)" :alt="item.title" class="avatar mb-3" />
          </RouterLink>
          <h5 class="card-title title">{{ item.title }}</h5>
          <p class="card-text text-left description">{{ item.description }}</p>
          <RouterLink
            :to="{
              name: 'CategoryDetail',
              params: {
                id: item.id,
              },
            }"
            class="btn btn-outline-primary"
          >
            进入专栏
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Category } from '@/apis/category/types';

export default defineComponent({
  name: 'CategoryList',
  props: {
    categoryList: {
      type: Array as PropType<Category[]>,
      required: true,
    },
  },
  setup() {
    // method ========================================================================================================================
    const enhanceAvatar = (avatar?: string) => avatar || require('@/assets/images/column.jpg');

    // template data ========================================================================================================================
    return {
      enhanceAvatar,
    };
  },
});
</script>

<style lang="scss" scoped>
.avatar {
  width: 75px;
  height: 75px;
  border-radius: 5px;
}

.title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.description {
  line-height: 22px;
  height: 22 * 3px;
  overflow: hidden;
}
</style>
