import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('../views/LoginView.vue') },
  { path: '/register', component: () => import('../views/register/RegisterStep1.vue') },
  { path: '/register/step-2', component: () => import('../views/register/RegisterStep2.vue') },
  { path: '/register/step-3', component: () => import('../views/register/RegisterStep3.vue') },
  { path: '/dashboard', component: () => import('../views/DashboardView.vue') },
  { path: '/update-profile', component: () => import('../views/UpdateProfileView.vue') },
  { path: '/forgot-password', component: () => import('../views/ForgotPasswordView.vue') },
  { path: '/reset-password', component: () => import('../views/ResetPasswordView.vue') }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
