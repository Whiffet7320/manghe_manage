import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
import md5 from '../assets/md5.min.js'
const vue = new Vue()
axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8";
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
})
let myPut = axios.create({
    baseURL: urls.baseUrl,
    method: 'put',
})


myDelete.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            // 'X-Token': sessionStorage.getItem("token"),
            'token': `${sessionStorage.getItem("token")}`,
            // 'Access-Control-Allow-Origin': '*',
            // "access-control-allow-credentials": "true"
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            // 'X-Token': sessionStorage.getItem("token"),
            'token': `${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

myGet.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': `${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPut.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': `${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myGet.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myPut.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myDelete.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})

export default {
    doLogin(account, password) {
        return myPost({
            url: urls.doLogin,
            params: {
                account,
                password: md5(`${password}`).toUpperCase(),
                sign: md5(`BlindBox${account}${password}`).toUpperCase(),
            }
        })
    },
    getUserList(obj){
        return myPost({
            url: urls.getUserList,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    addMallCategory(){
        return myPost({
            url: urls.addMallCategory,
            params: {
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    updateCategory(obj){
        return myPost({
            url: urls.updateCategory,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    deleteCategory(obj){
        return myPost({
            url: urls.deleteCategory,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getBoxList(obj){
        return myPost({
            url: urls.getBoxList,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    updateBoxPrice(obj){
        return myPost({
            url: urls.updateBoxPrice,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getShopList(obj){
        return myPost({
            url: urls.getShopList,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    addShopInfo(obj){
        return myPost({
            url: urls.addShopInfo,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    changeShopInfo(obj){
        return myPost({
            url: urls.changeShopInfo,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getCardTypeList(obj){
        return myPost({
            url: urls.getCardTypeList,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getShopByCategory(obj){
        return myPost({
            url: urls.getShopByCategory,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    addCategoryShop(obj){
        return myPost({
            url: urls.addCategoryShop,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    deleteCateGoryShop(obj){
        return myPost({
            url: urls.deleteCateGoryShop,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getCategoryWithoutShopList(obj){
        return myPost({
            url: urls.getCategoryWithoutShopList,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    deleteBox(obj){
        return myPost({
            url: urls.deleteBox,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getBoxDetail(obj){
        return myPost({
            url: urls.getBoxDetail,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getOrderListByStatus(obj){
        return myPost({
            url: urls.getOrderListByStatus,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    exportCard(obj){
        return myPost({
            url: urls.exportCard,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    changeOrderToCancle(obj){
        return myPost({
            url: urls.changeOrderToCancle,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    changeOrderToError(obj){
        return myPost({
            url: urls.changeOrderToError,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    changeOrderToSended(obj){
        return myPost({
            url: urls.changeOrderToSended,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getCardListByOrderid(obj){
        return myPost({
            url: urls.getCardListByOrderid,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    changeOrderToSendedByCard(obj){
        return myPost({
            url: urls.changeOrderToSendedByCard,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getCancelOperate(obj){
        return myPost({
            url: urls.getCancelOperate,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getOperate(obj){
        return myPost({
            url: urls.getOperate,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getManageHistory(obj){
        return myPost({
            url: urls.getManageHistory,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getManageList(obj){
        return myPost({
            url: urls.getManageList,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getBoxCanAddShopList(obj){
        return myPost({
            url: urls.getBoxCanAddShopList,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    addBoxShop(obj){
        return myPost({
            url: urls.addBoxShop,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    deleteBoxShop(obj){
        return myPost({
            url: urls.deleteBoxShop,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getManageMemberPower(obj){
        return myPost({
            url: urls.getManageMemberPower,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    addManageMemberWithPower(obj){
        return myPost({
            url: urls.addManageMemberWithPower,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    updateManageInfo(obj){
        return myPost({
            url: urls.updateManageInfo,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    deleteManageById(obj){
        return myPost({
            url: urls.deleteManageById,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    deleteCardById(obj){
        return myPost({
            url: urls.deleteCardById,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    searchBoxOrder(obj){
        return myPost({
            url: urls.searchBoxOrder,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    searchBoxOrderDetail(obj){
        return myPost({
            url: urls.searchBoxOrderDetail,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    searchGoodsOrderList(obj){
        return myPost({
            url: urls.searchGoodsOrderList,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    searchCardsOrderList(obj){
        return myPost({
            url: urls.searchCardsOrderList,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getBoxProSettingListBySaleNum(obj){
        return myPost({
            url: urls.getBoxProSettingListBySaleNum,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    addProSettingDetail(obj){
        return myPost({
            url: urls.addProSettingDetail,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    deleteProSettingDetail(obj){
        return myPost({
            url: urls.deleteProSettingDetail,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    changeProSettingDetail(obj){
        return myPost({
            url: urls.changeProSettingDetail,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    changeShopStatus(obj){
        return myPost({
            url: urls.changeShopStatus,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getOperateData(obj){
        return myPost({
            url: urls.getOperateData,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    changeProSettingUsed(obj){
        return myPost({
            url: urls.changeProSettingUsed,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    sendCardList(obj){
        return myPost({
            url: urls.sendCardList,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    deleteShopList(obj){
        return myPost({
            url: urls.deleteShopList,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getUserHistoryList(obj){
        return myPost({
            url: urls.getUserHistoryList,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getAllOrderDetail(obj){
        return myPost({
            url: urls.getAllOrderDetail,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    getBoxSaleByBoxId(obj){
        return myPost({
            url: urls.getBoxSaleByBoxId,
            params: {
                ...obj,
                manage_id:sessionStorage.getItem("manage_id"),
            }
        })
    },
    async importCardListFromExcel(file) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'token': `${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/${urls.importCardListFromExcel}`, file, configs)
        return res.data
    },
    async upload_pic(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'token': `${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/addPhoto`, image, configs)
        return res.data
    },
}