<script setup lang="ts" name="SideMenu">
import { ref, watch } from 'vue'
import { useRouter, useRoute, type RouteRecordNormalized } from 'vue-router'

const route = useRoute()
const router = useRouter()
const menuItems = ref<RouteRecordNormalized[]>([])
const selectedKeys = ref<string[]>([])

// 同步当前路由到选中菜单
watch(
  () => route.path,
  (path) => {
    selectedKeys.value = [path]
  },
  { immediate: true }
)

// 处理菜单点击
const handleMenuClick = ({ key }: { key: string }) => {
  console.log('menu click:', key)
  router.push(key)
}

function loadMenu() {
  // 获取所有路由
  menuItems.value = router.getRoutes().filter((route) => {
    // 通过 meta 属性明确指定是否为一级菜单
    return route.meta?.isMenu && route.meta?.level === 1
  })

  // 处理子路由
  menuItems.value.forEach((route) => {
    if (route.children) {
      route.children = route.children.filter(
        (child) => child.meta?.isMenu && child.meta?.level === 2,
      )
    }
  })
}

loadMenu()
</script>

<template>
  <nav>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="handleMenuClick">
      <template v-for="item in menuItems" :key="item.path">
        <a-menu-item v-if="!item.children?.length" :key="item.path">
          <template #icon>
            <component :is="item.meta?.icon" />
          </template>
          <span>{{ item.meta?.title }}</span>
        </a-menu-item>

        <a-sub-menu v-else :key="`${item.path}`">
          <template #icon>
            <component :is="item.meta?.icon" />
          </template>
          <template #title>
            <span>{{ item.meta?.title }}</span>
          </template>
          <a-menu-item v-for="subItem in item.children" :key="subItem.path">
            <template #icon>
              <component :is="subItem.meta?.icon" />
            </template>
            <span>{{ subItem.meta?.title }}</span>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </nav>
</template>

<style lang="css" scoped></style>
