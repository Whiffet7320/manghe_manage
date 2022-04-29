<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">盲盒商品管理</div>
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
          <el-form-item label="商品分类：">
            <el-select size="small" v-model="formInline.category_id" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="稀有度：">
            <el-radio-group @change="changeRad2" v-model="formInline.shop_quality" size="small">
              <el-radio-button label="0">金色传说</el-radio-button>
              <el-radio-button label="1">红色史诗</el-radio-button>
              <el-radio-button label="2">紫色稀有</el-radio-button>
              <el-radio-button label="3">蓝色普通</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="盲盒类型：">
            <el-radio-group @change="changeRad1" v-model="formInline.rad1" size="small">
              <el-radio-button
                v-for="item in fenleiOptions"
                :key="item.box_id"
                :label="item.box_id"
              >{{item.box_name}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="商品搜索：">
            <el-input
              size="small"
              v-model="formInline.user"
              placeholder="商品搜索"
            ></el-input>
          </el-form-item>-->
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
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
          <vxe-table-column field="shop_id" title="商品ID"></vxe-table-column>
          <!-- <vxe-table-column field="product_num" title="商品编号"></vxe-table-column> -->
          <vxe-table-column field="role" title="商品图片">
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
          <!-- <vxe-table-column field="role" title="商品轮播图片">
            <template slot-scope="scope">
              <div
                style="display:inline-block;margin:0 3px"
                v-for="(item,i) in scope.row.shop_rotation"
                :key="i"
              >
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
          <vxe-table-column field="shop_name" title="商品名称"></vxe-table-column>
          <vxe-table-column field="shop_price" title="商品售价"></vxe-table-column>
          <vxe-table-column field="myShop_quality" title="稀有度"></vxe-table-column>
          <vxe-table-column field="shop_probability" title="占得比重份数"></vxe-table-column>
          <!-- <vxe-table-column field="ficti" title="销量"></vxe-table-column> -->
          <!-- <vxe-table-column field="stock" title="库存"></vxe-table-column> -->
          <!-- <vxe-table-column field="status" title="状态(是否显示)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.myStatus"></el-switch>
            </template>
          </vxe-table-column>-->
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="toEditShop(scope.row)" type="text">编辑</el-button>
                <!-- <el-button
                  size="small"
                  @click="toEditShop(scope.row)"
                  type="text"
                  >查看评论</el-button
                >-->
                <el-button size="small" @click="toDelShop(scope.row)" type="text">删除</el-button>
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
      <!-- 添加/编辑商品 -->
      <el-dialog
        title="添加/编辑商品"
        :visible.sync="addDialogVisible"
        width="700px"
        :before-close="addHandleClose"
      >
        <div class="myAddForm">
          <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-addForm">
            <el-row v-if="this.isAdd">
              <el-col :span="20">
                <el-form-item label="盲盒类型" prop="category_name">
                  <el-select size="small" @change="changeFenlei" v-model="addForm.box_id" filterable placeholder="请选择">
                    <el-option
                      v-for="item in fenleiOptions"
                      :key="item.box_id"
                      :label="item.box_name"
                      :value="item.box_id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-if="this.isAdd" :span="20">
                <el-form-item label="商品分类" prop="category_id">
                  <el-select
                    @change="changeFenlei"
                    size="small"
                    v-model="addForm.category_id"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options2"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-if="!this.isAdd" :span="20">
                <el-form-item label="商品名称：">
                  <el-input size="small" disabled placeholder="请输入商品名称" v-model="addForm.shop_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.isAdd">
              <el-col :span="20">
                <el-form-item label="商品" prop="category_name">
                  <el-select
                    :disabled="!haveFenlei"
                    size="small"
                    v-model="addForm.shop_id"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in shopOptions"
                      :key="item.shop_id"
                      :label="`${item.shop_name}${item.shop_iscard?'(虚拟商品)':''} 价格:${item.shop_price}`"
                      :value="item.shop_id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="稀有度">
                  <el-radio-group v-model="addForm.shop_quality" size="small">
                    <el-radio-button label="0">金色传说</el-radio-button>
                    <el-radio-button label="1">红色史诗</el-radio-button>
                    <el-radio-button label="2">紫色稀有</el-radio-button>
                    <el-radio-button label="3">蓝色普通</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="占得比重份数">
                  <el-input size="small" placeholder="请输入占得比重份数" v-model="addForm.shop_probability"></el-input>
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
    ...mapState(["shangpingliebiaoPage", "shangpingliebiaoPageSize"])
  },
  watch: {
    shangpingliebiaoPage: function(page) {
      this.$store.commit("shangpingliebiaoPage", page);
      this.getData();
    },
    shangpingliebiaoPageSize: function(pageSize) {
      this.$store.commit("shangpingliebiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      // activeName: "3",
      options2: [],
      addForm: {
        category_id: "",
        box_id: "",
        shop_id: "",
        shop_quality: "",
        shop_probability: "",
        shop_name:"",
        // shop_name: "",
        // shop_img: "",
        // shop_rotation: ["", "", "", "", "", "", "", "", "", ""],
        // shop_detail: "",
        // shop_price: "",
        // card_id: ""
      },
      formInline: {
        shop_quality: "0",
        category_id: "",
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
      total: 0,
      isAdd: true,
      imgStatus: "",
      imgIndex: "",
      id: "",
      fenleiOptions: [],
      shopOptions: [],
      haveFenlei: false
    };
  },
  created() {
    this.$store.commit("shangpingliebiaoPage", 1);
    this.$store.commit("shangpingliebiaoPageSize", 10);
    this.getFenleiData();
    this.getfenlei();
    // this.getShopData()
    setTimeout(() => {
      this.formInline.rad1 = this.fenleiOptions[0].box_id;
      this.getData();
    }, 1000);
  },
  methods: {
    async getfenlei() {
      const res2 = await this.$api.addMallCategory();
      this.options2 = res2.data;
    },
    async getData() {
      const res = await this.$api.getBoxDetail({
        pagesize: this.shangpingliebiaoPageSize,
        pagenum: this.shangpingliebiaoPage,
        box_id: this.formInline.rad1,
        category_id: this.formInline.category_id,
        shop_quality: this.formInline.shop_quality
      });
      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        if (ele.shop_rotation != "") {
          ele.shop_rotation = JSON.parse(ele.shop_rotation);
        }
        ele.myShop_quality =
          ele.shop_quality == 0
            ? "金色传说"
            : ele.shop_quality == 1
            ? "红色史诗"
            : ele.shop_quality == 2
            ? "紫色稀有"
            : "蓝色普通";
      });
    },
    async getShopData() {
      const res = await this.$api.getBoxList({
        pagesize: 10000,
        pagenum: 1,
        id: this.addForm.id
      });
      this.shopOptions = res.data.data;
    },
    async getFenleiData() {
      const res = await this.$api.getBoxList({
        pagesize: 10000,
        pagenum: 1
      });
      this.fenleiOptions = res.data;
    },
    async getMangheData() {
      const res = await this.$api.getBoxCanAddShopList({
        box_id: this.addForm.box_id,
        pagesize: 10000,
        pagenum: 1,
        category_id: this.addForm.category_id
      });
      this.shopOptions = res.data.data;
    },
    changeFenlei() {
      this.haveFenlei = true;
      if(this.addForm.category_id != ''){
        this.addForm.shop_id = ''
        this.getMangheData();
      }
    },
    async AddOnSubmit() {
      if (this.isAdd) {
        const res = await this.$api.addBoxShop({
          box_id: this.addForm.box_id,
          shop_id: this.addForm.shop_id,
          shop_quality: this.addForm.shop_quality,
          shop_probability: this.addForm.shop_probability
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.addDialogVisible = false;
          this.getData();
        } else {
          this.$message.error(res.msg);
        }
      } else {
        const res = await this.$api.addBoxShop({
          box_id: this.addForm.box_id,
          shop_id: this.addForm.shop_id,
          shop_quality: this.addForm.shop_quality,
          shop_probability: this.addForm.shop_probability
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.addDialogVisible = false;
          this.getData();
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    changeRad1() {
      this.getData();
    },
    changeRad2() {
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
      this.isAdd = false;
      this.id = row.shop_id;
      console.log(row);
      this.addForm = { ...row };
      console.log(this.addForm);
      // if (row.shop_rotation == "") {
      //   this.addForm.shop_rotation = ["", "", "", "", "", "", "", "", "", ""];
      // } else {
      //   console.log(row.shop_rotation);
      //   this.addForm.shop_rotation = row.shop_rotation;
      // }
      // this.addForm.card_id = row.card_type_id;
      this.addDialogVisible = true;
    },
    async toDelShop(row) {
      this.$confirm("确认删除？").then(async () => {
        const res = await this.$api.deleteBoxShop({
          box_id: row.box_id,
          shop_id: row.shop_id
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
      this.getData();
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
      this.addForm.category_id = ''
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