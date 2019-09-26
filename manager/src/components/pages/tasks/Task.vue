<template>
    <div>
        <el-popover
            ref="popover4"
            width="800"
            placement="start"
            popper-class="popo"
            trigger="click">
            <h2>新建选题</h2>
            <h3>1.请选择开始进行毕业设计的专业：</h3>
            <el-dropdown trigger="click" type="success" size="small" @command="change_major">
            <span class="el-dropdown-link">
                <el-button type="success" size="mini">
                {{this.new_data.major.major}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in majors" :key="item.id" :command="item">{{item.major}}</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
            <br>
            <h3>2.请选择开始进行毕业设计的年级：</h3>
            <el-dropdown trigger="click" type="success" size="small" @command="change_grade">
            <span class="el-dropdown-link">
                <el-button type="success" size="mini">
                {{this.new_data.grade}} <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in grade_list" :key="item" :command="item">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown><br>
            <h3>3.学历层次：</h3>
            <el-dropdown trigger="click" type="success" size="small" @command="change_category">
            <span class="el-dropdown-link">
                <el-button type="success" size="mini">
                {{this.new_data.category == 1 ? "高职" : "本科"}} <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in category_list" :key="item" :command="item">{{item == 1 ? "高职" : "本科"}}</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown><br>
            <h3>4.请确认每一位导师可选学生数量的默认值：</h3>
            <el-input-number v-model="new_data.tea_to_stu" @change="change_tea_to_stu" size="mini"></el-input-number><br>
            <h3>5.请确认每个学生可选志愿数量的默认值：</h3>
            <el-input-number v-model="new_data.intention_num" @change="change_intention_num" size="mini"></el-input-number><br>
            <h3>6.备注：</h3>
            <el-input v-model="new_data.description" style="width: 30%;"></el-input><br>
            <el-switch v-model="new_data.all_teachers"  inactive-text="将该专业的所有导师导入该选题任务中"></el-switch>
            <el-button type="primary" size="small" style="display:block;margin: 20px auto;" @click="send_new_data">确 定</el-button>
        </el-popover>
        <el-button type="primary" size="small" class="newBtn" v-popover:popover4 icon="el-icon-circle-plus-outline">新建选题</el-button>
        <MyTable :data="tableData" :handleEdit="handleEdit" :filterStatus="filterStatus" :formatter="formatter" :filterRoundStatus="filterRoundStatus" :roundStatusMatter="roundStatusMatter" :grade="grade" :majors="majors" :filterGrade="filterGrade" :filterMajor="filterMajor" :type="'tasks'" :link="link" :total_page="total_page" @getTeacherData="getTasks" :limit="limit"></MyTable>
    </div>
</template>

<script>
import MyTable from "../../MyTable"
export default {
    props: ["link"],
    components: {"MyTable": MyTable},
    data() {
        return {
            tableData: [],
            grade: [],// 存放筛选栏中年级的可选栏
            majors: [],// 存放筛选栏中专业的可选栏
            grade_list: [],
            category_list: [1, 2],  // 1高职，2本科
            new_data: {
                major: {id: 0, major: "请选择专业"},
                grade: "请选择年级",
                tea_to_stu: 5,
                intention_num: 5,
                all_teachers: true,
                category: 2,
                description: ""
            },
            limit: 20,
            total_page: 0
        }
    },
    methods: {
        handleEdit(row) {
            console.log(row);
        },
        roundStatusMatter(row, column) {
            if(row.round_status == 1) {return "学生选择中"}
            else if(row.round_status == 0) {return "未开启"}
            else if(row.round_status == 2) {return "教师选择中"}
        },
        formatter(row, column) {
            if(row.status == 1) {return "已开启"}
            else if(row.status == 0) {return "未开启"}
            else if(row.status == 2) {return "已结束"}
        },
        filterStatus(value, row) {
            return row.status === value;
        },
        filterRoundStatus(value, row) {
            return row.round_status === value;
        },
        filterGrade(value, row) {
            return row.grade === value;
        },
        filterMajor(value, row) {
            return row.major === value;
        },
        change_major(value) {
            this.new_data.major = value;
        },
        change_grade(value) {
            this.new_data.grade = value;
        },
        change_tea_to_stu(value) {
            this.new_data.tea_to_stu = value;
        },
        change_intention_num(value) {
            this.new_data.intention_num = value;
        },
        change_category(value) {
            this.new_data.category = value;
        },
        send_new_data() {   // 发送创建选题任务的请求
            let model = this.new_data;
            if (model.major.id == 0 || model.grade == "请选择年级") return this.$message({showClose: true, message: '请选择专业或年级！', type: 'error'});
            const send_data = {
                major_id: model.major.id,
                grade: model.grade,
                category: model.category,
                student_number: model.tea_to_stu,
                intention_number: model.intention_num,
                description: model.description.length == 0 ? "''" : model.description,
                all_teacher: model.all_teachers == true ? 1 : 0
            };
            this.$ajax.post("/api/tasks", this.$qs.stringify(send_data)).then(res => {
                if(res.data.code == 0) {
                    this.getTasks(1);
                    document.getElementsByClassName("popo")[1].style.display = "none";
                    this.$message({
                        showClose: true,
                        message: '创建成功！',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(() => {
                this.$message({
                        showClose: true,
                        message: '创建失败',
                        type: 'error'
                    });
            })
        },
        getTasks(page, major_id, grade) {
            if(!major_id) {major_id = 0}
            if(!grade) {grade = 0}
            // 请求所有教师的数据
            this.$ajax.get("/api/tasks?limit=" + this.limit + "&page=" + page + "&major_id=" + major_id + "&grade=" + grade).then(res => {
                this.total_page = res.data.data.total;
                if(res.data.code == 0) {
                    let newData = res.data.data.data.map(item => {
                        return {id: item.id, major: item.major_name, grade: item.grade, status: item.status, round: item.round, round_status: item.round_status, category: item.category == 2 ? "本科" : item.category == 1 ? "高职" : "error"}
                    });
                    this.tableData = newData;
                }
            });
        }
    },
    created() {
        var data = new Date();
        var year = data.getFullYear();
        for(var i = 0; i <= 4; i ++) {
            this.grade_list.push(year - i);
        }
        // this.majors.push({text: "所有专业", value: "所有专业"})
        this.grade.push({text: "所有年级", value: "所有年级"});
        this.getTasks(1);
        this.tableData.forEach(item => {
            var grade_exit = 0;
            var major_exit = 0;
            this.grade.forEach(exit_item => {
                if(exit_item.value == item.grade) grade_exit = 1;
            });
            // this.majors.forEach(exit_item => {
            //     if(exit_item.value == item.major) major_exit = 1;
            // });
            if(grade_exit == 0) this.grade.push({text: item.grade, value: item.grade});
            // if(major_exit == 0) this.majors.push({text: item.major, value: item.major})
        });
        // 获取专业列表
        this.$ajax.get("/api/majors").then(res => {
            if(res.data.code == 0) {
                let new_data = res.data.data.data.map(item => {
                    return {id: item.id, major: item.name};
                })
                this.majors = new_data;
            }
        })
    }
}
</script>

<style scoped>
.popo h2{text-align: center;border-bottom: 1px solid #fff;margin-bottom: 20px;}
.popo h3{margin-bottom: 30px;display: inline-block;}
</style>