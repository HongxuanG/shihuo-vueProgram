export default [
    {
        path:"/addressList",
        name:"地址列表",
        component:()=>import("../../components/address/index.vue")
    },
    {
        path:"/addressAdd",
        name:"添加地址",
        component:()=>import("../../components/address/addressAdd.vue")
    },
    {
        path:"/addressEdit",
        name:"编辑地址",
        component:()=>import("../../components/address/addressEdit.vue")
    }
]