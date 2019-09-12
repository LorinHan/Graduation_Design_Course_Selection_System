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
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      show: ""
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
    $route(to, from) {
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
  /* html, body{min-height:100%;}
  body{background-image: url("/static/bg.jpg");background-size: 100% 100%;background-repeat: no-repeat;} */
  span{font-size: 14px;}
  .mint-header{margin-bottom: 5%; background-color: #fff;color: #333;border-bottom: 1px solid #f2f2f2;}
.v-modal{opacity: .7;}
.mint-cell-wrapper{background-image: none!important;}
.openKey{float:right; width:40px;height:40px; line-height: 40px; text-align: center;}
.openBox{background-color: #fff; width: 30%;position: absolute; top: 40px; right: 10px; box-shadow: 0 1px 1px#f2f2f2;display: none;animation: show .3s;}
.openBox > p{height: 30px;line-height: 30px; font-size: 13px; border-bottom: 1px solid #f2f2f2;}
.iconfont {font-size: 20px;}
.openBox > p > i{font-size: 16px;line-height: 30px; margin-left: 10%; margin-right: 5%;}
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
</style>
