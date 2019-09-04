// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import http from './router/http.js';
import router from './router'
import store from './store/store.js'
import {Button, Input, Col, Menu, MenuItem, Submenu, MenuItemGroup, Table, TableColumn, Popover, Tag, Tabs, TabPane, Dropdown, DropdownMenu, DropdownItem, InputNumber, Radio, Message, Switch, Collapse, CollapseItem} from "element-ui";

Vue.prototype.$ajax = http
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Input)
Vue.use(Col)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Popover)
Vue.use(Tag)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(Switch)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
