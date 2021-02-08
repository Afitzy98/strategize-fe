const createRoutes = requiresAuth => {
  return [
    {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('pages/Index.vue'),
          beforeEnter: requiresAuth
        },
        {
          path: '/about',
          name: 'About',
          component: () => import('pages/About.vue'),
          beforeEnter: requiresAuth
        },
        {
          path: '/coin/:coinId',
          name: 'Coin',
          component: () => import('pages/Coin.vue'),
          beforeEnter: requiresAuth
        },
        {
          path: '/favourites',
          name: 'Favourites',
          component: () => import('pages/Favourites.vue'),
          beforeEnter: requiresAuth
        },
        {
          path: '/login',
          name: 'Login',
          component: () => import('pages/Login.vue')
        },
        {
          path: '/terms',
          name: 'Terms & Conditions',
          component: () => import('pages/Terms.vue')
        }
      ]
    },
    // Always leave this as last one,
    // but you can also remove it
    {
      path: '*',
      component: () => import('pages/Error404.vue')
    }
  ]
}

export default createRoutes
