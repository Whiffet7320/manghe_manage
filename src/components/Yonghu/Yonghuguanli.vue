<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">用户管理</div>
      <div class="tit2">
        <!-- <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="微信公众号" name="2"></el-tab-pane>
          <el-tab-pane label="微信小程序" name="3"></el-tab-pane>
        </el-tabs>-->
      </div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="ID搜索：">
            <el-input size="small" v-model="formInline.search" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" icon="el-icon-search" type="primary" @click="onSubmit">搜索</el-button>
            <!-- <el-button size="small" @click="onReact"
              >重置</el-button
            >-->
          </el-form-item>
        </el-form>
      </div>
      <div class="tit1">
        <!-- <el-button
          @click="toAddShop"
          size="small"
          type="primary"
          icon="el-icon-plus"
          >添加商品</el-button
        >-->
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <!-- <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">上级邀请人邀请码：{{row.parent_uniqid}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">邀请总人数：{{row.spread_count}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">等级：{{ row.level }}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">积分：{{row.integral}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">会员过期时间：{{row.myOverdue_vip_time}}</div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>-->
          <vxe-table-column field="user_id" title="ID"></vxe-table-column>
          <vxe-table-column field="user_icon" title="头像">
            <template slot-scope="scope">
              <el-image :src="scope.row.user_icon" fit="fill" style="width: 40px; height: 40px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="user_name" title="用户名"></vxe-table-column>
          <vxe-table-column field="user_lucky" title="幸运值"></vxe-table-column>
          <vxe-table-column field="user_bean" title="余额(聚豆)"></vxe-table-column>
          <vxe-table-column title="操作状态" width="160">
            <template slot-scope="scope">
              <div class="flex">
                <!-- <el-button size="small" @click="toEdit(scope.row)" type="text">编辑</el-button> -->
                <el-button size="small" @click="seeMingxi(scope.row)" type="text">查看订单数据</el-button>
                <!-- <el-button size="small" @click="toPingtuanjilu(scope.row)" type="text">拼团记录</el-button> -->
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.yonghuguanliPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 查看取消订单数据 -->
    <el-dialog title="查看订单数据" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
      <div class="myForm">
        <el-form ref="mingxiFrom" :model="mingxiFrom" label-width="80px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="选择时间：">
                <el-date-picker
                  size="small"
                  v-model="mingxiFrom.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
                <el-button
                  size="small"
                  type="primary"
                  style="margin-left:20px"
                  @click="onMXSubmit"
                  icon="el-icon-search"
                >查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="myTable">
        <div class="ttxt">
          <div class="tt">商品原价总计：{{user_box_before}}</div>
          <div class="tt">盲盒购买花费总计：{{user_box_pay}}</div>
          <div class="tt">盲盒开出的奖品：{{user_box_get}}</div>
          <div class="tt">订单数：{{order_sum}}</div>
        </div>
        <vxe-table :data="mingxiTableData">
          <vxe-table-column field="box_name" title="盲盒类型"></vxe-table-column>
          <vxe-table-column field="box_before" title="商品原价"></vxe-table-column>
          <vxe-table-column field="box_price" title="购买盲盒花费"></vxe-table-column>
          <vxe-table-column field="box_prize" title="盲盒所得"></vxe-table-column>
          <vxe-table-column field="order_sum" title="订单数"></vxe-table-column>
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
    <!-- 编辑 -->
    <el-dialog
      title="编辑"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="editHandleClose"
    >
      <div class="editForm">
        <el-form :model="editForm" ref="editForm" label-width="140px" class="demo-ruleForm">
          <el-form-item label="用户等级：">
            <el-input size="small" v-model="editForm.level"></el-input>
          </el-form-item>
          <el-form-item label="用户密码：">
            <el-input size="small" v-model="editForm.pwd"></el-input>
          </el-form-item>
          <el-form-item label="用户自身的邀请码：">
            <el-input size="small" v-model="editForm.uniqid"></el-input>
          </el-form-item>
          <el-form-item label="邀请人ID：">
            <el-input size="small" v-model="editForm.spread_uid"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm">确定</el-button>
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
    ...mapState(["yonghuguanliPage", "yonghuguanliPageSize"])
  },
  watch: {
    yonghuguanliPage: function(page) {
      this.$store.commit("yonghuguanliPage", page);
      this.getData();
    },
    yonghuguanliPageSize: function(pageSize) {
      this.$store.commit("yonghuguanliPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      activeName: "1",
      formInline: {
        search: "",
        select: ""
      },
      options: [],
      tableData: [],
      total: 51,
      dialogVisible: false,
      mingxiFrom: {
        time: null
      },
      mingxiTableData: [],
      mingxiTotal: 0,
      mingxiUser_id: "",
      editDialogVisible: false,
      editForm: {
        level: "",
        pwd: "",
        uniqid: "",
        spread_uid: ""
      },
      editId: "",
      userId: "",
      user_box_before: 0,
      user_box_pay: 0,
      order_sum: 0,
      user_box_get: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.getUserList({
        pagesize: this.yonghuguanliPageSize,
        pagenum: this.yonghuguanliPage,
        search_key:this.formInline.search,
      });
      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      // this.tableData.forEach(ele => {
      //   ele.myIs_vip = ele.is_vip == "1" ? "是" : "否";
      //   ele.myOverdue_vip_time = this.formatDate(ele.overdue_vip_time * 1000);
      // });
      // const res2 = await this.$api.categoryIndex({
      //   pid: 0
      // });
      // res2.data.forEach(ele => {
      //   ele.value = ele.id;
      //   ele.label = ele.cate_name;
      //   if (ele.children) {
      //     ele.children.forEach(item => {
      //       item.value = item.id;
      //       item.label = item.cate_name;
      //     });
      //   }
      // });
      // this.options = res2.data;
    },
    async getMingxiData() {
      console.log(this.mingxiFrom);
      const res = await this.$api.getUserHistoryList({
        user_id: this.userId,
        start_time: this.mingxiFrom.time ? this.mingxiFrom.time[0] : "",
        end_time: this.mingxiFrom.time ? this.mingxiFrom.time[1] : ""
      });
      this.user_box_before = res.data.user_box_before;
      this.user_box_pay = res.data.user_box_pay;
      this.order_sum = res.data.order_sum;
      this.user_box_get = res.data.user_box_get;
      this.mingxiTableData = res.data.box_order;
    },
    onMXSubmit() {
      this.getMingxiData();
    },
    async submitForm() {
      const res = await this.$api.updat_user_info({
        user_id: this.editId,
        ...this.editForm
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
        this.editDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    changeMingxiRadio() {
      this.getMingxiData();
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    toEdit(row) {
      this.editForm = {
        level: "",
        pwd: "",
        uniqid: "",
        spread_uid: ""
      };
      this.editId = row.user_id;
      this.editDialogVisible = true;
    },
    async seeMingxi(row) {
      this.userId = row.user_id;
      this.mingxiTableData = [];
      this.getMingxiData();
      this.dialogVisible = true;
    },
    toPingtuanjilu(row) {
      this.$router.push({
        name: "Pingtuanjilu",
        params: {
          userId: row.user_id
        }
      });
    },
    onSubmit() {
      this.getData()
    },
    onReact() {},
    handleClose() {
      this.dialogVisible = false;
    },
    editHandleClose() {
      this.editDialogVisible = false;
    },
    formatDate(date1) {
      var date = new Date(date1);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + MM + DD + " " + hh + mm + ss;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("yonghuguanliPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("yonghuguanliPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.ttxt {
  display: flex;
  align-items: center;
  margin: 20px 0;
  font-weight: 700;
  .tt {
    margin-right: 16px;
  }
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
      margin-top: 5px;
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
}
.myForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 0;
    vertical-align: middle;
  }
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
.editForm {
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