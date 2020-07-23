export default [
    {
        path:"/more",
        name:"更多",
        component:()=>import("../../views/more.vue")
    },
    {
        path: "/login",
        component:()=>import("../../components/more/login.vue"),
        name:"登录页"
    },
    {
        path: "/register",
        component:()=>import("../../components/more/register.vue"),
        name:"注册页"
    },
    {
        path: "/collect",
        component:()=>import("../../components/more/collect.vue"),
        name:"收藏页",
        meta:{
            requiresAuth:true
        }
    }
]