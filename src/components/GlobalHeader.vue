<template>
  <div class="bg-primary">
    <div class="container">
      <nav class="navbar navbar-dark bg-primary justify-content-between mb-4">
        <RouterLink class="navbar-brand" to="/">者也专栏</RouterLink>
        <ul v-if="!user.isLogin" class="list-inline mb-0">
          <li class="list-inline-item">
            <RouterLink to="/login" class="btn btn-outline-light my-2">登陆</RouterLink>
          </li>
          <li class="list-inline-item">
            <RouterLink to="/login" class="btn btn-outline-light my-2">注册</RouterLink>
          </li>
        </ul>
        <ul v-else class="list-inline mb-0">
          <li class="list-inline-item">
            <Dropdown :title="`你好 ${user.name}`">
              <DropdownItem>
                <RouterLink to="/post/add" @click="handleDropdownCick">新建文章</RouterLink>
              </DropdownItem>
              <DropdownItem disabled>
                <a @click="handleDropdownCick">编辑资料</a>
              </DropdownItem>
              <DropdownItem>
                <a @click="handleLogout">退出登录</a>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { User } from '@/apis/user/types';
import Dropdown from '@/components/Dropdown.vue';
import DropdownItem from '@/components/DropdownItem.vue';
import { useStore } from '@/store';
import { AccountActions } from '@/store/modules/account/types';

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem,
  },
  props: {
    user: {
      required: true,
      type: Object as PropType<User>,
    },
  },
  setup() {
    // data ========================================================================================================================
    const store = useStore();

    // method ========================================================================================================================
    const handleDropdownCick = () => {
      console.log('菜单按下');
    };

    const handleLogout = () => {
      store.dispatch(AccountActions.UPDATE_USER, {
        isLogin: false,
      });
    };

    return {
      handleDropdownCick,
      handleLogout,
    };
  },
});
</script>
