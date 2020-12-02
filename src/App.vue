<template>
  <GlobalHeader :user="user" />
  <router-view />
  <GlobalFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalHeader from '@/components/GlobalHeader.vue';
import GlobalFooter from '@/components/GlobalFooter.vue';
import { User } from '@/apis/user/types';

const user: User = {
  isLogin: false,
};

export default defineComponent({
  components: {
    GlobalHeader,
    GlobalFooter,
  },
  name: 'App',
  setup() {
    return {
      user,
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
