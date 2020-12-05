<template>
  <div class="pb-3">
    <input
      v-if="tag === 'input'"
      v-bind="attrs"
      :class="['form-control', formError ? 'is-invalid' : '']"
      :value="formValue"
      @blur="validateFormValue"
      @input="handleFormValueChange"
    />

    <textarea
      v-if="tag === 'textarea'"
      v-bind="attrs"
      :class="['form-control', formError ? 'is-invalid' : '']"
      :value="formValue"
      @blur="validateFormValue"
      @input="handleFormValueChange"
    />
    <span class="invalid-feedback" v-if="formError">{{ formErrorMessage }}</span>
  </div>
</template>

<script lang="ts">
import { Emitter } from 'mitt';
import { defineComponent, onMounted, PropType, ref, watch, inject } from 'vue';

type ValidateFormValue = () => boolean;

type ResetFormValue = () => void;

export type ValidateInputRef = {
  validateFormValue: ValidateFormValue;
  resetFormValue: ResetFormValue;
};

export type Rule = {
  type: 'required' | 'email';
  message: string;
};

const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default defineComponent({
  name: 'ValidateInput',
  inheritAttrs: false,
  inject: ['emitter'],
  props: {
    rules: {
      type: Array as PropType<Rule[]>,
      required: false,
      default: null,
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
    tag: {
      required: false,
      default: 'input',
      validator: (value: string) => {
        return ['input', 'textarea'].includes(value);
      },
    },
  },
  setup(props, context) {
    // data ========================================================================================================================
    const formValue = ref(props.value || '');
    const formError = ref(false);
    const formErrorMessage = ref('');

    // inject emitter
    const emitter = inject<Emitter>('emitter');

    // method ========================================================================================================================
    const validateFormValue: ValidateFormValue = () => {
      if (props.rules) {
        const isAllPass = props.rules.every((item) => {
          let isPass = true;
          switch (item.type) {
            case 'required':
              isPass = formValue.value.trim() !== '';
              break;
            case 'email':
              isPass = emailRegexp.test(formValue.value);
              break;
          }
          if (!isPass) {
            formErrorMessage.value = item.message;
          } else {
            formErrorMessage.value = '';
          }
          return isPass;
        });

        formError.value = !isAllPass;

        return isAllPass;
      }
      return true;
    };

    const handleFormValueChange = (event: KeyboardEvent) => {
      const targetValuie = (event.target as HTMLInputElement).value;

      formValue.value = targetValuie;

      context.emit('update:value', targetValuie);

      // 如果当前表单验证失败, 重新验证
      if (formError.value) {
        validateFormValue();
      }
    };

    const resetFormValue: ResetFormValue = () => {
      context.emit('update:value', '');
      formError.value = false;
      formErrorMessage.value = '';
    };

    // watch ========================================================================================================================
    watch(
      // 外部数据变化, 更新内部数据
      () => props.value,
      () => {
        if (formValue.value !== props.value) {
          formValue.value = props.value;
        }
      }
    );

    // lifecycle
    onMounted(() => {
      emitter?.emit('validate-form-item-mounted', {
        validateFormValue,
        resetFormValue,
      });
    });

    // template data ========================================================================================================================
    return {
      formValue,
      formError,
      formErrorMessage,
      validateFormValue,
      handleFormValueChange,
      attrs: context.attrs,
    };
  },
});
</script>
