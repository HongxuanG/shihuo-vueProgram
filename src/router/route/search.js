export default [
    {
        path: "/search",
        component:()=>import("../../views/search.vue"),
        name:"搜索页",
    },
    {
        path:"/searchResult",
        component:()=>import("../../components/search/searchResult.vue"),
        name:"搜索结果"
    }
]