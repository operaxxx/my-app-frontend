<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const userInfo = computed(() => userStore.getUserInfo)

const props = defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void
}>()

const toggleCollapsed = () => {
  emit('update:collapsed', !props.collapsed)
}

const handleLogout = async () => {
  try {
    localStorage.removeItem('token')
    userStore.clearUserInfo()
    message.success('已安全退出')
    await router.push('/login')
  } catch (error) {
    message.error('退出失败，请重试')
  }
}

const handleEditProfile = () => {
  router.push('/profile')
}
</script>

<template>
  <a-layout-header class="header">
    <div class="header-left">
      <MenuUnfoldOutlined v-if="props.collapsed" class="trigger" @click="toggleCollapsed" />
      <MenuFoldOutlined v-else class="trigger" @click="toggleCollapsed" />
    </div>
    <div class="header-right">
      <a-dropdown v-if="userInfo">
        <a class="user-dropdown-link" @click.prevent>
          <a-avatar :src="userInfo.avatar" :size="32">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <span class="username">{{ userInfo.nickname || userInfo.username }}</span>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="profile" @click="handleEditProfile">
              <SettingOutlined />
              <span>个人设置</span>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="logout" @click="handleLogout">
              <LogoutOutlined />
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<style scoped>
.header {
  background: #fff;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  padding-right: 24px;
  display: flex;
  align-items: center;
}

.trigger {
  font-size: 18px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.user-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 12px;
  color: rgba(0, 0, 0, 0.65);
  transition: all 0.3s;
}

.user-dropdown-link:hover {
  background: rgba(0, 0, 0, 0.025);
}

.username {
  margin-left: 8px;
  font-size: 14px;
}
</style>
