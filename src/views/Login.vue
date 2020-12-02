<template>
  <div class="container">
    <ValidateForm @submit="handleFormSubmit" ref="validateFormRef">
      <div class="mb-1">
        <label for="email" class="form-label">email</label>
        <ValidateInput
          type="text"
          placeholder="input email"
          v-model:value="formValues.email"
          :rules="formRules.email"
        />
      </div>
      <div class="mb-1">
        <label for="password" class="form-label">password</label>
        <ValidateInput
          id="password"
          type="password"
          :rules="formRules.password"
          placeholder="input password"
          v-model:value="formValues.password"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary mr-2">submit</button>
        <button type="button" class="btn btn-warning" @click="handleFormReset">reset</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ValidateForm, { ValidateFormRef } from '@/components/ValidateForm.vue';
import ValidateInput, { Rule } from '@/components/ValidateInput.vue';
import { useRouter } from 'vue-router';

type FormValues = {
  email: string;
  password: string;
};

type FormRules = {
  [key in keyof FormValues]: Rule[];
};

export default defineComponent({
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    // data ========================================================================================================================
    const router = useRouter();

    const validateFormRef = ref<ValidateFormRef | null>(null);

    const formValues = ref<FormValues>({
      email: '',
      password: '',
    });

    const formRules: FormRules = {
      email: [
        { type: 'required', message: '电子邮箱地址不能为空' },
        { type: 'email', message: '这是一个无效的电子邮箱地址' },
      ],
      password: [{ type: 'required', message: '密码不能为空' }],
    };

    // method ========================================================================================================================
    const handleFormSubmit = (isValid: boolean) => {
      if (isValid) {
        router.push({
          name: 'CategoryDetail',
          params: {
            id: 1,
          },
        });
      }
    };

    const handleFormReset = () => {
      validateFormRef.value?.resetForm();
    };

    // template data ========================================================================================================================
    return {
      validateFormRef,
      formValues,
      formRules,
      handleFormSubmit,
      handleFormReset,
    };
  },
});
</script>
