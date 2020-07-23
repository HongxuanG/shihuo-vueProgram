export default [
    {
        path: "/shopcart",
        component:()=>import("../../views/shopcart.vue"),
        name:"购物车",
        meta:{
            requiresAuth:true//要求授权
        }
    },
    {
        path: "/order",
        component:()=>import("../../components/orderList/order.vue"),
        name:"订单",
        meta:{
            requiresAuth:true//要求授权
        }
    },
]