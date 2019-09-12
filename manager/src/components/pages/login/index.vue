<template>
    <div id="login">
        <img src="/static/logo.png" alt="" class="logo">
        <div class="form">
            <el-input v-model="username" placeholder="用户名" class="form_item"></el-input>
            <el-input v-model="password" type="password" placeholder="密码" class="form_item"></el-input>
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
             if(this.username == "" || this.password == "") return this.$message({showClose: true, message: '请填写用户名和密码', type: 'warning'});
            this.$ajax.post("/api/auth/login", this.$qs.stringify({"name": this.username, "password": this.password})).then(res => {
                if(res.data.code == 0) {
                    localStorage.setItem("token", res.data.data.token);
                    this.$router.push("/home");
                } else if(res.data.code == 400) {
                    this.$message({showClose: true, message: '用户名或密码错误', type: 'error'})
                }
                // this.$router.push("/home")
                // } else if(data == "pwd err") {return this.$message("用户名或密码错误", 1000)} else if(data == "Server Error") {this.$message("服务端错误", 1000);}
            })
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