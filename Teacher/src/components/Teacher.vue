<template>
  <div id="teacher">
    <p style="height:20px;background-color:#f0f0f0;font-size:12px;text-align:center;margin-bottom: 20px;">剩余时间：<strong>{{Math.floor(remain_time / 60)}}</strong>分钟<strong>{{remain_time % 60}}</strong>秒</p>
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
  <router-view id="box"></router-view>
  <h3 style="text-align:center;">当前轮次：{{round}}</h3>
  <h5 v-if="chioces.length == 0 && ack.length == 0" style="text-align:center;margin-top: 10px;color: #555;">{{tip}}</h5>
  <h3 v-else style="text-align:center;">{{tip}}</h3>
    <div v-for="(item, index) in chioces" :key="index">
      <p class="zy">第 <mt-badge type="error" size="small">{{index + 1}}</mt-badge> 志愿：</p>
      <mt-checklist
        v-model="value"
        :options="item">
      </mt-checklist>
    </div>
  
    <div v-if="chioces.length == 0 && ack.length == 0" class="routerBtn">
      <router-link :to="'/teacher/intention?task_id=' + this.$route.query.task_id"><mt-button size="small">查看志愿详情</mt-button></router-link>
      <router-link :to="'/teacher/result?task_id=' + this.$route.query.task_id"><mt-button type="primary" size="small">查看结果</mt-button></router-link>
    </div>
    <mt-button v-if="chioces.length != 0 && ack.length == 0" size="small" type="danger" class="send" @click="send">确认提交</mt-button>
    
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
      max: 0,
      // 选择了该导师的所有学生，二维数组，第一位第一志愿所有学生，第二位第二志愿以此类推
      chioces: [],
      choices_id: [],
      active_choice: 0,
      value: [],
      prohibit: [],
      ack: [], // 选择完之后的列表
      tip: "当前还没有学生选择您哦",
      round: 0,
      remain_time: 0
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
    getData() {
      this.$ajax.get("/api/t/tasks/" + this.$route.query.task_id).then(res => {
      if(res.data.code == 0) {
          if(res.data.data.remain_time) {
              this.remain_time = res.data.data.remain_time;
              window.setInterval(() => {this.remain_time -= 1}, 1000);
          }
          // 如果已经选完了，就把结果展示出来就好了，不再处理选择提交的操作
          localStorage.setItem("round", res.data.data.round);
          this.round = res.data.data.round;
          if(res.data.data.ack == true) {
            return this.tip = "当前轮次您已进行选择";
          }
          if(res.data.data.remaining == 0) {
            this.tip = "您已选满学生了";
            return this.$router.push('/teacher/result?task_id=' + this.$route.query.task_id);
          }
          if(res.data.data.round_status != 2) {
            return this.tip = "请耐心等待当前轮次开始";
          }
          // if(res.data.data.ack == true) {
          //   return this.$router.push('/teacher/intention?task_id=' + this.$route.query.task_id);
          // }
          // if("ack" in res.data.data) {
          //   return this.ack = res.data.data.ack;
          // }
          this.max = res.data.data.remaining;
          for(var i = 0; i < this.max; i ++) {
              this.choices_id.push("choice-" +  i);
          }
          for(let i = 0; i < this.max; i ++) {this.choicesBtnType.push("default")}
          // 学生数量总和
          var student_count = 0;
          for(let key in res.data.data.intention) {
            this.$set(this.chioces, key - 1, res.data.data.intention[key].map(item => {
              student_count += 1;
              return {id: item.student_no, name: item.student_name + " —— " + item.grade + "级" + item.class}
            }));
          }
          // 判断学生数量是否小于remaining余量，小于的话，max最大值设置为学生数量
          if(student_count < this.max) {
            this.max = student_count;
          }
          this.tip = "您当前应至少选择 " + this.max + " 位学生";
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
        }
      })
    },
    send() {
      if(this.value.length != this.max) {return this.$toast({message: "请选满"+this.max+"位同学", iconClass: 'mint-toast-icon mintui mintui-field-warning'});}
      let choosed_list = "";
      this.value.forEach(val => {
        this.chioces.forEach(item => {
          item.forEach(inner_item => {
            if(inner_item.id == val) choosed_list += inner_item.name.split("——")[0] + "、"
          })
        })
      });
      choosed_list = choosed_list.substring(0, choosed_list.length - 1);
      this.$messageBox.confirm('选择了以下同学：' + choosed_list).then(action => {
        if(action == "confirm") {
          this.$ajax.put("/api/t/tasks/" + this.$route.query.task_id, this.value, {headers: {'Content-Type': 'application/json'}}).then(res => {
                if(res.data.code == 0) {
                  this.$toast({message: '操作成功', iconClass: 'mint-toast-icon mintui mintui-success'});
                  // 提交选择之后，重新请求数据
                  // this.getData();
                  window.location.reload();
                  // this.$ajax.get("/api/t/tasks/" + this.$route.query.task_id).then(res => {
                  //   if(res.data.code == 0) {
                  //     if("ack" in res.data.data) {
                  //       this.ack = res.data.data.ack;
                  //     }
                  //   }
                  // })
                }
            })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    // console.log(this.$set)
    // 获取最大选择数量
    // JSON.parse(localStorage.getItem("tasks")).forEach(item => {
    //   if(item.id == this.$route.query.task_id) {
    //     this.max = item.intention_number;
    //   }
    // });
    // 获取数据
    this.getData();
    this.choicesBtnType[0] = "primary";
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
#box{position: absolute; width: 100%; background-color: #fff; overflow: hidden; box-shadow: 0 0 4px #ccc;left: 0; top: 20%;padding-top: 20px;padding-bottom: 20px;border-radius: 5px;}
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
.ack{
  h3{text-align: center;margin-bottom: 20px;}
  .item{
    border-bottom: 1px solid #f0f0f0;
    margin-top: 10px;
    padding-bottom: 5px;
    span{
      display: inline-block;
      text-align: center;
      width: 30%;
    }
  }
}
</style>
