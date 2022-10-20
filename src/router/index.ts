import {
  createRouter, createWebHistory,
  NavigationGuardNext, RouteLocationNormalized,
} from 'vue-router';
import middlewares from '@/helpers/router/middlewares';
import {routes} from "@/router/routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  middlewares(to, from, next, router);
});

export default router;
