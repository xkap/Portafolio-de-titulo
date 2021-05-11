
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    //component: () => import('layouts/ReceptionLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Main.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
