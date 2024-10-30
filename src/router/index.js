import Vue from 'vue'
import Router from 'vue-router'
const ProfilePage = () => import('@/pages/ProfilePage.vue')
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'profilePage',
      component: ProfilePage,
    },
    {
      path: '/profile',
      name: 'profilePage',
      component: ProfilePage,
    }
  ],
  mode: 'history'
})

export default router
