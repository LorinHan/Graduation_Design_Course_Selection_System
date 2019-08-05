<template>
    <div class="checkBox">
        <mt-checklist
          class="teachers_list"
          :title="'请先勾选 ' + max + ' 位心仪的教师'"
          v-model="value"
          :options="options">
        </mt-checklist>
        <div class="infosList">
            <p v-for="item in teachers" :key='item' @click="open(item)"><i class="iconfont icon-chakan"></i></p>
        </div>


        <mt-popup
                v-model="popupVisible"
                popup-transition="popup-fade"
                :closeOnClickModal="true">
                <h2>{{the_teacher_info.name}}</h2>
                <p class="infoP">职称：{{the_teacher_info.title}}</p>
                <p class="infoP">简介：{{the_teacher_info.desc}}</p>
                <mt-button class="choose" size="small" @click="choose" type="danger">选择Ta</mt-button>
            </mt-popup>
    </div>
</template>
<script>
export default {
    name: "CheckBox",
    props: ['max', 'teachers', 'choosed'],
    data() {
        return {
            value: [],
            options: [],
            popupVisible: false,
            choosedName: "",
            the_teacher_info: {name: "汪婷婷", title: "副教授、经济师、管理会计师", desc: "福建省高校人文社科研究基地-财务与审计信息化研究中心主任，福建省财务与金融实验教学示范中心主任。主持教育部产学协同育人项目、福建省重大教育教学改革项目、福建省创新创业专业、福建省创新创业资源共享课程等多个教科研项目建设。"}
        }
    },
    created() {
        this.teachers.forEach(item => this.options.push({label: item, value: item, disabled: false}));
        this.value = this.$props.choosed;
    },
    methods: {
        open(teacher) {
            this.choosedName = teacher;
            this.popupVisible = true;
        },
        close() { this.popupVisible = false;},
        choose() {
            if(this.value.length == this.$props.max) {
                this.$toast({message: "最多只能选择 " + this.max + " 位导师哦", position: "middle", duration: 2500, iconClass: "mint-toast-icon mintui mintui-field-warning"})
            }else if(this.value.includes(this.choosedName)) {
                this.$toast({message: "已选择!", position: "middle", duration: 2000})
            } else {
                this.value.push(this.choosedName);
            }
            this.popupVisible = false;
        }
    },
    watch: {
        value: function(val, old) {
            if(old.length == this.max) this.options.forEach(item => item.disabled = false)
            if(val.length >= this.max) {
                this.options.forEach(item => {
                    if(!this.value.includes(item.value)) item.disabled = true;
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.teachers_list{width:70%; float: left;}
.infosList{width: 30%; float: left;padding-top: 34px;box-sizing: border-box;padding-right: 10px;}
.infosList > p{min-height: 48px;text-align: center;}
.infosList > p > i{line-height: 48px;}
.mint-popup{background-color: rgba(0, 0, 0, 0); width: 70%;color: #fff; padding: 10px;}
.infoP{margin-top: 20px; line-height: 2;}
.choose, .close{margin-top: 30px;}
.choose{float: right;}
.checkBox{overflow: hidden; font-size: 13px;}
</style>
