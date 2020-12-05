<template>
  <div :class="['dropdown-item', disabled ? 'disabled' : '']">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.dropdown-item {
  padding: 0;
  &.disabled {
    ::v-deep(a) {
      color: #6c757d;
      pointer-events: none;
      background-color: transparent;
    }
  }
  ::v-deep(a) {
    display: block;
    padding: 0.25rem 1rem;
    width: inherit;
    font-weight: inherit;
    color: inherit;
    text-align: inherit;
    text-decoration: inherit;
    white-space: inherit;
    background-color: inherit;
    border: inherit;
  }
}
</style>
