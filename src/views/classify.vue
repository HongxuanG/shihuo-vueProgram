<template>
    <div>
        <bscroll :left-data="left" :right-data="right"></bscroll>
        <!-- 底部固定导航栏 -->
		<nav-bar></nav-bar>
    </div>
</template>

<script>
    import "../assets/css/base.css";
    import bscroll from "../components/bscroll";
    import navBar from "../components/navigation";
    export default {
        data(){
            return{
                left:["女装","男装","鞋靴","运动装备","黑色鲨鱼","饰品","手机配件","电视","大家电","电脑办公","小爱智能","路由器","生活电器","厨房电器","智能穿戴","智能家居","车载出行","个护健康","数码配件","日用百货","服务"],
                right:[
                    {name:"女装",content:[1,2,3,4,5]},
                    {name:"男装",content:[1,2,3,4,5]},
                    {name:"鞋靴",content:[1,2,3,4,5]},
                    {name:"运动装备",content:[1,2,3,4,5]},
                    {name:"黑色鲨鱼",content:[1,2,3,4,5]},
                    {name:"饰品",content:[1,2,3,4,5]},
                    {name:"手机配件",content:[1,2,3,4,5]},
                    {name:"电视",content:[1,2,3,4,5]},
                    {name:"大家电",content:[1,2,3,4,5]},
                    {name:"电脑办公",content:[1,2,3,4,5]},
                    {name:"小爱智能",content:[1,2,3,4,5]},
                    {name:"路由器",content:[1,2,3,4,5]},
                    {name:"生活电器",content:[1,2,3,4,5]},
                    {name:"厨房电器",content:[1,2,3,4,5]},
                    {name:"智能穿戴",content:[1,2,3,4,5]},
                    {name:"智能家居",content:[1,2,3,4,5]},
                    {name:"车载出行",content:[1,2,3,4,5]},
                    {name:"个护健康",content:[1,2,3,4,5]},
                    {name:"数码配件",content:[1,2,3,4,5]},
                    {name:"日用百货",content:[1,2,3,4,5]},
                    {name:"服务",content:[1,2,3,4,5]},
                ],
            }
        },
        components:{
            bscroll,
            navBar
        },
        created(){
            this.$store.state.isOn = 1;
        }
    }
</script>

<style lang="scss" scoped>
</style>