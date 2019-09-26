<template>
  <div id="intention">
      <h3 style="text-align: center;">志愿详情</h3>
      <p v-for="(item, index) in intention_list" :key="item.teacher_no" style="margin:10px 0;border-bottom: 1px solid #f0f0f0;text-align:center;">
          <span class="zy">第{{index +1}}志愿:</span>
          <span class="name">{{item.teacher_name}}</span>
      </p>
      <router-link style="margin-top: 40px; display: block; text-align:center;" to="/tip"><mt-button style="background-color: #ff3333;color:#fff;" size="small">关闭</mt-button></router-link>
      <!-- <router-link style="margin-top: 20px; display: block; text-align:center;" to="/result"><mt-button size="small" type="primary">查看结果</mt-button></router-link> -->
  </div>
</template>

<script>
export default {
    data() {
        return {
            intention_list: []
        }
    },
    created() {
        this.$ajax.get("/api/s/intentions").then(res => {
            this.intention_list = res.data.data.intention;
        })
    }
}
</script>

<style scoped lang="less">
    #intention{
        h3{margin-bottom: 30px;}
        width: 70%;
        padding: 10px;
        box-shadow: -1px 1px 2px #ccc;
        margin: 0 auto;
        .zy{font-weight: 600; margin-right: 20px;}
        .tip{font-size: 12px;color: #ccc;margin-top: 30px;}
    }
</style>