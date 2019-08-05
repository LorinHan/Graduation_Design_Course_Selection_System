import Vue from 'vue'
import Router from 'vue-router'

const Login = r => require.ensure([], () => r(require('@/components/Login.vue')), 'chunkname0');
const Teacher = r => require.ensure([], () => r(require('@/components/Teacher.vue')), 'chunkname1');
const Task = r => require.ensure([], () => r(require('@/components/Task.vue')), 'chunkname2');
const History = r => require.ensure([], () => r(require('@/components/History.vue')), 'chunkname3');
const Me = r => require.ensure([], () => r(require('@/components/Me.vue')), 'chunkname4');


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/task',
      name: 'Task',
      component: Task
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: Teacher
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    }
  ]
})
