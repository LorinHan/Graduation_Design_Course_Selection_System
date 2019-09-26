<template>
  <div id="app">
    <div id="pwd" v-show="pwd_show">
      <input type="password" v-model="old_pwd" placeholder="原密码">
      <input type="password" v-model="pwd" placeholder="新密码">
      <input type="password" v-model="check_pwd" placeholder="确认新密码" style="margin-bottom:20px;">
      <mt-button size="small" style="margin-right: 10px;" @click="pwd_show = 0;">取消</mt-button>
      <mt-button type="primary" size="small" @click="changePwd">修改</mt-button>
    </div>
    <mt-header title="厦门华厦学院">
      <div slot="right" class="openKey" @click="open" v-if="header_show"><i class="iconfont icon-caidan"></i></div>
    </mt-header>
      <div :class="'openBox ' + show" @click="show = ''">
        <p><i class="iconfont icon-school"></i>商管院</p>
        <p><router-link to="/me"><i class="iconfont icon-user_name"></i>个人信息</router-link></p>
        <p @click="pwd_show = 1;show = '';pwd='';check_pwd='';"><i class="iconfont icon-user_name"></i>修改密码</p>
        <p @click="logout"><i class="iconfont icon-logout red"></i>退出</p>
      </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      show: "",
      pwd_show: 0,
      old_pwd: "",
      pwd: "",
      check_pwd: "",
      header_show: false
    }
  },
  methods: {
    open() {
      this.show == "show" ? this.show = "" : this.show = "show";
    },
    logout() {
      this.$router.push("/");
      this.open();
    },
    changePwd() {
      if(this.pwd != this.check_pwd) {return this.$toast({message: "新密码与确认密码不一致！请检查。", position: "middle", duration: 3000, iconClass: "mint-toast-icon mintui mintui-field-error"})}
      this.$ajax.post("/api/s/password", this.$qs.stringify({old_password: this.old_pwd, password: this.pwd})).then(res => {
        if(res.data.code == 0) {
          window.alert("密码修改成功，请重新登陆。");
          this.$router.push("/");
        } else {
          this.$toast({message: res.data.msg, position: "middle", duration: 3000, iconClass: "mint-toast-icon mintui mintui-field-error"})
        }
      })
    }
  },
  watch: {
    $route(to, from) {
      if(to.path == "/") {
        this.header_show = false;
      } else {
        this.header_show = true;
      }
      if(to.path == "/student/next") return document.getElementsByClassName("next")[0].classList.add("none");
      if(from.path == "/student/next" && to.path == "/student") return document.getElementsByClassName("next")[0].classList.remove("none");
    }
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  a{text-decoration: none;color: #000;}
  /* html, body{min-height:100%;}
  body{background-image: url("/static/bg.jpg");background-size: 100% 100%;background-repeat: no-repeat;} */
  span{font-size: 14px;}
  .mint-header{background-color: #fff;color: #333;border-bottom: 1px solid #f2f2f2;}
.v-modal{opacity: .7;}
.mint-cell-wrapper{background-image: none!important;}
.openKey{float:right; width:40px;height:40px; line-height: 40px; text-align: center;}
.openBox{z-index: 9999; background-color: #fff; width: 35%;position: absolute; top: 40px; right: 10px; box-shadow: 0 1px 1px#f2f2f2;display: none;animation: hideIndex .3s;z-index: 999;}
.openBox > p{height: 40px;line-height: 40px; font-size: 14px; border-bottom: 1px solid #f2f2f2;}
.iconfont {font-size: 20px;}
.openBox > p i{font-size: 18px;line-height: 40px; margin-left: 10%; margin-right: 5%;}
.show{display: block;}
.red{color: red;}
.mint-checklist-title{color: #333;margin-left: 20px;border-bottom: 1px solid #fff;padding-bottom: 5px;padding-left: 10px;font-weight: 600;}
.mint-header, .mint-cell, .mint-cell-value, .mint-field-core{background-color: rgba(252, 90, 90, 0);}
@keyframes show
{
from {opacity: 0; transform: translateY(-200px);}
to {opacity: 1;transform: translateY(0);}
}
.mint-checkbox-input[disabled]+.mint-checkbox-core{
  background-color: #26a2ff!important;
}
#pwd{
  width: 50%;
  position: absolute;
  left: 21.5%;
  top: 8%;
  background-color: #fff;
  box-shadow: 0 0 2px #c0c0c0;
  text-align: center;
  padding: 20px;
  z-index: 9999;
}
#pwd > input{height: 25px; margin-bottom: 10px; padding-left: 5px;}
#pwd > input{height: 25px; margin-bottom: 10px; padding-left: 5px;}
input:disabled{background-color: #fff;border: none;}
</style>
