<template>
    <div id="login">
        <img src="/static/logo.png" alt="" class="logo">
        <div class="form">
            <el-input v-model="username" placeholder="用户名" class="form_item"></el-input>
            <el-input v-model="password" placeholder="密码" class="form_item"></el-input>
            <el-button type="success" class="form_item" @click="login">登 录</el-button>
        </div>
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
            this.$router.push("/home")
        }
    }
}
</script>
<style lang="less" scoped>
    #login{
        box-sizing: border-box;
        padding-top: 5%;
        background-image: url("/static/bg.jpg");
        background-size: 100% 100%;
        width:100%;
        height:100%;
        .form{
            padding-top: 4%; width: 22%;margin: 0 auto;
            .form_item{margin: 10px auto 20px auto; display: block;}
            .form_item:last-child{width: 75%; margin-top: 50px;}
        }
        .logo{
            display: block;
            width:150px;
            height:150px;
            margin: 0 auto;
        }
    }
</style>