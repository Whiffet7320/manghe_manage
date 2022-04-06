import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('./components/Home/Shouye'),
    children: [{
        path: 'Shouye',
        name: 'Shouye',
        component: () => import('./components/Home/Shouye'),
    }, ]
}, {
    path: '/Shangpin',
    name: 'Shangpin',
    component: () => import('./components/Shangpin'),
    children: [{
        path: 'Shangpinguanli',
        name: 'Shangpinguanli',
        component: () => import('./components/Shangpin/Shangpinguanli'),
    }, {
        path: 'Tianjiashangping',
        name: 'Tianjiashangping',
        component: () => import('./components/Shangpin/Tianjiashangping'),
    }, {
        path: 'Shangpingfenlei',
        name: 'Shangpingfenlei',
        component: () => import('./components/Shangpin/Shangpingfenlei'),
    }, {
        path: 'Shangpingpinglun',
        name: 'Shangpingpinglun',
        component: () => import('./components/Shangpin/Shangpingpinglun'),
    }, {
        path: 'Yunfeimoban',
        name: 'Yunfeimoban',
        component: () => import('./components/Shangpin/Yunfeimoban'),
    }, {
        path: 'Shangpincangkuguanli',
        name: 'Shangpincangkuguanli',
        component: () => import('./components/Shangpin/Shangpincangkuguanli'),
    }, {
        path: 'Chicunguanli',
        name: 'Chicunguanli',
        component: () => import('./components/Shangpin/Chicunguanli'),
    }, {
        path: 'TianjiaShangpincangku',
        name: 'TianjiaShangpincangku',
        component: () => import('./components/Shangpin/TianjiaShangpincangku'),
    }, {
        path: 'Yanseguanli',
        name: 'Yanseguanli',
        component: () => import('./components/Shangpin/Yanseguanli'),
    }, {
        path: 'Yanjingfenleiguanli',
        name: 'Yanjingfenleiguanli',
        component: () => import('./components/Shangpin/Yanjingfenleiguanli'),
    }, {
        path: 'Tucengguanli',
        name: 'Tucengguanli',
        component: () => import('./components/Shangpin/Tucengguanli'),
    }, {
        path: 'Biaoqianguanli',
        name: 'Biaoqianguanli',
        component: () => import('./components/Shangpin/Biaoqianguanli'),
    }, {
        path: 'Pianguangduguanli',
        name: 'Pianguangduguanli',
        component: () => import('./components/Shangpin/Pianguangduguanli'),
    }, {
        path: 'Yanjingdengjifenlei',
        name: 'Yanjingdengjifenlei',
        component: () => import('./components/Shangpin/Yanjingdengjifenlei'),
    }, {
        path: 'Mangheguanli',
        name: 'Mangheguanli',
        component: () => import('./components/Shangpin/Mangheguanli'),
    }, {
        path: 'Xunishangping',
        name: 'Xunishangping',
        component: () => import('./components/Shangpin/Xunishangping'),
    }, {
        path: 'Fenleishangping',
        name: 'Fenleishangping',
        component: () => import('./components/Shangpin/Fenleishangping'),
    }, {
        path: 'Mangheshangping',
        name: 'Mangheshangping',
        component: () => import('./components/Shangpin/Mangheshangping'),
    }, ]
}, {
    path: '/Dingdan',
    name: 'Dingdan',
    component: () => import('./components/Dingdan'),
    children: [{
        path: 'Dingdanguanli',
        name: 'Dingdanguanli',
        component: () => import('./components/Dingdan/Dingdanguanli'),
    }, ]
}, {
    path: '/Rizhi',
    name: 'Rizhi',
    component: () => import('./components/Rizhi'),
    children: [{
        path: 'Caozuorizhi',
        name: 'Caozuorizhi',
        component: () => import('./components/Rizhi/Caozuorizhi'),
    }, ]
}, {
    path: '/Wenzhang',
    name: 'Wenzhang',
    component: () => import('./components/Wenzhang'),
    children: [{
        path: 'Wenzhangliebiao',
        name: 'Wenzhangliebiao',
        component: () => import('./components/Wenzhang/Wenzhangliebiao'),
    }]
}, {
    path: '/Yingxiao',
    name: 'Yingxiao',
    component: () => import('./components/Yingxiao'),
    children: [{
        path: 'Pingtuanshangping',
        name: 'Pingtuanshangping',
        component: () => import('./components/Yingxiao/Pingtuanshangping'),
    }, {
        path: 'Tianjiapingtuanshangping',
        name: 'Tianjiapingtuanshangping',
        component: () => import('./components/Yingxiao/Tianjiapingtuanshangping'),
    }, {
        path: 'Pingtuanliebiao',
        name: 'Pingtuanliebiao',
        component: () => import('./components/Yingxiao/Pingtuanliebiao'),
    }, {
        path: 'Maichanghuodong',
        name: 'Maichanghuodong',
        component: () => import('./components/Yingxiao/Maichanghuodong'),
    }, {
        path: 'Jishouliebiao',
        name: 'Jishouliebiao',
        component: () => import('./components/Yingxiao/Jishouliebiao'),
    }, {
        path: 'Pingtuanjilu',
        name: 'Pingtuanjilu',
        component: () => import('./components/Yingxiao/Pingtuanjilu'),
    }, ]
}, {
    path: '/Yonghu',
    name: 'Yonghu',
    component: () => import('./components/Yonghu'),
    children: [{
        path: 'Yonghuguanli',
        name: 'Yonghuguanli',
        component: () => import('./components/Yonghu/Yonghuguanli'),
    }, {
        path: 'Lianghaoliebiao',
        name: 'Lianghaoliebiao',
        component: () => import('./components/Yonghu/Lianghaoliebiao'),
    }, {
        path: 'Tixianliebiao',
        name: 'Tixianliebiao',
        component: () => import('./components/Yonghu/Tixianliebiao'),
    }]
}, {
    path: '/Fenxiao',
    name: 'Fenxiao',
    component: () => import('./components/Fenxiao'),
    children: [{
        path: 'Fenxiaoshezhi',
        name: 'Fenxiaoshezhi',
        component: () => import('./components/Fenxiao/Fenxiaoshezhi'),
    }, ]
}, {
    path: '/Caiwu',
    name: 'Caiwu',
    component: () => import('./components/Caiwu'),
    children: [{
        path: 'Tixianshenqing',
        name: 'Tixianshenqing',
        component: () => import('./components/Caiwu/Tixianshenqing'),
    }, {
        path: 'Yongjinjilu',
        name: 'Yongjinjilu',
        component: () => import('./components/Caiwu/Yongjinjilu'),
    }, ]
}, {
    path: '/Shezhi',
    name: 'Shezhi',
    component: () => import('./components/Shezhi'),
    children: [{
        path: 'Xiaoxiguanli',
        name: 'Xiaoxiguanli',
        component: () => import('./components/Shezhi/Xiaoxiguanli'),
    }, {
        path: 'Qitashezhi',
        name: 'Qitashezhi',
        component: () => import('./components/Shezhi/Qitashezhi'),
    }, {
        path: 'Lunbotushezhi',
        name: 'Lunbotushezhi',
        component: () => import('./components/Shezhi/Lunbotushezhi'),
    }, {
        path: 'Lunbotuliebiao',
        name: 'Lunbotuliebiao',
        component: () => import('./components/Shezhi/Lunbotuliebiao'),
    }, {
        path: 'Kaipinyeshezhi',
        name: 'Kaipinyeshezhi',
        component: () => import('./components/Shezhi/Kaipinyeshezhi'),
    }, {
        path: 'Shujuzhongxin',
        name: 'Shujuzhongxin',
        component: () => import('./components/Shezhi/Shujuzhongxin'),
    }, {
        path: 'Guojiaguanli',
        name: 'Guojiaguanli',
        component: () => import('./components/Shezhi/Guojiaguanli'),
    }, {
        path: 'Youhuiquan',
        name: 'Youhuiquan',
        component: () => import('./components/Shezhi/Youhuiquan'),
    }, {
        path: 'Zhanghaoguanli',
        name: 'Zhanghaoguanli',
        component: () => import('./components/Shezhi/Zhanghaoguanli'),
    }]
}, ]

const router = new VueRouter({
    mode: 'history',
    routes,
})


export default router