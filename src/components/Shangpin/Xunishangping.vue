<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">虚拟商品管理</div>
      <!-- <div class="tit2">
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="出售中的商品" name="1"></el-tab-pane>
          <el-tab-pane label="下架的商品" name="2"></el-tab-pane>
          <el-tab-pane label="已经售馨商品" name="3"></el-tab-pane>
        </el-tabs>
      </div>-->
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <!-- <el-form-item label="订单状态：">
            <el-radio-group @change="changeRad1" v-model="formInline.rad1" size="small">
              <el-radio-button label="0">待发货</el-radio-button>
              <el-radio-button label="1">待收货</el-radio-button>
              <el-radio-button label="2">待评价</el-radio-button>
              <el-radio-button label="3">交易完成</el-radio-button>
            </el-radio-group>
          </el-form-item>-->
          <!-- <el-form-item label="商品分类：">
            <el-cascader
              size="small"
              :options="options"
              :props="{ checkStrictly: true, value: 'id',label: 'category_name'}"
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="商品搜索：">
            <el-input
              size="small"
              v-model="formInline.user"
              placeholder="商品搜索"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit"
              >查询</el-button
            >
          </el-form-item>-->
        </el-form>
      </div>
      <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加商品</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <!-- <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">商品分类：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">商品市场价格：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">成本价：{{ row.price }}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">收藏：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">虚拟销量：3C数码/手机</div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>-->
          <vxe-table-column field="card_type_id" title="商品ID"></vxe-table-column>
          <!-- <vxe-table-column field="product_num" title="商品编号"></vxe-table-column> -->
          <!-- <vxe-table-column field="role" title="商品图片">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.shop_img"
                :preview-src-list="[scope.row.shop_img]"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="role" title="商品轮播图片">
            <template slot-scope="scope">
              <div v-for="(item,i) in scope.row.shop_rotation" :key="i">
                <el-image
                  v-if="item != ''"
                  :src="item"
                  :preview-src-list="[item]"
                  fit="fill"
                  style="width: 40px; height: 40px"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </template>
          </vxe-table-column>-->
          <vxe-table-column field="card_name" title="商品名称"></vxe-table-column>
          <!-- <vxe-table-column field="product_price" title="商品售价"></vxe-table-column> -->
          <!-- <vxe-table-column field="ficti" title="销量"></vxe-table-column> -->
          <!-- <vxe-table-column field="stock" title="库存"></vxe-table-column> -->
          <!-- <vxe-table-column field="status" title="状态(是否显示)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.myStatus"></el-switch>
            </template>
          </vxe-table-column>-->
          <vxe-table-column title="操作状态" width="160">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="toEditShop(scope.row)" type="text">添加</el-button>
                <el-button size="small" @click="toSeeShop(scope.row)" type="text">查看</el-button>
                <!-- <el-button size="small" @click="toDelShop(scope.row)" type="text">删除</el-button> -->
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.shangpingliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
      <!-- 查看卡号 -->
      <el-dialog
        title="查看卡号"
        :visible.sync="seeaddDialogVisible"
        width="1000px"
        :before-close="seeaddHandleClose"
      >
        <div class="myForm">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="订单状态：">
              <el-radio-group @change="changeRad11" v-model="formInline2.rad1" size="small">
                <el-radio-button label="0">全部</el-radio-button>
                <el-radio-button label="1">未使用</el-radio-button>
                <el-radio-button label="2">已使用</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="商品分类：">
            <el-cascader
              size="small"
              :options="options"
              :props="{ checkStrictly: true, value: 'id',label: 'category_name'}"
              clearable
            ></el-cascader>
            </el-form-item>-->
            <el-form-item label="日期：">
              <el-date-picker
                size="small"
                v-model="formInline2.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="搜索：">
              <el-input size="small" v-model="formInline2.search_key" placeholder></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
              <el-button size="small" type="primary" @click="daochuSubmit">导出</el-button>
            </el-form-item>
            <div class="pl-right">
              <el-form-item>
                <el-button @click="plshan" size="small" type="primary">批量删除</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="myTable">
          <vxe-table
            :data="tableData2"
            ref="xTable1"
            @checkbox-all="selectAllEvent"
            @checkbox-change="selectChangeEvent"
          >
            <vxe-column type="checkbox" width="60"></vxe-column>
            <vxe-table-column field="card_id" title="ID"></vxe-table-column>
            <!-- <vxe-table-column field="product_num" title="商品编号"></vxe-table-column> -->
            <!-- <vxe-table-column field="role" title="商品图片">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.shop_img"
                :preview-src-list="[scope.row.shop_img]"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="role" title="商品轮播图片">
            <template slot-scope="scope">
              <div v-for="(item,i) in scope.row.shop_rotation" :key="i">
                <el-image
                  v-if="item != ''"
                  :src="item"
                  :preview-src-list="[item]"
                  fit="fill"
                  style="width: 40px; height: 40px"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </template>
            </vxe-table-column>-->
            <vxe-table-column field="card_name" title="商品名称"></vxe-table-column>
            <vxe-table-column field="card_account" title="卡号"></vxe-table-column>
            <vxe-table-column field="card_password" title="卡密"></vxe-table-column>
            <vxe-table-column field="myHas_used" title="是否被使用"></vxe-table-column>
            <vxe-table-column field="used_id" title="申请人id"></vxe-table-column>
            <vxe-table-column field="myUsed_time" title="发货时间"></vxe-table-column>
            <vxe-table-column field="myAdd_time" title="添加时间"></vxe-table-column>
            <!-- <vxe-table-column field="ficti" title="销量"></vxe-table-column> -->
            <!-- <vxe-table-column field="stock" title="库存"></vxe-table-column> -->
            <!-- <vxe-table-column field="status" title="状态(是否显示)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.myStatus"></el-switch>
            </template>
            </vxe-table-column>-->
            <vxe-table-column title="操作状态" width="100">
              <template slot-scope="scope">
                <div class="flex">
                  <el-button size="small" @click="delKahao(scope.row)" type="text">删除</el-button>
                </div>
              </template>
            </vxe-table-column>
          </vxe-table>
          <el-pagination
            class="fenye"
            @size-change="this.handleSizeChange2"
            @current-change="this.handleCurrentChange2"
            :current-page="this.jishouliebiaoPage"
            :page-size="10"
            :page-sizes="[10, 15, 20, 30]"
            layout="total,sizes, prev, pager, next, jumper"
            :total="this.total2"
          ></el-pagination>
        </div>
      </el-dialog>
      <!-- 添加虚拟商品/卡号 -->
      <el-dialog
        title="添加虚拟商品/卡号"
        :visible.sync="addDialogVisible"
        width="700px"
        :before-close="addHandleClose"
      >
        <div class="myAddForm">
          <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-addForm">
            <el-row v-if="isAdd">
              <el-col :span="20">
                <el-form-item label="商品名称">
                  <el-input size="small" placeholder="请输入商品名称" v-model="addForm.card_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="导入卡号卡密">
                  <el-button
                    size="small"
                    v-loading.fullscreen.lock="fullscreenLoading"
                    @click="$refs.fileInputList1.click();"
                  >选择文件</el-button>
                  <div style="font-size:12px">{{fileName}}</div>
                  <!-- <el-button
                    size="small"
                    v-else
                    v-loading.fullscreen.lock="fullscreenLoading"
                    @click="$refs.fileInputList1.click();"
                  >更换文件</el-button>-->
                  <input
                    class="displayN"
                    name="companyfile"
                    size="small"
                    type="file"
                    @change="companyfile($event)"
                    multiple="multiple"
                    ref="fileInputList1"
                  />
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
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      "shangpingliebiaoPage",
      "shangpingliebiaoPageSize",
      "jishouliebiaoPage",
      "jishouliebiaoPageSize"
    ])
  },
  watch: {
    shangpingliebiaoPage: function(page) {
      this.$store.commit("shangpingliebiaoPage", page);
      this.getData();
    },
    shangpingliebiaoPageSize: function(pageSize) {
      this.$store.commit("shangpingliebiaoPageSize", pageSize);
      this.getData();
    },
    jishouliebiaoPage: function(page) {
      this.$store.commit("jishouliebiaoPage", page);
      this.seeData();
    },
    jishouliebiaoPageSize: function(pageSize) {
      this.$store.commit("jishouliebiaoPageSize", pageSize);
      this.seeData();
    }
  },
  data() {
    return {
      // activeName: "3",
      checkList1: [],
      formInline2: {
        search_key: "",
        time: [],
        rad1: "0"
      },
      seeaddDialogVisible: false,
      fullscreenLoading: false,
      File: "",
      file: "",
      fileName: "",
      addForm: {
        card_name: ""
      },
      formInline: {
        rad1: "",
        country_pos: "",
        country_code: "",
        country_name: "",
        country_english_name: "",
        two_code: "",
        three_code: ""
      },
      addDialogVisible: false,
      options: [],
      tableData: [],
      tableData2: [],
      total: 0,
      isAdd: true,
      imgStatus: "",
      imgIndex: "",
      id: "",
      card_type_id: "",
      total2: 0
    };
  },
  created() {
    this.$store.commit("shangpingliebiaoPage", 1);
    this.$store.commit("shangpingliebiaoPageSize", 10);
    // this.getMangheData();
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.getCardTypeList({
        pagesize: this.shangpingliebiaoPageSize,
        pagenum: this.shangpingliebiaoPage
      });
      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
    },
    selectAllEvent() {
      const records = this.$refs.xTable1.getCheckboxRecords();
      // console.log(checked ? "所有勾选事件" : "所有取消事件", records);
      this.checkList1 = records;
    },
    selectChangeEvent() {
      const records = this.$refs.xTable1.getCheckboxRecords();
      // console.log(checked ? "勾选事件" : "取消事件", records);
      this.checkList1 = records;
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
    async delKahao(row) {
      this.$confirm("确认删除？").then(async () => {
        const res = await this.$api.deleteCardById({
          card_id: row.card_id
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.seeData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    async seeData(flag = false) {
      const res = await this.$api.exportCard({
        card_type_id: this.card_type_id,
        start_time: this.formInline2.time[0],
        end_time: this.formInline2.time[1],
        search_key: this.formInline2.search_key,
        pagesize: this.jishouliebiaoPageSize,
        pagenum: this.jishouliebiaoPage,
        needpaging: true,
        type: this.formInline2.rad1,
        needExcel: flag
      });
      if (!flag) {
        this.total2 = res.data.total;
        this.tableData2 = res.data.data;
        this.tableData2.forEach(ele => {
          ele.myHas_used = ele.has_used ? "是" : "否";
          if (ele.used_time) {
            ele.myUsed_time = this.formatDate(ele.used_time);
          }
          if (ele.add_time) {
            ele.myAdd_time = this.formatDate(ele.add_time);
          }
        });
      } else {
        window.open(res.data);
      }
    },
    changeRad11() {
      this.seeData();
    },
    async getMangheData() {
      const res = await this.$api.getCardTypeList();
      this.options = res.data;
    },
    async companyfile(event) {
      // console.log(event.target);
      this.file = event.target.files[0];
      console.log(this.file);
      this.fileName = this.file.name;
      //   that.$refs.fileInputList1.value = "";
    },
    async AddOnSubmit() {
      this.fullscreenLoading = true;
      if (this.isAdd) {
        this.File = new FormData();
        this.File.append("file", this.file);
        this.File.append("card_name", this.addForm.card_name);
        this.File.append("manage_id", sessionStorage.getItem("manage_id"));
        const res = await this.$api.importCardListFromExcel(this.File);
        console.log(res.data);
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.fullscreenLoading = false;
          this.getData();
          this.addDialogVisible = false;
        } else {
          this.fullscreenLoading = false;
          this.$message.error(res.msg);
        }
      } else {
        this.File = new FormData();
        this.File.append("file", this.file);
        this.File.append("card_name", this.addForm.card_name);
        this.File.append("manage_id", sessionStorage.getItem("manage_id"));
        const res = await this.$api.importCardListFromExcel(this.File);
        console.log(res.data);
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.fullscreenLoading = false;
          this.getData();
          this.addDialogVisible = false;
        } else {
          this.fullscreenLoading = false;
          this.$message.error(res.msg);
        }
      }
    },
    seeaddHandleClose() {
      this.seeaddDialogVisible = false;
    },
    async toDaochuShop(row) {
      const res = await this.$api.exportCard({
        card_type_id: row.card_type_id,
        pagesize: this.jishouliebiaoPageSize,
        page: this.jishouliebiaoPage
      });
      console.log(res);
      this.tableData2 = res.data;
      this.tableData2.forEach(ele => {
        ele.myHas_used = ele.has_used ? "是" : "否";
      });
      this.seeaddDialogVisible = true;
    },
    async toSeeShop(row) {
      this.$store.commit("jishouliebiaoPage", 1);
      this.$store.commit("jishouliebiaoPageSize", 10);
      this.formInline2.rad1 = "0";
      this.formInline2.search_key = "";
      this.formInline2.time = [];
      this.card_type_id = row.card_type_id;
      this.seeData();
      this.seeaddDialogVisible = true;
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    changeRad1() {
      this.getData();
    },
    // 开关（上架/下架）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.product_status({
        id: row.id,
        status: row.myStatus == true ? "1" : "0"
      });
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.getData();
      }
    },
    toEditShop(row) {
      this.addForm.card_name = row.card_name;
      this.isAdd = false;
      this.addDialogVisible = true;
    },
    // async toDelShop(row) {
    //   const res = await this.$api.deleteProduct(row.id);
    //   if (res.code == 200) {
    //     this.$message({
    //       message: res.message,
    //       type: "success"
    //     });
    //     this.getData();
    //   }
    // },
    async toDelShop(row) {
      console.log(row);
      const res = await this.$api.deleteCateGoryShop({
        id: this.formInline.rad1,
        shop_id: row.shop_id
      });
      if (res.status == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log(this.formInline2);
      this.seeData();
    },
    async daochuSubmit() {
      this.seeData(true);
    },
    toAddShop() {
      this.isAdd = true;
      for (const key in this.addForm) {
        if (key == "shop_rotation") {
          this.$set(this.addForm, key, [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
          ]);
        } else {
          this.$set(this.addForm, key, "");
        }
      }
      this.addDialogVisible = true;
    },
    // 删除图片
    delImg(val, i) {
      if (val == "tb") {
        this.$set(this.addForm, "shop_img", "");
      } else if (this.imgStatus == "lbt") {
        this.$set(this.addForm.shop_rotation, i, "");
      }
    },
    // 上传图片
    companyList(val, i) {
      this.imgStatus = val;
      this.imgIndex = i;
      this.$refs.fileInputList.click();
    },
    plshan() {
      // console.log(this.checkList1);
      this.plshanArr = [];
      this.checkList1.forEach(ele => {
        this.plshanArr.push(ele.card_id);
      });
      console.log(this.plshanArr.toString());
      this.$confirm("确认批量删除？").then(async () => {
        const res = await this.$api.deleteCardById({
          card_id: this.plshanArr.toString()
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.seeData();
          this.checkList1 = []
        } else {
          this.$message.error(res.msg);
        }
      });
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
          this.imgFile.append("file", file);
          sessionStorage.setItem("img", 123);
          const res = await that.$api.upload_pic(this.imgFile);
          if (this.imgStatus == "tb") {
            this.$set(this.addForm, "shop_img", `${res.data}`);
          } else if (this.imgStatus == "lbt") {
            this.$set(this.addForm.shop_rotation, this.imgIndex, `${res.data}`);
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
      this.$store.commit("shangpingliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("shangpingliebiaoPage", val);
    },
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("jishouliebiaoPageSize", val);
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("jishouliebiaoPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.pl-right {
  float: right;
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