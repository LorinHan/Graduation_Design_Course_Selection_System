<template>
    <div id="home">
        <div class="top">
            <img src="/static/logo.png" alt="">
            <p>厦门华厦学院 — 毕业设计选题管理系统</p>
            <el-button type="danger" size="mini" class="right" icon="el-icon-circle-close">退出</el-button>
            <el-button type="success" size="mini" plain class="right" icon="el-icon-setting" v-popover:popover_change_pwd>修改密码</el-button>
        </div>
        
         <el-popover
                ref="popover_change_pwd"
                width="800"
                placement="end"
                class="popo"
                popper-class="change_pwd"
                trigger="click">
            <h2 style="text-align: center;border-bottom: 1px solid #f2f2f2;">修改密码</h2>
            <div class="pwd_box">
                <span>原密码：</span><el-input placeholder="请输入原密码" v-model="old_pwd" type="password" size="small" style="width: 40%;"></el-input><br>
                <span>新密码：</span><el-input placeholder="请输入新密码" v-model="new_pwd" type="password" size="small" style="width: 40%;margin-top: 20px;"></el-input><br>
                <span>确认新密码：</span><el-input placeholder="确认新密码" v-model="check_pwd" type="password" size="small" style="width: 40%;margin-top: 20px;"></el-input>
            </div>
            <el-button style="display: block;margin: 0 auto;" type="success" @click="send_change_pwd">确定修改</el-button>
         </el-popover>
        <div class="left">
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo">
                    <el-menu-item style="padding-left: 0;text-align: center;" index="1" @click="link('选题管理', '/home/tasks')">
                        <i class="el-icon-document"></i>
                        <span slot="title">选题管理</span>
                    </el-menu-item>
                    <el-menu-item style="padding-left: 0;text-align: center;" index="2" @click="link('专业管理', '/home/majors')">
                        <i class="el-icon-share"></i>
                        <span slot="title">专业管理</span>
                    </el-menu-item>
                    <el-menu-item style="padding-left: 0;text-align: center;" index="3" @click="link('教师管理', '/home/teachers')">
                        <i class="el-icon-menu"></i>
                        <span slot="title">教师管理</span>
                    </el-menu-item>
                    <el-menu-item style="padding-left: 0;text-align: center;" index="4" @click="link('学生管理', '/home/students')">
                        <i class="el-icon-menu"></i>
                        <span slot="title">学生管理</span>
                    </el-menu-item>
                </el-menu>
        </div>
        <div class="center">
            <div class="pages">
                <div v-for="item in this.$store.state.pages_list" :key="item.id" :class="item.active == 1 ? 'page_box active': 'page_box'" @click="$store.commit('change_index', {url: item.url, para: item.para})"><router-link :to="item.para?{path: item.url, query: {id: item.para}}:{path: item.url}">{{item.title}}</router-link> <i class="el-icon-error" @click.stop="del(item.url, item.para)"></i></div>
            </div>
            <div class="content">
                <keep-alive>
                    <router-view :link="link" v-if="$route.meta.keepAlive" style="padding-top: 10px;"></router-view>
                    <router-view :link="link" v-if="!$route.meta.keepAlive" style="padding-top: 10px;"></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                old_pwd: "",
                new_pwd: "",
                check_pwd: ""
            }
        },
        methods: {
            link(name, url, para) {
                var store = this.$store;
                var exit = 0;
                store.state.pages_list.forEach(item => {
                    if(item.para) {
                        if(item.url === url && item.para === para) return exit = 1;
                    } else {
                        if(item.url === url) return exit = 1;
                    }
                });
                if(exit == 0) {
                    this.$store.commit("add", {name: name, url: url, para: para});
                }
                if(para) {
                    this.$router.push({path: url, query: {id: para}})
                } else {
                    this.$router.push(url)
                }
            },
            del(url, para) {
                if(this.$store.state.pages_list.length <= 1) return; 
                this.$store.commit("del", {url: url, para: para});
                if(this.$route.path == url) window.history.go(-1);
            },
            send_change_pwd() {
                if(this.old_pwd == "" || this.new_pwd == "" || this.check_pwd == "") return this.$message({ message: '请将表单填写完整', type: 'error'});
                if(this.check_pwd != this.new_pwd) return this.$message({ message: '新密码与确认密码不一致', type: 'error'});
            }
        },
        watch: {
            $route: function(to, from) {
                this.$store.commit("change_index", {url: to.path, para: to.query.id});
            }
        },
        created() {
            this.$router.push("/home/tasks")
        }
    }
</script>
<style lang="less" scoped>
    #home{
        width:100%;height:100%;
        .top{
            position: relative;
            width:100%;
            height:60px;
            background-color: #52bab5;
            box-sizing: border-box;
            padding: 0 20px;
            img{width:40px;height:40px;float:left;margin-top: 10px; margin-right: 15px;}
            p{line-height: 60px;color: #fff;font-size: 20px;}
            .right{position: absolute; right: 20px; top: 15px;}
            .right:last-child{right: 100px;}
        }
        .left{
            width:11%;
            height:100%;
            float: left;
            background-color: #f4f4f4;
            .inner{padding-left: 35%!important;}
        }
        .center{
            width:89%;
            height:100%;
            float: left;
            .pages{
                width:100%;
                height: 52px;
                box-shadow: 1px 1px 1px #ccc;
                box-sizing: normal;
                padding-top: 10px;
                a{color: #52bab5;}
                .page_box{
                    position: relative;
                    display: inline-block;
                    background-color: rgba(82,186,181, .2); margin-left: 12px; border-radius: 4px; border: 1px solid rgba(82,186,181,.2); line-height: 42px;font-size: 16px;text-align: center;
                    i{position: absolute; right: -10px; top: -10px; font-size: 16px; color: #52bab5; transition: all .3s;}
                    i:hover{color: red;}
                    a{ display: inline-block; left:0; height:100%; padding: 0 10px; height: 100%; width: auto;}
                }
                .active{
                    background-color: #52bab5;
                    a{color: #fff;}
                }
            }
            .content{
                padding: 20px 10px;
                .title{padding-bottom: 20px;border-bottom: 1px solid #5cc1c0;}
            }
        }
        .pwd_box{margin: 20px;padding-left: 28%;}
    }
</style>