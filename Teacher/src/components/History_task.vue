<template>
    <div id="history_task">
        <h3>{{task_name}}</h3>
        <div class="list">
            <div class="header">
                <span>学号</span>
                <span>姓名</span>
            </div>
            <div class="item" v-for="item in student" :key="item.id">
                <span>{{item.id}}</span>
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            task_name: "",
            student: [{id: 171075133, name: "韩罗霖"}, {id: 171075134, name: "赵超凡"}, {id: 171075135, name: "佘荣杰"}, {id: 171075136, name: "李圣辉"}]
        }
    },
    created() {
        this.task_id = this.$router.history.current.query.id;
        this.task_name = this.$router.history.current.query.task_name;
    }
}
</script>
<style lang="less" scoped>
    #history_task{
        padding: 0 10px;
        h3{text-align: center;}
        .list{
            box-shadow: 0 0 2px #f2f2f2;
            .header{
                height: 40px;
                line-height: 40px;
                display: flex;
                margin-top: 15px;
                justify-content: space-around;
                font-weight: 600;
            }
            .item{
                height: 30px;
                line-height: 30px;
                display: flex;
                justify-content: space-around;
                border-top: 1px solid #f2f2f2;
                color: #333;
            }
        }
    }
</style>
