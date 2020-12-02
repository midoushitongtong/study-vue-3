<template>
  <Suspense>
    <template #default>
      <Teste />
    </template>
    <template #fallback>
      loading...
    </template>
  </Suspense>

  <div style="color: #f60">{{ error?.message }}</div>
</template>

<script lang="ts">
import { defineComponent, ref, onErrorCaptured } from 'vue';
import Teste from './Teste.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Teste,
  },
  setup() {
    const error = ref<unknown>(null);
    onErrorCaptured((e) => {
      console.log(e);
      error.value = e;
    });

    return {
      error,
    };
  },
});
</script>
