import Vue from 'vue';
import { Dialog } from 'vant';
import { Toast } from 'vant';
import router from "../../router/index"

Vue.use(Toast);
Vue.use(Dialog);
export default {
    namespaced:true,
    state:{
        // 里面存放选中的物品的id
        result:[],
        checked:false,
        isManage:false,
        shopcartList:[
            // {
            //     itemId:0,
            //     shopname:"pasok旗舰店",
            //     item_img:require("../../assets/images/show2.jpg"),
            //     itemName:"短裤男潮牌ins外穿宽松潮流5分运动休闲中裤夏季",
            //     options:"浅灰色+橘红色",
            //     current_price:89,
            //     bug_num:1
            // },
            // {
            //     itemId:1,
            //     shopname:"adidas旗舰店",
            //     item_img:require("../../assets/images/show1.jpg"),
            //     itemName:"日系简约宽松纯棉运动短裤 男士纯色五分裤毛圈健身跑步休闲卫裤",
            //     options:"桔色;XL",
            //     current_price:100,
            //     bug_num:1
            // },
            // {
            //     itemId:2,
            //     shopname:"nake旗舰店",
            //     item_img:require("../../assets/images/show3.jpg"),
            //     itemName:"夏季男士短袖t恤潮流带帽男装衣服夏天宽松半袖连帽卫衣男体恤潮t",
            //     options:"131949黑;2XL",
            //     current_price:150,
            //     bug_num:1
            // },
            // {
            //     itemId:3,
            //     shopname:"newbalance旗舰店",
            //     item_img:require("../../assets/images/show4.jpg"),
            //     itemName:"花花公子休闲西服男装2020新款中年男士修身薄款西装单件上衣外套",
            //     options:"190/3XL",
            //     current_price:782,
            //     bug_num:1
            // },
        ],

    },
    mutations:{
        manageSwitch(state){
            state.isManage = !state.isManage;
        },
        // 点击全选按钮
        checkAll(state,dom){
            console.log(state.result)
            // 选中的数组长度等于列表长度时，点击全选，进行反选
            if(state.result.length == state.shopcartList.length){
                dom.toggleAll(false);
                // 选中的数组长度不等于列表长度时，点击全选，进行全选
            }else if(state.result.length != state.shopcartList.length){
                dom.toggleAll(true);
            }
        },
        // 点击删除按钮
        ondelete(state,arr){
            Dialog.confirm({
                message: `确认将这${arr.length}个宝贝删除`,
            }).then(() => {
                // 问题：每循环一次，数据删除后，页面更新，执行下一次循环，数据错位，删除错误的数据
                for(let id of arr){
                    for(let i =0;i<state.shopcartList.length;i++){
                        if(state.shopcartList[i].itemId == id){
                            state.shopcartList.splice(i,1);
                        }
                    }
                }
                arr = [];
            }).catch(() => {
                // 取消
                return false
            });
        },
        // 添加到购物车
        add_shopcart(state,goodsObj){
            // 在购物车列表里寻找相同id的商品索引值
            let index = state.shopcartList.findIndex(item=>item.itemId == goodsObj.num_iid);
            // 有索引值时商品数量加一
            if(index!=-1){
                state.shopcartList[index].bug_num += 1;
            }else{
                // 没有索引值时 商品列表push
                state.shopcartList.push({
                    itemId:goodsObj.num_iid,
                    shopname:goodsObj.nick,
                    item_img:goodsObj.pict_url,
                    itemName:goodsObj.title,
                    options:"190/3XL",
                    current_price:goodsObj.zk_final_price,
                    bug_num:1
                })
            }
            // 添加到购物车成功时显示轻提示
            Toast({
                message: '添加成功',
                icon: 'success',
            });
        },
        // 点击结算按钮
        onSubmit(state,array){
            // 筛选
            let orderGoodsList = state.shopcartList.filter((item)=>{
                // array[0]为 result
                return array[0].indexOf(item.itemId) != -1;
            })
            this.state.order.orderList = orderGoodsList;
            this.state.order.totalPrice = array[1];
            //()=>{} 在路由被打断时，解决因为没有回调函数而出现错误提示。
            router.push({path:"/order",query:{newArr:orderGoodsList,totalPrice:array[1]}},()=>{});
        },
        // 在购物车中移除已提交订单的商品
        removeShopcart(state){
            let sb = new Set(this.state.order.orderList)
            // has方法可以判断Set对象是否具有指定元素。 item在sb里面没有的筛选出来组成一个数组(差集)
            let minus = state.shopcartList.filter(item=>!sb.has(item));
            state.shopcartList = minus;
        }
    },
    actions:{
        ondelete({commit},arr){
            commit("ondelete",arr)
        },
        add_shopcart({commit},goodsObj){
            commit("add_shopcart",goodsObj);
        },
        onSubmit({commit},array){
            commit("onSubmit",array)
        },
    },
    getters:{
    },
    modules:{

    }
}