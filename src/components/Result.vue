<template>
  <div>
      <h3 style="text-align:center;">配对结果：{{teacher_name}}</h3>
      <router-link style="margin-top: 40px; display: block; text-align:center;" to="/tip"><mt-button style="background-color: #ff3333;color:#fff;" size="small">关闭</mt-button></router-link>
  </div>
</template>

<script>
export default {
    data() {
        return {
            teacher_name: ""
        }
    },
    created() {
        this.$ajax.get("/api/s/tasks/" + localStorage.getItem("task_id")).then(res => {
            this.teacher_name = res.data.data.teacher_name;
        })
    }
}
</script>

<style>

</style>