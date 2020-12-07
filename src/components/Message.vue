<template>
  <Teleport :to="`#${messageId}`">
    <div
      :class="[
        'alert',
        'fixed-top',
        'w-50',
        'mx-auto',
        'd-flex',
        'justify-content-between',
        'mt-2',
        type === 'default' && 'alert-primary',
        type === 'success' && 'alert-success',
        type === 'error' && 'alert-danger',
      ]"
    >
      <span>{{ message }}</span>
      <button type="button" class="close" @click="onRequestClose">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export type MessageType = 'default' | 'success' | 'error';

export default defineComponent({
  name: 'Message',
  props: {
    type: {
      type: String as PropType<MessageType>,
      default: 'default',
      required: false,
      validator: (value: string) => {
        return ['default', 'success', 'error'].includes(value);
      },
    },
    message: {
      type: String,
      required: true,
    },
    messageId: {
      type: String,
      required: true,
    },
    onRequestClose: {
      type: Function,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.message-wrapper {
  .alert {
    .close {
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1;
      color: #000;
      text-shadow: 0 1px 0 #fff;
      opacity: 0.5;
      border: 0;
      outline: none;
      background-color: transparent;
    }
  }
}
</style>
