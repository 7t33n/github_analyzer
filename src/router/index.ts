import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/', component: () => import('@/components/views/pages/index.vue'), },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
