<template>
  <div id="students">
      <el-popover
            ref="popover_student"
            width="800"
            placement="start"
            class="popo"
            trigger="click">
            <h2>新增教师</h2>
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
                    <el-dropdown-item v-for="item in all_majors" :key="item" :command="item">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </p>
            <p class="new_p">
                <span class="new_span">年级：</span>
                 <el-dropdown trigger="click" type="success" @command="change_major">
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
            <el-button @click="send_new_data" type="success" style="display: block;margin: 10px auto;">确 定</el-button>
        </el-popover>
      <el-button type="warning" size="small" class="newBtn" icon="el-icon-printer">批量导入</el-button>
      <el-button type="primary" size="small" class="newBtn"  v-popover:popover_student icon="el-icon-circle-plus-outline">新增</el-button>
      <MyTable :data="tableData" :handleEdit="handleEdit" :handleDetail="handleDetail" :majors="majors" :grade="grade" :filterMajor="filterMajor" :filterGrade="filterGrade" :type="'students'"></MyTable>
  </div>
</template>

<script>
import MyTable from "../../MyTable"
export default {
    components: {"MyTable": MyTable},
    data() {
        return {
            tableData: [{
          major: '电子商务',
          name: "张三",
          grade: '2015',
          no: "171075111"
        }, {
          major: '国际贸易',
          name: "张三",
          grade: '2016',
          no: "171075111"
        }, {
          major: '会计',
          name: "张三",
          grade: '2015',
          no: "171075111"
        }, {
          major: '审计',
          name: "张三",
          grade: '2015',
          no: "171075111"
        }],
        grade: [],
        grade_list: [],
        majors: [],
        all_majors: ["电子商务", "国际贸易", "会计", "审计"],
        new_data: {name: "", student_id: "", major: "请选择专业", grade: "请选择年级"}
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
            console.log(this.new_data)
        },
        change_major(value) {
            this.new_data.major = value;
        }
    },
    created() {
        var data = new Date();
        var year = data.getFullYear();
        for(var i = 0; i <= 4; i ++) {
            this.grade_list.push(year - i);
        }

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

<style scoped lang="less">
    #students{
        h2{text-align: center;border-bottom: 1px solid #fff;margin-bottom: 20px;}
        .new_p{margin: 20px auto;width: 50%;}
        .new_span{font-size: 18px;margin-right: 20px;}
    }
</style>