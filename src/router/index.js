import Vue from 'vue';
import Router from 'vue-router';

const Login = r => require.ensure([], () => r(require('@/components/Login.vue')), 'chunkname0')
const Student = r => require.ensure([], () => r(require('@/components/Student.vue')), 'chunkname1')
const CheckBox = r => require.ensure([], () => r(require('@/components/CheckBox.vue')), 'chunkname2')
const Order = r => require.ensure([], () => r(require('@/components/Order.vue')), 'chunkname3')
const Tip = r => require.ensure([], () => r(require('@/components/Tip.vue')), 'chunkname4')
const Intention = r => require.ensure([], () => r(require('@/components/Intention_list.vue')), 'chunkname5')
const Result = r => require.ensure([], () => r(require('@/components/Result.vue')), 'chunkname6')

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/student',
      name: 'Student',
      component: Student,
      children: [
        {path: '/', name: "CheckBox", component: CheckBox},
        {path: 'next', name: "Order", component: Order}
      ]
    },
    {
      path: '/',
      name: "Login",
      component: Login
    },
    {
      path: '/tip',
      name: "Tip",
      component: Tip
    },
    {
      path: '/intention',
      name: "Intention",
      component: Intention
    },
    {
      path: '/result',
      name: "Result",
      component: Result
    }
  ]
})
