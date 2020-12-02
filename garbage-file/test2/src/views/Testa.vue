<template>
  <div>{{ number }}</div>

  <div>{{ numberDouble }}</div>

  <button @click="increment">+1</button>

  <br />
  <br />

  <div v-for="(n, index) in numbers" :key="index">
    {{ n }}
  </div>
  <button @click="addNumbers">add</button>

  <br />
  <br />

  <button @click="updateUser">update user</button>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onRenderTriggered, onUpdated, ref, watch } from 'vue';

// vue 2 采用 Object.defineProperty 来实现响应式
// 这种方式有局限性, 不能监听新增的字段
// 如果需要添加响应式字段, 必须用 Vue.set / this.$set
// Object.defineProperty(obj, 'count', {
//   get() {},
//   set() {},
// });

// vue 3 采用 Proxy 来实现响应式
// 这种方式可以监听任意字段, 且无需指定具体需要监听的字段
// 不在 Vue.set 和 this.$set
// new Proxy(data, {
//   get(key) {},
//   set(key, value, target) {},
// });

/**
 * vue2 生命周期对比 vue3
 * beforeCreate     setup
 * create           setup
 * beforeMount      onBeforeMount
 * mounted          onMounted
 * beforeUpdated    onBeforeUpdated
 * updated          onUpdated
 * beforeDestroy    onBeforeUnmount
 * destroy          onUnmounted
 * activated        onActivated
 * deactived        onDeactived
 * errorCaptured    onErrorCaptured
 */

/**
 * 什么是情况下会有副作用
 * 网络请求
 * 订阅数据变化
 */

type Data = {
  number: number;
  numberDouble: number;
  increment: () => void;
};

export default defineComponent({
  name: 'Testa',
  setup() {
    // data ========================================================================================================================
    const number = ref(0);

    const numbers = ref([1, 2, 3]);

    const user = ref({
      name: 'hello',
    });

    // computed ========================================================================================================================
    const numberDouble = computed(() => number.value * 2);

    // methods ========================================================================================================================
    const increment = () => {
      number.value++;
    };

    const addNumbers = () => {
      numbers.value.push(numbers.value.length + 1);
    };

    const updateUser = () => {
      user.value = {
        ...user.value,
        name: 'test',
      };
    };

    // watch ========================================================================================================================
    watch(number, () => {
      document.title = number.value.toString();
    });

    watch(
      () => user.value.name,
      () => {
        console.log(user.value.name);
      }
    );

    // lifecycle ========================================================================================================================
    onMounted(() => {
      console.log('onMounted');
    });

    onUpdated(() => {
      console.log('onUpdated');
    });

    onRenderTriggered((event) => {
      console.log(event);
    });

    // template data ========================================================================================================================
    return {
      number,
      numbers,
      user,
      numberDouble,
      increment,
      addNumbers,
      updateUser,
    };
  },
  // setup() {
  //   const data: Data = reactive({
  //     number: 0,
  //     numberDouble: computed(() => data.number * 2),
  //     increment: () => data.number++,
  //   });

  //   return {
  //     ...toRefs(data),
  //   };
  // },
});
</script>
