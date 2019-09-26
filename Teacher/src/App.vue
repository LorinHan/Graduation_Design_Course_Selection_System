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
      <router-view></router-view>

    <!-- <div class="footer" v-cloak v-if="footer">
       to="history"  active-class="active_box"
      <div class="box"><router-link to=""><i class="iconfont icon-history"></i> <p>历史选题</p></router-link></div>
      <div class="box"><router-link to="task" active-class="active_box"><i class="iconfont icon-renwu"></i> <p>当前选题</p></router-link></div>
      to="me"  active-class="active_box"
      <div class="box"><router-link to="/me"><i class="iconfont icon-wode"></i> <p>我的</p></router-link></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      show: "",
      footer: true,
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
      this.$ajax.post("/api/t/password", this.$qs.stringify({old_password: this.old_pwd, password: this.pwd})).then(res => {
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
    $route( to , from ){   
       if(to.path == "/") {
         this.footer = false;
         this.header_show = false;
       } else if(to.path != "/") {
         this.footer = true;
         this.header_show = true;
       }
     }
  }
}
</script>

<style>
*{margin: 0;padding: 0;}
a{text-decoration: none; color: #000;}
[v-cloak] { display: none; }
span{font-size: 13px;}
.mint-header{margin-bottom: 5%;background-color: #fff; color: #333;border-bottom: 1px solid #f2f2f2;}
.user{
    width:100%;
    height:30px;
    margin-top: -10%;
    margin-bottom: 10px;
    line-height: 30px;
    border-bottom: 1px solid #f2f2f2;
  }
.mint-tab-container-wrap{margin-top: 20px; box-shadow: 0 0 2px #f2f2f2;}
.mint-tab-container-item{
    animation: hideIndex 0.3s;
    -moz-animation: hideIndex  0.3s; /* Firefox */
		-webkit-animation: hideIndex  0.3s; /* Safari and Chrome */
		-o-animation: hideIndex  0.3s; /* Opera */}
.mint-msgbox-message{color: #333;}
@keyframes hideIndex{
	0%{ opacity: 0; transform: translate(-500px, 0) }
	100%{opacity: 1; transform: translate(0, 0) }
}
.openKey{float:right; width:40px;height:40px; line-height: 40px; text-align: center;}
.openBox{z-index: 9999; background-color: #fff; width: 35%;position: absolute; top: 40px; right: 10px; box-shadow: 0 1px 1px#f2f2f2;display: none;animation: hideIndex .3s;z-index: 999;}
.openBox > p{height: 40px;line-height: 40px; font-size: 14px; border-bottom: 1px solid #f2f2f2;}
.iconfont {font-size: 20px;}
.openBox > p i{font-size: 18px;line-height: 40px; margin-left: 10%; margin-right: 5%;}
.show{display: block;}
.red{color: red;}
.footer{
  width:100%;
  height: 40px;
  position: fixed;
  bottom: 0;
  background-color: #f9f9f9;
}
.footer > .box{float: left; width: 30%;border-radius: 15px;margin-left: 2.5%; text-align: center;line-height: 20px; font-size: 12px;}
.footer > .box i{font-size: 18px;}
.footer > div.active_box {font-size: 13px;}
.active_box i{color: #26a2ff; font-weight: 600;font-size: 20px;}
.active_box p {color: #26a2ff;}
.routerBtn{
  position: fixed;
  width: 110px;
  bottom: 100px;
  right: 0px;
  padding-right: 20px;
}
.routerBtn > a{display: block;width: 100%;}
.routerBtn > a > button{width:100%;}
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
input:disabled,textarea:disabled{background-color: #f0f0f0;border: 1px solid #c0c0c0;}
.mint-checkbox-input[disabled]+.mint-checkbox-core{background-color: #26a2ff;}
</style>
