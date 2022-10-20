import {RouteRecordRaw} from "vue-router";
import auth from "@/middlewares/auth";
import access from "@/middlewares/access";

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'MainPage',
    component: () => import('@/pages/PageIndex.vue'),
    meta: {
      isAuth: true,
      layout: 'LayoutDefault',
      middleware: auth,
    },
  },
  {
    path: '/auth/',
    name: 'AuthPage',
    component: () => import('@/pages/PagesAuthIndex.vue'),
    meta: {
      isAuth: false,
      layout: 'LayoutDefault',
    },
  },
  {
    path: '/auth/access/',
    name: 'AuthAccessPage',
    component: () => import('@/pages/PagesAuthAccess.vue'),
    meta: {
      isAuth: false,
      layout: 'LayoutDefault',
      middleware: access,
    },
  },
  {
    path: '/dashboard/',
    name: 'DashboardPage',
    component: () => import('@/pages/PageDashboard.vue'),
    meta: {
      isAuth: true,
      layout: 'LayoutDefault',
      middleware: auth,
    },
  },
];
