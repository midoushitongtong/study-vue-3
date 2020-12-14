<template>
  <form class="validate-form-container" @submit="submitForm">
    <slot name="default" />
    <div class="submit-area">
      <slot name="submit">
        <!-- 如果没有使用具名插槽, 显示默认内容 -->
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, provide } from 'vue';
import mitt, { Emitter } from 'mitt';
import { ValidateInputRef } from './ValidateInput.vue';

export type ValidateFormRef = {
  resetForm: () => void;
};

export default defineComponent({
  name: 'ValidateForm',
  emits: {
    submit: null,
  },
  setup(props, context) {
    // data ========================================================================================================================
    // create emitter
    const emitter = mitt();
    // provide emitter
    provide<Emitter>('emitter', emitter);
    // 保存子组件的表单验证方法
    const validateFormValues: ValidateInputRef[] = [];

    // method ========================================================================================================================
    const submitForm = (event: Event) => {
      // 阻止浏览器默认提交行为
      event.preventDefault();

      // 对子组件的表单进行验证
      const isAllPass = validateFormValues.map((item) => item.validateFormValue()).every((item) => item);

      context.emit('submit', isAllPass, event);
    };

    const handleValidateFormItemMounted = (validateFormValue?: ValidateInputRef) => {
      validateFormValue && validateFormValues.push(validateFormValue);
    };

    const resetForm = () => {
      validateFormValues.forEach((item) => {
        item.resetFormValue();
      });
    };

    // lifecycle ========================================================================================================================
    emitter.on('validateFormItemMounted', handleValidateFormItemMounted);
    onUnmounted(() => {
      emitter.off('validateFormItemMounted', handleValidateFormItemMounted);
    });

    // template data ========================================================================================================================
    return {
      emitter,
      submitForm,
      resetForm,
    };
  },
});
</script>
