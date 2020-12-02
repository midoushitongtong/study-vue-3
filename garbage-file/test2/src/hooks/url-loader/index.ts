import axios from 'axios';
import { Ref, ref, UnwrapRef } from 'vue';

type UseURLProps = {
  url: string;
};

type UseURLLoaderReturns<T> = {
  result: Ref<UnwrapRef<T> | null>;
  loading: Ref<boolean>;
  loaded: Ref<boolean>;
  error: Ref<Error | null>;
};

const useMousePosition = <T>({ url }: UseURLProps): UseURLLoaderReturns<T> => {
  // data ========================================================================================================================
  const result = ref<T | null>(null);
  const loading = ref(true);
  const loaded = ref(false);
  const error = ref(null);

  // fetch data ========================================================================================================================
  axios
    .get(url)
    .then((data) => {
      loading.value = false;
      loaded.value = true;
      result.value = data.data;
    })
    .catch((_error) => {
      error.value = _error;
      loading.value = false;
    });

  // return data ========================================================================================================================
  return {
    loading,
    result,
    loaded,
    error,
  };
};

export default useMousePosition;
