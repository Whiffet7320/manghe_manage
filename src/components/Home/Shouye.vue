<template>
  <div class="index">
    <!-- <div class="txttt">今日数据</div>
    <div class="top">
      <div class="box">
        <div class="icon1">
          <div class="icon2">
            <i class="el-icon-s-order"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{substitution_num2}}</div>
          <div class="txt2">今日置换次数</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-2">
          <div class="icon2 i1-2">
            <i class="el-icon-s-claim"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{pick_total2}}</div>
          <div class="txt2">今日提取金额</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-2">
          <div class="icon2 i1-2">
            <i class="el-icon-s-claim"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{pick_time2}}</div>
          <div class="txt2">今日提取次数</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-2">
          <div class="icon2 i1-2">
            <i class="el-icon-s-claim"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{decompose_time2}}</div>
          <div class="txt2">今日分解次数</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-3">
          <div class="icon2 i1-3">
            <i class="el-icon-s-release"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{decompose_total2}}</div>
          <div class="txt2">今日分解金额</div>
        </div>
      </div>
    </div>
    <div class="myTable" >
      <vxe-table :data="tableData" align='center'>
        <vxe-table-column field="box_name" title="盲盒名称"></vxe-table-column>
        <vxe-table-column field="box_num" title="购买数量"> </vxe-table-column>
        <vxe-table-column field="box_price" title="价格"></vxe-table-column>
      </vxe-table>
    </div>
    <div style="margin-top:30px" class="txttt">总数据</div>-->
    <div class="myForm">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="日期：">
          <el-date-picker
            size="small"
            v-model="formInline.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="top">
      <div class="box">
        <div class="icon1">
          <div class="icon2">
            <i class="el-icon-s-order"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{duihuan}}</div>
          <div class="txt2">兑换盈利</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-2">
          <div class="icon2 i1-2">
            <i class="el-icon-s-claim"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{fenjie}}</div>
          <div class="txt2">分解盈利</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-2">
          <div class="icon2 i1-2">
            <i class="el-icon-s-claim"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{tiqu}}</div>
          <div class="txt2">提取盈利</div>
        </div>
      </div>
    </div>
    <!-- <div class="top">
      <div class="box">
        <div class="icon1 i1-3">
          <div class="icon2 i1-3">
            <i class="el-icon-s-release"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{decompose_total}}</div>
          <div class="txt2">总分解金额</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1">
          <div class="icon2">
            <i class="el-icon-s-order"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{substitution_person}}</div>
          <div class="txt2">置换人数</div>
        </div>
      </div>
            <div class="box">
        <div class="icon1 i1-2">
          <div class="icon2 i1-2">
            <i class="el-icon-s-claim"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{decompose_time}}</div>
          <div class="txt2">总分解次数</div>
        </div>
      </div>
    </div> -->
    <div class="txxx">盲盒销量</div>
    <div class="myTable">
      <vxe-table :data="tableData2" align="center">
        <vxe-table-column field="box_name" title="盲盒名称"></vxe-table-column>
        <vxe-table-column field="box_num" title="购买数量"></vxe-table-column>
        <vxe-table-column field="box_price" title="价格"></vxe-table-column>
        <vxe-table-column field="person_num" title="购买人数"></vxe-table-column>
        <vxe-table-column field="box_prize" title="箱子开出的商品价值"></vxe-table-column>
      </vxe-table>
    </div>
    <div class="txxx">置换数据</div>
    <div class="myTable">
      <vxe-table :data="tableData3" align="center">
        <vxe-table-column field="substitution_before_sum" title="商品实际金额"></vxe-table-column>
        <vxe-table-column field="substitution_pay" title="置换总聚豆"></vxe-table-column>
        <vxe-table-column field="substitution_person_num" title="置换总人数"></vxe-table-column>
        <vxe-table-column field="substitution_profit" title="置换盈利"></vxe-table-column>
      </vxe-table>
    </div>
    <!-- <div id="main1"></div>
    <div id="main2"></div>
    <div id="main3"></div>-->
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      formInline: {
        time: []
      },
      substitution_num: 0,
      pick_total: 0,
      decompose_total: 0,
      decompose_time: 0,
      pick_time: 0,
      substitution_num2: 0,
      pick_total2: 0,
      decompose_total2: 0,
      decompose_time2: 0,
      pick_time2: 0,
      substitution_person: 0,
      box_prize: 0,
      person_num: 0,
      tableData: [],
      tableData2: [],
      tableData3:[],
      nowDate: "",
      duihuan:'',
      fenlei:'',
      tiqu:'',
    };
  },
  created() {
    // this.getData();
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    this.formInline.time[0] = year + "-" + month + "-" + day;
    this.formInline.time[1] = year + "-" + month + "-" + day;
    this.getData2();
  },
  methods: {
    async getData2() {
      // const res = await this.$api.getOperate({
      //   isToday: false
      // });
      // console.log(res);
      // this.decompose_total = res.data.decompose_total;
      // this.substitution_num = res.data.substitution_num;
      // this.pick_total = res.data.pick_total;
      // this.decompose_time = res.data.decompose_time;
      // this.pick_time = res.data.pick_time;
      // this.tableData = res.data.box_sale;
      const res2 = await this.$api.getOperateData({
        // isToday: true,
        start_time: this.formInline.time[0],
        end_time: this.formInline.time[1]
      });
      this.duihuan = res2.data.duihuan;
      this.fenjie = res2.data.fenjie;
      this.tiqu = res2.data.tiqu;
      // this.decompose_total = res2.data.decompose_total;
      // this.substitution_num = res2.data.substitution_num;
      // this.pick_total = res2.data.pick_total;
      // this.decompose_time = res2.data.decompose_time;
      // this.pick_time = res2.data.pick_time;
      // this.substitution_person = res2.data.substitution_person;
      // this.box_prize = res2.data.box_prize;
      // this.person_num = res2.data.person_num;
      this.tableData2 = res2.data.box_sale;
      this.tableData3 = [res2.data.zhihuan]
    },
    onSubmit() {
      this.getData2();
    },
    async getData() {
      const res = await this.$api.dashboard();
      console.log(res);
      this.wait_send = res.data.wait_send;
      this.wait_check = res.data.wait_check;
      this.wait_refund = res.data.wait_refund;
      var chartDom1 = document.getElementById("main1");
      var myChart1 = echarts.init(chartDom1);
      var chartDom2 = document.getElementById("main2");
      var myChart2 = echarts.init(chartDom2);
      var chartDom3 = document.getElementById("main3");
      var myChart3 = echarts.init(chartDom3);
      var option1 = {
        title: {
          x: "20",
          text: "近7天订单数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          x: "180",
          y: "-2",
          feature: {
            saveAsImage: {
              //保存图片
              show: true
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单数",
            type: "line",
            stack: "总量"
          }
        ]
      };
      var option2 = {
        title: {
          x: "20",
          text: "近7天新增用户数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新增用户数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          x: "180",
          y: "-2",
          feature: {
            saveAsImage: {
              //保存图片
              show: true
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "新增用户数",
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#ff9900",
                borderColor: "#ff9900" //拐点边框颜色
              }
            }
          }
        ]
      };
      var option3 = {
        title: {
          x: "20",
          text: "近7天活跃用户数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["活跃用户数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          x: "180",
          y: "-2",
          feature: {
            saveAsImage: {
              //保存图片
              show: true
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "活跃用户数",
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#19be6b",
                borderColor: "#19be6b" //拐点边框颜色
              }
            }
          }
        ]
      };
      let week_orderKeyArr = [];
      let week_orderZhiArr = [];
      for (const key in res.data.week_order) {
        week_orderKeyArr.push(key);
        week_orderZhiArr.push(res.data.week_order[key]);
      }
      option1.xAxis.data = week_orderKeyArr;
      option1.series[0].data = week_orderZhiArr;
      option1 && myChart1.setOption(option1);
      let week_new_userKeyArr = [];
      let week_new_userZhiArr = [];
      for (const key in res.data.week_new_user) {
        week_new_userKeyArr.push(key);
        week_new_userZhiArr.push(res.data.week_new_user[key]);
      }
      option2.xAxis.data = week_new_userKeyArr;
      option2.series[0].data = week_new_userZhiArr;
      option2 && myChart2.setOption(option2);
      let week_activity_userKeyArr = [];
      let week_activity_userZhiArr = [];
      for (const key in res.data.week_activity_user) {
        week_activity_userKeyArr.push(key);
        week_activity_userZhiArr.push(res.data.week_activity_user[key]);
      }
      option3.xAxis.data = week_activity_userKeyArr;
      option3.series[0].data = week_activity_userZhiArr;
      option3 && myChart3.setOption(option3);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.txxx{
  font-weight: 700;
  font-size: 14px;
  margin: 20px 0;
}
.myForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 20px;
  }
}
.txttt {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 800;
}
.myTable {
  margin: 10px 0;
  .xiala {
    padding: 10px 20px;
    .item {
      font-size: 12px;
    }
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .fenye {
    margin-top: 10px;
  }
  /deep/ .vxe-table--render-default .vxe-body--column {
    line-height: 14px;
    vertical-align: middle;
  }
  /deep/ .vxe-cell--label {
    font-size: 12px;
  }
  /deep/ .vxe-cell--title {
    font-size: 12px;
  }
  /deep/ .image-slot {
    width: 38px;
    height: 38px;
    border: 1px solid #ddd;
    line-height: 38px;
    text-align: center;
    border-radius: 4px;
  }
}
.top {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  height: 120px;
  .box {
    &:nth-child(5) {
      margin-right: 0px;
    }
    border-radius: 10px;
    height: 100%;
    width: 33.3%;
    background: #ffffff;
    margin-right: 16px;
    display: flex;
    align-items: center;
    padding: 0 25px;
    .icon1.i1-2 {
      background: #fff3e0;
      .icon2.i1-2 {
        background: #ffab2b;
      }
    }
    .icon1.i1-3 {
      background: #eaf9e1;
      .icon2.i1-3 {
        background: #6dd230;
      }
    }
    .icon1 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #e4ecff;
      .icon2 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #4d7cfe;
        .el-icon-s-order {
          font-size: 26px;
          color: #ffffff;
        }
        .el-icon-s-release {
          font-size: 26px;
          color: #ffffff;
        }
        .el-icon-s-claim {
          font-size: 26px;
          color: #ffffff;
        }
      }
    }
    .tit {
      margin-left: 30px;
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .txt1 {
        color: rgb(37, 38, 49);
        font-size: 24px;
      }
      .txt2 {
        color: rgb(152, 169, 188);
        font-size: 12px;
      }
    }
  }
}
#main1 {
  width: 100%;
  height: 300px;
  background: #ffffff;
  padding: 14px 0px;
  border-radius: 10px;
}
#main2 {
  margin-top: 20px;
  width: 100%;
  height: 300px;
  background: #ffffff;
  padding: 14px 0px;
  border-radius: 10px;
}
#main3 {
  margin-top: 20px;
  width: 100%;
  height: 300px;
  background: #ffffff;
  padding: 14px 0px;
  border-radius: 10px;
}
</style>