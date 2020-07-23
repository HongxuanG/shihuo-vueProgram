export default [
    {
        path:"/guidepage",
        name:"引导页",
        component:()=>import("../../components/public/guidepage.vue")
    },
    {
        path:"/advertisement",
        name:"广告页",
        component:()=>import("../../components/public/advertisement.vue"),
        // 独享的路由守卫
        beforeEnter:(to,from,next)=>{
            // 通过存储过程，判断存储中是否有数据
            // 有数据，进入广告页
            // 没有数据，进入引导页
            // localStorage 关闭浏览器，数据还是存在，只有清楚数据缓存才消失
            if(localStorage.advertpage){
                // 有数据
                next();
            }else{
                // 没有数据
                localStorage.advertpage = true,
                next("/guidepage")
            }
        }
    },
]