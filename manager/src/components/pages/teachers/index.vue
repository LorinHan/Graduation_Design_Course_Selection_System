<template>
  <div id="teachers">
      <el-popover
            ref="popover_teacher"
            width="800"
            placement="start"
            class="popo"
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
                    <el-dropdown-item v-for="item in all_majors" :key="item" :command="item">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </p>
            <p class="new_p"><span class="new_span">职称：</span><el-input style="display:inline-block;width: 70%;" v-model="new_data.title" placeholder="职称"></el-input></p>
            <p class="new_p"><span class="new_span">简介：</span><el-input style="display:inline-block;width: 70%;" v-model="new_data.description" placeholder="简介"></el-input></p>
            <el-button @click="send_new_data" type="success" style="display: block;margin: 10px auto;">确 定</el-button>
        </el-popover>
      <el-button type="warning" size="small" class="newBtn" icon="el-icon-printer">批量导入</el-button>
      <el-button type="primary" size="small" class="newBtn" v-popover:popover_teacher icon="el-icon-circle-plus-outline">新增</el-button>
      <MyTable :data="tableData" :handleEdit="handleEdit" :handleDetail="handleDetail" :majors="majors" :filterMajor="filterMajor" :type="'teachers'"></MyTable>
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
          no: '1230564',
          name: "朱国华",
          title: "副教授"
        }, {
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
        majors: [],
        all_majors: ["电子商务", "国际贸易", "会计", "审计"],
        new_data: {name: "", teacher_id: "", major: "请选择专业", title: "", description: ""}
        }
    },
    methods: {
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
            console.log(this.new_data)
        },
        change_major(value) {
            this.new_data.major = value;
        }
    },
    created() {
        this.tableData.forEach(item => {
            var major_exit = 0;
            this.majors.forEach(exit_item => {
                if(exit_item.value == item.major) major_exit = 1;
            });
            if(major_exit == 0) this.majors.push({text: item.major, value: item.major})
        })
    }
}
</script>

<style scoped lang="less">
    #teachers{
        h2{text-align: center;border-bottom: 1px solid #fff;margin-bottom: 20px;}
        .new_p{margin: 20px auto;width: 50%;}
        .new_span{font-size: 18px;margin-right: 20px;}
    }
</style>