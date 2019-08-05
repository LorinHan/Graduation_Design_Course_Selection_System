<template>
  <div id="teacher">
    <!-- <mt-button :type="choicesBtnType[item3 - 1]" class="chioce" size="small" v-for="item3 in max" :key="item3" @click="changeChioce(item3 - 1)">第 {{item3}} 志愿</mt-button>

    <mt-tab-container v-model="choices_id[active_choice]">
          <mt-tab-container-item v-for="(inner_item, index) in chioces" :key="'choice-' + index" :id="'choice-' + index">
            <mt-checklist
              :title="'①根据安排，您应选择 '+max+' 位学生，不得多选或少选； ②优先级较高的志愿学生数量总和如果不足 ' + max + ' 人，则默认选中无法取消。③优先级较高的志愿人数总和如果超过 ' + max + '人，则优先级低的志愿不能选择学生，只能从优先级高的志愿选择。'"
              v-model="value"
              :options="inner_item">
            </mt-checklist>
          </mt-tab-container-item>
  </mt-tab-container> -->
    <div v-for="(item, index) in chioces" :key="index">
      <p class="zy">第 <mt-badge type="error" size="small">{{index + 1}}</mt-badge> 志愿：</p>
      <mt-checklist
        v-model="value"
        :options="item">
      </mt-checklist>
    </div>

    <mt-button size="small" type="danger" class="send" @click="send">确认提交</mt-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      username: "XXX",
      grade: "副教授",
      choicesBtnType: [],
      max: 5,
      // 选择了该导师的所有学生，二维数组，第一位第一志愿所有学生，第二位第二志愿以此类推
      chioces: [[{id: 42, name: "小动"}, {id: 129, name: "小明"}, {id: 13, name: "小红2"}], [{id: 40, name: "小东"}], [{id: 1, name: "小明2"}, {id: 3, name: "小红3"}, {id: 2, name: "小红4"}, {id: 12, name: "小明"}], [{id: 112, name: "小小明"}], [{id: 100, name: "小鸟"}]],
      choices_id: [],
      active_choice: 0,
      value: [],
      prohibit: []
    }
  },
  methods: {
    logout() {
      this.$router.push("/");
    },
    changeChioce(index) {
      this.choicesBtnType.forEach((item, ind) => {
        if(ind == index) this.choicesBtnType[ind] = "primary";
        else this.choicesBtnType[ind] = "default";
      })
      this.active_choice = index;
    },
    send() {
      if(this.value.length != this.max) {return this.$toast({message: "请选满"+this.max+"位同学", iconClass: 'mint-toast-icon mintui mintui-field-warning'});}
      let choosed_list = "";
      this.value.forEach(val => {
        this.chioces.forEach(item => {
          item.forEach(inner_item => {
            if(inner_item.id == val) choosed_list += inner_item.name + "、"
          })
        })
      });
      choosed_list = choosed_list.substring(0, choosed_list.length - 1);
      this.$messageBox.confirm('选择了以下同学：' + choosed_list).then(action => {
        if(action == "confirm") {
          this.$toast({message: '操作成功', iconClass: 'mint-toast-icon mintui mintui-success'});
        }
      }).catch(err => {

      })
      
      // mint-toast-icon mintui mintui-field-warning
      // console.log(this.value);
    }
  },
  created() {
    for(var i = 0; i < this.max; i ++) {
        this.choices_id.push("choice-" +  i)
    }
    for(let i = 0; i < this.max; i ++) {this.choicesBtnType.push("default")}

    // 获取数据
    // this.majorBtnType[0] = "primary";
    this.choicesBtnType[0] = "primary";

    // 构造复选框的数组
    let count = 0;
    this.chioces.forEach(item => {
      // 如果计数器count大于等于max，则当前志愿tab为禁用状态
      if(count >= this.max) {item.forEach(dis => {
        dis["disabled"] = true;
        this.prohibit.push(dis)
      })}
      item.forEach(inner => {
        count ++;
        inner["label"] = inner.name;
        inner["value"] = inner.id;
      })
      // 如果当前页的人数和小于等于max，全选，禁止取消
      if(count <= this.max) {
          item.forEach(inner => {
            this.value.push(inner.value);
            inner["disabled"] = true;
            this.prohibit.push(inner)
          })
      }
    })
  },
  mounted() {
  },
    watch: {
        value: function(val, old) {
            if(old.length == this.max) {
              this.chioces.forEach(item => item.forEach(dis => {
                dis["disabled"] = false;
                this.prohibit.forEach(pro => {
                  if(pro.id == dis.id) dis["disabled"] = true;
                })
              }))
            }
            if(val.length >= this.max) {
                this.chioces.forEach(item => {
                  item.forEach(dis => {
                   if(!this.value.includes(dis.value)) dis.disabled = true;
                  })
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
#teacher{
  margin-top: -5%;
  padding: 10px;
  .chioce{font-size: 12px; margin-right: 3%; padding: 0 10px;}
  .send{display: block;margin: 50px auto;}
  .zy{height: 35px;margin-top: 20px;}
}
.mint-button{display: inline-block;margin-right: 5%; margin-top: 10px;}
.user{
    width:100%;
    height:30px;
    margin-top: -10%;
    margin-bottom: 10px;
    line-height: 30px;
    border-bottom: 1px solid #f2f2f2;
}
.info{
    float: left;
    margin-left: 10px;
}
.logout{float: right;width: 55px;height:25px;font-size: 12px;margin-right: 10px;margin-top: 0px;}
</style>
