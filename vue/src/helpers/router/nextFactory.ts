import { IMiddleware } from '@/types/route';
import { IContext } from '@/helpers/router/middlewares';

export default function nextFactory(context: IContext, middleware: IMiddleware[], index: number) {
  const subsequentMiddleware = middleware[index];

  if (!subsequentMiddleware) return context.next;

  return () => {
    context.next();
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}
