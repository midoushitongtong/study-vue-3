<template>
  <div class="row">
    <div v-for="item of enhanceCategoryList" :key="item.id" class="col-md-3 col-sm-4 col-6 mb-4">
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
            <img :src="item.avatar" :alt="item.title" class="avatar mb-3" />
          </RouterLink>
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-left">{{ item.description }}</p>
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
import { computed, defineComponent, PropType } from 'vue';
import { Category } from '@/apis/category/types';

export default defineComponent({
  name: 'CategoryList',
  props: {
    categoryList: {
      required: true,
      type: Array as PropType<Category[]>,
    },
  },
  setup(props) {
    // computed ========================================================================================================================
    const enhanceCategoryList = computed(() => {
      return props.categoryList.map((item) => {
        if (!item.avatar) {
          item.avatar = require('@/assets/column.jpg');
        }
        return item;
      });
    });

    // template data ========================================================================================================================
    return {
      enhanceCategoryList,
    };
  },
});
</script>

<style lang="scss" scoped>
.avatar {
  width: 75px;
  height: 75px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
