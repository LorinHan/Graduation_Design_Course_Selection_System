<template>
    <div>
        <img class="logo" src="../../static/logo.png" alt="">
        <h3 class="title"><i class="mint-toast-icon mintui mintui-success"></i> 毕业设计选题系统 - 教师端</h3>
        <div class="inputBox">
            <mt-field label="教工号" placeholder="请输入教工号" type="username" v-model="username"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        </div>
        <mt-button type="primary" size="small" @click="login">登 录</mt-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        login() {
            this.$router.push("/task");
        }
    }
}
</script>
<style lang="less" scoped>
    .logo{width: 100px;height:100px;display: block; margin: 10% auto;}
    .inputBox{width:80%;margin: 10% auto;border-radius: 10px;}
    .title{text-align: center;}
    .mint-toast-icon{font-size: 14px; display: inline; color: #A0390E;}
    .mint-button{display: block;margin: 0 auto;width: 80px;}
</style>
