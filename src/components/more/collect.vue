<template>
    <div v-if="showData">
        <div class="collectPage">
            <div class="top">
                <div class="leftPart">
                    <span class="on">
                        <a href="javascript:;">宝贝</a>
                    </span>
                    <span class="">
                        <a href="javascript:;">内容</a>
                    </span>
                </div>
                <div class="rightPart">
                    <span class="icon">
                        <img src="../../assets/images/下载 (1).png" alt="">
                    </span>
                    <span class="manage">管理</span>
                    <span class="goback" @click="$router.push('/more')">返回</span>
                </div>
            </div>
            <div class="tab">
                <van-row>
                    <van-col span="12">
                        <div class="dynamic">
                            <span class="iconfont icon-xingzhuangjiehe"></span>
                            宝贝动态(7)
                        </div>
                    </van-col>
                    <van-col span="12">
                        <div class="wish">
                            <span class="iconfont icon-xinyuandan"></span>
                            心愿单(1)
                        </div>
                    </van-col>
                </van-row>
            </div>
            <main>
                <div class="options">
                    <div class="left">
                        <span class="all on">全部宝贝</span>
                        <span class="discount">有优惠</span>
                        <span class="bought">已买过</span>
                    </div>
                </div>
                <div class="goodsList">
                    <ul>
                        <li v-for="(item,index) in list" :key="index">
                            <goodsCard
                                :goodsImg="item.goodsImg"
                                :goodsName="item.goodsName"
                                :newPrice="item.newPrice"
                                :oldPrice="item.oldPrice"
                                :l="item.l"
                                :m="item.m"
                                :r="item.r"
                            />
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
    import goodsCard from "../public/goodsCard";
    import Vue from 'vue';
    import { Col, Row } from 'vant';

    Vue.use(Col);
    Vue.use(Row);
    export default {
        data(){
            return{
                // 收藏列表
                list:[],
                showData:false
            }
        },
        computed:{
        },
        components:{
            goodsCard
        },
        created(){
            // 如果用户登录
            if(this.$store.state.username){
                this.$axios.get("/getCollect",{
                    params:{
                        username:this.$store.state.username
                    }
                }).then((res)=>{
                    
                    for(let item of res.data.collectList){
                        this.list.push({
                            goodsId:item.num_iid,
                            goodsImg:item.pict_url,
                            goodsName:item.title,
                            newPrice:item.zk_final_price,
                            oldPrice:item.reserve_price,
                            l:item.presale_deposit==0?"免运费":item.presale_deposit,
                            m:String(item.volume),
                            r:item.provcity
                        })
                    }
                    this.showData = true;
                }).catch((err)=>{
                    console.log(err);
                })
            }else{
                // 用户没登录，跳到登录界面
                this.$router.push("/login");
            }
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $fontSize:0.75rem;
    $titleSize:0.875rem;
    .collectPage{
        padding: 0 0.625rem;

        .top{
            margin-top: 00.625rem;
            height: 1.875rem;
            color: #333;
            .leftPart{
                float: left;
                span{
                    display: inline-block;
                    border-bottom: 1px solid transparent;
                    margin-right: 0.625rem;
                    line-height: 1.75rem;
                    box-sizing: border-box;
                    a{
                        color: #333;
                        font-size: $titleSize;
                    }
                    &.on{
                        border-bottom: 1px solid $mainColor;
                        a{
                            color: $mainColor;
                        }
                    }
                }
            }
            .rightPart{
                float: right;
                line-height: 1.875rem;
                span.icon{
                    display: inline-block;
                    width: 1.875rem;
                    height: 1.875rem;
                    vertical-align: middle;
                    margin-right: 0.625rem;
                    img{
                        width: 1.875rem;
                        height: 1.875rem;
                    }
                }
                span.manage{
                    display: inline-block;
                    font-size: $titleSize;
                    margin-right: 0.625rem;
                }
                span.goback{
                    display: inline-block;
                    font-size: $titleSize;
                }
            }
        }
        .tab{
            margin-top: 1rem;
            .dynamic{
                height: 2.375rem;
                text-align: center;
                color: #666666;
                line-height: 2.375rem;
                background-color: #ffdead;
                border-radius: 5px;
                margin-right: 0.312rem;
                span.iconfont{
                    font-size: $fontSize;
                }
            }
            .wish{
                margin-left: 0.312rem;
                border-radius: 5px;
                color: #666666;   
                text-align: center;
                height: 2.375rem;
                line-height: 2.375rem;
                background-color: #ffdead;
                span.iconfont{
                    font-size: $fontSize;
                }
            }
        }
        main{
            
            .options{
                height: 2.5rem;
                line-height: 2.5rem;
                font-size: $fontSize;
                color: #333;
                .left{
                    float: left;
                    span{
                        padding-right: 0.625rem;
                        margin-right: 0.312rem;
                        &.on{
                            color: $mainColor; 
                        }
                    }
                    span.all{

                    }
                    span.discount{

                    }
                    span.bought{

                    }
                }
            }
            .goodsList{
                ul{
                    li{
                        margin-bottom: 0.625rem;
                    }
                }
            }
        }
    }
</style>