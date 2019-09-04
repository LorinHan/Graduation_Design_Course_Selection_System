<template>
<div>
  <!-- 筛选栏 -->
  <div v-if="type != 'majors'" class="select">
    <!-- 专业 -->
    <el-dropdown trigger="click" @command="selectMajor">
      <el-button type="success" size="mini">
        {{select_condition.major}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in majors" :key="item.value" :command="{type: 'major', value: item.value}">{{item.value}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 年级 -->
    <el-dropdown trigger="click" @command="selectMajor" v-if="type != 'teachers'">
      <el-button type="success" size="mini">
      {{select_condition.grade}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in grade" :key="item.value" :command="{type: 'grade', value: item.value}">{{item.value}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 选题状态 -->
    <el-dropdown trigger="click" @command="selectMajor" v-if="type == 'tasks'">
      <el-button type="success" size="mini">
      {{select_condition.status  == 0 ? '未发布' : select_condition.status == 1 ? '进行中' : select_condition.status == 2 ? '已结束' : select_condition.status}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in [{text: '所有任务状态', value: '所有任务状态'}, {text: '未发布', value: 0}, {text: '进行中', value: 1}, {text: '已结束', value: 2}]" :key="item.value" :command="{type: 'status', value: item.value}">{{item.text}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button type="primary" style="margin-left: 20px;" size="mini" @click="send_select">筛选</el-button>
    <el-button type="danger" size="mini" @click="reset_select">重置</el-button>
  </div>
  <el-table
    :data="data"
    border
    style="width: 100%">
    <el-table-column
      prop="major"
      label="专业">
    </el-table-column>
    <el-table-column
      v-if="type == 'teachers' || type == 'students'"
      prop="no"
      :label="type == 'teachers' ? '教工号' : '学号'">
    </el-table-column>
    <el-table-column
      v-if="type == 'teachers' || type == 'students'"
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      v-if="type == 'teachers'"
      prop="title"
      label="职称">
    </el-table-column>
    <el-table-column
      v-if="type == 'majors'"
      prop="description"
      label="描述">
    </el-table-column>
    <el-table-column
      v-if="type == 'tasks' || type == 'students'"
      prop="grade"
      label="年级">
    </el-table-column>
    <el-table-column
      v-if="type == 'tasks'"
      prop="round"
      label="轮次">
    </el-table-column>
    <el-table-column
      v-if="type == 'tasks'"
      prop="status"
      label="状态"
      :formatter="formatter"
      filter-placement="bottom-end">
    </el-table-column>
    <el-table-column
      v-if="type == 'tasks'"
      prop="round_status"
      label="轮次状态"
      :formatter="roundStatusMatter"
      :filters="[{ text: '未发布', value: '0' }, { text: '进行中', value: '1' }, { text: '已结束', value: '2' }]"
      :filter-method="filterRoundStatus"
      filter-placement="bottom-end">
    </el-table-column>
    <el-table-column
    v-if="type == 'tasks'"
    width="250"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="link(scope.row.grade + scope.row.major, '/home/infos', scope.row.id)" type="info" class="operationBtn" size="mini">详情</el-button>
        <el-button v-if="scope.row.status == 0" type="danger" class="operationBtn" size="mini">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
    props: ["data", "handleDetail", "filterGrade", "filterMajor", "handleEdit", "filterStatus", "formatter", "filterRoundStatus", "roundStatusMatter", "majors", "grade", "type", "link"],
    data() {
        return {
            tableData: [{
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
        multipleSelection: [],
        select_condition: {major: "所有专业", grade: "所有年级", status: "所有任务状态"}
        }
    },
    methods: {
        send_select() {
          console.log(this.select_condition)
        },
        reset_select() {this.select_condition = {major: "所有专业", grade: "所有年级", status: "所有任务状态"}},
        selectMajor(value) {
          switch(value.type) {
            case "major": {this.select_condition.major = value.value;break;}
            case "grade": {this.select_condition.grade = value.value;break;}
            case "status": {this.select_condition.status = value.value;break;}
          }
        }
    },
    mounted() {
      var arr = []
      this.tableData.forEach(item => {
        arr.push(this.filterMajor("审计", item));
      })
      console.log(arr)
    }
}
</script>

<style scoped>
    .operationBtn{padding: 5px 5px;}
    .operationBtn+.operationBtn{margin-left: 5px;}
    .popo h2{text-align: center;border-bottom: 1px solid #fff;margin-bottom: 20px;}
.popo h3{margin-bottom: 30px;display: inline-block;}
  .select{margin-bottom: 20px; padding: 10px 5px; box-shadow: 0 0 5px #ccc;}
</style>