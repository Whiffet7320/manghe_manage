<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">订单管理</div>
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
              <el-form-item label="类型：">
                <el-radio-group @change="changeRad2" v-model="form.rad2" size="small">
                  <el-radio-button label="0">所有类型</el-radio-button>
                  <el-radio-button label="1">盲盒开箱</el-radio-button>
                  <el-radio-button label="2">置换商品</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="订单状态：">
                <el-radio-group @change="changeRad1" v-model="form.rad1" size="small">
                  <el-radio-button label="-1">盲盒购买订单</el-radio-button>
                  <el-radio-button label="0">待提取</el-radio-button>
                  <el-radio-button label="1">待发货</el-radio-button>
                  <el-radio-button label="2">待收货</el-radio-button>
                  <el-radio-button label="3">已分解</el-radio-button>
                  <el-radio-button label="4">已置换</el-radio-button>
                  <el-radio-button label="5">已完成</el-radio-button>
                  <el-radio-button label="6">异常订单</el-radio-button>
                  <el-radio-button label="7">已取消</el-radio-button>
                </el-radio-group>
              </el-form-item>
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
      <div class="myTable" v-show="form.rad1 != '-1'">
        <vxe-table :data="tableData">
          <!-- <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">快递单号：{{ row.express_code ? row.express_code : '无'}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">快递名称：{{ row.express_name ? row.express_name : '无' }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">邮费：{{ row.total_postage ? row.total_postage : '无'}}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="20">
                      <div class="item">用户备注：无</div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>-->
          <vxe-table-column field="order_id" min-width="60" title="订单号"></vxe-table-column>
          <vxe-table-column min-width="80" field="order_status_name" title="订单状态"></vxe-table-column>
          <vxe-table-column min-width="80" field="order_express_company" title="快递公司"></vxe-table-column>
          <vxe-table-column min-width="80" field="order_courier" title="快递单号"></vxe-table-column>
          <vxe-table-column min-width="180" title="用户信息">
            <template slot-scope="scope">
              <div
                style="font-size:12px"
              >{{scope.row.address_person}} {{scope.row.address_phone}} {{scope.row.address_area}}{{scope.row.address_detail}}</div>
            </template>
          </vxe-table-column>
          <vxe-table-column show-overflow="title" min-width="200" title="商品信息">
            <template slot-scope="scope">
              <div class="shopxx">
                <img class="shopImg" :src="scope.row.shop_img" alt />
                <div class="txt">{{ scope.row.shop_name }}</div>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column field="myOpen_time" min-width="160" title="开箱时间"></vxe-table-column>
          <vxe-table-column title="操作状态" v-if="form.rad1 != '7' && form.rad1 != '6'" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <!-- 实物 -->
                <el-button
                  v-if="form.rad1 == '1' && scope.row.card_type_id == 0"
                  size="small"
                  @click="fahuo(scope.row)"
                  type="text"
                >发货</el-button>
                <!-- 虚拟 -->
                <el-button
                  v-if="form.rad1 == '1' && scope.row.card_type_id > 0"
                  size="small"
                  @click="fahuo2(scope.row)"
                  type="text"
                >发货</el-button>
                <el-button
                  style="margin-right: 8px"
                  size="small"
                  @click="yichangDingdan(scope.row)"
                  type="text"
                >异常订单</el-button>
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
          :current-page="this.dingdanliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
      <div class="myTable" v-show="form.rad1 == '-1'">
        <vxe-table :data="tableData">
          <vxe-table-column field="box_buy_id" title="购买盲盒ID"></vxe-table-column>
          <vxe-table-column field="box_name" title="盲盒名称"></vxe-table-column>
          <vxe-table-column field="box_num" title="购买数量"></vxe-table-column>
          <vxe-table-column field="box_price" title="盲盒价格"></vxe-table-column>
          <vxe-table-column field="myBox_time" title="获得时间"></vxe-table-column>
          <vxe-table-column field="user_id" title="购买用户ID"></vxe-table-column>
          <vxe-table-column title="操作状态" width="100">
            <template slot-scope="scope">
              <div class="flex">
                <el-button
                  :disabled='scope.row.status != 0'
                  size="small"
                  @click="fahuo(scope.row)"
                  type="text"
                >发货</el-button>
                <!-- <el-button size="small" @click="toEditShop(scope.row)" type="text">删除</el-button> -->
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.dingdanliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
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
            <el-input size="small" v-model="fahuoForm.company"></el-input>
          </el-form-item>
          <el-form-item label="快递公司拼音">
            <el-input size="small" v-model="fahuoForm.company_cn"></el-input>
          </el-form-item>
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
    ...mapState(["dingdanliebiaoPage", "dingdanliebiaoPageSize"])
  },
  watch: {
    dingdanliebiaoPage: function(page) {
      this.$store.commit("dingdanliebiaoPage", page);
      this.getData();
    },
    dingdanliebiaoPageSize: function(pageSize) {
      this.$store.commit("dingdanliebiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      activeName: "3",
      form: {
        rad1: "-1",
        rad2: "0",
        time: [],
        search: "",
        select: ""
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
  },
  methods: {
    async getData() {
      const res = await this.$api.getOrderListByStatus({
        pagenum: this.dingdanliebiaoPage,
        pagesize: this.dingdanliebiaoPageSize,
        status: this.form.rad1,
        type: this.form.rad2
      });
      console.log(res.data);
      this.total = res.data.total;
      // this.tableData = res.data.data;
      res.data.data.forEach(ele => {
        if (ele.open_time) {
          ele.myOpen_time = this.formatDate(ele.open_time);
        }
        if (ele.box_time) {
          ele.myBox_time = this.formatDate(ele.box_time);
        }
      });
      this.$set(this, "tableData", res.data.data);
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
      this.$confirm("确认删除？")
        .then(async () => {
          console.log('aaaa')
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
        })
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
      this.$store.commit("dingdanliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("dingdanliebiaoPage", val);
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