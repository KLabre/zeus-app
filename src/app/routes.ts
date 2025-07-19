import {
  index,
  //route,
  type RouteConfig,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  // route('dashboard', 'routes/dashboard.tsx'),

  // TODO when implement RBAC:
  // route('admin', {
  //   path: '/admin',
  //   element: <AdminPanel />,
  //   handle: {
  //     requiresRole: 'Admin',
  //   },
  // }),
] satisfies RouteConfig;
