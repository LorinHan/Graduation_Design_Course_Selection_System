<template>
  <div id="teachers">
      <el-popover
            ref="popover_teacher"
            width="800"
            placement="start"
            popper-class="popo"
            trigger="click">
            <h2>新增教师</h2>
            <p class="new_p"><span class="new_span">姓名：</span><el-input style="display:inline-block;width: 70%;" v-model="new_data.name" placeholder="姓名"></el-input></p>
            <p class="new_p"><span class="new_span">教号：</span><el-input style="display:inline-block;width: 70%;" v-model="new_data.teacher_id" placeholder="教号"></el-input></p>
            <p class="new_p">
                <span class="new_span">专业：</span>
                <el-dropdown trigger="click" type="success" @command="change_major">
                <span class="el-dropdown-link">
                    <el-button type="success">
                    {{this.new_data.major}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in all_majors" :key="item.id" :command="item">{{item.major}}</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </p>
            <p class="new_p"><span class="new_span">专业技术职务：</span><el-input style="display:inline-block;width: 60%;" v-model="new_data.title" placeholder="多个职称请使用 / 分隔"></el-input></p>
            <p class="new_p"><span class="new_span">研究方向：</span><el-input style="display:inline-block;width: 70%;" v-model="new_data.research" placeholder="研究方向"></el-input></p>
            <p class="new_p"><span class="new_span">密码：</span><el-input style="display:inline-block;width: 70%;" v-model="new_data.password" type="password" placeholder="密码"></el-input></p>
            <el-button @click="send_new_data" type="success" style="display: block;margin: 10px auto;">确 定</el-button>
        </el-popover>
      <el-button type="warning" size="small" class="newBtn fileBtn" icon="el-icon-printer" @click="fileClick">批量导入</el-button>
      <input class="newBtn" type="file" id="teacher_file" @change="postTeacherFile">
      <el-button type="primary" size="small" class="newBtn" v-popover:popover_teacher icon="el-icon-circle-plus-outline">新增</el-button>
      <MyTable :data="tableData" :handleEdit="handleEdit" :handleDetail="handleDetail" :majors="majors" :filterMajor="filterMajor" :type="'teachers'" :total_page="total_page" @getTeacherData="getTeacherData" :limit="limit"></MyTable>
  </div>
</template>

<script>
import MyTable from "../../MyTable"
export default {
    components: {"MyTable": MyTable},
    data() {
        return {
            tableData: [],
            majors: [],
            all_majors: [],
            new_data: {name: "", teacher_id: "", major: "请选择专业", title: "", research: "", major_id: "", password: ""},
            limit: 20,
            total_page: 0
        }
    },
    methods: {
        // 触发file按钮
        fileClick() { document.getElementById('teacher_file').click(); },
        handleEdit(row) {
            console.log(row);
        },
        handleDetail(row) {
            console.log(row);
        },
        filterMajor(value, row) {
            return row.major === value;
        },
        send_new_data() {
            if(this.new_data.password.length < 6 || this.new_data.password.length > 16) return this.$message({showClose: true, message: '请保持密码长度为6-16位之间！', type: 'error'});
            let newData = this.new_data;
            this.$ajax.post("/api/teachers", this.$qs.stringify({major_id: newData.major_id, teacher_no: newData.teacher_id, name: newData.name, password: newData.password, title: newData.title, research: newData.research})).then(res => {
                if(res.data.code == 0) {
                    document.getElementsByClassName("popo")[1].style.display = "none";
                    this.$message({
                        showClose: true,
                        message: '添加成功！',
                        type: 'success'
                    });
                    this.getTeacherData(1);
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            })
        },
        change_major(value) {
            this.new_data.major = value.major;
            this.new_data.major_id = value.id;
        },
        getTeacherData(page, major_id) {
            // 请求所有教师的数据
        this.$ajax.get("/api/teachers?limit=" + this.limit + "&page=" + page + "&major_id=" + major_id).then(res => {
            this.total_page = res.data.data.total;
            if(res.data.code == 0) {
                let newData = res.data.data.data.map(item => {
                    return {id: item.id, major: item.major_name, name: item.name, research: item.research, no: item.teacher_no, title: item.title}
                });
                this.tableData = newData;
            }
        });
        },
        postTeacherFile() {
            let files = document.getElementById('teacher_file').files;
            var form = new FormData();
            form.append('excel_file', files[0]);
            const loading = this.$loading({
                lock: true,
                text: '上传中，请稍候...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$ajax.post("/api/teachers/import", form).then(res => {
                loading.close();
                if(res.data.code == 0) {
                    this.$message({
                        showClose: true,
                        message: '上传成功',
                        type: 'success'
                    });
                    this.getTeacherData(1);
                } else {
                    this.$message({
                        showClose: true,
                        message: "上传失败...",
                        type: 'error'
                    });
                }
            }).catch(() => {
                loading.close();
                this.$message({
                        showClose: true,
                        message: "上传失败...",
                        type: 'error'
                    });
            });
            // 清空，否则下次选择同一文件时不会触发change事件
            document.getElementById('teacher_file').value = "";
        }
    },
    created() {
        this.getTeacherData(1);
        // 获取所有专业的数据（下拉框使用）
        this.$ajax.get("/api/majors").then(res => {
            if(res.data.code == 0) {
                let new_data = res.data.data.data.map(item => {
                    return {id: item.id, major: item.name};
                })
                this.all_majors = new_data;
                this.majors = new_data;
                this.all_majors.unshift({id: 0, major: "所有专业"});
            }
        })
    }
}
</script>

<style scoped lang="less">
    #teachers{
        h2{text-align: center;border-bottom: 1px solid #fff;margin-bottom: 20px;}
        .new_p{margin: 20px auto;width: 50%;}
        .new_span{font-size: 18px;margin-right: 20px;}
        .fileBtn{position: absolute; right: 8px;width: 255px;}
    }
</style>