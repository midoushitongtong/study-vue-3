<template>
  x: {{ x }}<br />
  y: {{ y }}<br />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useMousePosition from '@/hooks/mouse-position';

export default defineComponent({
  name: 'Testb',
  setup() {
    // data ========================================================================================================================
    const { x, y } = useMousePosition();

    // template data ========================================================================================================================
    return {
      x,
      y,
    };
  },
});
</script>
