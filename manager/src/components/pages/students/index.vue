<template>
  <div id="students">
      <el-popover
            ref="popover_student"
            width="800"
            placement="start"
            popper-class="popo"
            trigger="click">
            <h2>添加学生</h2>
            <p class="new_p"><span class="new_span">姓名：</span><el-input style="display:inline-block;width: 70%;" v-model="new_data.name" placeholder="姓名"></el-input></p>
            <p class="new_p"><span class="new_span">学号：</span><el-input style="display:inline-block;width: 70%;" v-model="new_data.student_id" placeholder="学号"></el-input></p>
            <p class="new_p">
                <span class="new_span">专业：</span>
                <el-dropdown trigger="click" type="success" @command="change_major">
                <span class="el-dropdown-link">
                    <el-button type="success">
                    {{this.new_data.major}} <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in all_majors" :key="item.id" :command="item">{{item.major}}</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </p>
            <p class="new_p">
                <span class="new_span">学历层次：</span>
                <el-dropdown trigger="click" type="success" @command="change_category">
                <span class="el-dropdown-link">
                    <el-button type="success">
                    {{this.new_data.category.value}} <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in categorys" :key="item.id" :command="item">{{item.value}}</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </p>
            <p class="new_p">
                <span class="new_span">年级：</span>
                 <el-dropdown trigger="click" type="success" @command="change_grade">
                <span class="el-dropdown-link">
                    <el-button type="success">
                    {{this.new_data.grade}} <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in grade_list" :key="item" :command="item">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </p>
            <p class="new_p"><span class="new_span">密码：</span><el-input style="display:inline-block;width: 70%;" v-model="new_data.password" placeholder="密码"></el-input></p>
            <el-button @click="send_new_data" type="success" style="display: block;margin: 10px auto;">确 定</el-button>
        </el-popover>
        <input class="newBtn" type="file" id="students_file" @change="postTeacherFile">
      <!-- <el-button type="warning" size="small" class="newBtn" icon="el-icon-printer">批量导入</el-button> -->
      <el-button type="primary" size="small" class="newBtn"  v-popover:popover_student icon="el-icon-circle-plus-outline">新增</el-button>
      <MyTable :data="tableData" :handleEdit="handleEdit" :handleDetail="handleDetail" :majors="majors" :grade="grade" :filterMajor="filterMajor" :filterGrade="filterGrade" :type="'students'" :total_page="total_page" @getTeacherData="getStudentsData" :limit="limit"></MyTable>
  </div>
</template>

<script>
import MyTable from "../../MyTable";
export default {
    components: {"MyTable": MyTable},
    data() {
        return {
            tableData: [],
            grade: [],
            grade_list: [],
            majors: [],
            all_majors: ["电子商务", "国际贸易", "会计", "审计"],
            new_data: {name: "", student_id: "", major: "请选择专业", grade: "请选择年级", password: "", major_id: "", category: {id: 2, value: "本科"}},
            limit: 20,
            total_page: 0,
            categorys: [{id: 2, value: "本科"}, {id: 1, value: "高职"}]
        }
    },
    methods: {
        handleEdit(row) {
            console.log(row);
        },
        handleDetail(row) {
            console.log(row);
        },
        filterGrade(value, row) {
            return row.grade === value;
        },
        filterMajor(value, row) {
            return row.major === value;
        },
        send_new_data() {
            if(this.new_data.password.length < 6 || this.new_data.password.length > 16) return this.$message({showClose: true, message: '请保持密码长度为6-16位之间！', type: 'error'});
            let newData = this.new_data;
            this.$ajax.post("/api/students", this.$qs.stringify({major_id: newData.major_id, student_no: newData.student_id, name: newData.name, password: newData.password, grade: newData.grade, category: newData.category.id})).then(res => {
                if(res.data.code == 0) {
                    document.getElementsByClassName("popo")[1].style.display = "none";
                    this.$message({
                        showClose: true,
                        message: '添加成功！',
                        type: 'success'
                    });
                    this.getStudentsData(1);
                } else {
                    this.$message({
                        showClose: true,
                        message: "添加失败...",
                        type: 'error'
                    });
                }
            }).catch(() => {
                this.$message({
                        showClose: true,
                        message: "添加失败...",
                        type: 'error'
                    });
            })
            document.getElementsByClassName("popo")[1].style.display = "none";
        },
        change_major(value) {
            this.new_data.major = value.major;
            this.new_data.major_id = value.id;
        },
        change_grade(value) {
             this.new_data.grade = value;
        },
        change_category(value) {
            this.new_data.category = value;
        },
        getStudentsData(page, major_id, grade, category) {
            // 请求所有学生的数据
        this.$ajax.get("/api/students?limit=" + this.limit + "&page=" + page + "&major_id=" + major_id + "&grade=" + grade + "&category=" + category).then(res => {
            console.log(res)
            this.total_page = res.data.data.total;
            if(res.data.code == 0) {
                let newData = res.data.data.data.map(item => {
                    return {id: item.id, major: item.major_name, name: item.name, grade: item.grade, no: item.student_no, category: item.category == 2 ? "本科" : "高职"}
                });
                this.tableData = newData;
            }
        });
        },
        postTeacherFile() {
            let files = document.getElementById('students_file').files;
            var form = new FormData();
            form.append('excel_file', files[0]);
            this.$ajax.post("/api/students/import", form).then(res => {
                if(res.data.code == 0) {
                    this.$message({
                        showClose: true,
                        message: '上传成功',
                        type: 'success'
                    });
                    this.getStudentsData(1);
                } else {
                    this.$message({
                        showClose: true,
                        message: "上传失败...",
                        type: 'error'
                    });
                }
            }).catch(() => {
                this.$message({
                        showClose: true,
                        message: "上传失败...",
                        type: 'error'
                    });
            })
        }
    },
    created() {
        var data = new Date();
        var year = data.getFullYear();
        for(var i = 0; i <= 4; i ++) {
            this.grade_list.push(year - i);
        }
        for(var j = year;j >= 2016; j --) {
            this.grade.push({text: j, value: j});
        }
        this.grade.unshift({text: "所有年级", value: 0});
        this.getStudentsData(1, 0, 0, 0);
        // this.tableData.forEach(item => {
        //     var grade_exit = 0;
        //     var major_exit = 0;
        //     this.grade.forEach(exit_item => {
        //         if(exit_item.value == item.grade) grade_exit = 1;
        //     });
        //     this.majors.forEach(exit_item => {
        //         if(exit_item.value == item.major) major_exit = 1;
        //     });
        //     if(grade_exit == 0) this.grade.push({text: item.grade, value: item.grade});
        //     if(major_exit == 0) this.majors.push({text: item.major, value: item.major})
        // });
        this.$ajax.get("/api/majors").then(res => {
            if(res.data.code == 0) {
                let new_data = res.data.data.data.map(item => {
                    return {id: item.id, major: item.name};
                })
                this.all_majors = new_data;
                this.majors = new_data;
                this.all_majors.unshift({id: 0, major: "所有专业"});
            }
        });
    }
}
</script>

<style scoped lang="less">
    #students{
        h2{text-align: center;border-bottom: 1px solid #fff;margin-bottom: 20px;}
        .new_p{margin: 20px auto;width: 50%;}
        .new_span{font-size: 18px;margin-right: 20px;}
    }
</style>