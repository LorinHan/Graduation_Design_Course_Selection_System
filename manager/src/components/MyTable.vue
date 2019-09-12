<template>
<div>
  <el-popover
      ref="popover_tea_info"
      width="800"
      placement="start"
      popper-class="popo tea_info"
      trigger="click">
      <h2>修改教师信息</h2>
      <p class="new_p"><span class="new_span" style="margin-left: 2em;">姓名：</span><el-input style="display:inline-block;width: 30%;" v-model="new_teacher_data.name" placeholder="姓名"></el-input></p>
      <p class="new_p"><span class="new_span" style="margin-left: 2em;">职称：</span><el-input style="display:inline-block;width: 30%;" v-model="new_teacher_data.title" placeholder="职称"></el-input></p>
      <p class="new_p"><span class="new_span">研究方向：</span><el-input style="display:inline-block;width: 30%;" v-model="new_teacher_data.research" placeholder="研究方向"></el-input></p>
      <div style="text-align:center;padding-top:20px;">
        <el-button @click="close" type="danger">关 闭</el-button>
      <el-button @click="send_new_data" type="success">确 定</el-button>
      </div>
  </el-popover>
  <!-- 筛选栏 -->
  <div v-if="type != 'majors'" class="select">
    <!-- 专业 -->
    <el-dropdown trigger="click" @command="selectMajor">
      <el-button type="success" size="mini">
        {{select_condition.major}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in majors" :key="item.id" :command="{type: 'major', id: item.id, major: item.major}">{{item.major}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 年级 -->
    <el-dropdown trigger="click" @command="selectMajor" v-if="type != 'teachers'">
      <el-button type="success" size="mini">
      {{select_condition.grade == 0 ? "所有年级" : select_condition.grade}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in grade" :key="item.value" :command="{type: 'grade', value: item.value}">{{item.text}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 学历层次筛选 -->
     <el-dropdown trigger="click" @command="selectMajor" v-if="type == 'students'">
      <el-button type="success" size="mini">
      {{select_condition.category == 2 ? "本科" : select_condition.category == 1 ? "高职" : "所有学历"}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in categorys" :key="item.id" :command="{type: 'category', value: item.id}">{{item.value}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 选题状态 -->
    <!-- <el-dropdown trigger="click" @command="selectMajor" v-if="type == 'tasks'">
      <el-button type="success" size="mini">
      {{select_condition.status  == 0 ? '未发布' : select_condition.status == 1 ? '进行中' : select_condition.status == 2 ? '已结束' : select_condition.status}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in [{text: '所有任务状态', value: '所有任务状态'}, {text: '未发布', value: 0}, {text: '进行中', value: 1}, {text: '已结束', value: 2}]" :key="item.value" :command="{type: 'status', value: item.value}">{{item.text}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    <el-button type="primary" style="margin-left: 20px;" size="mini" @click="send_select">筛选</el-button>
    <el-button type="danger" size="mini" @click="reset_select">重置</el-button>
  </div>
  <el-table
    :data="data"
    border
    style="width: 100%">
    <el-table-column
      v-if="type == 'teachers' || type == 'students'"
      prop="no"
      :label="type == 'teachers' ? '教工号' : '学号'">
    </el-table-column>
    <el-table-column
      v-if="type == 'students' || type == 'tasks'"
      prop="category"
      label="学历层次">
    </el-table-column>
    <el-table-column
      v-if="type == 'teachers' || type == 'students'"
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      v-if="type == 'majors' || type == 'students' || type == 'teachers' || type == 'tasks'"
      prop="major"
      label="专业">
    </el-table-column>
    <el-table-column
      v-if="type == 'tasks' || type == 'students'"
      prop="grade"
      label="年级">
    </el-table-column>
    <el-table-column
      v-if="type == 'teachers'"
      prop="title"
      label="职称">
    </el-table-column>
    <el-table-column
      v-if="type == 'teachers'"
      prop="research"
      label="研究方向">
    </el-table-column>
    <el-table-column
            width="300"
            label="操作"
            v-if="type == 'teachers' || type == 'students'"
            >
            <template slot-scope="scope">
                <el-button type="warning" class="operationBtn" size="mini" @click="reset(scope.row.name, scope.row.id)">重置密码</el-button>
                <el-button type="primary" v-if="type == 'teachers'" class="operationBtn" size="mini" @click="edit(scope.row)">修改信息</el-button>
                <!-- <el-button @click="edit(scope.row.name, scope.row.id)" class="operationBtn" size="mini">修改备注</el-button> -->
                <el-button type="danger" class="operationBtn" size="mini" @click="del(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    <el-table-column
      v-if="type == 'majors'"
      prop="description"
      label="描述">
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
      :filters="[{ text: '未开启', value: '0' }, { text: '学生选择中', value: '1' }, { text: '教师选择中', value: '2' }]"
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
      <el-pagination
        v-if="type != 'majors'"
        background
        :page-size="limit"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="total_page">
      </el-pagination>
  </div>
</template>

<script>
export default {
    props: ["data", "handleDetail", "filterGrade", "filterMajor", "handleEdit", "filterStatus", "formatter", "filterRoundStatus", "roundStatusMatter", "majors", "grade", "type", "link", "total_page", "limit"],
    data() {
        return {
        multipleSelection: [],
        select_condition: {major: "所有专业", grade: 0, status: "所有任务状态", major_id: 0, category: 0},
        new_teacher_data: {name: "", title: "", research: "", id: ""},
        categorys: [{id: 0, value: "所有学历"}, {id: 2, value: "本科"}, {id: 1, value: "高职"}]
        }
    },
    methods: {
        send_select() {
          console.log(this.select_condition)
          switch(this.type) {
            case "students": {this.$emit('getTeacherData', 1, this.select_condition.major_id, this.select_condition.grade, this.select_condition.category);break;}
            case "teachers": {this.$emit('getTeacherData', 1, this.select_condition.major_id);break;}
          }
        },
        reset_select() {this.select_condition = {major: "所有专业", grade: "所有年级", status: "所有任务状态"}},
        selectMajor(value) {
          switch(value.type) {
            case "major": {this.select_condition.major_id = value.id;this.select_condition.major = value.major;break;}
            case "grade": {this.select_condition.grade = value.value;break;}
            case "status": {this.select_condition.status = value.value;break;}
            case "category": {this.select_condition.category = value.value;break;}
          }
        },
        handleCurrentChange(pageNo) {
            this.$emit("getTeacherData", pageNo, this.select_condition.major_id, this.select_condition.grade, this.select_condition.category);
        },
        del(id) {
          this.$messageBox.confirm("确定要删除吗？", "提示", {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$ajax.delete("/api/" + this.type + "/" + id).then(res => {
                    if(res.data.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.$emit('getTeacherData', 1, this.select_condition.major_id, this.select_condition.grade, this.select_condition.category);
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
        // 重置密码
        reset(name, id) {
          this.$messageBox.prompt('请输入密码', "用户：" + name, {
                confirmButtonText: '重置密码',
                cancelButtonText: '取消'
                }).then(({ value }) => {
                    this.$ajax.post("/api/" + this.type + "/password/" + id, this.$qs.stringify({"password": value})).then(res => {
                        if(res.data.code == 0) {
                            this.$message({
                                type: 'success',
                                message: name + '的密码重置成功'
                            });
                        } else {
                          this.$message({
                                type: 'error',
                                message: "操作失败"
                            });
                        }
                    })
                }).catch(() => {
                    console.log('取消');      
            });
        },
        edit(row) {
          this.new_teacher_data.name = row.name;
          this.new_teacher_data.title = row.title;
          this.new_teacher_data.research = row.research;
          this.new_teacher_data.id = row.id;
          document.getElementsByClassName("tea_info")[0].style.display = 'block';
        },
        send_new_data() {
           this.$ajax.put("/api/teachers/" + this.new_teacher_data.id, this.$qs.stringify(this.new_teacher_data)).then(res => {
              if(res.data.code == 0) {
                  this.$message({
                      type: 'success',
                      message: '修改成功！'
                  });
                  document.getElementsByClassName("tea_info")[0].style.display = 'none';
                  this.$emit('getTeacherData', 1, this.select_condition.major_id, this.select_condition.grade, this.select_condition.category);
              } else {
                this.$message({
                      type: 'error',
                      message: "操作失败"
                  });
              }
          })
        },
        close() {
          document.getElementsByClassName("tea_info")[0].style.display = 'none';
        }
    },
    mounted() {
      // var arr = []
      // this.tableData.forEach(item => {
      //   arr.push(this.filterMajor("审计", item));
      // })
      // console.log(arr)
    }
}
</script>

<style scoped>
    .operationBtn{padding: 5px 5px;}
    .operationBtn+.operationBtn{margin-left: 5px;}
    .popo h2{text-align: center;border-bottom: 1px solid #fff;margin-bottom: 20px;}
.popo h3{margin-bottom: 30px;display: inline-block;}
  .select{margin-bottom: 20px; padding: 10px 5px; box-shadow: 0 0 5px #ccc;}
  .tea_info  h2{text-align: center;border-bottom: 1px solid #fff;margin-bottom: 20px;}
  .tea_info .new_p{margin: 20px 0;padding-left: 29%;}
  .tea_info .new_span{font-size: 18px;margin-right: 20px;}
</style>