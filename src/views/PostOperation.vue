<template>
  <div class="container">
    <h5>新建文章</h5>
    <hr />
    <!-- multipart/form-data 才能传输二进制数据 -->
    <Upload
      :action="`${config.apiRoot}/uploadFile`"
      :beforeUpload="beforeUpload"
      @uploadSuccess="handleUploadSuccess"
      class="my-4"
    >
      <template #default="{ triggetUpload }">
        <div v-if="image" @click="triggetUpload" class="upload-area bg-light text-second">
          <img :src="image" class="preview-image" />
        </div>
        <div v-else @click="triggetUpload" class="upload-area bg-light text-second">点击上传封面</div>
      </template>
      <template #success="{ uploadResult, triggetUpload }">
        <div @click="triggetUpload" class="upload-area bg-light text-second">
          <img :src="uploadResult.url" class="preview-image" />
        </div>
      </template>
      <template #loading>
        <div class="upload-area bg-light text-second">
          <Loading :coverScreen="false" />
        </div>
      </template>
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
        <button type="submit" class="btn btn-primary mr-2">
          <template v-if="isEdit">更新</template>
          <template v-else>提交</template>
        </button>
      </template>
    </ValidateForm>
  </div>

  <Loading v-if="isLoading" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import ValidateForm, { ValidateFormRef } from '@/components/ValidateForm.vue';
import ValidateInput, { Rule } from '@/components/ValidateInput.vue';
import { useRoute, useRouter } from 'vue-router';
import { AddPostParams, EditPostParams, UploadFileReturns } from '@/apis/post/types';
import Upload from '@/components/Upload.vue';
import config from '@/config';
import { showMessage } from '@/utils/message';
import Loading from '@/components/Loading.vue';
import { addPost, editPost, getPostDetail } from '@/apis/post';

type FormValues = {
  title: string;
  content: string;
};

type FormRules = {
  [key in keyof FormValues]: Rule[];
};

export default defineComponent({
  name: 'PostOperation',
  components: {
    ValidateForm,
    ValidateInput,
    Upload,
    Loading,
  },
  setup() {
    // data ========================================================================================================================
    const router = useRouter();

    const route = useRoute();

    const isLoading = ref<boolean>(false);

    // 是否是编辑操作
    const isEdit = !!route.params.id;

    // 修改的 id
    const id = route.params.id;

    // 文章图片地址
    const image = ref<string | null>(null);

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
    const handleFormSubmit = async (isValid: boolean) => {
      if (isValid) {
        const postData: AddPostParams & EditPostParams = {
          title: formValues.value.title,
          content: formValues.value.content,
          id: undefined,
          createdAt: undefined,
          image: undefined,
        };

        if (!isEdit) {
          try {
            isLoading.value = true;

            // 生成日期字符串 (2020-01-01 01:01:01)
            const currentDate = new Date();
            postData.createdAt = `${currentDate.getFullYear()}-${currentDate
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
              .padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

            if (image.value) {
              postData.image = image.value;
            }

            await addPost(postData);

            router.push({
              name: 'PostShow',
              params: {
                id: '1',
              },
            });

            setTimeout(() => {
              showMessage('文章已创建', 'success');
            }, 500);
          } catch (error) {
            console.error('获取 api 数据失败');
            console.error(error);
          } finally {
            isLoading.value = false;
          }
        } else {
          try {
            if (typeof id === 'string') {
              isLoading.value = true;

              postData.id = id;

              if (image.value) {
                postData.image = image.value;
              }

              await editPost(postData);

              router.push({
                name: 'PostShow',
                params: {
                  id: '1',
                },
              });

              setTimeout(() => {
                showMessage('文章已更新', 'success');
              }, 500);
            }
          } catch (error) {
            console.error('获取 api 数据失败');
            console.error(error);
          } finally {
            isLoading.value = false;
          }
        }
      }
    };

    const beforeUpload = (file: File): boolean => {
      const fileTypeCheckPass = ['image/jpeg', 'image/png'].includes(file.type);

      if (!fileTypeCheckPass) {
        showMessage('只能上传 .jpg .jpeg .png 后缀的图片', 'error');
      }

      // 最大 2048 kb
      const maxSize = 2048;
      const fileSizeCheckPass = file.size / 1024 < maxSize;

      if (!fileSizeCheckPass) {
        showMessage('图片大小不能超过 2mb', 'error');
      }

      return fileTypeCheckPass && fileSizeCheckPass;
    };

    const handleUploadSuccess = (data: UploadFileReturns) => {
      image.value = data.url;
    };

    // lifecycle ========================================================================================================================
    onMounted(async () => {
      if (isEdit && typeof id === 'string') {
        try {
          isLoading.value = true;

          const postDetail = await getPostDetail(id);

          formValues.value.title = postDetail.data.title;
          formValues.value.content = postDetail.data.content;

          if (postDetail.data.image) {
            image.value = postDetail.data.image;
          }
        } catch (error) {
          console.error('获取 api 数据失败');
          console.error(error);
        } finally {
          isLoading.value = false;
        }
      }
    });

    // template data ========================================================================================================================
    return {
      isLoading,
      isEdit,
      image,
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
.container {
  max-width: 690px;
}

.preview-image {
  width: 100%;
}

.upload-area {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 175px;
  font-size: 25px;
  cursor: pointer;
}
</style>
