<script setup lang="ts">
import { ref, reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'
import { mockUserApi } from '@/mock/user'

interface LoginForm {
  username: string
  password: string
}

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const loginForm = reactive<LoginForm>({
  username: '',
  password: ''
})

const handleSubmit = async (values: LoginForm) => {
  loading.value = true
  try {
    const userInfo = await mockUserApi.login(values.username, values.password)
    localStorage.setItem('token', '123456')
    userStore.setUserInfo(userInfo)
    message.success('登录成功')
    await router.push('/')
  } catch (error) {
    if (error instanceof Error) {
      message.error(error.message)
    } else {
      message.error('登录失败，请重试')
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>系统登录</h2>
      <a-form :model="loginForm" @finish="handleSubmit">
        <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名' }]">
          <a-input v-model:value="loginForm.username" placeholder="用户名">
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model:value="loginForm.password" placeholder="密码">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-button" :loading="loading">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--login-bg, #f0f2f5);
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 32px;
  border-radius: 8px;
  background: var(--login-box-bg, #fff);
  box-shadow: var(--login-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.15));
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: var(--login-title-color, rgba(0, 0, 0, 0.85));
}

.login-button {
  width: 100%;
}

/* 暗色主题 */
:root[data-theme='dark'] {
  --login-bg: #141414;
  --login-box-bg: #1f1f1f;
  --login-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
  --login-title-color: rgba(255, 255, 255, 0.85);
}

/* 亮色主题 */
:root[data-theme='light'] {
  --login-bg: #f0f2f5;
  --login-box-bg: #fff;
  --login-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  --login-title-color: rgba(0, 0, 0, 0.85);
}
</style>
