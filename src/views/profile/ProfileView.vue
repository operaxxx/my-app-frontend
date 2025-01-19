<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
import { mockUserApi } from '@/mock/user'

const userStore = useUserStore()
const loading = ref(false)
const formState = ref({
  nickname: '',
  email: '',
  avatar: ''
})

onMounted(() => {
  const userInfo = userStore.getUserInfo
  if (userInfo) {
    formState.value = {
      nickname: userInfo.nickname || '',
      email: userInfo.email || '',
      avatar: userInfo.avatar || ''
    }
  }
})

const handleSubmit = async () => {
  loading.value = true
  try {
    const userInfo = userStore.getUserInfo
    if (!userInfo) {
      throw new Error('用户未登录')
    }

    const updatedUser = await mockUserApi.updateUserInfo(userInfo.id, {
      nickname: formState.value.nickname,
      email: formState.value.email,
      avatar: formState.value.avatar
    })

    userStore.setUserInfo(updatedUser)
    message.success('个人信息更新成功')
  } catch (error) {
    if (error instanceof Error) {
      message.error(error.message)
    } else {
      message.error('更新失败，请重试')
    }
  } finally {
    loading.value = false
  }
}

// 模拟文件上传
const handleAvatarChange: UploadProps['onChange'] = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    return
  }

  // 模拟上传成功
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`
  formState.value.avatar = avatarUrl
  message.success('头像上传成功')
}
</script>

<template>
  <div class="profile-container">
    <a-card title="个人信息设置" :bordered="false">
      <a-form
        :model="formState"
        @finish="handleSubmit"
        layout="vertical"
      >
        <div class="avatar-wrapper">
          <a-upload
            name="avatar"
            list-type="picture-circle"
            class="avatar-uploader"
            :show-upload-list="false"
            action="/api/upload"
            @change="handleAvatarChange"
          >
            <img v-if="formState.avatar" :src="formState.avatar" alt="avatar" class="avatar-image" />
            <div v-else>
              <div class="ant-upload-text">上传头像</div>
            </div>
          </a-upload>
        </div>

        <a-form-item label="昵称" name="nickname">
          <a-input v-model:value="formState.nickname" placeholder="请输入昵称" />
        </a-form-item>

        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="formState.email" placeholder="请输入邮箱" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="loading">
            保存修改
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>
.profile-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: 100%;
}

.avatar-wrapper {
  text-align: center;
  margin-bottom: 24px;
}

.avatar-uploader {
  display: inline-block;
}

:deep(.ant-upload-select-picture-card) {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
