<template>
    <div id="task">
        <h3>当前选题</h3>

        <div class="form">
            <div class="header">
                <span class="task_name"><i class="iconfont icon-renwu"></i> 任务</span>
                <span class="major"><i class="iconfont icon-school"></i> 专业</span>
            </div>
            <div class="body">
                <div class="item" v-for="item in data_list" :key="item.task_id">
                    <router-link :to="{path: 'teacher', query: {task_id: item.task_id}}">
                        <span class="task_name">{{item.task_name}}</span>
                        <span class="major">{{item.major}}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data_list: []
        }
    },
    created() {
        this.$ajax.get("api/t/tasks").then(res2 => {
            this.data_list = res2.data.data.map(item => {
                return {task_id: item.id, task_name: item.grade + "级" + item.major_name + "毕业设计", major: item.major_name, intention_number: item.intention_number}
            });
        })
        // this.data_list = JSON.parse(localStorage.getItem("tasks")).map(item => {
        //     return {task_id: item.id, task_name: item.grade + "级" + item.major_name + "毕业设计", major: item.major_name, intention_number: item.intention_number}
        // });
        // console.log(this.data_list)
    }
}
</script>
<style lang="less" scoped>
    #task{
        margin-top: -5%;
        padding: 5% 10px;
        h3{text-align: center;}
        .form{
            margin-top: 5%;
            box-shadow: 0 0 2px #f2f2f2;
            border-radius: 5px;
            .header{
                height: 35px;
                margin-top: 10px;
                border-bottom: 1px solid #f2f2f2;
                i{font-size: 16px; margin-right: 5px;}
                font-weight: 600;
            }
            span{box-sizing: border-box; display: inline-block;height: 100%;line-height: 35px;width: 30%;padding-left: 10px;}
            .task_name {width: 68%;border-right: 1px solid #f2f2f2;}
            .body{
                .item{border-bottom: 1px solid #f2f2f2;}
                span{height: 40px;line-height: 40px;padding-left: 10px; font-size: 12px;}
            }
        }
    }
</style>
