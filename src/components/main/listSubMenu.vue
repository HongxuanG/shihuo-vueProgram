<template>
    <div>
        <!-- 三级菜单 -->
        <van-row tag="ol" class="list-submenu" type="flex" justify="space-around">
            <van-col tag="li" @click="onclick(index)" span="5" v-for="(item,index) in list" :key="index">
                <router-link :to="item.to" tag="span" :class="{'click':index == isClick}">{{item.title}}</router-link>
            </van-col>
        </van-row>
        
        <!-- 显示物品列表 -->
        <router-view :item-list="itemList" :current-cat="current_cat"></router-view>
        <!-- 加载中 -->
        <van-loading size="24px" vertical v-if="showLoading" >加载中...</van-loading>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Loading } from 'vant';

    Vue.use(Loading);
    export default {
        data(){
            return{
                isClick:0,
                // 物品列表
                itemList:[
                    // {
                    //     productId:572096814881,
                    //     product_img:require("../../assets/images/product01.jpg"),
                    //     product_name:"Converse 1970s",
                    //     content:"简约黑白配色延续经典",
                    //     price:339
                    // },
                    // {
                    //     productId:572096814881,
                    //     product_img:require("../../assets/images/product01.jpg"),
                    //     product_name:"Converse 1970s",
                    //     content:"简约黑白配色延续经典",
                    //     price:339
                    // },
                    // {
                    //     productId:572096814881,
                    //     product_img:require("../../assets/images/product01.jpg"),
                    //     product_name:"Converse 1970s",
                    //     content:"简约黑白配色续经典色续经典色经典色",
                    //     price:339
                    // },
                    // {
                    //     productId:572096814881,
                    //     product_img:require("../../assets/images/product01.jpg"),
                    //     product_name:"Converse 1970s",
                    //     content:"简约黑白配色延续经典",
                    //     price:339
                    // },
                ],
                current_cat:"all",
                showLoading:true
            }
        },
        props:["isthis"],
        methods:{
            // 点击三级导航栏
            onclick(index){
                this.isClick=index;
                //获取当前点击的地址后缀，传到 listItem中
                this.current_cat = this.list[index].name;
                
            },
            getData(){
                // 鞋子的数据
                this.$axios.get("http://api.tbk.dingdanxia.com/spk/good_lists",{
                    params:{
                        apikey:"UaEUPVdgCRyFCcKlz7peBbfUdjxsklD1",
                        min_id:1,
                        keyword:"鞋子",
                        sort:0,
                        back:100
                    }
                }).then((res)=>{
                    // 如果有数据时，搜索有结果
                    if(res.data.msg=="请求成功【success】"){
                        for(let i=0;i<20;i++){
                            this.itemList.push({
                                productId:res.data.data[this.itemList.length].itemid,
                                product_img:res.data.data[this.itemList.length].itempic+"_310x310.jpg",
                                product_name:res.data.data[this.itemList.length].shopname,
                                price:res.data.data[this.itemList.length].itemprice,
                                content:res.data.data[this.itemList.length].itemshorttitle,
                            })
                        }
                        this.showLoading = false;
                        // 继续请求数据
                        if (this.itemList.length < 100) {
                            this.getData();
                            this.showLoading = true;
                        }
                    }else if(res.data.msg=="数据返回失败【无数据】"){
                        // 如果无数据时，搜索无结果
                        console.log("数据返回失败【无数据")
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
        },
        computed:{
            list(){
                return [
                    {
                        title:"全部",
                        to:`/main/${this.isthis}/all`,
                        name:"all"
                    },
                    {title:"单品推荐",to:`/main/${this.isthis}/single_rc`,name:"single_rc"},
                    {title:"原创精选",to:`/main/${this.isthis}/original`,name:"original"},
                    {title:"用户晒物",to:`/main/${this.isthis}/user_pic`,name:"user_pic"},
                ];
            }
        },
        created(){
            this.getData();
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $navHeight:2.812rem;
    $fontSize:0.75rem;
    $titleSize:0.875rem;
    $maxWidth:640px;
	$minWidth:320px;
    .list-submenu{
        margin-top: 5px;
        text-align: center;
        span{
            display: inline-block;
            width: 100%;
            height: 1.312rem;
            line-height: 1.321rem;
            background-color: #f5f5f5;
            &.click{
                color: white;
                background-color: $mainColor;
            }
        }
    }
</style>