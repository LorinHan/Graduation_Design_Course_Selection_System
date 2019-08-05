<template>
  <div id="app">
    <mt-header title="厦门华厦学院">
      <div slot="right" class="openKey" @click="open"><i class="iconfont icon-caidan"></i></div>
    </mt-header>
    <div :class="'openBox ' + show">
        <p><i class="iconfont icon-school"></i>商管院</p>
        <p><i class="iconfont icon-user_name"></i>xxx</p>
        <p @click="logout"><i class="iconfont icon-logout red"></i>退出</p>
      </div>
    <router-view/>

    <div class="footer" v-cloak v-if="footer">
      <div class="box"><router-link to="history" active-class="active_box"><i class="iconfont icon-history"></i> <p>历史任务</p></router-link></div>
      <div class="box"><router-link to="task" active-class="active_box"><i class="iconfont icon-renwu"></i> <p>当前任务</p></router-link></div>
      <div class="box"><router-link to="me" active-class="active_box"><i class="iconfont icon-wode"></i> <p>我的</p></router-link></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      show: "",
      footer: true
    }
  },
  methods: {
    open() {
      this.show == "show" ? this.show = "" : this.show = "show";
    },
    logout() {
      this.$router.push("/");
      this.open();
    }
  },
  watch: {
    $route( to , from ){   
       if(to.path == "/") {
         this.footer = false;
       } else if(to.path != "/") {
         this.footer = true;
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
.mint-msgbox-message{color: #ef4f4f;}
@keyframes hideIndex{
	0%{ opacity: 0; transform: translate(-500px, 0) }
	100%{opacity: 1; transform: translate(0, 0) }
}
.openKey{float:right; width:40px;height:40px; line-height: 40px; text-align: center;}
.openBox{background-color: #fff; width: 30%;position: absolute; top: 40px; right: 10px; box-shadow: 0 1px 1px#f2f2f2;display: none;animation: hideIndex .3s;z-index: 999;}
.openBox > p{height: 30px;line-height: 30px; font-size: 13px; border-bottom: 1px solid #f2f2f2;}
.iconfont {font-size: 20px;}
.openBox > p > i{font-size: 16px;line-height: 30px; margin-left: 10%; margin-right: 5%;}
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
</style>
