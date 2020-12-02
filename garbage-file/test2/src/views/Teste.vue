<template>
  <div class="teste">
    <div v-for="item in data" :key="item.id">
      <img style="max-width: 100px;" :src="item.url" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Testd',
  async setup() {
    const { data } = await axios.get('https://api.thecatapi.com/v1/images/search?limit=1');

    return {
      data,
    };
  },
  // setup() {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve({
  //         result: 'hello',
  //       });
  //     }, 3000);
  //   });
  // },
});
</script>
