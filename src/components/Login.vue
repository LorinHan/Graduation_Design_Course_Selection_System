<template>
    <div>
        <img class="logo" src="../../static/logo.png" alt="">
        <h3 class="title"><i class="mint-toast-icon mintui mintui-success"></i> 毕业设计选题系统</h3>
        <div class="inputBox">
            <mt-field label="学号" placeholder="请输入学号" type="username" v-model="username"></mt-field>
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
            this.$ajax.post("/api/auth/login", this.$qs.stringify({"name": this.username, "password": this.password})).then(res => {
                if(res.data.code == 0) {
                    localStorage.setItem("token", res.data.data.token);
                    this.$ajax.get("api/s/tasks").then(res2 => {
                        // 先判断id是否位0，0代表没有任务，然后再判断round——id是否wei2，如果是2则禁止学生操作
                        var res_data = res2.data.data;
                        localStorage.setItem("task_id", res_data.id);
                        if(res_data.id == 0) {
                            this.$router.push("/tip?id=0")
                        } else if(res_data.status == 0) {
                            this.$router.push("/tip?status=" + res_data.status)
                        } else if(res_data.status == 2) {
                            this.$router.push("/result");
                        } else if(res_data.status == 1 && res_data.round_status != 1) {
                            this.$router.push("/tip?round_status=" + res_data.round_status + "&round=" + res_data.round)
                        } else if("teachers" in res_data) {
                            localStorage.setItem("intention_number", res_data.intention_number)
                            localStorage.setItem("teachers_list", JSON.stringify(res_data.teachers));
                            this.$router.push("/student");
                        } else if("result" in res_data && res_data.result == true) {
                            localStorage.setItem("result", JSON.stringify(res_data.result.teacher_name));
                            this.$router.push("/result");
                        } else if("intention" in res_data && res_data.intention == true) {
                            this.$router.push("/intention");
                        }
                    });
                } else if(res.data.code == 400) {
                    this.$toast({message: "登陆失败...", position: "middle", duration: 2000, iconClass: "mint-toast-icon mintui mintui-field-error"})
                }
                // } else if(data == "pwd err") {return this.$message("用户名或密码错误", 1000)} else if(data == "Server Error") {this.$message("服务端错误", 1000);}
            })
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
