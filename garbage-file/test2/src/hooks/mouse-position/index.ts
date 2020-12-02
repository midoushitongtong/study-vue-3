import { onMounted, onUnmounted, Ref, ref } from 'vue';

type UseMousePositionReturns = {
  x: Ref<number>;
  y: Ref<number>;
};

const useMousePosition = (): UseMousePositionReturns => {
  // data ========================================================================================================================
  const x = ref(0);
  const y = ref(0);

  // method ========================================================================================================================
  const updateMouse = (e: MouseEvent) => {
    x.value = e.pageX;
    y.value = e.pageY;
  };

  // lifecycle ========================================================================================================================
  onMounted(() => {
    document.addEventListener('click', updateMouse);
  });

  onUnmounted(() => {
    document.removeEventListener('click', updateMouse);
  });

  // return data ========================================================================================================================
  return {
    x,
    y,
  };
};

export default useMousePosition;
