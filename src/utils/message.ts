import { createApp } from 'vue';
import Message from '@/components/Message.vue';

export type MessageType = 'success' | 'error' | 'default';

let currentMessageDivCount = 1;

export const showMessage = (message: string, type: MessageType, timeout = 3500): void => {
  // 就手动创建一个 div, 之后 message 组件会利用 teleport 挂载到 div
  const node = document.createElement('div');
  node.classList.add('message-wrapper');
  const messageId = `message-${currentMessageDivCount++}`;
  node.id = messageId;
  document.body.appendChild(node);

  // 移除 message 组件
  const removeMessage = (): void => {
    messageApp.unmount(node);
    const messageNode = document.querySelector(`#${messageId}`);
    if (messageNode) {
      document.body.removeChild(messageNode);
    }
  };

  // 实例化 message 组件
  const messageApp = createApp(Message, {
    message,
    type,
    messageId, // teleport 挂载的 div
    onRequestClose: removeMessage,
  });

  // 将 message 组件挂载到 dom
  messageApp.mount(node);

  setTimeout(() => {
    removeMessage();
  }, timeout);
};
