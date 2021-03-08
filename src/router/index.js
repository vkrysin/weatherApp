import Registration from '@/components/Registration.vue'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]
export default routes
