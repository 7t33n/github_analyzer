import { IContext } from '@/helpers/router/middlewares';

export default function auth({ next, router }: IContext) {
  if (!localStorage.getItem('access_token')) {
    return router.push('/auth/');
  }

  return next();
}
