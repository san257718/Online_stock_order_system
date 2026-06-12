import { createRouter, createWebHistory } from 'vue-router'

import AppShell from '../layouts/AppShell.vue'
import LoginView from '../views/auth/LoginView.vue'
import DashboardView from '../views/dashboard/DashboardView.vue'
import OrdersView from '../views/orders/OrdersView.vue'
import PortfolioView from '../views/portfolio/PortfolioView.vue'
import QuotesView from '../views/quotes/QuotesView.vue'
import SettingsView from '../views/settings/SettingsView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: '登入',
      layout: 'auth',
    },
  },
  {
    path: '/',
    component: AppShell,
    children: [
      {
        path: '',
        redirect: {
          name: 'dashboard',
        },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: {
          title: '總覽儀表板',
        },
      },
      {
        path: 'quotes',
        name: 'quotes',
        component: QuotesView,
        meta: {
          title: '市場報價',
        },
      },
      {
        path: 'orders',
        name: 'orders',
        component: OrdersView,
        meta: {
          title: '委託下單',
        },
      },
      {
        path: 'portfolio',
        name: 'portfolio',
        component: PortfolioView,
        meta: {
          title: '投資組合',
        },
      },
      {
        path: 'settings',
        name: 'settings',
        component: SettingsView,
        meta: {
          title: '系統設定',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

router.afterEach((to) => {
  const title = to.meta?.title ? `${to.meta.title} | 線上股票下單系統` : '線上股票下單系統'
  document.title = title
})

export { router }
