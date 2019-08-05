<template>
  <div>

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
      max: 5,
      choosed: []
    }
  },
  methods: {
    next() {
      this.choosed = this.$refs.checkBox.value;
      if(this.choosed.length < 5) {
        return this.$toast({message: "请选满 " + this.max + " 位导师", position: "middle", duration: 2500, iconClass: "mint-toast-icon mintui mintui-field-warning"})
      }
      this.$router.push("/student/next");
    }
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
