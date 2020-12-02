<template>
  <template v-if="loaded">
    <div v-for="item in result" :key="item.id">
      <img style="max-width: 100px;" :src="item.url" />
    </div>
  </template>
  <template v-else>loading...</template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useURLLoader from '@/hooks/url-loader';

type CatResult = {
  id: string;
  url: string;
  width: number;
  height: number;
}[];

export default defineComponent({
  name: 'Testc',
  setup() {
    // data ========================================================================================================================
    const { loading, result, loaded, error } = useURLLoader<CatResult>({
      url: 'https://api.thecatapi.com/v1/images/search?limit=1',
    });

    // template data ========================================================================================================================
    return {
      loading,
      result,
      loaded,
      error,
    };
  },
});
</script>
