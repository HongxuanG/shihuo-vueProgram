import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import cart from "./shopCart/shopcart"
import order from "./order/order"
import address from "./address/address"
import search from "./search/searchItem"
import detail from "./detail/detail"
import more from "./more/more"

export default new Vuex.Store({
    state: {
        isOn:0,//导航栏的高亮样式
        nav:[
            {name:"首页",to:"/main/recommend/all"},
            {name:"分类",to:"/classify"},
            {name:"订单列表",to:"/orderList/all"},
            {name:"购物车",to:"/shopcart"},
            {name:"更多",to:"/more"}
        ],
        username:null
    },
    mutations: {
        //改变底部导航栏的高亮状态isOn的值
        changeItem(state,index){
            state.isOn = index;
        }
    },
    actions: {
        
    },
    modules: {
        cart,     //购物车
        order,    //订单
        address,  //地址
        search,   //搜索
        detail,    //详情
        more
    }
});
