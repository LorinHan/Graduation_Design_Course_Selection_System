<template>
  <div id="majors">
      <el-popover
            ref="popover_major"
            width="800"
            placement="start"
            popper-class="popo"
            trigger="click">
            <h2>新增专业</h2>
            <p class="new_p"><span class="new_span">专业名称：</span><el-input style="display:inline-block;width: 20%;" v-model="new_data.name" placeholder="专业名称"></el-input></p>
            <p class="new_p"><span class="new_span">专业描述：</span><el-input style="display:inline-block;width: 50%;" v-model="new_data.description" placeholder="专业描述："></el-input></p>
            <el-button @click="send_new_data" type="success" style="display: block;margin: 10px auto;">确 定</el-button>
        </el-popover>

      <!-- <el-button type="warning" size="small" class="newBtn" icon="el-icon-printer">批量导入</el-button> -->
      <el-button type="primary" size="small" class="newBtn" v-popover:popover_major icon="el-icon-circle-plus-outline">新增</el-button>
      <MyTable :data="tableData" :handleEdit="handleEdit" :handleDetail="handleDetail" :majors="majors" :filterMajor="filterMajor" :type="'majors'"></MyTable>
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
            new_data: {name: "", description: ""}
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
            console.log(this.new_data);
            document.getElementsByClassName("popo")[1].style.display = "none";
            this.$message({
                showClose: true,
                message: '恭喜你，这是一条成功消息',
                type: 'success'
            });
        }
    },
    created() {
        this.$ajax.get("/api/majors?limit=1000").then(res => {
            if(res.data.code == 0) {
                let new_data = res.data.data.data.map(item => {
                    return {id: item.id, major: item.name, description: item.description};
                })
                this.tableData = new_data;
            }
        })
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
    #majors{
        h2{text-align: center;border-bottom: 1px solid #fff;margin-bottom: 20px;}
        .new_p{margin: 20px 0;}
        .new_span{font-size: 18px;margin-right: 20px;}
    }
</style>