<template>
    <div id="me">
        <div class="header">
            <i class="iconfont icon-user_name"></i>
            <span>XXX</span>
        </div>
        <p class="school">商管院</p>
        <p class="text">个人简介：</p>
        <textarea class="desc" v-model="desc" :disabled="disabled"></textarea>

        <mt-button :type="btnType" size="small" @click="edit">{{text}}</mt-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            disabled: true,
            text: "修改简介",
            btnType: "primary",
            desc: "副教授、经济师、管理会计师 厦门大学硕士 厦门市优秀教师 厦门市商务专家 福建省高校人文社科研究基地-财务与审计信息化研究中心主任，福建省财务与金融实验教学示范中心主任。主持教育部产学协同育人项目、福建省重大教育教学改革项目、福建省创新创业专业、福建省创新创业资源共享课程等多个教科研项目建设。"
        }
    },
    methods: {
        edit() {
            this.disabled = !this.disabled;
            if(this.text == "修改简介") {
                this.text = "提交修改";
                this.btnType = "danger";
            } else {
                this.$messageBox.confirm('确认修改吗?').then(action => {
                     if(action == 'confirm'){
                        this.$toast("修改成功", 2000);
                        this.text = "修改简介";
                        this.btnType = "primary";
                        console.log(this.desc)
                    }
                }).catch(err => {
                    this.text = "修改简介";
                    this.btnType = "primary";
                });
                
            }
        }
    }
}
</script>
<style lang="less" scoped>
    #me{
        padding: 20px 10px;
        width: 90%;
        margin: 0 auto;
        box-shadow: 0 0 2px #c0c0c0;
        border-radius: 5px;
        .header{
            height: 40px;
            text-align: center;
        }
        .school{text-align: center;}
        .text{margin-left: 4%; margin-top: 20px;}
        .desc{display: block; width: 90%; height: 200px; line-height: 24px; margin: 0 auto; padding: 15px 10px; margin-top: 20px;text-indent: 2em;}
        button{display: block;margin: 20px auto 0 auto;}
    }
</style>
