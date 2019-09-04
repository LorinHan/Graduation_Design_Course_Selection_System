//引入我们的vue和vuex。
import Vue from 'vue'
import Vuex from 'vuex'
//使用我们vuex，引入之后用Vue.use进行引用
Vue.use(Vuex);

const state = {
    pages_list: [{"title": "选题管理", "url": "/home/tasks", active: 1}]
 }

const mutations={
    add(state, obj){
        state.pages_list.forEach(item => {
            item.active = 0;
        });
        if(obj.para) {
            state.pages_list.push({"title": obj.name, "url": obj.url, active: 1, "para": obj.para});
        } else {
            state.pages_list.push({"title": obj.name, "url": obj.url, active: 1});
        }
    },
    del(state, obj){
        state.pages_list.forEach((item, index) => {
            if(item.url == obj.url && item.para == obj.para) return state.pages_list.splice(index, 1);
        })
    },
    change_index(state, obj) {
        state.pages_list.forEach(item => {
            item.active = 0;
            if(item.para) {
                if(item.url == obj.url && item.para == obj.para) item.active = 1;
            } else {
                if(item.url == obj.url) item.active = 1;
            }
        });
    }
}
export default new Vuex.Store({
    state,mutations
});