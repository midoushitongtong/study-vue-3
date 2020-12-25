<template>
  <Teleport :to="`#${modalId}`">
    <div class="modal" data-modal="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" v-if="title">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="close" data-dismiss="modal" @click="handleClose">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="handleClose">取消</button>
            <button class="btn btn-primary" @click="handleConfirm">确认</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';

let currentModalDivCount = 1;

export default defineComponent({
  name: 'Loading',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: {
    confirm: null,
    requestClose: null,
  },
  setup(props, context) {
    let modalId = '';
    // 就手动创建一个 div, 利用 teleport 插入到此 div
    if (modalId === '') {
      const node = document.createElement('div');
      node.classList.add('modal-wrapper');
      modalId = `modal-${currentModalDivCount++}`;
      node.id = modalId;
      document.body.appendChild(node);
      node.dataset.modal = 'true';
      node.addEventListener('click', (event) => {
        if ((event.target as HTMLDivElement).dataset.modal === 'true') {
          context.emit('requestClose');
        }
      });
    }

    // method ========================================================================================================================
    const handleClose = () => {
      context.emit('requestClose');
    };

    const handleConfirm = () => {
      context.emit('confirm');
    };

    // lifecycle ========================================================================================================================
    onUnmounted(() => {
      if (modalId) {
        const loadingNode = document.querySelector(`#${modalId}`);
        if (loadingNode) {
          document.body.removeChild(loadingNode);
        }
      }
    });

    // template data  ========================================================================================================================
    return {
      modalId,
      handleClose,
      handleConfirm,
    };
  },
});
</script>

<style lang="scss">
.modal-wrapper {
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .modal {
    display: block;
  }

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
</style>
