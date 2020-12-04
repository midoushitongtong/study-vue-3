import { onMounted, onUnmounted, ref, Ref } from 'vue';

type UseClickOutsideReturns = Ref<boolean>;

export const useClickOutside = (elementRef: Ref<null | HTMLElement>): UseClickOutsideReturns => {
  const isClickOutside = ref(false);

  const handleDocumentClick = (event: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(event.target as HTMLElement)) {
        isClickOutside.value = false;
      } else {
        isClickOutside.value = true;
      }
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleDocumentClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleDocumentClick);
  });

  return isClickOutside;
};

export default useClickOutside;
