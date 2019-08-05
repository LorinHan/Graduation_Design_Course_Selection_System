import Vue from 'vue';
import Router from 'vue-router';

const Login = r => require.ensure([], () => r(require('@/components/Login.vue')), 'chunkname0')
const Student = r => require.ensure([], () => r(require('@/components/Student.vue')), 'chunkname1')
const CheckBox = r => require.ensure([], () => r(require('@/components/CheckBox.vue')), 'chunkname2')
const Order = r => require.ensure([], () => r(require('@/components/Order.vue')), 'chunkname3')

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
    }
  ]
})
