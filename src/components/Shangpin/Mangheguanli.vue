<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">盲盒管理</div>
    </div>
    <div class="nav2">
      <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加盲盒</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <div class="xiala">
                <el-row :gutter="20">
                  <el-col :span="6" v-for="item in row.box_probability" :key="item.id">
                    <div
                      style="margin:6px 0"
                      class="item"
                    >{{ item.box_name }}({{item.box_type == 0 ? '试玩' : item.box_type == 1 ? '实际概率' : item.box_type == 2 ? '幸运值到100的概率' : '显示概率'}})：{{ item.probability }}%</div>
                  </el-col>
                </el-row>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column field="box_id" title="ID"></vxe-table-column>
          <vxe-table-column field="box_name" title="名称"></vxe-table-column>
          <vxe-table-column field="box_price1" title="价格(一个)"></vxe-table-column>
          <vxe-table-column field="box_price2" title="价格(五个)"></vxe-table-column>
          <vxe-table-column field="box_price3" title="价格(十个)"></vxe-table-column>
          <vxe-table-column field="status" title="状态(是否启用更多概率)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.has_used"></el-switch>
            </template>
          </vxe-table-column>
          <vxe-table-column title="操作状态" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="toMore(scope.row)" type="text">更多概率</el-button>
                <el-button size="small" @click="toEditShop(scope.row)" type="text">编辑</el-button>
                <el-button size="small" @click="toDelShop(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <!-- <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.shangpingliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>-->
      </div>
    </div>
    <!-- 添加/编辑尺寸 -->
    <el-dialog
      title="添加/编辑尺寸"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="220px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="盲盒名称">
                <el-input size="small" placeholder="请输入盲盒名称" v-model="addForm.box_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="价格(一个)">
                <el-input size="small" placeholder="请输入价格" v-model="addForm.box_price1"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="价格(五个)">
                <el-input size="small" placeholder="请输入价格" v-model="addForm.box_price2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="价格(十个)">
                <el-input size="small" placeholder="请输入价格" v-model="addForm.box_price3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="金色传说(试玩)">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="addForm.box_probability[0].probability"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="红色史诗(试玩)">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="addForm.box_probability[1].probability"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="紫色稀有(试玩)">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="addForm.box_probability[2].probability"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="蓝色普通(试玩)">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="addForm.box_probability[3].probability"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="金色传说(实际概率)">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="addForm.box_probability[4].probability"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="红色史诗(实际概率)">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="addForm.box_probability[5].probability"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="紫色稀有(实际概率)">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="addForm.box_probability[6].probability"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="蓝色普通(实际概率)">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="addForm.box_probability[7].probability"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="金色传说(幸运值到100的概率)">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="addForm.box_probability[8].probability"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="红色史诗(幸运值到100的概率)">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="addForm.box_probability[9].probability"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="紫色稀有(幸运值到100的概率)">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="addForm.box_probability[10].probability"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="蓝色普通(幸运值到100的概率)">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="addForm.box_probability[11].probability"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="金色传说(显示概率)">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="addForm.box_probability[12].probability"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="红色史诗(显示概率)">
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="addForm.box_probability[13].probability"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <var>
            <el-row>
              <el-col :span="20">
                <el-form-item label="紫色稀有(显示概率)">
                  <el-input
                    size="small"
                    placeholder="请输入"
                    v-model="addForm.box_probability[14].probability"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="蓝色普通(显示概率)">
                  <el-input
                    size="small"
                    placeholder="请输入"
                    v-model="addForm.box_probability[15].probability"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </var>
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="颜色图片">
                <div @click="companyList('tb')" class="myImg">
                  <el-image :src="addForm.color_img" fit="fill" style="width: 60px; height: 60px">
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
    <!-- 更多概率 -->
    <el-dialog
      title="更多概率"
      :visible.sync="gldialogVisible"
      width="80%"
      :before-close="glhandleClose"
    >
      <div class="myForm">
        <el-form ref="mingxiFrom" :model="glFrom" label-width="80px">
          <el-row>
            <el-col :span="20">
              <el-button @click="toAddgl" size="small" type="primary" icon="el-icon-plus">添加更多概率</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="myTable">
        <div class="t-txtt">盲盒销量</div>
        <vxe-table :data="gailvTableData3">
          <vxe-table-column field="box_pro0" title="金色传说抽取数量"></vxe-table-column>
          <vxe-table-column field="box_pro1" title="红色史诗抽取数量"></vxe-table-column>
          <vxe-table-column field="box_pro2" title="紫色稀有抽取数量"></vxe-table-column>
          <vxe-table-column field="box_pro3" title="蓝色普通抽取数量"></vxe-table-column>
          <!-- <vxe-table-column field="myIsused" title="是否使用中"></vxe-table-column> -->
          <vxe-table-column field="box_sale" title="总销量"></vxe-table-column>
        </vxe-table>
        <div class="t-txtt">无稀有度概率</div>
        <vxe-table :data="gailvTableData">
          <vxe-table-column field="pro_0" title="金色传说"></vxe-table-column>
          <vxe-table-column field="pro_1" title="红色史诗"></vxe-table-column>
          <vxe-table-column field="pro_2" title="紫色稀有"></vxe-table-column>
          <vxe-table-column field="pro_3" title="蓝色普通"></vxe-table-column>
          <!-- <vxe-table-column field="myIsused" title="是否使用中"></vxe-table-column> -->
          <vxe-table-column field="myShop_quality" title="类型"></vxe-table-column>
          <vxe-table-column field="set_num" title="设置数量"></vxe-table-column>
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="toglEditShop(scope.row)" type="text">编辑</el-button>
                <el-button size="small" @click="toglDelShop(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <div class="t-txtt">稀有度概率</div>
        <vxe-table :data="gailvTableData2">
          <vxe-table-column field="pro_0" title="金色传说"></vxe-table-column>
          <vxe-table-column field="pro_1" title="红色史诗"></vxe-table-column>
          <vxe-table-column field="pro_2" title="紫色稀有"></vxe-table-column>
          <vxe-table-column field="pro_3" title="蓝色普通"></vxe-table-column>
          <!-- <vxe-table-column field="myIsused" title="是否使用中"></vxe-table-column> -->
          <vxe-table-column field="myShop_quality" title="类型"></vxe-table-column>
          <vxe-table-column field="set_num" title="设置数量"></vxe-table-column>
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="toglEditShop(scope.row)" type="text">编辑</el-button>
                <el-button size="small" @click="toglDelShop(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </el-dialog>
    <!-- 添加/编辑更多概率 -->
    <el-dialog
      title="添加/编辑更多概率"
      :visible.sync="addglDialogVisible"
      width="700px"
      :before-close="addglHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="glFrom" ref="addForm" label-width="220px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="设置数量">
                <el-input size="small" placeholder="请输入设置数量" v-model="glFrom.set_num"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="金色传说">
                <el-input size="small" v-model="glFrom.pro_0"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="红色史诗">
                <el-input size="small" v-model="glFrom.pro_1"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="紫色稀有">
                <el-input size="small" v-model="glFrom.pro_2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="蓝色普通">
                <el-input size="small" v-model="glFrom.pro_3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="类型">
                <el-radio-group v-model="glFrom.shop_quality">
                  <el-radio :label="-1">购买箱子数量</el-radio>
                  <el-radio :label="0">购买金色传说数量</el-radio>
                  <el-radio :label="1">购买红色史诗数量</el-radio>
                  <el-radio :label="2">购买紫色稀有数量</el-radio>
                  <el-radio :label="3">购买蓝色普通数量</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="颜色图片">
                <div @click="companyList('tb')" class="myImg">
                  <el-image :src="addForm.color_img" fit="fill" style="width: 60px; height: 60px">
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
          </el-row>-->
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddglOnSubmit">提交</el-button>
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
      glRowId: "",
      isglAdd: false,
      gldialogVisible: false,
      activeName: "3",
      formInline: {
        user: "",
        region: ""
      },
      options: [],
      tableData: [],
      total: 0,
      isAdd: true,
      addForm: {
        box_name: "",
        box_price1: "",
        box_price2: "",
        box_price3: "",
        box_probability: []
      },
      id: "",
      addDialogVisible: false,
      gailvTableData: [],
      gailvTableData3:[],
      gailvTableData2: [],
      glFrom: {
        set_num: "",
        pro_0: "",
        pro_1: "",
        pro_2: "",
        pro_3: "",
        shop_quality: ""
      },
      addglDialogVisible: false,
      moreBoxId: ""
    };
  },
  created() {
    for (let i = 0; i < 16; i++) {
      if(i<4){
        this.addForm.box_probability.push({ probability: "",box_type:0 });
      }else if(i<8){
        this.addForm.box_probability.push({ probability: "",box_type:1 });
      }else if(i<12){
        this.addForm.box_probability.push({ probability: "",box_type:2 });
      }else if(i<16){
        this.addForm.box_probability.push({ probability: "",box_type:3 });
      }
      if(i == 0 || i == 4 || i == 8 || i == 12){
        this.addForm.box_probability[i].box_name = '金色传说';
      }
      if(i == 1 || i == 5 || i == 9 || i == 13){
        this.addForm.box_probability[i].box_name = '红色史诗';
      }
      if(i == 2 || i == 6 || i == 10 || i == 14){
        this.addForm.box_probability[i].box_name = '紫色稀有';
      }
      if(i == 3 || i == 7 || i == 11 || i == 15){
        this.addForm.box_probability[i].box_name = '蓝色普通';
      }
    }
    this.$store.commit("shangpingliebiaoPage", 1);
    this.getData();
    console.log(this.addForm);
  },
  methods: {
    async getData() {
      const res = await this.$api.getBoxList({
        limit: this.shangpingliebiaoPageSize,
        page: this.shangpingliebiaoPage
      });
      // this.total = res.data.total;
      this.tableData = res.data;
      // const res2 = await this.$api.product_type({
      //   limit: 10000,
      //   page: 1
      // });
      // this.options = res2.data.data;
    },
    toAddgl() {
      this.isglAdd = true;
      for (const key in this.glFrom) {
        if (key == "box_probability") {
          this.glFrom[key].forEach(ele => {
            ele.probability = "";
          });
        } else {
          this.$set(this.glFrom, key, "");
        }
      }
      this.addglDialogVisible = true;
    },
    glhandleClose() {
      this.gldialogVisible = false;
    },
    addglHandleClose() {
      this.addglDialogVisible = false;
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    async AddglOnSubmit() {
      console.log(this.glFrom);
      if (this.isglAdd) {
        const res = await this.$api.addProSettingDetail({
          ...this.glFrom,
          box_id: this.moreBoxId
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.addglDialogVisible = false;
          this.getMoreData();
        }
      } else {
        const res = await this.$api.changeProSettingDetail({
          ...this.glFrom,
          id: this.glRowId
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.addglDialogVisible = false;
          this.getMoreData();
        }
      }
    },
    // 开关（上架/下架）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.changeProSettingUsed({
        box_id: row.box_id,
        used: row.has_used ? true : false
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
      console.log(row);
      this.id = row.box_id;
      this.isAdd = false;
      this.addDialogVisible = true;
      this.addForm = { ...row };
    },
    async getMoreData() {
      const res = await this.$api.getBoxProSettingListBySaleNum({
        box_id: this.moreBoxId
      });
      console.log(res);
      this.gailvTableData = res.data.base_list;
      this.gailvTableData.forEach(ele => {
        ele.myShop_quality =
          ele.shop_quality == -1
            ? "购买箱子数量"
            : ele.shop_quality == 0
            ? "购买金色传说数量"
            : ele.shop_quality == 1
            ? "购买红色史诗数量"
            : ele.shop_quality == 2
            ? "购买紫色稀有数量"
            : "购买蓝色普通数量";
        ele.myIsused = ele.isused ? "是" : "否";
      });
      this.gailvTableData2 = res.data.quality_list;
      this.gailvTableData2.forEach(ele => {
        ele.myShop_quality =
          ele.shop_quality == -1
            ? "购买箱子数量"
            : ele.shop_quality == 0
            ? "购买金色传说数量"
            : ele.shop_quality == 1
            ? "购买红色史诗数量"
            : ele.shop_quality == 2
            ? "购买紫色稀有数量"
            : "购买蓝色普通数量";
        ele.myIsused = ele.isused ? "是" : "否";
      });
    },
    async toMore(row) {
      this.moreBoxId = row.box_id;
      this.getMoreData();
      this.getBoxSaleData()
      this.gldialogVisible = true;
    },
    async getBoxSaleData(){
      const res = await this.$api.getBoxSaleByBoxId({
        box_id:this.moreBoxId
      })
      this.gailvTableData3 = [res.data]
      console.log(this.gailvTableData3)
    },
    async toDelShop(row) {
      console.log(row);
      this.$confirm("确认删除？").then(async () => {
        const res = await this.$api.deleteBox({ box_id: row.box_id });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            this.getData();
          }, 500);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    toglEditShop(row) {
      this.glRowId = row.id;
      this.isAdd = false;
      this.addglDialogVisible = true;
      this.glFrom.set_num = row.set_num;
      this.glFrom.pro_0 = row.pro_0;
      this.glFrom.pro_1 = row.pro_1;
      this.glFrom.pro_2 = row.pro_2;
      this.glFrom.pro_3 = row.pro_3;
      this.glFrom.shop_quality = row.shop_quality;
    },
    async toglDelShop(row) {
      console.log(row);
      const res = await this.$api.deleteProSettingDetail({ id: row.id });
      if (res.status == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        setTimeout(() => {
          this.getMoreData();
        }, 500);
      } else {
        this.$message.error(res.msg);
      }
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    async AddOnSubmit() {
      console.log(this.addForm);
      if (this.isAdd) {
        const res = await this.$api.updateBoxPrice({
          json: JSON.stringify(this.addForm)
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
        const res = await this.$api.updateBoxPrice({
          box_id: this.id,
          // box_name: this.addForm.box_name,
          // box_price1: this.addForm.box_price1,
          // box_price2: this.addForm.box_price2,
          // box_price3: this.addForm.box_price3,
          json: JSON.stringify(this.addForm)
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
    toAddShop() {
      this.isAdd = true;
      for (const key in this.addForm) {
        if (key == "box_probability") {
          this.addForm[key].forEach(ele => {
            ele.probability = "";
          });
        } else {
          this.$set(this.addForm, key, "");
        }
      }
      this.addDialogVisible = true;
    },
    // 删除图片
    delImg(val) {
      if (val == "tb") {
        this.$set(this.addForm, "pic", "");
      } else if (this.imgStatus == "dt") {
        this.$set(this.addForm, "big_pic", "");
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
          this.imgFile.append("image", file);
          sessionStorage.setItem("img", 123);
          const res = await that.$api.upload_pic(this.imgFile);
          console.log(`${this.$url}${res.data.path}`);
          this.$set(this.addForm, "color_img", `${this.$url}${res.data.path}`);
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
.myTable {
  margin-top: 10px;
  .t-txtt {
    margin: 10px 0;
    font-weight: 700;
  }
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