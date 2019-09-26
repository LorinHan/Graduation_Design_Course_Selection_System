<template>
  <div class="intention">
      <!-- <h3 style="text-align:center;">当前轮次：{{round}}</h3> -->
      <h3>志愿详情</h3>
      <p class="item">
        <span><strong>学号</strong></span>
        <span><strong>姓名</strong></span>
        <span><strong>意向</strong></span>
      </p>
      <p class="item" v-for="item in this.intention" :key="item.id">
        <span>{{item.student_name == "等待公布" ? "等待公布" : item.student_no}}</span>
        <span>{{item.student_name}}</span>
        <span>{{item.result == 1 ? "接受" : item.result == 2 ? "拒绝": item.result}}</span>
      </p>
      <router-link style="margin-top: 40px; display: block; text-align:center;" :to="'/teacher?task_id='+this.$route.query.task_id"><mt-button style="background-color: #ff3333;color:#fff;" size="small">关闭</mt-button></router-link>
      <!-- <router-link class="routerBtn" :to="'/result?task_id=' + this.$route.query.task_id"><mt-button type="primary" size="small">查看结果</mt-button></router-link> -->
    </div>
</template>

<script>
export default {
data() {
        return {
            intention: [],
            round: localStorage.getItem("round")
        }
    },
    created() {
        this.$ajax.get("/api/t/tasks/" + this.$route.query.task_id + "/intentions").then(res => {
            this.intention = res.data.data;
        });
    }
}
</script>

<style scoped lang="less">
.intention{
  h3{text-align: center;margin-bottom: 20px;}
  .item{
    border-bottom: 1px solid #f0f0f0;
    margin-top: 10px;
    padding-bottom: 5px;
    span{
      display: inline-block;
      text-align: center;
      width: 32%;
    }
  }
  .routerBtn{display: block;text-align: center;margin-top: 20px;}
}
</style>