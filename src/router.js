import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About'
import Detail from './components/Detail'
import Map from './views/Map'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
      {
          path: '/detail/:id',
          name: 'detail',
          component: Detail,
          props: true
      },
      {
          path: '/map',
          name: 'map',
          component: Map
      }
  ]
})
