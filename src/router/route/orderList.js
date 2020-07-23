export default [
    {
        path: "/orderList",
        component:()=>import("../../views/orderList.vue"),
        name:"订单列表页",
        children:[
            {path:"all",component:()=>import("../../components/orderList/orderItem.vue")},
            {path:"waitFPay",component:()=>import("../../components/orderList/orderItem.vue")},
            {path:"waitFSend",component:()=>import("../../components/orderList/orderItem.vue")},
            {path:"waitFTake",component:()=>import("../../components/orderList/orderItem.vue")},
            {path:"waitFSay",component:()=>import("../../components/orderList/orderItem.vue")},
        ],
        meta:{
            requiresAuth:true
        }
    },
    {
        path:"/orderDetail",
        component:()=>import("../../components/orderList/orderDetail.vue"),
        name:"订单详情页"
    }
]