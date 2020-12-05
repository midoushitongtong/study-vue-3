<template>
  <div class="dropdown" ref="dropdownRef">
    <div class="btn btn-outline-light my-2 dropdown-toggle" @click="toggleVisible">
      {{ title }}
      <ul v-if="visible" class="dropdown-menu">
        <slot />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import useClickOutside from '@/hooks/useClickOutside';

export default defineComponent({
  name: 'GlobalHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    // data ========================================================================================================================
    const visible = ref(false);
    const dropdownRef = ref<null | HTMLElement>(null);
    const isClickOutside = useClickOutside(dropdownRef);

    // method ========================================================================================================================
    const toggleVisible = () => {
      visible.value = !visible.value;
    };

    // watch ========================================================================================================================
    watch(isClickOutside, () => {
      // 如果点击了外部的区域, 将菜单隐藏
      if (isClickOutside.value && visible.value) {
        visible.value = false;
      }
    });

    // template data ========================================================================================================================
    return {
      dropdownRef,
      visible,
      toggleVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
.dropdown-menu {
  display: block;
}
</style>
