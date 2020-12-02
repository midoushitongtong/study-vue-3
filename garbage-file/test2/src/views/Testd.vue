<template>
  <div class="testd">
    <button @click="showModal">show modal</button>
    <TestdModal :visible="visible" @requestClose="visible = false">
      <h1>123</h1>
      <br />
      <h2>abc</h2>
    </TestdModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TestdModal from './TestdModal.vue';

export default defineComponent({
  name: 'Testd',
  components: {
    TestdModal,
  },
  setup() {
    // data ========================================================================================================================
    const visible = ref(false);

    // method ========================================================================================================================
    const showModal = () => {
      visible.value = true;
    };

    // template data ========================================================================================================================
    return {
      visible,
      showModal,
    };
  },
});
</script>
