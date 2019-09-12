<template>
  <div id="tip">
      <h3 style="text-align:center;margin-bottom: 20px;">当前轮次：{{round}}</h3>
      <h3 v-if="this.$route.query.status == 0" style="color: #555;">选题任务未开启</h3>
      <h3 v-if="this.$route.query.id == 0" style="color: #555;">当前没有你的选题任务</h3>
      <h3 v-if="this.$route.query.round_status == 0" style="color: #555;">请耐心等待当前轮次选题开始..</h3>
      <h3 v-if="this.$route.query.round_status == 2" style="color: #555;">教师正在选择中，请耐心等待..</h3>
      <router-link style="margin-top: 20px; display: block; text-align:center;" to="/intention"><mt-button size="small">查看已提交的志愿</mt-button></router-link>
      <router-link style="margin-top: 20px; display: block; text-align:center;" to="/result"><mt-button size="small" type="primary">查看结果</mt-button></router-link>
      <h3 v-if="this.$route.query.status == 2" style="color: #555;">选题任务已结束</h3>
      <h3 v-if="this.$route.query.result" style="color: #555;">导师配对成功：{{this.$route.query.result}}</h3>
  </div>
</template>

<script>
    export default{
        data() {
            return {
                teacher_name: "",
                round: 0
            }
        },
        created() {
            this.$ajax.get("api/s/tasks").then(res2 => {
                        // 先判断id是否位0，0代表没有任务，然后再判断round——id是否wei2，如果是2则禁止学生操作
                        var res_data = res2.data.data;
                        this.round = res_data.round;
                        localStorage.setItem("task_id", res_data.id);
                        if(res_data.id == 0) {
                            this.$router.push("/tip?id=0")
                        } else if(res_data.status == 0) {
                            this.$router.push("/tip?status=" + res_data.status)
                        } else if(res_data.status == 2) {
                            this.$router.push("/result");
                        } else if(res_data.status == 1 && res_data.round_status != 1) {
                            this.$router.push("/tip?round_status=" + res_data.round_status + "&round=" + res_data.round)
                        } else if("teachers" in res_data) {
                            localStorage.setItem("intention_number", res_data.intention_number)
                            localStorage.setItem("teachers_list", JSON.stringify(res_data.teachers));
                            this.$router.push("/student");
                        } else if("result" in res_data && res_data.result == true) {
                            localStorage.setItem("result", JSON.stringify(res_data.result.teacher_name));
                            this.$router.push("/result");
                        } else if("intention" in res_data && res_data.intention == true) {
                            this.$router.push("/intention");
                        }
                    });
        }
    }
</script>

<style scoped>
    #tip > h3{
        text-align: center;
    }
</style>