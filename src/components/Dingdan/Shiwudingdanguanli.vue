<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">实物订单</div>
      <div class="tit2">
        <!-- <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="全部订单" name="1"></el-tab-pane>
          <el-tab-pane label="普通订单" name="2"></el-tab-pane>
          <el-tab-pane label="拼团订单" name="3"></el-tab-pane>
        </el-tabs>-->
      </div>
    </div>
    <!-- <div class="nav2">
      <el-row :gutter="10">
        <el-col :span="6"><div class="box"></div></el-col>
        <el-col :span="6"><div class="box"></div></el-col>
        <el-col :span="6"><div class="box"></div></el-col>
        <el-col :span="6"><div class="box"></div></el-col>
      </el-row>
    </div>-->
    <div class="nav3">
      <div class="myForm">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="创建时间：">
                <el-date-picker
                  size="small"
                  v-model="form.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="类型：">
                <el-radio-group @change="changeSearch_type" v-model="form.search_type" size="small">
                  <el-radio-button label="-1">所有</el-radio-button>
                  <el-radio-button label="0">盲盒开箱</el-radio-button>
                  <el-radio-button label="1">置换商品</el-radio-button>
                  <el-radio-button label="2">兑换商品</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="状态：">
                <el-radio-group
                  @change="changeSearch_status"
                  v-model="form.search_status"
                  size="small"
                >
                  <el-radio-button label="-1">所有</el-radio-button>
                  <el-radio-button label="0">待提取</el-radio-button>
                  <el-radio-button label="1">待发货</el-radio-button>
                  <el-radio-button label="2">已发货</el-radio-button>
                  <el-radio-button label="3">已完成</el-radio-button>
                  <el-radio-button label="4">已取消</el-radio-button>
                  <el-radio-button label="5">异常订单</el-radio-button>
                  <el-radio-button label="6">已分解</el-radio-button>
                  <el-radio-button label="7">已置换</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="用户：">
                <el-select :remote-method="remoteMethod" remote size="small" v-model="form.search_id" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.user_id"
                    :label="`${item.user_name}(id:${item.user_id})`"
                    :value="item.user_id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="商品名：">
                <el-input size="small" v-model="form.good_name" placeholder="请输入关键词"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="收货人名：">
                <el-input size="small" v-model="form.adddress_name" placeholder="请输入关键词"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button
                size="small"
                type="primary"
                style="margin-left:10px;margin-top:5px"
                @click="onSubmit"
                icon="el-icon-search"
              >搜索</el-button>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="支付方式：">
                <el-radio-group v-model="form.rad2" size="small">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="微信支付"></el-radio-button>
                  <el-radio-button label="支付宝支付"></el-radio-button>
                  <el-radio-button label="余额支付"></el-radio-button>
                  <el-radio-button label="线下支付"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="创建时间：">
                <el-date-picker
                  size="small"
                  v-model="form.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="搜索：">
                <div class="search">
                  <el-input
                    size="small"
                    placeholder="请输入内容"
                    v-model="form.search"
                    class="input-with-select"
                  >
                    <el-select
                      class="left-select"
                      v-model="form.select"
                      slot="prepend"
                      placeholder="请选择"
                    >
                      <el-option label="全部" value="1"></el-option>
                      <el-option label="订单号" value="2"></el-option>
                      <el-option label="UID" value="3"></el-option>
                      <el-option label="用户名称" value="4"></el-option>
                      <el-option label="用户电话" value="5"></el-option>
                      <el-option label="商品名称" value="6"></el-option>
                    </el-select>
                    <el-button
                      @click="onSubmit"
                      slot="append"
                      icon="el-icon-search"
                    ></el-button>
                  </el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>-->
        </el-form>
      </div>

      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="order_id" title="订单号"></vxe-table-column>
          <vxe-table-column field="myOpen_time" title="开箱日期"></vxe-table-column>
          <vxe-table-column field="shop_name" title="商品名"></vxe-table-column>
          <vxe-table-column field="order_total" title="商品价格"></vxe-table-column>
          <vxe-table-column field="before_price" title="原价"></vxe-table-column>
          <vxe-table-column field="user_id" title="用户ID"></vxe-table-column>
          <vxe-table-column field="myAddress" title="用户信息"></vxe-table-column>
          <vxe-table-column field="order_express_company" title="快递公司"></vxe-table-column>
          <vxe-table-column field="order_courier" title="快递单号"></vxe-table-column>
          <vxe-table-column field="order_status_name" title="订单状态"></vxe-table-column>
          <vxe-table-column title="操作状态" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button
                  :disabled="scope.row.order_status_name != '待发货'"
                  size="small"
                  @click="fahuo(scope.row)"
                  type="text"
                >发货</el-button>
                <el-button :disabled="scope.row.order_status_name != '待发货' && scope.row.order_status_name != '待提取'" style="margin-right: 8px" size="small" @click="yichangDingdan(scope.row)" type="text">异常订单</el-button>
                <el-popconfirm
                  confirm-button-text="需要退款"
                  cancel-button-text="不需要"
                  title="是否需要退款?"
                  icon="el-icon-warning"
                  icon-color="red"
                  @confirm="quxiaoDingdan(scope.row,true)"
                  @cancel="quxiaoDingdan(scope.row,false)"
                >
                  <el-button slot="reference" size="small" type="text">取消订单</el-button>
                </el-popconfirm>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.shiwuDingdanPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 订单详情 -->
    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
      <div class="myTable">
        <vxe-table :data="xiangqinTableData">
          <vxe-table-column field="box_name" title="盲盒名称"></vxe-table-column>
          <vxe-table-column field="shop_name" title="奖品名称"></vxe-table-column>
          <vxe-table-column field="myShop_degree" title="稀有度"></vxe-table-column>
          <vxe-table-column field="order_total" title="商品价格"></vxe-table-column>
          <vxe-table-column field="order_status_name" title="订单状态"></vxe-table-column>
        </vxe-table>
        <!-- <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.yonghuguanliPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.mingxiTotal"
        ></el-pagination>-->
      </div>
    </el-dialog>
    <!-- 发货 -->
    <el-dialog
      title="发货"
      :visible.sync="fahuoDialogVisible"
      width="30%"
      :before-close="fahuoHandleClose"
    >
      <div class="fahuomyForm">
        <el-form :model="fahuoForm" ref="fahuoForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="快递单号">
            <el-input size="small" v-model="fahuoForm.order_courier"></el-input>
          </el-form-item>
          <el-form-item label="快递公司">
            <!-- <el-input size="small" v-model="fahuoForm.company"></el-input> -->
            <el-select @change="changekd" size='small' v-model="fahuoForm.company_cn" filterable placeholder="请选择">
              <el-option
                v-for="item in kdOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="快递公司拼音">
            <el-input size="small" v-model="fahuoForm.company_cn"></el-input>
          </el-form-item>-->
          <el-form-item label="发件人手机号">
            <el-input size="small" v-model="fahuoForm.sender_phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm">发货</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["shiwuDingdanPage", "shiwuDingdanPageSize"])
  },
  watch: {
    shiwuDingdanPage: function(page) {
      this.$store.commit("shiwuDingdanPage", page);
      this.getData();
    },
    shiwuDingdanPageSize: function(pageSize) {
      this.$store.commit("shiwuDingdanPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      dialogVisible: false,
      activeName: "3",
      options: [],
      kdOptions:[
        {
          value: 'shunfeng',
          label: '顺丰'
        },{
          value: 'yunda',
          label: '韵达快递'
        },{
          value: 'shentong',
          label: '申通快递'
        },{
          value: 'yuantong',
          label: '圆通速递'
        },{
          value: 'jingdong',
          label: '京东物流'
        },{
          value: 'zhongtong',
          label: '中通速递'
        },{
          value: 'baishi',
          label: '百世汇通'
        },{
          value: 'tiantian',
          label: '天天快递'
        },
      ],
      form: {
        time: [],
        search_id: "",
        good_name: "",
        adddress_name: "",
        search_type: -1,
        search_status: -1
      },
      tableData: [],
      total: 0,
      fahuoId: "",
      fahuoDialogVisible: false,
      fahuoForm: {
        order_courier: "",
        company: "",
        company_cn: "",
        sender_phone: ""
      },
      box_buy_id: "",
      xiangqinTableData: [],
      rules: {
        express_code: [
          { required: true, message: "请输入快递单号", trigger: "blur" }
        ],
        express_name: [
          { required: true, message: "请输入快递名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getData();
    this.getUserData();
  },
  methods: {
    async getData() {
      const res = await this.$api.searchGoodsOrderList({
        pagenum: this.shiwuDingdanPage,
        pagesize: this.shiwuDingdanPageSize,
        search_id: this.form.search_id,
        start_time: this.form.time.length > 0 ? this.form.time[0] : "",
        end_time: this.form.time.length > 0 ? this.form.time[1] : "",
        good_name: this.form.good_name,
        adddress_name: this.form.adddress_name,
        search_type: this.form.search_type,
        search_status: this.form.search_status
      });
      console.log(res.data);
      this.total = res.data.total;
      // this.tableData = res.data.data;
      res.data.data.forEach(ele => {
        if (ele.open_time) {
          ele.myOpen_time = this.formatDate(ele.open_time);
        }
        ele.myAddress = `${ele.address_person} ${ele.address_phone} ${ele.address_area} ${ele.address_detail}`;
        // if (ele.addreee_area) {
        //   ele.myAddress = this.formatDate(ele.box_time);
        // }
      });
      this.$set(this, "tableData", res.data.data);
    },
    remoteMethod(query) {
      this.getUserData(query)
      console.log(this.options)
    },
    changekd(e){
      this.fahuoForm.company = this.kdOptions.filter(ele=>{
        return ele.value == e
      })[0].label
      console.log(this.fahuoForm.company)
    },
    changeSearch_status() {
      this.getData();
    },
    changeSearch_type() {
      this.getData();
    },
    seeXiangqin(row) {
      this.box_buy_id = row.box_buy_id;
      this.getXqData();
    },
    async getXqData() {
      const res = await this.$api.searchBoxOrderDetail({
        box_buy_id: this.box_buy_id
      });
      console.log(res);
      this.xiangqinTableData = res.data;
      this.xiangqinTableData.forEach(ele => {
        ele.myShop_degree =
          ele.shop_degree == "0"
            ? "金色传说"
            : ele.shop_degree == "1"
            ? "红色史诗"
            : ele.shop_degree == "2"
            ? "紫色稀有"
            : "蓝色普通";
      });
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async getUserData(search_key) {
      const res = await this.$api.getUserList({
        pagesize: 100000,
        pagenum: 1,
        search_key: search_key
      });
      this.options = res.data.data;
    },
    formatDate(now) {
      var time = new Date(now);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      var hour = time.getHours();
      var minute = time.getMinutes();
      var second = time.getSeconds();
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    async submitForm() {
      const res = await this.$api.changeOrderToSended({
        order_id: this.fahuoId,
        order_courier: this.fahuoForm.order_courier,
        company: this.fahuoForm.company,
        company_cn: this.fahuoForm.company_cn,
        sender_phone: this.fahuoForm.sender_phone
      });
      console.log(res);
      if (res.status == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
        this.fahuoDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    onSubmit() {
      console.log(this.form);
      this.getData();
    },
    changeRad1() {
      this.getData();
    },
    changeRad2() {
      this.getData();
    },
    fahuo(row) {
      console.log(row);
      this.fahuoId = row.order_id;
      this.fahuoDialogVisible = true;
    },
    async fahuo2(row) {
      console.log(row);
      this.fahuoId = row.order_id;
      const res = await this.$api.getCardListByOrderid({
        order_id: row.order_id
      });
      console.log(res);
      if (res.data.length > 0) {
        var card_id = res.data[0].card_id;
        const res2 = await this.$api.changeOrderToSendedByCard({
          order_id: row.order_id,
          card_id
        });
        if (res2.status == 200) {
          this.$message({
            message: res2.msg,
            type: "success"
          });
          this.getData();
        } else {
          this.$message.error(res2.msg);
        }
      } else {
        this.$message.error(res.msg);
      }
    },
    async yichangDingdan(row) {
      const res = await this.$api.changeOrderToError({
        order_id: row.order_id
      });
      if (res.status == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    async quxiaoDingdan(row, flag) {
      console.log(row);
      const res = await this.$api.changeOrderToCancle({
        order_id: row.order_id,
        need_refund: flag
      });
      if (res.status == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    async toEditShop(row) {
      this.$confirm("确认删除？").then(async () => {
        console.log("aaaa");
        const res = await this.$api.orderDel({
          id: row.id
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
        }
      });
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    fahuoHandleClose() {
      this.fahuoDialogVisible = false;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("shiwuDingdanPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("shiwuDingdanPage", val);
    }
  }
};
</script>


<style lang="scss" scoped>
.index {
}

.nav1 {
  margin: 0 -18px;
  background-color: #fff;
  padding: 20px 32px 0 40px;
  .tit1 {
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 20px;
  }
  .tit2 {
    margin-top: 10px;
    /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 20px;
    }
    /deep/ .el-tabs__header {
      margin: 0 0 1px;
    }
  }
}
.nav2 {
  margin-top: 20px;
  height: 110px;
  .box {
    background: #fff;
    height: 110px;
    box-shadow: 0px 0 4px 2px #dddddd !important;
  }
}
.nav3 {
  margin: 18px 0;
  background: #fff;
  border-radius: 6px;
  padding: 24px;
  .myForm {
    /deep/ .el-form-item__label {
      font-size: 12px;
    }
    /deep/ .el-form-item {
      margin-right: 30px;
      margin-bottom: 0;
    }
    .search {
      margin-top: 3px;
      /deep/ .el-select {
        width: 100px;
      }
    }
  }
  .tit1 {
    margin-top: 10px;
  }
  .myTable {
    margin-top: 10px;
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
    /deep/ .vxe-cell {
      white-space: normal !important;
      overflow: visible !important;
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
    /deep/ .vxe-cell {
      max-height: none;
      padding: 6px 10px;
    }
  }
}
.shopxx {
  display: flex;
  align-items: center;
  margin: 4px 0;
  .shopImg {
    width: 40px;
    height: 40px;
    margin-right: 6px;
  }
  .txt {
    font-size: 12px;
    line-height: 16px;
  }
}
.fahuomyForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 20px;
  }
  .search {
    margin-top: 3px;
    /deep/ .el-select {
      width: 100px;
    }
  }
}
</style>