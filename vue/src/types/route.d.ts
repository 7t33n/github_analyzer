import 'vue-router';

export {};

export type IMiddleware = (
  (context: any) => void
);

declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'LayoutDefault';
    isAuth?: boolean;
    middleware?: IMiddleware | IMiddleware[];
  }
}
