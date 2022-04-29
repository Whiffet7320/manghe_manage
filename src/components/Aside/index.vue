<template>
  <div class="aside">
    <!-- <div class="nav4" @click="loginOut">
      <img class="pic1" src="../../assets/image/组191.png" alt="" />
      <div class="tit1">切换账号</div>
    </div>-->
    <div class="menu">
      <div class="myisCollBtn">
        <el-button @click="myisColl">
          <i class="el-icon-menu"></i>
        </el-button>
      </div>

      <el-menu
        :default-active="menuActiveIndex"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#001529"
        text-color="#fff"
        router
      >
        <div v-for="item in menu" :key="item.menu_index">
          <el-menu-item v-if="item.menu_index == 1" :route="{ name: 'Shouye' }" index="1-1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu v-else :index="item.menu_index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <!-- <template v-if="item2.menu_index == '3-3'">
              <el-menu-item
                :key="item2.url"
                :route="{ name: item2.url }"
                :index="item2.menu_index"
              >{{item2.route.name}}</el-menu-item>
            </template>-->

            <el-menu-item
              v-for="item2 in item.sub_menu"
              :key="item2.url"
              :route="{ name: item2.url }"
              :index="item2.menu_index"
            >{{item2.route.name}}{{item2.menu_index == '3-3' ? order_sum: item2.menu_index == '3-4' ? card_sum : '' }}</el-menu-item>
          </el-submenu>
        </div>

        <template v-if="false">
          <el-menu-item :route="{ name: 'Shouye' }" index="1-1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品</span>
            </template>
            <el-menu-item :route="{ name: 'Shangpinguanli' }" index="2-1">商品管理</el-menu-item>
            <el-menu-item :route="{ name: 'Mangheshangping' }" index="2-16">盲盒商品管理</el-menu-item>
            <el-menu-item :route="{ name: 'Xunishangping' }" index="2-14">虚拟商品管理</el-menu-item>
            <!-- <el-menu-item :route="{ name: 'Fenleishangping' }" index="2-15">分类商品管理</el-menu-item> -->
            <el-menu-item :route="{ name: 'Shangpingfenlei' }" index="2-2">商品分类</el-menu-item>
            <el-menu-item :route="{ name: 'Mangheguanli' }" index="2-13">盲盒管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单</span>
            </template>
            <!-- <el-menu-item :route="{ name: 'Dingdanguanli' }" index="3-1">订单管理</el-menu-item> -->
            <el-menu-item :route="{ name: 'Manghedingdanguanli' }" index="3-2">盲盒订单</el-menu-item>
            <el-menu-item :route="{ name: 'Shiwudingdanguanli' }" index="3-3">实物订单（{{order_sum}}）</el-menu-item>
            <el-menu-item :route="{ name: 'Xunidingdanguanli' }" index="3-4">虚拟订单（{{card_sum}}）</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>用户</span>
            </template>
            <el-menu-item :route="{ name: 'Yonghuguanli' }" index="5-1">用户管理</el-menu-item>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>设置</span>
            </template>
            <el-menu-item :route="{ name: 'Zhanghaoguanli' }" index="8-11">权限账号管理</el-menu-item>
          </el-submenu>
          <el-submenu index="80">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>日志</span>
            </template>
            <el-menu-item :route="{ name: 'Caozuorizhi' }" index="80-1">操作日志</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    $route(to) {
      console.log(to.path); //到哪去
      (async () => {
        const res = await this.$api.getAllOrderDetail();
        this.card_sum = `(${res.data.card_sum})`;
        this.order_sum = `(${res.data.order_sum})`;
      })();
      if (to.path == "/Shouye") {
        this.menuActiveIndex = "1-1";
        this.$store.commit("headerTit", "首页");
      } else if (to.path == "/Shangpin/Shangpinguanli") {
        this.menuActiveIndex = "2-1";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品管理</span>`
        );
      } else if (to.path == "/Shangpin/Tianjiashangping") {
        this.$store.commit(
          "headerTit",
          `商品 / 商品管理 / <span style="color: #515a61;
        font-weight: 700;">添加/修改商品</span>`
        );
      } else if (to.path == "/Shangpin/TianjiaShangpincangku") {
        this.$store.commit(
          "headerTit",
          `商品 / 商品管理 / <span style="color: #515a61;
        font-weight: 700;">添加/修改商品仓库</span>`
        );
      } else if (to.path == "/Shangpin/Shangpingfenlei") {
        this.menuActiveIndex = "2-2";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品分类</span>`
        );
      } else if (to.path == "/Shangpin/Shangpingpinglun") {
        this.menuActiveIndex = "2-3";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品评论</span>`
        );
      } else if (to.path == "/Shangpin/Yunfeimoban") {
        this.menuActiveIndex = "2-4";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">运费模板</span>`
        );
      } else if (to.path == "/Shangpin/Shangpincangkuguanli") {
        this.menuActiveIndex = "2-5";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品仓库管理</span>`
        );
      } else if (to.path == "/Shangpin/Chicunguanli") {
        this.menuActiveIndex = "2-6";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">尺寸管理</span>`
        );
      } else if (to.path == "/Shangpin/Yanseguanli") {
        this.menuActiveIndex = "2-7";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">颜色管理</span>`
        );
      } else if (to.path == "/Shangpin/Yanjingfenleiguanli") {
        this.menuActiveIndex = "2-8";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">眼镜分类管理</span>`
        );
      } else if (to.path == "/Shangpin/Tucengguanli") {
        this.menuActiveIndex = "2-9";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">涂层管理</span>`
        );
      } else if (to.path == "/Shangpin/Biaoqianguanli") {
        this.menuActiveIndex = "2-10";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">标签管理</span>`
        );
      } else if (to.path == "/Shangpin/Pianguangduguanli") {
        this.menuActiveIndex = "2-11";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">眼镜偏光率管理</span>`
        );
      } else if (to.path == "/Shangpin/Yanjingdengjifenlei") {
        this.menuActiveIndex = "2-12";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">眼镜等级管理</span>`
        );
      } else if (to.path == "/Shangpin/Mangheguanli") {
        this.menuActiveIndex = "2-13";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">盲盒管理</span>`
        );
      } else if (to.path == "/Shangpin/Xunishangping") {
        this.menuActiveIndex = "2-14";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">虚拟商品管理</span>`
        );
      } else if (to.path == "/Shangpin/Fenleishangping") {
        this.menuActiveIndex = "2-15";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">分类商品管理</span>`
        );
      } else if (to.path == "/Shangpin/Mangheshangping") {
        this.menuActiveIndex = "2-16";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">盲盒商品管理</span>`
        );
      } else if (to.path == "/Dingdan/Dingdanguanli") {
        this.menuActiveIndex = "3-1";
        this.$store.commit(
          "headerTit",
          `订单 / <span style="color: #515a61;
        font-weight: 700;">订单管理</span>`
        );
      } else if (to.path == "/Dingdan/Manghedingdanguanli") {
        this.menuActiveIndex = "3-2";
        this.$store.commit(
          "headerTit",
          `订单 / <span style="color: #515a61;
        font-weight: 700;">盲盒订单</span>`
        );
      } else if (to.path == "/Dingdan/Shiwudingdanguanli") {
        this.menuActiveIndex = "3-3";
        this.$store.commit(
          "headerTit",
          `订单 / <span style="color: #515a61;
        font-weight: 700;">实物订单</span>`
        );
      } else if (to.path == "/Dingdan/Xunidingdanguanli") {
        this.menuActiveIndex = "3-4";
        this.$store.commit(
          "headerTit",
          `订单 / <span style="color: #515a61;
        font-weight: 700;">虚拟订单</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanshangping") {
        this.menuActiveIndex = "4-1-1";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团商品</span>`
        );
      } else if (to.path == "/Yingxiao/Tianjiapingtuanshangping") {
        this.menuActiveIndex = "4-1-1";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / 拼团商品 / <span style="color: #515a61;
        font-weight: 700;">添加/编辑商品</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanliebiao") {
        this.menuActiveIndex = "4-1-2";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团列表</span>`
        );
      } else if (to.path == "/Yingxiao/Jishouliebiao") {
        this.menuActiveIndex = "4-1-3";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">寄售列表</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanjilu") {
        this.menuActiveIndex = "4-1-4";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团记录</span>`
        );
      } else if (to.path == "/Yingxiao/Maichanghuodong") {
        this.menuActiveIndex = "4-2-1";
        this.$store.commit(
          "headerTit",
          `营销 / 卖场活动 / <span style="color: #515a61;
        font-weight: 700;">活动列表</span>`
        );
      } else if (to.path == "/Yonghu/Yonghuguanli") {
        this.menuActiveIndex = "5-1";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">用户管理</span>`
        );
      } else if (to.path == "/Yonghu/Lianghaoliebiao") {
        this.menuActiveIndex = "5-2";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">靓号列表</span>`
        );
      } else if (to.path == "/Yonghu/Tixianliebiao") {
        this.menuActiveIndex = "5-3";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">提现列表</span>`
        );
      } else if (to.path == "/Fenxiao/Fenxiaoshezhi") {
        this.menuActiveIndex = "6-1";
        this.$store.commit(
          "headerTit",
          `分销 / <span style="color: #515a61;
        font-weight: 700;">分销设置</span>`
        );
      } else if (to.path == "/Caiwu/Tixianshenqing") {
        this.menuActiveIndex = "7-1-1";
        this.$store.commit(
          "headerTit",
          `财务 / 财务操作 / <span style="color: #515a61;
        font-weight: 700;">提现申请</span>`
        );
      } else if (to.path == "/Caiwu/Yongjinjilu") {
        this.menuActiveIndex = "7-2-1";
        this.$store.commit(
          "headerTit",
          `财务 / 佣金记录 / <span style="color: #515a61;
        font-weight: 700;">佣金记录</span>`
        );
      } else if (to.path == "/Shezhi/Xiaoxiguanli") {
        this.menuActiveIndex = "8-1";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">消息管理</span>`
        );
      } else if (to.path == "/Shezhi/Qitashezhi") {
        this.menuActiveIndex = "8-2";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">其他设置</span>`
        );
      } else if (to.path == "/Shezhi/Lunbotushezhi") {
        this.menuActiveIndex = "8-3";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">轮播图设置</span>`
        );
      } else if (to.path == "/Shezhi/Lunbotuliebiao") {
        this.menuActiveIndex = "8-4";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">轮播图列表</span>`
        );
      } else if (to.path == "/Shezhi/Kaipinyeshezhi") {
        this.menuActiveIndex = "8-5";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">开屏页设置</span>`
        );
      } else if (to.path == "/Shezhi/Shujuzhongxin") {
        this.menuActiveIndex = "8-6";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">数据中心</span>`
        );
      } else if (to.path == "/Shezhi/Guojiaguanli") {
        this.menuActiveIndex = "8-7";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">国家管理</span>`
        );
      } else if (to.path == "/Shezhi/Youhuiquan") {
        this.menuActiveIndex = "8-8";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">优惠券管理</span>`
        );
      } else if (to.path == "/Wenzhang/Wenzhangliebiao") {
        this.menuActiveIndex = "9-1";
        this.$store.commit(
          "headerTit",
          `文章 / <span style="color: #515a61;
        font-weight: 700;">文章列表</span>`
        );
      } else if (to.path == "/Rizhi/Caozuorizhi") {
        this.menuActiveIndex = "80-1";
        this.$store.commit(
          "headerTit",
          `日志 / <span style="color: #515a61;
        font-weight: 700;">操作日志</span>`
        );
      } else if (to.path == "/Shezhi/Zhanghaoguanli") {
        this.menuActiveIndex = "8-11";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">权限账号管理</span>`
        );
      }
    }
  },
  data() {
    return {
      activeIndex: 0,
      menuActiveIndex: "",
      userInfo: null,
      isCollapse: false,
      menu: [],
      card_sum: 0,
      order_sum: 0
    };
  },
  created() {
    this.menu = JSON.parse(sessionStorage.getItem("menu"));
    console.log(this.menu);
  },
  methods: {
    myisColl() {
      this.isCollapse = !this.isCollapse;
    },
    loginOut() {
      sessionStorage.setItem("token", null);
      sessionStorage.setItem("isLogin", null);
      this.$router.go(0);
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss" scoped>
.aside {
  .menu {
    /deep/ .el-menu {
      border-right: 0px;
    }
    /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
    .myisCollBtn {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>