<template>
    <div>
        <div class="mainBox">
            <topBar
                :title="$route.name"
            />
            <classifyPart :classifyList="classifyList" />
            <hotActivity></hotActivity>
            <ywqd></ywqd>
        </div>
    </div>
</template>

<script>
    // 头部
    import topBar from "./prefectureTopBar";
    import classifyPart from "./pre_classify";
    import hotActivity from "./pre_hotActivity";
    import ywqd from "./pre_ywqd";
    export default {
        data(){
            return{
                classifyList:{
                    top:[
                        {img:require("../../assets/images/basketball/lanqiuxie2.png"),title:"篮球鞋"},
                        {img:require("../../assets/images/basketball/qiuyi2.png"),title:"篮球上衣"},
                        {img:require("../../assets/images/basketball/qiuku2.png"),title:"篮球下装"},
                        {img:require("../../assets/images/basketball/lanqiuhuju1.png"),title:"篮球配件"},
                        {img:require("../../assets/images/basketball/lanqiu2.png"),title:"篮球"},
                    ],
                    bottom:[
                        {img:require("../../assets/images/basketball/Jordan.png"),title:"Jordan"},
                        {img:require("../../assets/images/basketball/adidas.png"),title:"adidas"},
                        {img:require("../../assets/images/basketball/nike1.png"),title:"Nike"},
                        {img:require("../../assets/images/basketball/ua.png"),title:"UA"},
                        {img:require("../../assets/images/basketball/morebrand.png"),title:"全部"},
                    ]
                }
            }
        },
        components:{
            topBar,
            classifyPart,
            hotActivity,
            ywqd
        }
    }
</script>

<style lang="scss" scoped>
    .mainBox{
        padding-top: 2.937rem;
    }
</style>