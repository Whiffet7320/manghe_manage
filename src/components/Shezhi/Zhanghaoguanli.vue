<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">权限账号管理</div>
      <div class="tit2">
        <!-- <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="微信公众号" name="2"></el-tab-pane>
          <el-tab-pane label="微信小程序" name="3"></el-tab-pane>
        </el-tabs>-->
      </div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户搜索：">
            <div class="search">
              <el-input
                size="small"
                placeholder="请输入内容"
                v-model="formInline.search"
                class="input-with-select"
              >
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button size="small" icon="el-icon-search" type="primary" @click="onSubmit">搜索</el-button>
            <el-button size="small" @click="onReact">重置</el-button>
          </el-form-item>
        </el-form>
      </div>-->
      <div class="tit1">
        <el-button @click="toZhanghao" size="small" type="primary" icon="el-icon-plus">添加账号</el-button>
      </div>
      <div class="myTable">
        <vxe-table height="700" :loading="loading" :data="tableData">
          <vxe-table-column field="manage_id" title="ID"></vxe-table-column>
          <vxe-table-column field="manage_account" title="账号"></vxe-table-column>
          <vxe-table-column field="manage_name" title="用户名"></vxe-table-column>
          <vxe-table-column field="qx" title="权限"></vxe-table-column>
          <!-- <vxe-table-column field="user_info.shop_name" title="店铺名称"></vxe-table-column> -->
          <!-- <vxe-table-column field="user_info.shop_phone" title="店铺联系方式"></vxe-table-column> -->
          <vxe-table-column title="操作状态" width="150">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="tabEdit(scope.row)" type="text">修改</el-button>
                <el-button size="small" @click="tabDel(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.ZhanghaobiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加/编辑账号 -->
    <el-dialog
      title="添加/编辑账号"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="用户名：">
                <el-input :disabled="!isAdd" size="small" v-model="addForm.manage_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="账号：">
                <el-input
                  :disabled="!isAdd"
                  size="small"
                  placeholder="请输入账号"
                  v-model="addForm.manage_account"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="密码：">
                <el-input size="small" v-model="addForm.manage_password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="权限：">
                <el-tree
                  default-expand-all
                  :data="quanxianList"
                  ref="tree"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps"
                ></el-tree>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddOnSubmit">提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <input
      type="file"
      name="companyLogo"
      id="file0"
      class="displayN"
      multiple="multiple"
      @change="companyLogo($event)"
      ref="fileInputList"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["ZhanghaobiaoPage", "ZhanghaobiaoPageSize"])
  },
  watch: {
    ZhanghaobiaoPage: function(page) {
      this.$store.commit("ZhanghaobiaoPage", page);
      this.getData();
    },
    ZhanghaobiaoPageSize: function(pageSize) {
      this.$store.commit("ZhanghaobiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      id: "",
      loading: false,
      fuquanxuan: false,
      ziCheckList: [],
      isAdd: false,
      checkList: [],
      quanxianList: [],
      addForm: {
        manage_account: "",
        manage_name: "",
        manage_id: "",
        manage_password: ""
      },
      addDialogVisible: false,
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
        rad1: "1"
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
      editId: ""
    };
  },
  created() {
    Array.prototype.indexOf = function(val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
          return i;
        }
      }
      return -1;
    };
    Array.prototype.remove = function(val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
    this.getQXdata();
    setTimeout(() => {
      this.getData();
    }, 500);
  },
  methods: {
    async getQXdata() {
      const res = await this.$api.getManageMemberPower();
      console.log(res);
      this.quanxianList = res.data;
      this.quanxianList = JSON.parse(
        JSON.stringify(this.quanxianList).replace(/type/g, "label")
      );
      this.quanxianList = JSON.parse(
        JSON.stringify(this.quanxianList).replace(/child/g, "children")
      );
      this.quanxianList = JSON.parse(
        JSON.stringify(this.quanxianList).replace(/power_name/g, "label")
      );
    },
    async getData() {
      this.loading = true;
      const res = await this.$api.getManageList({
        pagesize: this.ZhanghaobiaoPageSize,
        pagenum: this.ZhanghaobiaoPage
      });
      if (res.data.total == 0) {
        this.tableData = [];
      }
      this.total = res.data.total;
      res.data.data.forEach(async ele => {
        const ress = await this.$api.getManageMemberPower({
          query_id: ele.manage_id
        });
        console.log(ress);
        ele.qx = "";
        var arr = [];
        ele.myLimits2 = [];
        ress.data.forEach(ele2 => {
          ele2.child.forEach(ele3 => {
            if (ele3.has_power) {
              ele.myLimits2.push(ele3.id);
              arr.push(ele3.power_name);
            }
          });
        });
        // ele.myLimits = ele.limits.split(",");
        // ele.myLimits.forEach(ele2 => {
        //   this.quanxianList.forEach(ele3 => {
        //     ele3.children.forEach(ele4 => {
        //       if (ele4.id == ele2) {
        //         arr.push(ele4.label);
        //         ele.myLimits2.push(ele4.id)
        //       }
        //     });
        //   });
        // });
        this.$set(ele, "qx", arr.toString());
        setTimeout(() => {
          this.$set(this, "tableData", res.data.data);
          this.loading = false;
        }, 500);
      });
    },
    // 开关（显示/隐藏）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.adminuser_setstatusval({
        user_id: row.id,
        is_status: row.is_status == "0" ? "1" : "0"
      });
      if (res.data.result == 1) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    toZhanghao() {
      for (const key in this.addForm) {
        this.addForm[key] = "";
      }
      this.addDialogVisible = true;
      setTimeout(() => {
        console.log(this.$refs);
        this.$refs.tree.setCheckedKeys([]);
        this.isAdd = true;
      }, 100);
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
    // changeMingxiRadio() {
    //   this.getMingxiData();
    // },
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
    // async seeMingxi(row) {
    //   console.log(row);
    //   this.mingxiUser_id = row.id;
    //   this.getMingxiData();
    //   this.dialogVisible = true;
    // },
    toPingtuanjilu(row) {
      this.$router.push({
        name: "Pingtuanjilu",
        params: {
          userId: row.user_id
        }
      });
    },
    changeFu(e) {
      console.log(e);
    },
    changeZi(check, item) {
      console.log(check, item);
      let checkedCount = check.length;
      item.checkAll = checkedCount == item.sub_menu.length;
      if (item.sub_menu.length == 1) {
        item.isIndeterminate =
          checkedCount > 0 && checkedCount <= item.sub_menu.length;
      } else {
        item.isIndeterminate =
          checkedCount > 0 && checkedCount < item.sub_menu.length;
      }
      console.log(item.checkAll, item.isIndeterminate);
      this.$set(item, "isIndeterminate", item.isIndeterminate);
      this.$set(item, "checkAll", item.checkAll);
    },
    changeZiquanxian(check, item) {
      console.log(check, item);
    },
    changeFuquanxian(check, item) {
      console.log(check, item, "changeFuquanxian");
      var arr = [];
      item.sub_menu.forEach(ele => {
        arr.push(ele.id);
      });
      item.ziCheckList = check ? arr : [];
      this.$set(item, "isIndeterminate", false);
      this.$set(item, "checkAll", check);
    },
    async tabDel(row) {
      //  manage_del
      this.$confirm("确认删除？").then(async () => {
        const res = await this.$api.deleteManageById({
          delete_id: row.manage_id
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
          this.addDialogVisible = false;
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      });
    },
    async tabEdit(row) {
      this.id = row.id;
      this.isAdd = false;
      console.log(row);
      this.addForm.manage_id = row.manage_id;
      this.addForm.manage_password = row.manage_password;
      this.addForm.manage_account = row.manage_account;
      this.addForm.manage_name = row.manage_name;
      this.addDialogVisible = true;
      var arr = [];
      row.myLimits2.forEach(ele => {
        arr.push(ele);
      });
      console.log(arr);
      setTimeout(() => {
        console.log(this.$refs, this.$refs.fileInputList);
        this.$refs.tree.setCheckedKeys(arr);
      }, 500);
    },
    async AddOnSubmit() {
      var arr = [];
      var newArr = [];
      var jsonArr = [];
      jsonArr = [...this.quanxianList];
      jsonArr = JSON.parse(JSON.stringify(jsonArr).replace(/label/g, "type"));
      jsonArr = JSON.parse(
        JSON.stringify(jsonArr).replace(/children/g, "child")
      );
      jsonArr.forEach(ele => {
        ele.child.forEach(ele2 => {
          ele2.power_name = ele2.type;
          delete ele2.type;
        });
      });
      arr = [
        ...this.$refs.tree.getCheckedKeys(false)
        // ...this.$refs.tree.getHalfCheckedKeys(true)
      ];
      arr.forEach(ele => {
        if (ele) {
          newArr.push(ele);
        }
      });
      console.log(newArr);
      console.log(jsonArr);
      jsonArr.forEach(ele2 => {
        ele2.child.forEach(ele3 => {
          if (newArr.indexOf(ele3.id) != -1) {
            this.$set(ele3, "has_power", true);
          } else {
            this.$set(ele3, "has_power", false);
          }
        });
      });
      console.log(jsonArr);
      if (this.isAdd) {
        // 添加
        const res = await this.$api.addManageMemberWithPower({
          manage_account: this.addForm.manage_account,
          manage_password: this.addForm.manage_password,
          manage_name: this.addForm.manage_name,
          json: JSON.stringify(jsonArr)
          // json:jsonArr
        });
        console.log(res);
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
          this.addDialogVisible = false;
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      } else {
        const res = await this.$api.updateManageInfo({
          check_id: this.addForm.manage_id,
          manage_password: this.addForm.manage_password,
          json: JSON.stringify(jsonArr)
        });
        console.log(res);
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
          this.addDialogVisible = false;
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      }
    },
    onSubmit() {
      console.log(this.formInline);
      this.getData();
    },
    onReact() {
      this.formInline.search = "";
      this.formInline.select = "";
      this.getData();
    },
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
    // 删除图片
    delImg(val) {
      if (val == "tb") {
        this.$set(this.addForm, "userface", "");
      }
    },
    // 上传图片
    companyList(val) {
      this.imgStatus = val;
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      // console.log(file);
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = new FormData();
          this.imgFile.append("pic", file);
          this.imgFile.append("token", sessionStorage.getItem("token"));
          sessionStorage.setItem("img", 123);
          const res = await that.$api.upload_pic(this.imgFile);
          console.log(res.data.pic_url);
          if (this.imgStatus == "tb") {
            this.$set(this.addForm, "userface", res.data.pic_url);
          }
          that.$refs.fileInputList.value = "";
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("ZhanghaobiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("ZhanghaobiaoPage", val);
    },
    zijinmingxiHandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("zijinmingxiliebiaoPageSize", val);
    },
    zijinmingxiHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("zijinmingxiliebiaoPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-tree-node__label {
  font-size: 12px;
}
/deep/ .el-checkbox {
  transform: translateY(-1px);
}
/deep/ .el-checkbox__label {
  font-size: 12px;
}
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
      vertical-align: text-top;
    }
    .search {
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
        display: flex;
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
      display: flex;
      // align-items: center;
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
.myAddForm {
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
    width: 130px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 130px !important;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
  }
  /deep/ .el-button {
    width: 100%;
  }
  .myImg {
    position: relative;
    width: 60px;
    height: 60px;
    display: inline-block;
    margin-right: 12px;
    .closeBtn {
      position: absolute;
      top: -6px;
      right: -4px;
      width: 20px;
      height: 20px;
      .el-button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    /deep/ .image-slot {
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #fafafa;
      width: 58px;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .el-icon-picture-outline {
        font-size: 20px;
      }
    }
  }
}
.displayN {
  display: none;
}
</style>