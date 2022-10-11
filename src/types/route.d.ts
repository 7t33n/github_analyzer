export {}

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // is optional
    layout?: string | 'default';
  }
}
