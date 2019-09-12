import Vue from 'vue'
import Router from 'vue-router'

const Login = r => require.ensure([], () => r(require('@/components/Login.vue')), 'chunkname0');
const Teacher = r => require.ensure([], () => r(require('@/components/Teacher.vue')), 'chunkname1');
const Task = r => require.ensure([], () => r(require('@/components/Task.vue')), 'chunkname2');
const History = r => require.ensure([], () => r(require('@/components/History.vue')), 'chunkname3');
const Me = r => require.ensure([], () => r(require('@/components/Me.vue')), 'chunkname4');
const History_task = r => require.ensure([], () => r(require('@/components/History_task.vue')), 'chunkname5');
const Result = r => require.ensure([], () => r(require('@/components/Result.vue')), 'chunkname6');
const Intention = r => require.ensure([], () => r(require('@/components/Intention.vue')), 'chunkname7');


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
    },
    {
      path: '/history_task',
      name: 'History_task',
      component: History_task
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    },
    {
      path: '/intention',
      name: 'Intention',
      component: Intention
    }
  ]
})
