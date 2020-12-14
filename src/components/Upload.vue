<template>
  <div class="file-upload" v-bind="attrs">
    <slot v-if="fileStatus === 'loading'" name="loading" :triggetUpload="triggetUpload">
      <button class="btn btn-primary">正在上传 ...</button>
    </slot>

    <slot
      v-if="fileStatus === 'success'"
      name="success"
      :triggetUpload="triggetUpload"
      :uploadResult="uploadResult"
    >
      <button class="btn btn-primary">上传成功</button>
    </slot>

    <slot v-if="fileStatus === 'ready'" name="default" :triggetUpload="triggetUpload">
      <button class="btn btn-primary">点击上传</button>
    </slot>

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
  inheritAttrs: false,
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

    const uploadResult = ref<unknown>(null);

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

          const result = await fetch.post(props.action, formData, {
            /**
             * FormData 类型的数据
             * axios 会自动设置请求头的 Content-Type 为 multipart/form-data
             * 这里无需手动设置
             */
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            // },
          });

          uploadResult.value = result.data;

          fileStatus.value = 'success';
          context.emit('uploadSuccess', result.data);
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
      uploadResult,
      handleFileChange,
      attrs: context.attrs,
    };
  },
});
</script>
