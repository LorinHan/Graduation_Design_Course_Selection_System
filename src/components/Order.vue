<template>
    <div class="order">
            <div class="tips">拖动老师的名字可以调整志愿顺序哦 ^_^ </div>
            <div class="zys">
                <p class="zy" v-for="index in max" :key="index">第 <mt-badge type="error" size="small">{{index}}</mt-badge> 志愿：</p>
            </div>
           <draggable v-model="teachers"  :options="{animation: 150, dragClass: 'chosen', ghostClass: 'ghost'}" style="overflow: hidden;">
                <transition-group name="flip-list" class="teachers">
                    <div class="item" v-for="(teacher, index) in teachers" :key="-index">
                        <span class="teacherName">{{teacher}}</span>
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
        color: #c0c0c0;
        font-size: 12px;
        line-height: 25px;
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
