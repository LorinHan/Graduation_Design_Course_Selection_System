<template>
  <div>
    <p style="height:20px;background-color:#f0f0f0;font-size:12px;text-align:center;">剩余时间：<strong>{{Math.floor(remain_time / 60)}}</strong>分钟<strong>{{remain_time % 60}}</strong>秒</p>
    <router-view ref="checkBox" :max="max" :teachers="teachers" :choosed="choosed"></router-view>

    <mt-button type="primary" class="next" size="small" @click="next">下一步</mt-button>
  </div>
</template>
<script>

export default {
  data() {
    return {
      username: "Lorin",
      grade: "二年级",
      teachers: ['张巧玲', '何焰', '洪涛', '谢维盛', "郑培诚", "孟凡美", '张巧玲2', '何焰2', '洪涛2', '谢维盛2', "郑培诚2", "孟凡美2"],
      max: parseInt(localStorage.getItem("intention_number")),
      choosed: [],
      remain_time: 0
    }
  },
  methods: {
    next() {
      this.choosed = this.$refs.checkBox.value;
      if(this.choosed.length < this.max) {
        return this.$toast({message: "请选满 " + this.max + " 位导师", position: "middle", duration: 2500, iconClass: "mint-toast-icon mintui mintui-field-warning"})
      }
      this.$router.push("/student/next");
    }
  },
  created() {
    this.teachers = JSON.parse(localStorage.getItem("teachers_list"));
    this.$ajax.get("api/s/tasks").then(res2 => {
                        // 先判断id是否位0，0代表没有任务，然后再判断round——id是否wei2，如果是2则禁止学生操作
                        var res_data = res2.data.data;
                        if(res_data.remain_time) {
                            this.remain_time = res_data.remain_time;
                            window.setInterval(() => {this.remain_time -= 1}, 1000);
                        }
                        localStorage.setItem("task_id", res_data.id);
                        if(res_data.id == 0) {
                            this.$router.push("/tip?id=0")
                        } else if(res_data.status == 0) {
                            this.$router.push("/tip?status=" + res_data.status)
                        } else if(res_data.status == 2) {
                            this.$router.push("/tip/result");
                        } else if(res_data.status == 1 && res_data.round_status != 1) {
                            this.$router.push("/tip?round_status=" + res_data.round_status + "&round=" + res_data.round)
                        } else if("teachers" in res_data) {
                            localStorage.setItem("intention_number", res_data.intention_number)
                            localStorage.setItem("teachers_list", JSON.stringify(res_data.teachers));
                            this.$router.push("/student");
                        } else if("result" in res_data && res_data.result == true) {
                            localStorage.setItem("result", JSON.stringify(res_data.result.teacher_name));
                            this.$router.push("/tip/result");
                        } else if("intention" in res_data && res_data.intention == true) {
                            this.$router.push("/tip/intention");
                        }
                    });
  }
}
</script>

<style lang="less" scoped>
  .info{
    float: left;
    margin-left: 10px;
  }
  .logout{float: right;width: 55px;height:25px;font-size: 12px;margin-right: 10px;margin-top: 2px;}
  .next{display: block;margin: 30px auto;}
  .none{display: none;}
</style>
