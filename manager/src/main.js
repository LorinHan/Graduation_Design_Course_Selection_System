// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import http from './router/http.js';
import router from './router'
import store from './store/store.js';
import Qs from 'qs';
import {Button, Input, Col, Menu, MenuItem, Submenu, MenuItemGroup, Table, TableColumn, Popover, Tag, Tabs, TabPane, Dropdown, DropdownMenu, DropdownItem, InputNumber, Radio, Message, Switch, Collapse, CollapseItem, Pagination, MessageBox, Dialog, Loading} from "element-ui";

Vue.prototype.$ajax = http
Vue.prototype.$qs = Qs;
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Input)
Vue.use(Col)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Dialog)
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
Vue.use(Pagination)
Vue.prototype.$message = Message;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$loading = Loading.service;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
