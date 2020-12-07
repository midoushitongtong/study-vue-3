<template>
  <Teleport v-if="coverScreen" :to="`#${loadingId}`">
    <div class="loading-container">
      <img
        src="@/assets/images/loading.svg"
        title="loading"
        :style="{
          width: `${size}px`,
          height: `${size}px`,
        }"
      />
      <span class="text">Loading ...</span>
    </div>
  </Teleport>
  <div v-else class="loading-container">
    <img
      src="@/assets/images/loading.svg"
      title="loading"
      :style="{
        width: `${size}px`,
        height: `${size}px`,
      }"
    />
    <span class="text">Loading ...</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';

let currentLoadingDivCount = 1;

export default defineComponent({
  name: 'Loading',
  props: {
    size: {
      type: Number,
      require: false,
      default: 35,
    },
    coverScreen: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  setup(props) {
    let loadingId = '';
    // 如果 loading 需要覆盖整个屏幕
    // 就手动创建一个 div, 利用 teleport 插入到此 div
    if (props.coverScreen && loadingId === '') {
      const node = document.createElement('div');
      node.classList.add('loading-wrapper');
      loadingId = `loading-${currentLoadingDivCount++}`;
      node.id = loadingId;
      document.body.appendChild(node);
    }

    // lifecycle ========================================================================================================================
    onUnmounted(() => {
      // 如果 loading 需要覆盖整个屏幕, 组件销毁时, 删除此 div
      if (props.coverScreen && loadingId) {
        const loadingNode = document.querySelector(`#${loadingId}`);
        if (loadingNode) {
          document.body.removeChild(loadingNode);
        }
      }
    });

    // template data  ========================================================================================================================
    return {
      loadingId,
    };
  },
});
</script>

<style lang="scss">
.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .text {
    margin-top: 15px;
    font-size: 14px;
    color: '#101010';
    opacity: 0.65;
  }
}
</style>
