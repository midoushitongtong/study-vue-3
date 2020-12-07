<template>
  <div class="file-upload">
    <button v-if="fileStatus === 'loading'" class="btn btn-primary" @click="triggetUpload">
      正在上传 ...
    </button>
    <button v-if="fileStatus === 'success'" class="btn btn-primary" @click="triggetUpload">
      上传成功
    </button>
    <button v-if="fileStatus === 'ready'" class="btn btn-primary" @click="triggetUpload">
      点击上传
    </button>

    <input type="file" class="file-input d-none" ref="fileInputRef" @change="handleFileChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import fetch from '@/utils/fetch';

type UploadStatus = 'ready' | 'loading' | 'success' | 'error';

type ValideFile = (file: File) => boolean;

export default defineComponent({
  name: 'Upload',
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<ValideFile>,
      required: false,
      default: null,
    },
  },
  emits: {
    uploadSuccess: null,
    uploadError: null,
  },
  setup(props, context) {
    const fileInputRef = ref<null | HTMLInputElement>(null);

    const fileStatus = ref<UploadStatus>('ready');

    const triggetUpload = () => {
      if (fileInputRef.value) {
        fileInputRef.value.click();
      }
    };

    const clearFileInputValue = () => {
      if (fileInputRef.value) {
        fileInputRef.value.value = '';
      }
    };

    const handleFileChange = async (event: Event) => {
      const currentTarget = event.target as HTMLInputElement;
      if (currentTarget.files) {
        // 将 dom 的伪数组转成真数组
        const files = Array.from(currentTarget.files);

        // 上传前是否是要校验
        if (props.beforeUpload) {
          const isPass = props.beforeUpload(files[0]);
          if (!isPass) {
            clearFileInputValue();
            return;
          }
        }

        const formData = new FormData();
        formData.append('file', files[0]);

        try {
          fileStatus.value = 'loading';

          const uploadResult = await fetch.post(props.action, formData, {
            /**
             * FormData 类型的数据
             * axios 会自动设置请求头的 Content-Type 为 multipart/form-data
             * 这里无需手动设置
             */
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            // },
          });

          fileStatus.value = 'success';
          context.emit('uploadSuccess', uploadResult.data);
        } catch (error) {
          console.log('文件上传失败');
          console.log(error);

          fileStatus.value = 'error';
          context.emit('uploadError', {
            error,
          });
        } finally {
          clearFileInputValue();
        }
      }
    };

    return {
      fileStatus,
      fileInputRef,
      triggetUpload,
      handleFileChange,
    };
  },
});
</script>
