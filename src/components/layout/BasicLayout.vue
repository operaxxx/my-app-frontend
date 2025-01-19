<script lang="ts" setup>

import { ref } from 'vue'
import SideMenu from './SideMenu.vue'
import LayoutHeader from './LayoutHeader.vue'

const collapsed = ref<boolean>(false)

</script>

<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null">
      <div class="logo">
        <img v-if="collapsed" src="@/assets/logo-small.svg" alt="Logo" class="logo-small" />
        <template v-else>
          <img src="@/assets/logo.svg" alt="Logo" />
          <h1>Admin System</h1>
        </template>
      </div>
      <SideMenu />
    </a-layout-sider>
    <a-layout>
      <LayoutHeader v-model:collapsed="collapsed" />
      <a-layout-content class="content">
        <div class="content-container">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2023 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}

#components-layout-demo-side {
  height: 48px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}


.logo {
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.logo img {
  height: 32px;
  width: auto;
  margin: 0 auto;
}

.logo-small {
  height: 24px !important;
}

.logo h1 {
  color: #fff;
  font-size: 18px;
  margin: 0;
  white-space: nowrap;
  display: none;
}

.content {
  margin: 24px 16px;
  min-height: 280px;
}

.content-container {
  padding: 24px;
  background: #fff;
  min-height: 360px;
  border-radius: 2px;
}
</style>
