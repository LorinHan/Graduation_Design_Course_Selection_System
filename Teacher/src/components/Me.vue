<template>
    <div id="me">
        <div class="header">
            <i class="iconfont icon-user_name"></i>
            <span style="font-size: 16px;">{{me.name}}</span>
        </div>
        <p class="school">商管院</p>
        <!-- <p class="text">个人简介：</p>
        <textarea class="desc" v-model="desc" :disabled="disabled"></textarea> -->
        <p style="margin-top: 20px;">专业技术职务：<input type="text" style="padding-left: 5px;height: 30px;" :disabled="disabled" v-model="me.title"></p>
        <p style="font-size:12px;margin-top:5px;color:#ccc;" v-if="!disabled">多个专业技术职务请使用 / 隔开，如“教授/工程师”。</p>
        <p style="margin-top: 20px;">研究方向：<textarea class="desc" :disabled="disabled" v-model="me.research"></textarea></p>
        <mt-button v-if="this.disabled == false" type="danger" size="small" @click="cancle">取消</mt-button>
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
            me: {}
        }
    },
    methods: {
        edit() {
            this.disabled = !this.disabled;
            if(this.text == "修改简介") {
                this.text = "提交修改";
                this.btnType = "primary";
            } else {
                this.$messageBox.confirm('确认修改吗?').then(action => {
                     if(action == 'confirm'){
                         this.$ajax.put("/api/t/teachers", this.$qs.stringify({title: this.me.title, research: this.me.research})).then(res => {
                             if(res.data.code == 0) {
                                this.$toast("修改成功", 2000);
                                this.text = "修改简介";
                                this.btnType = "primary";
                                // 刷新数据
                                this.$ajax.get("/api/t/me").then(res => {
                                    if(res.data.code == 0) {
                                        this.me = res.data.data[0];
                                    }
                                });
                             } else {this.$toast("修改失败，请稍后重试", 3000);}
                         });
                    }
                }).catch(err => {
                    this.text = "修改简介";
                    this.btnType = "primary";
                });
                
            }
        },
        cancle() {
                    this.text = "修改简介";
            this.disabled = true;
        }
    },
    created() {
        this.$ajax.get("/api/t/me").then(res => {
            if(res.data.code == 0) {
                this.me = res.data.data[0];
            }
        });
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
        .desc{display: block; width: 90%; height: 100px; line-height: 24px; margin: 0 auto; padding: 15px 10px; margin-top: 20px;text-indent: 2em;}
        button{display: block;margin: 20px auto 0 auto;}
        
        input:disabled, textarea:disabled{background-color: #f0f0f0;}
    }
</style>
