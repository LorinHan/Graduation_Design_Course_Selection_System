import Vue from 'vue'
import Router from 'vue-router'
const Home = r => require.ensure([], () => r(require('@/components/pages/Home')), 'chunkname0')
const Login = r => require.ensure([], () => r(require('@/components/pages/login')), 'chunkname1')
const Tasks = r => require.ensure([], () => r(require('@/components/pages/tasks/Task.vue')), 'chunkname2')
const Majors = r => require.ensure([], () => r(require('@/components/pages/majors/')), 'chunkname3')
const Teachers = r => require.ensure([], () => r(require('@/components/pages/teachers/')), 'chunkname4')
const Students = r => require.ensure([], () => r(require('@/components/pages/students/')), 'chunkname5')
const Infos = r => require.ensure([], () => r(require('@/components/pages/tasks/infos.vue')), 'chunkname6')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {path: "tasks", component: Tasks, meta: { keepAlive: true }},
        {path: "majors", component: Majors, meta: { keepAlive: true }},
        {path: "teachers", component: Teachers, meta: { keepAlive: true }},
        {path: "students", component: Students, meta: { keepAlive: true }},
        {path: "infos", component: Infos, meta: { keepAlive: false }}
      ]
    }
  ]
})
