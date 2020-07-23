import Vue from "vue";
import VueRouter from "vue-router";
import main from "./route/main"
import more from "./route/more";
import classify from "./route/classify";
import detail from "./route/detail";
import search from "./route/search";
import shopcart from "./route/shopcart";
import orderList from "./route/orderList"
import publics from "./route/publics"
import address from "./route/address";
import store from "../store/index"

Vue.use(VueRouter);

// import store from "../store/index"
const routes = [
    { 
        path: "/", 
        redirect: "/advertisement" //重定向
    },
    ...main,      //主页
    ...more,      //更多
    classify,  //分类
    ...orderList, //订单列表页
    detail,    //详情页
    ...search,    //搜索页
    ...shopcart,  //购物车
    ...publics, //公共
    ...address //编辑地址
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
// 全局前置路由守卫
router.beforeEach((to,from,next)=>{
    // 查找这个页面的meta对象有没有这个requiresAuth变量
    console.log(to)
    if(to.matched.some((item)=>item.meta.requiresAuth)){
        // 如果没有登录过了
        if(!store.state.username){
            // 跳转到 登录页面，传入对象，是这个页面的路由路径，登陆完在跳转回来
            next({
                path:'/login',
                query:{
                    redirect:to.fullPath,
                    from:from.fullPath
                }
            })
        }else{
            // 有授权（就是登陆过）
            next();
        }
    }else{
        // 如果这个页面不需要经过授权（要求登录后才能访问）
        next();
    }
})


export default router;
