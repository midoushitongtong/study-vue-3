<template>
  <div class="container">
    <h5>新建文章</h5>
    <hr />
    <!-- multipart/form-data 才能传输二进制数据 -->
    <Upload
      :action="`${config.apiRoot}/uploadFile`"
      :beforeUpload="beforeUpload"
      @uploadSuccess="handleUploadSuccess"
    >
      <template #default="{ triggetUpload }">
        <button @click="triggetUpload" class="btn btn-primary">点击上传</button>
      </template>
      <template #success="{ uploadResult }">
        <img :src="uploadResult.url" class="preview-image" />
      </template>
      <template #loading>上传中...</template>
    </Upload>
    <ValidateForm @submit="handleFormSubmit" ref="validateFormRef">
      <div class="mb-1">
        <label for="title" class="form-label">文章标题：</label>
        <ValidateInput
          id="title"
          type="text"
          placeholder="输入文章标题"
          v-model:value="formValues.title"
          :rules="formRules.title"
        />
      </div>
      <div class="mb-1">
        <label for="content" class="form-label">文章内容：</label>
        <ValidateInput
          rows="5"
          tag="textarea"
          id="content"
          :rules="formRules.content"
          placeholder="输入文章内容"
          v-model:value="formValues.content"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary mr-2">submit</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ValidateForm, { ValidateFormRef } from '@/components/ValidateForm.vue';
import ValidateInput, { Rule } from '@/components/ValidateInput.vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import { Post, UploadFileReturns } from '@/apis/post/types';
import { ContentActions } from '@/store/modules/content/types';
import Upload from '@/components/Upload.vue';
import config from '@/config';
import { showMessage } from '@/utils/message';

type FormValues = {
  title: string;
  content: string;
};

type FormRules = {
  [key in keyof FormValues]: Rule[];
};

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateForm,
    ValidateInput,
    Upload,
  },
  setup() {
    // data ========================================================================================================================
    const store = useStore();

    const router = useRouter();

    const validateFormRef = ref<ValidateFormRef | null>(null);

    const formValues = ref<FormValues>({
      title: '',
      content: '',
    });

    const formRules: FormRules = {
      title: [{ type: 'required', message: '文章标题不能为空' }],
      content: [{ type: 'required', message: '文章内容不能为空' }],
    };

    // method ========================================================================================================================
    const handleFormSubmit = (isValid: boolean): void => {
      if (isValid) {
        const categoryId = store.state?.account?.user?.categoryId;
        if (categoryId) {
          const currentDate = new Date();
          const newPost: Post = {
            id: currentDate.getTime(),
            title: formValues.value.title,
            content: formValues.value.content,
            categoryId,
            // 生成日期字符串 (2020-01-01 01:01:01)
            createdAt: `${currentDate.getFullYear()}-${currentDate
              .getMonth()
              .toString()
              .padStart(2, '0')}-${currentDate
              .getDate()
              .toString()
              .padStart(2, '0')} ${currentDate
              .getHours()
              .toString()
              .padStart(2, '0')}:${currentDate
              .getMinutes()
              .toString()
              .padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`,
          };

          store.dispatch(ContentActions.UPDATE_POST_LIST, [newPost, ...store.state.content.postList]);

          router.push({
            name: 'CategoryDetail',
            params: {
              id: categoryId,
            },
          });
        }
      }
    };

    const beforeUpload = (file: File): boolean => {
      const isImageFile = ['image/jpeg', 'image/png'].includes(file.type);

      if (!isImageFile) {
        showMessage('只能上传 .jpg .jpeg .png 后缀的图片', 'error');
      }

      return isImageFile;
    };

    const handleUploadSuccess = (data: UploadFileReturns) => {
      console.log(data);
    };

    // template data ========================================================================================================================
    return {
      validateFormRef,
      formValues,
      formRules,
      handleFormSubmit,
      config,
      beforeUpload,
      handleUploadSuccess,
    };
  },
});
</script>

<style lang="scss" scoped>
.preview-image {
  width: 100px;
  height: 100px;
}
</style>
