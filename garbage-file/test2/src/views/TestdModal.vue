<template>
  <teleport to="#modal">
    <div class="modal" v-if="visible">
      <slot></slot>
      <div>
        <button @click="closeModal">close</button>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TestdModal',
  props: {
    visible: Boolean,
  },
  emits: {
    requestClose: null,
    // 验证 emit 的参数
    // requestClose: (payload?: { type: string }): boolean => {
    //   return payload?.type === 'close';
    // },
  },
  setup(props, context) {
    const closeModal = () => {
      context.emit('requestClose');
    };

    return {
      closeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 200px;
  min-height: 200px;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  color: #06f;
  text-align: center;
}
</style>
