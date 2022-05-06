<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">商品管理</div>
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
          <el-form-item label="商品搜索：">
            <el-input size="small" v-model="formInline.search" placeholder="商品搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加商品</el-button>
        <div class="b-right">
          <el-button @click="plshang" size="small" type="primary">批量上架</el-button>
          <el-button @click="plxia" size="small" type="primary">批量下架</el-button>
          <el-button @click="plshan" size="small" type="primary">批量删除</el-button>
        </div>
      </div>
      <div class="myTable">
        <vxe-table
          :data="tableData"
          ref="xTable1"
          @checkbox-all="selectAllEvent"
          @checkbox-change="selectChangeEvent"
        >
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
          <vxe-column type="checkbox" width="60"></vxe-column>
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
          <vxe-table-column field="shop_before" title="商品原价"></vxe-table-column>
          <vxe-table-column field="category_name" title="分类"></vxe-table-column>
          <!-- <vxe-table-column field="ficti" title="销量"></vxe-table-column> -->
          <!-- <vxe-table-column field="stock" title="库存"></vxe-table-column> -->
          <vxe-table-column field="status" title="状态(是否上架)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.need_show"></el-switch>
            </template>
          </vxe-table-column>
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
      <!-- 添加商品 -->
      <el-dialog
        title="添加商品"
        :visible.sync="addDialogVisible"
        width="700px"
        :before-close="addHandleClose"
      >
        <div class="myAddForm">
          <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-addForm">
            <el-row>
              <el-col :span="20">
                <el-form-item label="商品分类：">
                  <el-select size="small" v-model="addForm.category_id" placeholder="请选择">
                    <el-option
                      v-for="item in options2"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                  <!-- <el-cascader v-model="addForm.pid" size="small" :options="tableData" :props="props"></el-cascader> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="商品名称：" prop="category_name">
                  <el-input size="small" placeholder="请输入商品名称" v-model="addForm.shop_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="商品图片：">
                  <div @click="companyList('tb')" class="myImg">
                    <el-image :src="addForm.shop_img" fit="fill" style="width: 60px; height: 60px">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <div @click.stop="delImg('tb')" class="closeBtn">
                      <el-button circle>×</el-button>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="商品轮播图片：" prop="shop_rotation">
                  <div
                    @click="companyList('lbt', i)"
                    class="myImg"
                    v-for="(item, i) in addForm.shop_rotation"
                    :key="i"
                  >
                    <el-image :src="item" fit="fill" style="width: 60px; height: 60px">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <div @click.stop="delImg('lbt', i)" class="closeBtn">
                      <el-button circle>×</el-button>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="商品原价：">
                  <el-input size="small" placeholder="请输入商品原价" v-model="addForm.shop_before"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="商品价格：">
                  <el-input size="small" placeholder="请输入商品价格" v-model="addForm.shop_price"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="状态">
                  <el-radio-group v-model="addForm.is_show">
                    <el-radio :label="1">实物商品</el-radio>
                    <el-radio :label="2">虚拟商品</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="addForm.is_show == 2">
              <el-col :span="20">
                <el-form-item label="虚拟卡ID：">
                  <el-select size="small" v-model="addForm.card_id" filterable placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.card_type_id"
                      :label="item.card_name"
                      :value="item.card_type_id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="myEditor">
                  <div class="txt">商品详情：</div>
                  <!-- <div id="editor"></div> -->
                  <div id="myEditor">
                    <div id="toolbar-container"></div>
                    <div id="editor-container" style="height: 300px;"></div>
                  </div>
                  <!-- <textarea id="textarea-1"></textarea>
                  <textarea id="textarea-2"></textarea>-->
                </div>
              </el-col>
            </el-row>
            <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="状态" prop="is_show">
                <el-radio-group v-model="addForm.is_show">
                  <el-radio label="显示"></el-radio>1
                  <el-radio label="隐藏"></el-radio>0
                </el-radio-group>
              </el-form-item>
            </el-col>
            </el-row>-->
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
import "@wangeditor/editor/dist/css/style.css";
import {
  createEditor,
  createToolbar
  // IEditorConfig,
  // IDomEditor
} from "@wangeditor/editor";
// import E from "wangeditor";
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
      addForm: {
        shop_name: "",
        shop_img: "",
        shop_rotation: ["", "", "", "", "", "", "", "", "", ""],
        shop_detail: "",
        shop_price: "",
        card_id: "",
        category_id: "",
        shop_before: "",
        is_show: 0
      },
      formInline: {
        search: "",
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
      options2: [],
      tableData: [],
      total: 0,
      isAdd: true,
      imgStatus: "",
      imgIndex: "",
      id: "",
      editor: null,
      content: "",
      checkList1: [],
      plfaArr: []
    };
  },
  created() {
    this.getMangheData();
    this.getData();
  },
  async mounted() {},
  methods: {
    async getData() {
      const res = await this.$api.getShopList({
        pagesize: this.shangpingliebiaoPageSize,
        pagenum: this.shangpingliebiaoPage,
        category_id: this.formInline.category_id,
        search: this.formInline.search
      });
      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        if (ele.shop_rotation != "") {
          ele.shop_rotation = JSON.parse(ele.shop_rotation);
        }
      });
      const res2 = await this.$api.addMallCategory();
      this.options2 = res2.data;
    },
    async getMangheData() {
      const res = await this.$api.getCardTypeList();
      this.options = res.data.data;
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
    plshang() {
      this.plfaArr = [];
      this.checkList1.forEach(ele => {
        this.plfaArr.push(ele.shop_id);
      });
      console.log(this.plfaArr.toString());
      this.$confirm("确认批量上架？").then(async () => {
        const res = await this.$api.changeShopStatus({
          shop_id: this.plfaArr.toString(),
          need_show: true
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.checkList1 = [];
          this.getData();
        }
      });
    },
    plxia() {
      this.plfaArr = [];
      this.checkList1.forEach(ele => {
        this.plfaArr.push(ele.shop_id);
      });
      console.log(this.plfaArr.toString());
      this.$confirm("确认批量下架？").then(async () => {
        const res = await this.$api.changeShopStatus({
          shop_id: this.plfaArr.toString(),
          need_show: false
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.checkList1 = [];
          this.getData();
        }
      });
    },
    plshan() {
      this.plfaArr = [];
      this.checkList1.forEach(ele => {
        this.plfaArr.push(ele.shop_id);
      });
      console.log(this.plfaArr.toString());
      this.$confirm("确认批量删除？").then(async () => {
        const res = await this.$api.deleteShopList({
          shop_id: this.plfaArr.toString()
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
          this.checkList1 = [];
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    async AddOnSubmit() {
      this.content = document.getElementsByClassName("w-e-text")[0].innerHTML;
      console.log(this.addForm.is_show);
      if (this.addForm.is_show == 1) {
        this.addForm.card_id = 0;
      }
      if (this.isAdd) {
        const res = await this.$api.addShopInfo({
          shop_name: this.addForm.shop_name,
          shop_img: this.addForm.shop_img,
          shop_rotation: JSON.stringify(this.addForm.shop_rotation),
          shop_detail: this.content,
          shop_price: this.addForm.shop_price,
          card_id: this.addForm.card_id,
          category_id: this.addForm.category_id,
          shop_before: this.addForm.shop_before
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
        const res = await this.$api.changeShopInfo({
          shop_id: this.id,
          shop_name: this.addForm.shop_name,
          shop_img: this.addForm.shop_img,
          shop_rotation: JSON.stringify(this.addForm.shop_rotation),
          shop_detail: this.content,
          shop_price: this.addForm.shop_price,
          card_id: this.addForm.card_id,
          category_id: this.addForm.category_id,
          shop_before: this.addForm.shop_before
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
    // 开关（上架/下架）
    async changeKG(row) {
      const res = await this.$api.changeShopStatus({
        shop_id: row.shop_id,
        need_show: row.need_show ? true : false
      });
      if (res.status == 200) {
        this.$message({
          message: res.msg,
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
      this.$set(this.addForm, "is_show", row.iscard ? 2 : 1);
      if (row.shop_rotation == "") {
        this.addForm.shop_rotation = ["", "", "", "", "", "", "", "", "", ""];
      } else {
        this.addForm.shop_rotation = row.shop_rotation;
        // if(this.addForm.shop_rotation.length)
      }
      this.$set(this.addForm, "card_id", row.card_type_id);
      this.addDialogVisible = true;
      setTimeout(() => {
        this.changeEdior();
        // this.editor.txt.html(row.shop_detail);
      }, 500);
    },
    async toDelShop(row) {
      const res = await this.$api.deleteShopList({
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
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      this.getData();
    },
    changeEdior() {
      const editorConfig = {};
      editorConfig.placeholder = "请输入内容";
      editorConfig.onChange = editor => {
        // 当编辑器选区、内容变化时，即触发
        console.log("content", editor.children);
        console.log("html", editor.getHtml());
      };

      // 创建编辑器
      const editor = createEditor({
        selector: "#editor-container",
        config: editorConfig,
        mode: "default" // 或 'simple' 参考下文
      });
      // 创建工具栏
      const toolbar = createToolbar({
        editor,
        selector: "#toolbar-container",
        mode: "default" // 或 'simple' 参考下文
      });
      console.log(toolbar);
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
        } else if (key == "is_show") {
          this.$set(this.addForm, key, 1);
        } else {
          this.$set(this.addForm, key, "");
        }
      }
      this.addDialogVisible = true;
      setTimeout(() => {
        this.changeEdior();
        // this.editor.txt.html("");
      }, 500);
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
            this.$set(this.addForm.shop_rotation, 0, `${res.data}`);
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    .b-right {
      display: flex;
      align-items: center;
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
.myEditor {
  padding-top: 20px;
  display: flex;
  .txt {
    color: #606266;
    width: 216px;
    font-size: 12px;
    margin-right: 12px;
    margin-top: 2px;
    text-align: right;
  }
}
.displayN {
  display: none;
}
</style>