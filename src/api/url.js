export default {
    baseUrl: 'http://test2.hezhiqiangaixuexi.asia/manage',
    doLogin:'/doLogin',//登录
    getUserList:'/getUserList',//获取用户列表
    addMallCategory:'/addMallCategory',//获取所有分类
    updateCategory:'/updateCategory',//添加/修改分类
    deleteCategory:'/deleteCategory',//删除分类
    getBoxList:'/getBoxList',//获取盲盒列表
    updateBoxPrice:'/updateBoxAllInfo',//新增/修改盲盒
    getShopList:'/getShopList',//获取商品列表
    addShopInfo:'/addShopInfo',//新增商品
    addPhoto:'/addPhoto',//上传图片
    changeShopInfo:'/changeShopInfo',//修改商品
    getCardTypeList:'/getCardTypeList',//获取虚拟物品列表
    getShopByCategory:'/getShopByCategory',//获取分类下的商品列表
    addCategoryShop:'/addCategoryShop',//添加分类商品
    deleteCateGoryShop:'/deleteCateGoryShop',//移除分类商品
    getCategoryWithoutShopList:'/getCategoryWithoutShopList',//获取可以添加到该分类的商品
    deleteBox:'/deleteBox',//删除盲盒信息
    getBoxDetail:'/getBoxDetail',//获取盲盒对应的商品
    getOrderListByStatus:'/getOrderListByStatus',//获取订单列表
    importCardListFromExcel:'/importCardListFromExcel',//导入卡密
    exportCard:'/exportCard',//导出卡号卡密
    changeOrderToCancle:'/changeOrderToCancle',//取消订单
    changeOrderToError:'/changeOrderToError',//修改订单状态为异常订单
    changeOrderToSended:'/changeOrderToSended',//发货
    getCardListByOrderid:'/getCardListByOrderid',//获取虚拟发货的卡号
    changeOrderToSendedByCard:'/changeOrderToSendedByCard',//虚拟物品发货
    getCancelOperate:'/getCancelOperate',//取消订单相关数据
    getOperate:'/getOperate',//获取运营数据
    getManageHistory:'/getManageHistory',//查看操作日志
    getManageList:'/getManageList',//获取管理员列表
    getBoxCanAddShopList:'/weight/getBoxCanAddShopList',//获取可以添加到盲盒的商品
    addBoxShop:'/weight/addBoxShop',//添加/修改盲盒商品
    deleteBoxShop:'/weight/deleteBoxShop',//删除盲盒商品
    getManageMemberPower:'/member/getManageMemberPower',//获取指定用户的权限
    addManageMemberWithPower:'/member/addManageMemberWithPower',//添加管理员
    updateManageInfo:'/member/updateManageInfo',//修改管理员信息
    deleteManageById:'/deleteManageById',//删除管理员
    deleteCardById:'/deleteCardById',//删除卡号
    searchBoxOrder:'/order/searchBoxOrder',//获取盲盒订单列表
    searchBoxOrderDetail:'/order/searchBoxOrderDetail',//获取盲盒购买订单 子订单详情
    searchGoodsOrderList:'/order/searchGoodsOrderList',//实物订单列表
    searchCardsOrderList:'/order/searchCardsOrderList',//虚拟订单列表
    getBoxProSettingListBySaleNum:'/box/getBoxProSettingListBySaleNum',//盲盒更多概率设置
    addProSettingDetail:'/box/addProSettingDetail',//添加盲盒第二套概率
    changeProSettingDetail:'/box/changeProSettingDetail',//修改盲盒第二套概率
    deleteProSettingDetail:'/box/deleteProSettingDetail',//删除盲盒额外参数
    changeShopStatus:'/changeShopStatus',//商品上下架
    getOperateData:'/getOperateData',//获取运营数据
    changeProSettingUsed:'/box/changeProSettingUsed',//设置第二套概率是否启用
    sendCardList:'/sendCardList',//虚拟物品发货功能
    deleteShopList:'/deleteShopList',//删除商品
    getUserHistoryList:'/user/getUserHistoryList',//获取用户订单数据
    getAllOrderDetail:'/order/getAllOrderDetail',//获取所有待处理订单
    getBoxSaleByBoxId:'/box/getBoxSaleByBoxId',//获取盲盒的销量
}
