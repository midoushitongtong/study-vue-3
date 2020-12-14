<template>
  <template v-if="initDataComplete">
    <GlobalHeader />
    <router-view />
    <GlobalFooter />
  </template>
  <Loading v-else />
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css';
import { computed, defineComponent } from 'vue';
import GlobalHeader from '@/components/GlobalHeader.vue';
import GlobalFooter from '@/components/GlobalFooter.vue';
import { useStore } from '@/store';
import Loading from './components/Loading.vue';

export default defineComponent({
  components: {
    GlobalHeader,
    GlobalFooter,
    Loading,
  },
  name: 'App',
  setup() {
    // data ========================================================================================================================
    const store = useStore();

    // computed
    const initDataComplete = computed(() => store.state.app.initDataComplete);

    // template data ========================================================================================================================
    return {
      initDataComplete,
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

.loading {
  width: 100vw;
  height: 100vh;
}
</style>
