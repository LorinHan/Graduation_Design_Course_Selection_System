<template>
  <div>
      <el-tabs type="border-card">
        <el-tab-pane label="基础信息">
            <el-dialog
                title="轮次开启时间配置"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
                教师选择时长：<input type="number" style="width:50px;padding: 2px 0 2px 5px;" v-model="tea_time"> 分钟<br><br>
                学生选择时长：<input type="number" style="width:50px;padding: 2px 0 2px 5px;" v-model="stu_time"> 分钟
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="start">确 定</el-button>
                </span>
            </el-dialog>
            <div class="base">
                <!-- id: {{id}} -->
                <p><span>专业：</span>{{this.data.major_name}}</p>
                <p><span>学历层次：</span>{{this.data.category == 2 ? "本科" : this.data.category == 1 ? "高职" : "error"}}</p>
                <p><span>年级：</span>{{this.data.grade}}</p>
                <p><span>选题状态：</span>{{this.data.status == 0 ? '未开启': this.data.status == 1 ? '已开启': '已结束'}}</p>
                <p><span>轮次：</span>第{{this.data.round}}轮</p>
                <p><span>轮次状态：</span>{{this.data.round_status == 0 ? '未开启': this.data.round_status == 1 ? '学生选择中': '教师选择中'}}</p>
                <p><span>导师可选学生默认数量：</span>{{this.data.student_number}}</p>
                <p><span>学生可选志愿数量：</span>{{this.data.intention_number}}</p>
                <p><span>描述：</span>{{this.data.description == "''" ? "" : this.data.description}}</p>
                <p><span>当前轮次开始时间：</span>{{this.data.round_time}}</p>
                <p><span>学生选择截止时间：</span>{{this.data.student_time}}</p>
                <p><span>教师选择截止时间：</span>{{this.data.teacher_time}}</p>
                <div style="margin-top: 40px;text-align: center;">
                    <!-- <el-button type="success" @click="start">启动第 {{data.round + 1}} 轮</el-button> -->
                    <el-button v-if="data.round_status == 0" type="success" @click="centerDialogVisible = true" :disabled="this.data.round_status == 0 ? false : true">开启本轮学生选题</el-button>
                    <el-button v-else-if="data.round_status == 1" type="success" @click="centerDialogVisible = true" :disabled="this.data.round_status == 0 ? false : true">开启本轮教师选题</el-button>
                    <el-button v-else-if="data.round_status == 2" type="success" @click="start" :disabled="this.data.round_status == 0 ? false : true">停止当前轮次</el-button>
                    <el-button type="danger" @click="finish" :disabled="this.data.round_status == 0 ? false : true">结束当前选题</el-button>
                    <el-button type="primary" @click="published" :disabled="this.data.round_status == 0 ? false : true">发布结果</el-button>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="分配教师">
            <el-button type="primary" size="small" class="newBtn" v-popover:popover_pd_teacher icon="el-icon-circle-plus-outline">分配导师</el-button>
            <!-- 弹出框和折叠面板 -->
            <el-popover
                ref="popover_pd_teacher"
                placement="start"
                class="popo"
                popper-class="pd_popo"
                trigger="click">
                <h2>分配导师</h2>
                <el-collapse v-model="activeNames">
                    <el-collapse-item :title="item.major" :name="item.major" v-for="item in teachers_data" :key="item.major">
                        <el-table
                            ref="multipleTable"
                            :data="item.list"
                            tooltip-effect="dark"
                            @selection-change="(value) => {handleSelectionChange(value, item.major)}">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="no"
                            label="教工号"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="姓名">
                            </el-table-column>
                            <el-table-column
                            prop="title"
                            label="职称">
                            </el-table-column>
                            <el-table-column
                            label="可选学生数量">
                            <template slot-scope="scope">
                            <el-input-number v-model="scope.row.tea_to_stu_num" size="small"></el-input-number>
                            </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
                <el-button @click="send_pd_teachers" type="success" style="display: block;margin: 10px auto;">确 定</el-button>
            </el-popover>
            <!-- 配对页的表格 -->
            <el-table
                :data="choosed_teachers"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                prop="major"
                label="专业">
                </el-table-column>
                <el-table-column
                prop="no"
                label="教工号"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名">
                </el-table-column>
                <el-table-column
                prop="title"
                label="职称">
                </el-table-column>
                <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="delTaskTeacher(scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <!-- <el-button class="sure" type="success" @click="send_pd_teachers">确认提交</el-button> -->
        </el-tab-pane>
        <el-tab-pane label="志愿详情">
            <el-table
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                prop="round"
                label="轮次"
                :filters="round_list"
                :filter-method="filterRound">
                </el-table-column>
                <el-table-column
                prop="student"
                label="学生姓名"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="teacher"
                label="所选教师">
                </el-table-column>
                <el-table-column
                prop="level"
                label="第几志愿">
                </el-table-column>
                <el-table-column
                prop="submit_time"
                width="200"
                label="提交时间">
                </el-table-column>
                <el-table-column
                prop="result"
                :formatter="formatter"
                :filters="results"
                :filter-method="filterResult"
                label="结果">
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="配对详情">
            <!-- <h3 class="title" style="margin-bottom: 20px;">配对情况</h3> -->
            <!-- <div class="pd_infos">
                <p>学生：<span>已成功配对：<strong>55 </strong>人;</span><span>未配对：<strong style="color:red;">20 </strong>人；</span></p>
                <p>教师：<span>已选满学生的导师：<strong>8 </strong>人;</span><span>未选满学生的导师：<strong style="color:red;">4 </strong>人；</span></p>
            </div> -->
              <!-- 筛选栏 -->
                <div class="select">
                    <el-dropdown trigger="click" @command="selectStatus">
                    <el-button type="success" size="mini">
                        {{pd_status == 0 ? '未匹配' : pd_status == 1 ? '匹配成功' : "所有"}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in [{text: '所有', value: -1}, {text: '未匹配', value: 0}, {text: '匹配成功', value: 1}]" :key="item.value" :command="item.value">{{item.text}}</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                    <el-input v-model="select_student" style="width:130px;" placeholder="按学号查找"></el-input>
                    <el-input v-model="select_teacher" style="width:130px;" placeholder="按教工号查找"></el-input>
                    <el-button type="primary" style="margin-left: 20px;" size="mini" @click="send_select">筛选</el-button>
                    <el-button type="danger" size="mini" @click="reset_select">重置</el-button>
                </div>
            <el-popover
                ref="popover_distribution"
                width="800"
                placement="start"
                class="popo"
                popper-class="pd_popo pd_info_popo"
                trigger="click">
                <h2>分配教师</h2>
                <p>学号：{{distribution_data.student_no}}</p>
                <p>姓名：{{distribution_data.student}}</p>
                <p>选择导师：
                    <el-dropdown trigger="click" @command="change_teacher">
                        <el-button type="primary" size="mini">{{distribution_data.teacher == "" ? "请选择导师" : distribution_data.teacher}}</el-button>
                        <el-dropdown-menu slot="dropdown" class="shit">
                            <el-dropdown-item v-for="item in no_student_data" :key="item.id" :command="[item.teacher_no, item.name]">{{item.teacher_no + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + item.name}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </p>
                <p style="padding-top: 20px;border-top: 1px solid #f2f2f2;">
                    <el-button size="small" type="danger" @click="close_distribution_popo">取消</el-button>
                    <el-button size="small" type="success" @click="send_distribution">确定</el-button>
                </p>
            </el-popover>
            <el-table
                :data="pdTableData"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                prop="round"
                label="选中轮次">
                </el-table-column>
                <el-table-column
                prop="student_no"
                label="学号">
                </el-table-column>
                <el-table-column
                prop="student"
                label="学生姓名">
                </el-table-column>
                <el-table-column
                prop="teacher"
                label="配对教师">
                </el-table-column>
                <el-table-column
                prop="user_assigned"
                :formatter="pd_formatter"
                label="配对方式">
                </el-table-column>
                <el-table-column
                label="状态">
                <template slot-scope="scope">
                    {{scope.row.status == 1 ? "配对成功" : "未配对"}}
                </template>
                </el-table-column>
                <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="distribution(scope.row)">分配教师</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.query.id,
            data: [],
            tableData: [],
            round_list: [],
            multipleSelection: {}, // 配置教师的选项
            results: [{text: "待确认", value: 0}, {text: "确认成功", value: 1}, {text: "选择失败", value: 2}],
            pdTableData: [],
            // 未选满的教师
            no_student_data: [],
            pd_status: -1,
            // 已选择的教师列表
            choosed_teachers: [],
            // 所有教师按专业分类
            teachers_data: [],
                activeNames: ['电子商务'],
            // 为每一个学生指定教师的数据集
            distribution_data: {student_no: "", student: "", teacher_no: "", teacher: "", id: 0},
            all_majors: [],
            select_student: "",
            select_teacher: "",
            stu_time: 15,
            tea_time: 15,
            centerDialogVisible: false
        }
    },
    methods: {
        start() {
            // 发送轮次启停的请求：
            if(!/^\d+$/.test(this.stu_time) || !/^\d+$/.test(this.tea_time)) return this.$message({ type: 'error', message: '请输入纯数字' });
                        this.tea_time = parseInt(this.tea_time);
                        this.stu_time = parseInt(this.stu_time);
                        // 发送请求
                        this.$ajax.put("/api/tasks/" + this.id, this.$qs.stringify({"student_time": this.stu_time, "teacher_time": this.tea_time})).then(res => {
                            if(res.data.code == 0) {
                                    this.$message({
                                        message: '操作成功！',
                                        type: 'success'
                                    });
                                    this.centerDialogVisible = false;
                                    // 刷新数据
                                    this.$ajax.get("/api/tasks/" + this.id).then(data => {
                                        this.data = data.data.data;
                                    });
                                    // 获取分配在该任务的教师
                                    this.getChoosedTeachers();
                                    // 获取可分配教师
                                    this.forEachNoStudentData();
                                    // 获取志愿详情列表
                                    this.getIntentions();
                                    // 获取已配对的志愿列表
                                    this.getPdIntentions(-1);
                                    // 获取还有余量的老师
                                    this.get_no_student_data();
                                }
                            });
        },
        next_round() {
            this.$message({
                message: '该选题成功进入下一轮！',
                type: 'success'
            });
            this.$router.push("/home/tasks")
        },
        filterRound(value, row) {
            return row.round === value;
        },
        filterResult(value, row) {
            return row.result === value;
        },
        // 结束当前选题
        finish() {
            this.$messageBox.confirm("确定要结束该选题吗？", "提示", {
                confirmButtonText: '结束',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$ajax.post("/api/tasks/" + this.id + "/stop").then(res => {
                    if(res.data.code == 0) {
                        this.$message({
                            message: '成功结束该选题！',
                            type: 'success'
                        });
                        // 刷新数据
                        this.$ajax.get("/api/tasks/" + this.id).then(data => {
                            this.data = data.data.data;
                        });
                        // 获取分配在该任务的教师
                        this.getChoosedTeachers();
                        // 获取可分配教师
                        this.forEachNoStudentData();
                        // 获取志愿详情列表
                        this.getIntentions();
                        // 获取已配对的志愿列表
                        this.getPdIntentions(-1);
                        // 获取还有余量的老师
                        this.get_no_student_data();
                    } else {
                        this.$message({
                            message: '操作失败',
                            type: 'error'
                        });
                    }
                });
            }).catch(() => { console.log("取消"); })
            
            
        },
        formatter(row, column) {
            if(row.result == 1) {return "确认成功"}
            else if(row.result == 0) {return "待确认"}
            else if(row.result == 2) {return "选择失败"}
        },
        pd_formatter(row, column) {
            if(row.teacher == "") {return ""}
            if(row.user_assigned == 1) {return "用户自行分配"}
            else if(row.user_assigned == 2) {return "管理员系统分配"}
        },
        // 配对详情中分配导师的下拉框
        change_teacher(value) {
            this.distribution_data.teacher_no = value[0];
            this.distribution_data.teacher = value[1];
        },
        selectStatus(value) { this.pd_status = value; },
        send_select() {
            this.getPdIntentions(this.pd_status, this.select_student, this.select_teacher);
        },
        reset_select() {this.pd_status = -1;this.select_student = "";this.select_teacher = ""},
        // 分配教师栏的弹出层的下拉选项框被操作, val是所有被选中的选项的数组
        handleSelectionChange(val, major) {
            this.multipleSelection[major] = val;
        },
        // 分配教师栏中的确定按钮，提交选中的教师作为该选题任务的教师
        send_pd_teachers() {
            let send_data = []
            for(let item in this.multipleSelection) {
                this.multipleSelection[item].map(major_item => {
                    send_data.push({"teacher_no": major_item.no, "assigned_number": major_item.tea_to_stu_num});
                });
            }
            this.$ajax.post("/api/tasks/" + this.id + "/teachers/allocate", send_data, {headers: {'Content-Type': 'application/json'}}).then(res => {
                if(res.data.code == 0) {
                    document.getElementsByClassName("pd_popo")[0].style.display = "none";
                    this.getChoosedTeachers();
                    this.$message({
                        showClose: true,
                        message: "分配成功！",
                        type: 'success'
                    });
                }
            })
        },
        // 给每一个学生指定分配教师
        distribution(row) {
            document.getElementsByClassName("pd_info_popo")[0].style.display = "block"
            this.distribution_data.student_no = row.student_no;
            this.distribution_data.student = row.student;
            this.distribution_data.id = row.id;
        },
        close_distribution_popo() {this.distribution_data.teacher = "";this.distribution_data.teacher_no = "";document.getElementsByClassName("pd_info_popo")[0].style.display = "none";},
        // 系统分配
        send_distribution() {
            console.log(this.distribution_data);
            this.$ajax.put("/api/tasks/" + this.id + "/students/" + this.distribution_data.id, this.$qs.stringify({teacher_no: this.distribution_data.teacher_no})).then(res => {
                if(res.data.code == 0) {
                    document.getElementsByClassName("pd_popo")[1].style.display = "none";
                    // 获取分配在该任务的教师
                    this.getChoosedTeachers();
                    // 获取可分配教师
                    this.forEachNoStudentData();
                    // 获取志愿详情列表
                    this.getIntentions();
                    // 获取已配对的志愿列表
                    this.getPdIntentions(-1);
                    // 获取还有余量的老师
                    this.get_no_student_data();
                    this.$message({
                        showClose: true,
                        message: '操作成功！',
                        type: 'success'
                    });
                }
            })
        },
        // 删除选题中的教师
        delTaskTeacher(row) {
            let tea_id = row.id;
            this.$ajax.delete("/api/tasks/" + this.id + "/teachers/" + tea_id).then(res => {
                if(res.data.code == 0) {
                    this.getChoosedTeachers();
                }
            })
            // let taskId = this.$route.query.id;
            // console.log(teaNo, taskId);
        },
        // 获取分配在该任务的教师
        getChoosedTeachers() {
             this.$ajax.get("/api/tasks/" + this.id + "/teachers").then(res => {
                 if(res.data.code == 0) {
                        let newData = res.data.data.map(item => {
                            return {id: item.id, major: item.major_name, name: item.name, no: item.teacher_no, title: item.title}
                        });
                        this.choosed_teachers = newData;
                    }
            });
        },
        // 获取未分配满学生的教师
        getNoStudentData(major, major_id) {
            this.$ajax.get("/api/tasks/" + this.id + "/teachers/available?major_id=" + major_id).then(res => {
                if(res.data.code == 0) {
                    let data = res.data.data.map(item => {
                    return {no: item.teacher_no, name: item.name, title: item.title, tea_to_stu_num: this.data.student_number}
                });
                this.teachers_data.push({major: major, list: data});
                }
            })
        },
        // 循环专业列表获取每个专业未分配满学生的教师
        forEachNoStudentData() {
            this.teachers_data = [];
            this.all_majors.forEach(item => {
                this.getNoStudentData(item.major, item.id)
            });
        },
        // 获取志愿详情列表
        getIntentions() {
            this.$ajax.get("api/tasks/" + this.id + "/intentions").then(res => {
                if(res.data.code == 0) {
                    this.tableData = res.data.data.data.map(item => {
                        return {
                            round: item.round,
                            student: item.student_name,
                            teacher: item.teacher_name,
                            level: item.level,
                            submit_time: item.submit_time,
                            result: item.result
                        }
                    })
                }
            })
        },
        // 获取已配对的志愿列表
        getPdIntentions(status, stu_no, tea_no) {
            let url = "/api/tasks/" + this.id + "/students?status=" + status;
            if(stu_no) {url += "&student_no=" + stu_no}
            if(tea_no) {url += "&teacher_no=" + tea_no}
            // if(status) {
            //     url += "?status="
            // }
            this.$ajax.get(url).then(res => {
                if(res.data.code == 0) {
                    this.pdTableData = res.data.data.data.map(item => {
                        return {
                            id: item.id,
                            round: item.round,
                            student_no: item.student_no,
                            student: item.student_name,
                            teacher: item.teacher_name,
                            user_assigned: item.assigned,
                            status: item.status
                        }
                    })
                }
            })
        },
        // 获取有余量的老师
        get_no_student_data() {
            // no_student_data
            this.$ajax.get("/api/tasks/" + this.id + "/teachers?free=1").then(res => {
                this.no_student_data = res.data.data;
            })
        },
        published() {
            this.$ajax.post("/api/tasks/" + this.id + "/publish").then(res => {
                if(res.data.code == 0) {
                    this.$message({
                        message: '发布成功！',
                        type: 'success'
                    });
                }
            })
        }
    },
    created() {
        this.tableData.forEach(item => {
            var round_exist = 0;
            this.round_list.forEach(exit_item => {
                if(exit_item.value == item.round) round_exist = 1;
            });
            if(round_exist == 0) this.round_list.push({text: item.round, value: item.round})
        });
        this.id = this.$route.query.id;
        // 获取所有专业
        this.$ajax.get("/api/majors").then(res => {
            if(res.data.code == 0) {
                this.all_majors = res.data.data.data.map(item => {
                    return {id: item.id, major: item.name};
                })
            }
        })
        // 请求数据
        this.$ajax.get("/api/tasks/" + this.id).then(data => {
            this.data = data.data.data;
        });
        // 获取分配在该任务的教师
        this.getChoosedTeachers();
        // 获取可分配教师
        this.forEachNoStudentData();
        // 获取志愿详情列表
        this.getIntentions();
        // 获取已配对的志愿列表
        this.getPdIntentions(-1);
        // 获取还有余量的老师
        this.get_no_student_data();
    },
    watch: {
        $route: function(to, from) {
            this.id = this.$route.query.id;
            if(to.path == "/home/infos") {
                // 请求数据
                this.$ajax.get("/api/tasks/" + this.id).then(data => {
                    this.data = data.data.data
                });
                this.getChoosedTeachers();
                this.forEachNoStudentData();
                // 获取志愿详情列表
                this.getIntentions();
                // 获取已配对的志愿列表
                this.getPdIntentions(-1);
                // 获取还有余量的老师
                this.get_no_student_data();
            }
        }
    }
}
</script>

<style scoped lang="less">
    .base{
        width: 450px;
        margin: 20px auto 0 auto;
        p{
            height: 40px;
            line-height: 40px;
            border: 1px solid #ccc;
            span{display: inline-block; width: 200px; height: 100%; padding-left: 5%; font-weight: 400; margin-right: 7%; border-right: 1px solid #ccc;}
        }
    }
    .pd_infos{
        width:50%;
        height:50px;
        border-radius: 5px;
        box-shadow: 2px 2px 1px #ccc;
        margin: 10px auto;
        padding: 5px 10px;
        p{
            height:25px;line-height: 25px;
            span{margin-left: 5%;strong{color:#67C23A;}}
        }
        p:last-child{
            border-top: 1px solid #5cc1c0;
        }
    }
        .select{margin-bottom: 20px; padding: 10px 5px; box-shadow: 0 0 5px #ccc;}
        .sure{display: block;margin: 20px auto;}
        .popo{margin-left: 0; h2{text-align: center; line-height: 40px;border-bottom: 1px solid #f2f2f2;}}
    .pd_info_popo{
        p{padding-left: 43%; margin-top: 30px;}
    }
</style>