<template>
  <div class="container">
    <h5>登陆</h5>
    <hr />
    <ValidateForm @submit="handleFormSubmit" ref="validateFormRef">
      <div class="mb-1">
        <label for="email" class="form-label">邮箱</label>
        <ValidateInput
          id="email"
          type="text"
          placeholder="输入电子邮箱地址"
          v-model:value="formValues.email"
          :rules="formRules.email"
        />
      </div>
      <div class="mb-1">
        <label for="password" class="form-label">密码</label>
        <ValidateInput
          id="password"
          type="password"
          :rules="formRules.password"
          placeholder="输入密码"
          v-model:value="formValues.password"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary mr-2">登录</button>
        <button type="button" class="btn btn-warning" @click="handleFormReset">重置</button>
      </template>
    </ValidateForm>

    <Loading v-if="loginLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ValidateForm, { ValidateFormRef } from '@/components/ValidateForm.vue';
import ValidateInput, { Rule } from '@/components/ValidateInput.vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { AccountActions } from '@/store/modules/account/types';
import { login, getUserInfo } from '@/apis/account';
import Loading from '@/components/Loading.vue';
import { showMessage } from '@/utils/message';

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
    Loading,
  },
  setup() {
    // data ========================================================================================================================
    const router = useRouter();

    const store = useStore();

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

    const loginLoading = ref<boolean>(false);

    // method ========================================================================================================================
    const handleFormSubmit = async (isValid: boolean) => {
      if (isValid) {
        loginLoading.value = true;

        try {
          const result = await login({
            email: formValues.value.email,
            password: formValues.value.password,
          });
          localStorage.setItem('accessToken', result.data.accessToken);

          const userInfo = await getUserInfo();
          store.dispatch(AccountActions.UPDATE_USER, {
            id: userInfo.data.id,
            name: userInfo.data.name,
          });

          router.replace('/');

          showMessage('登陆成功', 'success');
        } catch (error) {
          console.error('获取 api 数据失败');
          console.error(error);

          showMessage('用户名或密码有误', 'default');
        } finally {
          loginLoading.value = false;
        }
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
      loginLoading,
    };
  },
});
</script>
