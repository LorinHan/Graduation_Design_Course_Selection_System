<template>
    <div class="checkBox">
        <mt-checklist
          class="teachers_list"
          :title="'请先勾选 ' + max + ' 位心仪的教师 ^_^'"
          v-model="value"
          :options="options">
        </mt-checklist>
        <div class="infosList">
            <p v-for="item in teachers" :key='item.id' @click="open(item)"><i class="iconfont icon-chakan"></i></p>
        </div>


        <mt-popup
                v-model="popupVisible"
                popup-transition="popup-fade"
                :closeOnClickModal="true">
                <h2>{{the_teacher_info.name}}</h2>
                <p class="infoP">教工号：{{the_teacher_info.teacher_no}}</p>
                <p class="infoP">专业技术职务：{{the_teacher_info.title}}</p>
                <p class="infoP">研究方向：{{the_teacher_info.desc}}</p>
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
            the_teacher_info: {name: "", title: "", desc: "", teacher_no: ""}
        }
    },
    created() {
        this.teachers.forEach(item => this.options.push({label: item.name, value: {name: item.name, no: item.teacher_no}, disabled: false}));
        this.value = this.$props.choosed;
    },
    methods: {
        open(teacher) {
            console.log(teacher)
            this.the_teacher_info.name = teacher.name;
            this.the_teacher_info.title = teacher.title;
            this.the_teacher_info.desc = teacher.research;
            this.the_teacher_info.teacher_no = teacher.teacher_no;
            this.choosedName = teacher;
            this.popupVisible = true;
        },
        close() { this.popupVisible = false;},
        choose() {
            if(this.value.length == this.$props.max) {
                this.popupVisible = false;
                return this.$toast({message: "最多只能选择 " + this.max + " 位导师哦", position: "middle", duration: 2500, iconClass: "mint-toast-icon mintui mintui-field-warning"})
            }
            let exit = 0;
            this.value.forEach(item => {
                if(item.no == this.choosedName.teacher_no) {
                    return exit = 1;
                }
            });
            if(exit == 1) {this.popupVisible = false;return this.$toast({message: "已选择!", position: "middle", duration: 2000});}
            this.value.push({name: this.choosedName.name, no: this.choosedName.teacher_no});
            // else if(this.value.includes(this.choosedName)) {
            //     this.$toast({message: "已选择!", position: "middle", duration: 2000})
            // } else {
            //     this.value.push(this.choosedName);
            // }
            this.popupVisible = false;
        }
    },
    watch: {
        value: function(val, old) {
            if(old.length == this.max) this.options.forEach(item => item.disabled = false)
            if(val.length >= this.max) {
                this.options.forEach(item => {
                    item.disabled = true;
                    this.value.forEach(valItem => {
                        if(valItem.no == item.value.no) item.disabled = false;
                    })
                    // if(!this.value.includes(item.value)) item.disabled = true;
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.teachers_list{width:70%; float: left;}
.infosList{width: 20%; float: right;padding-top: 34px;box-sizing: border-box;padding-right: 10px;}
.infosList > p{min-height: 48px;text-align: center;}
.infosList > p > i{line-height: 48px;}
.mint-popup{background-color: rgba(0, 0, 0, 0); width: 70%;color: #fff; padding: 10px;}
.infoP{margin-top: 20px; line-height: 2;}
.choose, .close{margin-top: 30px;}
.choose{float: right;}
.checkBox{overflow: hidden; font-size: 13px;}
</style>
