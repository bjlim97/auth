import type { User } from '../types/User'

const USERS_KEY = 'users'
const CURRENT_USER_KEY = 'currentUser'

const fakeDelay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const authService = {
  async register(user: User) {
    await fakeDelay(1000)

    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')

    const exists = users.find(u => u.email === user.email)
    if (exists) throw new Error('Email already registered')

    users.push(user)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  },

  async login(email: string, password: string) {
    await fakeDelay(1000)

    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')

    const user = users.find(
      u => u.email === email && u.password === password
    )

    if (!user) throw new Error('Invalid credentials')

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  },

  logout() {
    localStorage.removeItem(CURRENT_USER_KEY)
  },

  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null')
  },

  async updateProfile(updatedUser: User) {
    await fakeDelay(1000)

    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')

    const index = users.findIndex(u => u.email === updatedUser.email)
    if (index === -1) throw new Error('User not found')

    users[index] = updatedUser
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))
  },

  async resetPassword(email: string, newPassword: string) {
    await fakeDelay(1000)

    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')

    const user = users.find(u => u.email === email)
    if (!user) throw new Error('Email not found')

    user.password = newPassword
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }
}
