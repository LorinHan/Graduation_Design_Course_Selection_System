<template>
  <div id="users">
      <el-popover
            ref="popover_users"
            width="800"
            placement="start"
            popper-class="popo"
            trigger="click">
            <h2>新增管理员</h2>
            <p class="new_p"><span class="new_span">用户名：</span><el-input style="display:inline-block;width: 30%;" v-model="new_data.name" placeholder="用户名"></el-input></p>
            <p class="new_p"><span class="new_span">密&nbsp;&nbsp;&nbsp;码：</span><el-input style="display:inline-block;width: 30%;" v-model="new_data.password" type="password" placeholder="密码"></el-input></p>
            <p class="new_p"><span class="new_span">确认密码</span><el-input style="display:inline-block;width: 30%;" v-model="new_data.sure" type="password" placeholder="确认密码"></el-input></p>
            <p class="new_p"><span class="new_span">备&nbsp;&nbsp;&nbsp;注：</span><el-input style="display:inline-block;width: 30%;" v-model="new_data.description" type="text" placeholder="备注"></el-input></p>
            <el-button @click="send_new_data" type="success" style="display: block;margin: 10px auto;">确 定</el-button>
        </el-popover>
        <!-- <el-popover
            ref="popover_reset"
            width="800"
            placement="start"
            popper-class="popo resetPwd"
            trigger="click">
            <h2>重置密码</h2>
            <p class="new_p"><span class="new_span">将aaa的密码重置为:</span><el-input style="display:inline-block;width: 30%;" v-model="resetPwd" placeholder="请输入密码"></el-input></p>
            <div style="text-align: center;margin-top: 20px;">
                <el-button @click="close" type="danger">取 消</el-button>
                <el-button @click="send_new_data" type="success">确 定</el-button>
            </div>
        </el-popover> -->
      <el-button type="primary" size="small" class="newBtn" v-popover:popover_users icon="el-icon-circle-plus-outline">新增</el-button>
      <el-table
        :data="data"
        border
        style="width: 100%">
        <el-table-column
        prop="name"
        label="用户名">
        </el-table-column>
        <!-- <el-table-column
        prop="password"
        label="密码">
        </el-table-column> -->
        <el-table-column
        prop="description"
        label="备注">
        </el-table-column>
        <el-table-column
            width="300"
            label="操作">
            <template slot-scope="scope">
                <el-button @click="reset(scope.row.name, scope.row.id)"  type="primary" class="operationBtn" size="mini">重置密码</el-button>
                <!-- <el-button @click="edit(scope.row.name, scope.row.id)" class="operationBtn" size="mini">修改备注</el-button> -->
                <el-button type="danger" class="operationBtn" size="mini" @click="del(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            new_data: {
                name: "",
                password: "",
                sure: "",
                description: ""
            },
            data: [],
            resetPwd: ""
        }
    },
    methods: {
        // 添加新用户
        send_new_data() {
            if(this.new_data.name == "" || this.new_data.password == "" || this.new_data.sure == "") {
                return this.$message({showClose: true, message: '请完整填写表单！', type: 'error'});
            } else if(this.new_data.password != this.new_data.sure) {
                return this.$message({showClose: true, message: '密码与确认密码不一致！', type: 'error'});
            } else if(this.new_data.password.length < 6 || this.new_data.password.length > 16) {
                return this.$message({showClose: true, message: '请输入6-16位的密码！', type: 'error'});
            }
            this.$ajax.post("/api/users", this.$qs.stringify({"password": this.new_data.password, "name": this.new_data.name, "description": this.new_data.description})).then(res => {
                if(res.data.code == 0) {
                    document.getElementsByClassName("el-popover")[1].style.display = "none";
                    this.getData();
                    return this.$message({showClose: true, message: '添加成功', type: 'success'});
                } else {
                    this.$message({showClose: true, message: '添加失败', type: 'error'});
                }
            })
        },
        reset(name, id) {
            this.$messageBox.prompt('请输入密码', "用户：" + name, {
                confirmButtonText: '重置密码',
                cancelButtonText: '取消'
                }).then(({ value }) => {
                    this.$ajax.put("/api/users/" + id, this.$qs.stringify({"password": value})).then(res => {
                        if(res.data.code == 0) {
                            this.$message({
                                type: 'success',
                                message: name + '的密码重置成功'
                            });
                        }
                    })
                }).catch(() => {
                    console.log('取消');      
            });
        },
        // edit(name, id) {
        //     this.$messageBox.prompt('请输入备注', "用户：" + name, {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消'
        //         }).then(({ value }) => {
        //         this.$message({
        //             type: 'success',
        //             message: '备注: ' + value
        //         });
        //         }).catch(() => {
        //             console.log('取消');      
        //     });
        // },
        del(id) {
            this.$messageBox.confirm("确定要删除吗？", "提示", {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$ajax.delete("/api/users/" + id).then(res => {
                    if(res.data.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getData();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    }
                })
            }).catch(() => {
                console.log('取消');
            })
        },
        close() {
            document.getElementsByClassName("resetPwd")[0].style.display = 'none';
        },
        getData() {
            this.$ajax.get("/api/users").then(res => {
            if(res.data.code == 0) {
                this.data = res.data.data.data;
            }
        })
        }
    },
    created() {
        this.getData();
    }
}
</script>

<style scoped lang="less">
    #users{
        h2{text-align: center;border-bottom: 1px solid #fff;margin-bottom: 20px;}
        .new_p{margin: 20px 0;padding-left: 29%;}
        .new_span{font-size: 18px;margin-right: 20px;}
    }
</style>