import Vue from 'vue'
import VueRouter from 'vue-router'

import { PAYMENT_STATUS } from '../constants'

import createRoutes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function({ store }) {
  const requiresAuth = (to, from, next) => {
    store.dispatch('global/setUser').then(() => {
      if (!store.state.global.user) {
        next('login')
      } else {
        switch (store.state.global.user.payment_status) {
          case PAYMENT_STATUS.PENDING:
            store.dispatch('global/createCheckoutSession')
            break

          case PAYMENT_STATUS.FAILED:
            // TODO: handle customer portal
            break

          default:
            next()
            break
        }
      }
    })
  }

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: createRoutes(requiresAuth),

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
