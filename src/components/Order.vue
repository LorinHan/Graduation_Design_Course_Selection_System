<template>
    <div class="order">
            <div class="tips">拖动老师的名字可以调整志愿顺序哦 ^_^ </div>
            <div class="zys">
                <p class="zy" v-for="index in max" :key="index">第 <mt-badge type="error" size="small">{{index}}</mt-badge> 志愿：</p>
            </div>
           <draggable v-model="teachers"  :options="{animation: 150, dragClass: 'chosen', ghostClass: 'ghost'}" style="overflow: hidden;">
                <transition-group name="flip-list" class="teachers">
                    <div class="item" v-for="teacher in teachers" :key="teacher.no">
                        <span class="teacherName">{{teacher.name}}</span>
                    </div>
                </transition-group>
            </draggable>
            <mt-button type="primary" size="small" class="finishBtn" @click="finish">选择完毕</mt-button>
    </div>
</template>
<script>
    import draggable from 'vuedraggable';
export default {
    components: {draggable},
    props: ['max', 'choosed'],
    data() {
        return {
            teachers: []
        }
    },
    methods: {
        finish() {
            console.log(this.teachers)
            let send_data = [];
            this.teachers.forEach(item => {
                send_data.push(item.no)
            })
            this.$ajax.post("/api/s/intentions", send_data, {headers: {'Content-Type': 'application/json'}}).then(res => {
                if(res.data.code == 0) {
                    alert("提交成功！");
                    this.$router.push("/tip?intention=1");
                } else {
                    alert("提交失败，请稍后重试。");
                    // this.$router.push("/intention");
                }
            })
        },
        addActive(e) {
            e.target.classList.add("active");
            e.target.ondragenter = function(e) {
                console.log(e)
            }
        },
        removeActive(e) {
            e.target.classList.remove("active");
        },
        enter(e) {
            console.log(e)
        }
    },
    mounted() {
        this.teachers = this.$props.choosed;
    }
}
</script>
<style lang="less">
.order{
    padding: 20px;
    overflow: hidden;
    .tips{
        width: 100%;
        height: 25px;
        color: #333;
        font-size: 13px;
        text-align: center;
    }
    .zys{
        width:35%;float: left;
        .zy{height: 35px;margin-top: 20px;}
    }
    .teachers{display: block;width: 100%;float: right;}
    .item{
        height:35px;
        margin-top: 20px;
        background-color: #f2f2f2;
        color: #333;
        border-radius: 5px;
        .teacherName{width: 100%;display: inline-block; line-height: 35px; text-align: center; font-weight: 600;  height: 100%;}
    }
    .finishBtn{display: block;margin: 80px auto;}
    .chosen{
        background-color: #26a2ff;
        color: #fff;
        height: 50px;
    }
    .ghost{box-shadow: 0 0 2px #26a2ff;background-color: #fff;color: #fff;}
}
</style>
