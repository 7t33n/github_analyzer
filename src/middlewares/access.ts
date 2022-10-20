import { IContext } from '@/helpers/router/middlewares';
import { useUserStore } from '@/store/modules/user';

export default async function access({ to, router }: IContext) {
  const { code } = to.query;
  const userStore = useUserStore();

  if (typeof code === 'string') {
    await userStore.SIGN_IN(code);
    return router.push('/');
  }
  return router.push('/auth/');
}
