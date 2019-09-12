// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import http from './router/http.js';
import Qs from 'qs';

import Header from "mint-ui/lib/header";
import Button from "mint-ui/lib/button";
import Field from "mint-ui/lib/field";
import TabContainer from 'mint-ui/lib/tab-container';
import TabContainerItem from "mint-ui/lib/tab-container-item";
import CheckList from "mint-ui/lib/checklist";
import Toast from "mint-ui/lib/toast";
import MessageBox from "mint-ui/lib/message-box";
import Badge from "mint-ui/lib/badge";

Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Field.name, Field);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(CheckList.name, CheckList);
Vue.component(Badge.name, Badge);
Vue.prototype.$toast = Toast;
Vue.prototype.$messageBox = MessageBox;
Vue.config.productionTip = false
Vue.prototype.$qs = Qs;
Vue.prototype.$ajax = http

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
