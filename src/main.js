// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './router/http.js';
import Qs from 'qs';

// import VueDND from 'awe-dnd';

import Button from 'mint-ui/lib/button';
import Header from 'mint-ui/lib/header';
import Field from 'mint-ui/lib/field';
import Cell from 'mint-ui/lib/cell';
import Checklist from "mint-ui/lib/checklist";
import Popup from "mint-ui/lib/popup";
import Toast from 'mint-ui/lib/toast';
import MessageBox from "mint-ui/lib/message-box";
import Badge from 'mint-ui/lib/badge';

Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Field.name, Field);
Vue.component(Cell.name, Cell);
Vue.component(Checklist.name, Checklist);
Vue.component(Popup.name, Popup);
Vue.component(Badge.name, Badge);

// Vue.use(VueDND)

Vue.prototype.$toast = Toast;  
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$qs = Qs;
Vue.prototype.$ajax = http

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
