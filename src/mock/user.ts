import type { UserInfo } from '@/stores/user'

export const mockUsers: Record<string, UserInfo> = {
  admin: {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    nickname: '管理员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  },
  user: {
    id: 2,
    username: 'user',
    email: 'user@example.com',
    nickname: '测试用户',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
  },
}

export const mockUserApi = {
  login: async (username: string, password: string): Promise<UserInfo> => {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user = mockUsers[username]
    if (!user || password !== '123456') {
      throw new Error('用户名或密码错误')
    }

    return user
  },

  updateUserInfo: async (userId: number, updateData: Partial<UserInfo>): Promise<UserInfo> => {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user = Object.values(mockUsers).find((u) => u.id === userId)
    if (!user) {
      throw new Error('用户不存在')
    }

    Object.assign(user, updateData)
    return user
  },
}
