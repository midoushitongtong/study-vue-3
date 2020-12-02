<template>
  <div class="container">
    <GlobalHeader :user="user" />
    <CategoryList v-if="false" :categoryList="categoryList" />
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
import { Category } from '@/apis/category/types';
import CategoryList from '@/components/CategoryList.vue';
import GlobalHeader from '@/components/GlobalHeader.vue';
import ValidateForm, { ValidateFormRef } from '@/components/ValidateForm.vue';
import ValidateInput, { Rule } from '@/components/ValidateInput.vue';
import { User } from '@/apis/user/types';

const user: User = {
  isLogin: true,
  name: '张三',
};

const categoryList: Category[] = [
  {
    id: 1,
    title: 'test1专栏',
    description: '这是test1专栏, 有一段非常有意思的简介, 可以更新一下',
    avatar: 'https://pic4.zhimg.com/80/v2-38b6c8c673d7431e8ebc4014c8c58d02_720w.jpg?source=1940ef5c',
  },
  {
    id: 2,
    title: 'test2专栏',
    description: '这是test2专栏, 有一段非常有意思的简介, 可以更新一下',
    avatar: 'https://pic4.zhimg.com/80/v2-e7a286a48b91ddf9382979c9dcc90b11_720w.jpg?source=1940ef5c',
  },
  {
    id: 3,
    title: 'test3专栏',
    description: '这是test3专栏, 有一段非常有意思的简介, 可以更新一下',
  },
  {
    id: 4,
    title: 'test4专栏',
    description: '这是test4专栏, 有一段非常有意思的简介, 可以更新一下',
    avatar: 'https://pic4.zhimg.com/80/v2-040e20fbae43ff6c7597bafddeb45bff_720w.jpg?source=1940ef5c',
  },
];

type FormValues = {
  email: string;
  password: string;
};

type FormRules = {
  [key in keyof FormValues]: Rule[];
};

export default defineComponent({
  name: 'App',
  components: {
    CategoryList,
    GlobalHeader,
    ValidateForm,
    ValidateInput,
  },
  setup() {
    // data ========================================================================================================================
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
        console.log(formValues.value);
      }
    };

    const handleFormReset = () => {
      validateFormRef.value?.resetForm();
    };

    // template data ========================================================================================================================
    return {
      categoryList,
      user,
      validateFormRef,
      formValues,
      formRules,
      handleFormSubmit,
      handleFormReset,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
