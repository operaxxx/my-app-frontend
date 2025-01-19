import { defineStore } from 'pinia'

export interface UserInfo {
  id: number
  username: string
  email: string
  avatar?: string
  nickname?: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null as UserInfo | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.userInfo,
    getUserInfo: (state) => state.userInfo,
  },

  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },

    clearUserInfo() {
      this.userInfo = null
    },

    async updateUserInfo(updateData: Partial<UserInfo>) {
      if (!this.userInfo) return

      // TODO: 调用后端 API 更新用户信息
      try {
        // const response = await api.updateUserInfo(updateData)
        this.userInfo = {
          ...this.userInfo,
          ...updateData,
        }
      } catch (error) {
        console.error('更新用户信息失败:', error)
        throw error
      }
    },
  },
})
