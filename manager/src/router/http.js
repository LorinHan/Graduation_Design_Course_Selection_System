import axios from 'axios';
import router from './index';

// http request 拦截器
axios.interceptors.request.use(
    config => {
      if (localStorage.token) { //判断token是否存在
        config.headers.Authorization = "Bearer " + localStorage.token;  //将token设置成请求头
      } else {
        // router.replace('/login')
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
// http response 拦截器
axios.interceptors.response.use(
response => {
    if (response.data === "300") {
        alert("登陆失败")
    }
    return response;
},
error => {
    if(error.response.status == 401) {alert("登陆状态已过期，请重新登录");router.replace('/login');}
}
);

export default axios;