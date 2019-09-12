<template>
  <div>
      <h3 style="text-align:center;">配对结果：{{teacher_name}}</h3>
      <router-link style="margin-top: 20px; display: block; text-align:center;" to="/intention"><mt-button size="small">查看已提交的志愿</mt-button></router-link>
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