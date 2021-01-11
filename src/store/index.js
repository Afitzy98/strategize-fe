import Vue from 'vue'
import Vuex from 'vuex'

import global from './global'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: { global },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./global'], () => {
      const newGlobal = require('./global').default
      Store.hotUpdate({ modules: { global: newGlobal } })
    })
  }

  return Store
}
