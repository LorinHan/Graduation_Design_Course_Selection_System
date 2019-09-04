<template>
    <div>
        <el-popover
            ref="popover4"
            width="800"
            placement="start"
            class="popo"
            trigger="click">
            <h2>新建选题</h2>
            <h3>1.请选择开始进行毕业设计的专业：</h3>
            <el-dropdown trigger="click" type="success" size="small" @command="change_major">
            <span class="el-dropdown-link">
                <el-button type="success" size="mini">
                {{this.new_data.major}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in majors" :key="item.value" :command="item.value">{{item.value}}</el-dropdown-item>
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
            <h3>3.请确认每一位导师可选学生数量的默认值：</h3>
            <el-input-number v-model="new_data.tea_to_stu" @change="change_tea_to_stu" size="mini"></el-input-number><br>
            <h3>4.请确认每个学生可选志愿数量的默认值：</h3>
            <el-input-number v-model="new_data.intention_num" @change="change_intention_num" size="mini"></el-input-number><br>
            <el-switch v-model="new_data.all_teachers"  inactive-text="将该专业的所有导师导入该选题任务中"></el-switch>
            <el-button type="primary" size="small" style="display:block;margin: 20px auto;" @click="send_new_data">确 定</el-button>
        </el-popover>
        <el-button type="primary" size="small" class="newBtn" v-popover:popover4 icon="el-icon-circle-plus-outline">新建选题</el-button>
        <MyTable :data="tableData" :handleEdit="handleEdit" :filterStatus="filterStatus" :formatter="formatter" :filterRoundStatus="filterRoundStatus" :roundStatusMatter="roundStatusMatter" :grade="grade" :majors="majors" :filterGrade="filterGrade" :filterMajor="filterMajor" :type="'tasks'" :link="link"></MyTable>
    </div>
</template>

<script>
import MyTable from "../../MyTable"
export default {
    props: ["link"],
    components: {"MyTable": MyTable},
    data() {
        return {
            tableData: [{
          id: 1,
          major: '电子商务',
          grade: '2016',
          status: '1',
          round: '1',
          round_status: "0"
        }, {
          id: 2,
          major: '国际贸易',
          grade: '2015',
          status: '0',
          round: '1',
          round_status: "1"
        }, {
          id: 3,
          major: '会计',
          grade: '2015',
          status: '2',
          round: '3',
          round_status: "2"
        },
        {
          id: 4,
          major: '会计',
          grade: '2015',
          status: '2',
          round: '3',
          round_status: "2"
        },{
          id: 5,
          major: '审计',
          grade: '2015',
          status: '1',
          round: '2',
          round_status: "0"
        }],
        grade: [],// 存放筛选栏中年级的可选栏
        majors: [],// 存放筛选栏中专业的可选栏
        grade_list: [],
        new_data: {
            // 暂时先使用majors数组和grade数组的数据，后面majors需要请求所有专业的数据，grade根据当前年份倒推5年
            major: "请选择专业",
            grade: "请选择年级",
            tea_to_stu: 5,
            intention_num: 5,
            all_teachers: true
        }
        }
    },
    methods: {
        handleEdit(row) {
            console.log(row);
        },
        roundStatusMatter(row, column) {
            if(row.round_status == 1) {return "进行中"}
            else if(row.round_status == 0) {return "未发布"}
            else if(row.round_status == 2) {return "已结束"}
        },
        formatter(row, column) {
            if(row.status == 1) {return "已发布"}
            else if(row.status == 0) {return "未发布"}
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
        send_new_data() {
            console.log(this.new_data);
        }
    },
    created() {
        var data = new Date();
        var year = data.getFullYear();
        for(var i = 0; i <= 4; i ++) {
            this.grade_list.push(year - i);
        }
        this.majors.push({text: "所有专业", value: "所有专业"})
        this.grade.push({text: "所有年级", value: "所有年级"})
        this.tableData.forEach(item => {
            var grade_exit = 0;
            var major_exit = 0;
            this.grade.forEach(exit_item => {
                if(exit_item.value == item.grade) grade_exit = 1;
            });
            this.majors.forEach(exit_item => {
                if(exit_item.value == item.major) major_exit = 1;
            });
            if(grade_exit == 0) this.grade.push({text: item.grade, value: item.grade});
            if(major_exit == 0) this.majors.push({text: item.major, value: item.major})
        })
    }
}
</script>

<style scoped>
.popo h2{text-align: center;border-bottom: 1px solid #fff;margin-bottom: 20px;}
.popo h3{margin-bottom: 30px;display: inline-block;}
</style>