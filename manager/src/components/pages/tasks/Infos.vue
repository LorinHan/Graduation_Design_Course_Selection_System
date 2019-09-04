<template>
  <div>
      <el-tabs type="border-card">
        <el-tab-pane label="基础信息">
            <div class="base">id: {{id}}
                <p><span>专业：</span>{{this.data.major}}</p>
                <p><span>年级：</span>{{this.data.grade}}</p>
                <p><span>选题状态：</span>{{this.data.status == 0 ? '未发布': this.data.status == 1 ? '已发布': '已结束'}}</p>
                <p><span>轮次：</span>第{{this.data.round}}轮</p>
                <p><span>轮次状态：</span>{{this.data.round_status == 0 ? '未发布': this.data.round_status == 1 ? '进行中': '已结束'}}</p>
                <p><span>导师可选学生默认数量：</span>{{this.data.student_number}}</p>
                <p><span>学生可选志愿数量：</span>{{this.data.intention_number}}</p>
                <p><span>描述：</span>{{this.data.description}}</p>
                <div style="margin-top: 40px;">
                    <el-button type="success" @click="start">启动第 {{data.round + 1}} 轮</el-button>
                    <!-- <el-button type="success" v-show="this.data.round_status == 1" @click="next_round">进入下一轮</el-button> -->
                    <el-button type="danger" @click="finish">结束当前选题</el-button>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="分配教师">
            <el-button type="primary" size="small" class="newBtn" v-popover:popover_pd_teacher icon="el-icon-circle-plus-outline">分配导师</el-button>
            <!-- 弹出框和折叠面板 -->
            <el-popover
                ref="popover_pd_teacher"
                width="800"
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
                            <el-input-number v-model="scope.row.no" size="small"></el-input-number>
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
                <el-button type="danger" size="mini">删除</el-button>
                </el-table-column>
            </el-table>
            <el-button class="sure" type="success" @click="send_pd_teachers">确认提交</el-button>
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
            <h3 class="title">配对情况</h3>
            <div class="pd_infos">
                <p>学生：<span>已成功配对：<strong>55 </strong>人;</span><span>未配对：<strong style="color:red;">20 </strong>人；</span></p>
                <p>教师：<span>已选满学生的导师：<strong>8 </strong>人;</span><span>未选满学生的导师：<strong style="color:red;">4 </strong>人；</span></p>
            </div>
              <!-- 筛选栏 -->
                <div class="select">
                    <el-dropdown trigger="click" @command="selectStatus">
                    <el-button type="success" size="mini">
                        {{pd_status == 0 ? '未配对' : pd_status == 1 ? '已配对' : pd_status}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in [{text: '所有', value: '所有'}, {text: '未配对', value: 0}, {text: '已配对', value: 1}]" :key="item.value" :command="item.value">{{item.text}}</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
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
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="item in no_student_data" :key="item.id" :command="[item.teacher_no, item.name]">{{item.name}}</el-dropdown-item>
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
                prop="submit_time"
                label="提交时间">
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
            tableData: [{
                round: 1,
                student: '小李子',
                teacher: "朱国华",
                level: 1,
                submit_time: "2019-08-12",
                result: 0
                }, {
                round: 1,
                student: '小李子',
                teacher: "朱国华",
                level: 1,
                submit_time: "2019-08-12",
                result: 0
                },{
                round: 1,
                student: '小李子',
                teacher: "朱国华",
                level: 1,
                submit_time: "2019-08-12",
                result: 0
                },{
                round: 1,
                student: '小李子',
                teacher: "朱国华",
                level: 1,
                submit_time: "2019-08-12",
                result: 0
                }],
            round_list: [],
            multipleSelection: {}, // 配置教师的选项
            results: [{text: "待确认", value: 0}, {text: "确认成功", value: 1}, {text: "选择失败", value: 2}],
            pdTableData: [
                    {id: 0, student_no: 171075133, student: "韩罗霖", teacher: ""},
                    {id: 2, student_no: 171075134, student: "郑惠鸿", teacher: ""},
                    {id: 1, student_no: 171075135, student: "石婷", teacher: ""},
                    {
                    id: 10, 
                    round: 1,
                    student_no: 171075111,
                    student: '小李子',
                    teacher: "朱国华",
                    user_assigned: 1,
                    submit_time: "2019-08-12"
                    }, {
                    id: 20, 
                    round: 1,
                    student_no: 171075111,
                    student: '小李子',
                    teacher: "朱国华",
                    user_assigned: 1,
                    submit_time: "2019-08-12"
                    },{
                    id: 30, 
                    round: 1,
                    student_no: 171075111,
                    student: '小李子',
                    teacher: "朱国华",
                    user_assigned: 1,
                    submit_time: "2019-08-12"
                    },{
                    id: 40, 
                    round: 1,
                    student_no: 171075111,
                    student: '小李子',
                    teacher: "朱国华",
                    user_assigned: 1,
                    submit_time: "2019-08-12"
                    }
                ],
            // 未选满的教师
            no_student_data: [
                {id: 1, teacher_no: 171075133, name: "朱国华"},
                {id: 2, teacher_no: 171075133, name: "张巧玲"},
                {id: 3, teacher_no: 171075133, name: "何焰"},
                {id: 4, teacher_no: 171075133, name: "谢维盛"},
            ],
            pd_status: "所有",
            // 已选择的教师列表
            choosed_teachers: [{
                major: '电子商务',
                no: '1230564',
                name: "朱国华",
                title: "副教授"
                }, {
                major: '电子商务',
                no: '12305642',
                name: "朱国华2",
                title: "副教授"
                },{
                major: '国际贸易',
                no: '1230564',
                name: "张巧玲",
                title: "副教授"
                }, {
                major: '会计',
                no: '1230564',
                name: "谢维盛",
                title: "副教授"
                }, {
                major: '审计',
                no: '1230564',
                name: "何焰",
                title: "副教授"
            }],
            // 所有教师按专业分类
            teachers_data: [{major: "电子商务", list: [{no: '1230564', name: "何焰", title: "副教授"}, {no: '12305642', name: "张巧玲", title: "副教授"}]}, {major: "国际贸易", list: [{no: '12364', name: "朱勇征", title: "副教授"}]}, {major: "商务英语", list: [{no: '4561234', name: "陈都", title: "副教授"}]}],
                activeNames: ['电子商务'],
            // 为每一个学生指定教师的数据集
            distribution_data: {student_no: "", student: "", teacher_no: "", teacher: ""}
        }
    },
    methods: {
        start() {
            this.$message({
                message: '启动成功！',
                type: 'success'
            });
            this.$router.push("/home/tasks")
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
        finish() {
            this.$message({
                message: '成功结束该选题！',
                type: 'success'
            });
            this.$router.push("/home/tasks")
        },
        formatter(row, column) {
            if(row.result == 1) {return "确认成功"}
            else if(row.result == 0) {return "待确认"}
            else if(row.result == 2) {return "选择失败"}
        },
        pd_formatter(row, column) {
            if(row.user_assigned == 1) {return "用户人工分配"}
            else if(row.user_assigned == 0) {return "系统分配"}
        },
        // 配对详情中分配导师的下拉框
        change_teacher(value) {
            this.distribution_data.teacher_no = value[0];
            this.distribution_data.teacher = value[1];
        },
        selectStatus(value) { this.pd_status = value; },
        send_select() {
          console.log(this.pd_status)
        },
        reset_select() {this.pd_status = "所有"},
        handleSelectionChange(val, major) {
            console.log(major)
            this.multipleSelection[major] = val;
        },
        send_pd_teachers() {console.log(this.multipleSelection)},
        // 给每一个学生指定分配教师
        distribution(row) {
            document.getElementsByClassName("pd_info_popo")[0].style.display = "block"
            this.distribution_data.student_no = row.student_no;
            this.distribution_data.student = row.student;
        },
        close_distribution_popo() {this.distribution_data.teacher = "";this.distribution_data.teacher_no = "";document.getElementsByClassName("pd_info_popo")[0].style.display = "none";},
        send_distribution() {
            console.log(this.distribution_data)
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
        this.id = this.$route.query.id
                // 请求数据
        this.$ajax.get("https://www.easy-mock.com/mock/5d5667dddddc21142154b2e0/example/query" + this.id).then(data => {
            this.data = data.data.data
        })
    },
    watch: {
        $route: function(to, from) {
            this.id = this.$route.query.id
            if(to.path == "/home/infos") {
                // 请求数据
                this.$ajax.get("https://www.easy-mock.com/mock/5d5667dddddc21142154b2e0/example/query" + this.id).then(data => {
                    this.data = data.data.data
                })
            }
        }
    },
    mounted() {
      // 默认勾选项
    //   this.$refs.multipleTable.toggleRowSelection(this.teachers_data[0],true);
    }
}
</script>

<style scoped lang="less">
    .base{
        width: 30%;
        margin: 0 auto;
        p{
            margin: 10px 0;
            font-weight: 600;
            span{font-weight: 400;}
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
        .popo{h2{text-align: center; line-height: 40px;border-bottom: 1px solid #f2f2f2;}}
    .pd_info_popo{
        p{padding-left: 43%; margin-top: 30px;}
    }
</style>