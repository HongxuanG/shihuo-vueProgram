<template>
    <div>
        <div class="orderDetail">
            <div class="top">
                <!-- 标题 -->
                <div class="left">
                    <span>{{typeList[$route.query.type]}}</span>
                </div>
                <div class="rightImg"></div>
            </div>
            <div class="addressInfo" >
                <div class="left_icon">
                    <span class="iconfont icon-dizhi"></span>
                </div>
                <div class="middle">
                    <div class="addressee">
                        <h1 class="one-txt-cut">{{addresseeInfo.name}}</h1>
                        <p>{{addresseeInfo.tel}}</p>
                    </div>
                    <div class="address txt-cut">
                        {{addresseeInfo.address}}
                    </div>
                </div>
            </div>
            <ul class="orderListUl">
                <li class="orderlistLi" v-for="(item,index) in orderList" :key="index">
                    <a href="javascript:;">
                        <div class="cardHeader">
                            <h1 class="shopName">
                                <span class="iconfont icon-home-shagnchengtuiguang" ></span>
                                {{item.shopname}}
                            </h1>
                            <!-- 如果状态为4即待评价，说明交易成功 typeList[0]是交易成功-->
                            <span class="dealStatus">{{$route.query.type==4 ? typeList[0] : typeList[$route.query.type]}}</span>
                        </div>
                        <div class="cardBody">
                            <div class="flexbox">
                                <div class="left">
                                    <img :src="item.item_img" alt="">
                                </div>
                                <div class="middle">
                                    <h4 class="itemName txt-cut">{{item.itemName}}</h4>
                                    <div class="options txt-cut">{{item.options}}</div>
                                    <span class="mark">七天无理由退换</span>
                                </div>
                                <div class="right">
                                    <span class="singlePrice">￥{{item.current_price}}</span>
                                    <span class="number">×{{item.bug_num}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="cardFooter">
                            <div class="freight">
                                <span class="title">运费(快递)</span>
                                <span class="content">￥0.00</span>
                            </div>
                            <div class="price">
                                <span class="title">实付款</span>
                                <span class="content">￥{{item.current_price*item.bug_num}}</span>
                            </div>
                            <div class="orderInfo">
                                <span class="orderId">订单编号:&nbsp;{{$route.query.orderId}}</span>
                                <span class="orderTime">下单时间:&nbsp;{{$route.query.orderTime | dateFormat}}</span>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="callto">
                <div class="l_bottom">
                    <span class="iconfont icon-maijia"></span>
                    <span class="text">联系卖家</span>
                </div>
                <div class="line"></div>
                <div class="r_bottom">
                    <span class="iconfont icon-dadianhua"></span>
                    <span class="text">拨打电话</span>
                </div>
            </div>
            
        </div>
        <div class="bottomBar">
            <ul v-if="$route.query.type==1">
                <li @click="$router.go(-1)">
                    <span>返回</span>
                </li>
                <li>
                    <span>修改地址</span>
                </li>
                <li>
                    <span>取消订单</span>
                </li>
                <li class="say">
                    <span>付款</span>
                </li>
            </ul>
            <!-- 待发货 -->
            <ul v-else-if="$route.query.type==2">
                <li @click="$router.go(-1)">
                    <span>返回</span>
                </li>
                <li>
                    <span>提醒发货</span>
                </li>
                <li>
                    <span>取消订单</span>
                </li>
                <li class="say">
                    <span>申请退款</span>
                </li>
            </ul>
            <!-- 待收货 -->
            <ul v-else-if="$route.query.type==3">
                <li @click="$router.go(-1)">
                    <span>返回</span>
                </li>
                <li>
                    <span>订单跟踪</span>
                </li>
                <li>
                    <span>联系商家</span>
                </li>
                <li class="say">
                    <span>物流信息</span>
                </li>
            </ul>
            <!-- 待评价 -->
            <ul v-else-if="$route.query.type==4">
                <li @click="$router.go(-1)">
                    <span>返回</span>
                </li>
                <li>
                    <span>挑选服务</span>
                </li>
                <li>
                    <span>卖了换钱</span>
                </li>
                <li class="say">
                    <span>评价</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {createNamespacedHelpers} from "vuex";
import moment from "moment";
const {mapState} = createNamespacedHelpers("order");
    export default {
        data(){
            return{
                orderList:[],
            }
        },
        methods:{

        },
        computed:{
            ...mapState({
                addresseeInfo:state=>state.addresseeInfo,
                AllList:state=>state.AllList,
                typeList:state=>state.typeList
            })
        },
        filters:{
            dateFormat:function(dateStr){
                return moment(dateStr).format("YYYY-MM-DD hh:mm:ss");
            }
        },
        created(){
            this.orderList = JSON.parse(JSON.stringify(this.$route.query.orderList));
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $fontSize:0.75rem;
    $titleSize:0.875rem;
    .orderDetail{
        overflow: hidden;
        margin-bottom: 20px;
        .top{
            height: 6.25rem;
            background-color: $mainColor;
            .left{
                float: left;
                line-height: 6.25rem;
                height: 6.25rem;
                padding-left: 2.182rem;
                span{

                    font-size: 1.25rem;
                    font-weight: bold;
                    color: white;
                }
            }
            .rightImg{
                float: right;
                width: 9.375rem;
                height: 6.25rem;
                background: url("../../assets/images/yiwancheng.jpg") no-repeat center center;
                background-size: contain;
            }
        }
        .addressInfo{
            background-color: #fff;
            padding: 0.75rem;
            display: flex;
            align-items: center;
            margin-bottom: 0.625rem;
            .left_icon{
                width: 2rem;
                height: 2rem;
                line-height: 2rem;
                border-radius: 50%;
                background-color: $mainColor;
                text-align: center;
                margin: 0.625rem;
                margin-left: 0;
                span.iconfont{
                    font-size: 1.5rem;
                    color: white;
                    display: inline-block;
                }
            }
            .middle{
                flex: 1;
                
                .addressee{
                    height: 1.875rem;
                    line-height: 1.875rem;
                    font-size: 0;
                    h1{
                        width: 40%;
                        height: 1.875rem;      
                        overflow: hidden;
                        color: #333333;
                        font-size: $titleSize;
                        display: inline-block;
                        margin-right: 5px;
                        vertical-align: middle;
                    }
                    p{
                        width: auto;
                        vertical-align: middle;
                        height: 1.875rem;
                        display: inline-block;
                        font-size: $titleSize;
                        color: #999;
                    }
                }
                .address{
                    font-size: $fontSize;
                    color: #333333;
                }
            }
        }
        ul.orderListUl{
            li.orderlistLi{
                background-color: white;
                margin-bottom: 0.625rem;
                a{
                    display: inline-block;
                    .cardHeader{
                        display: block;
                        height: 0.937rem;//15px
                        line-height: 0.937rem;
                        margin: 1.062rem 0.625rem;//17px
                        font-size: $titleSize;
                        .shopName{
                            float: left;
                            color: #333;
                        }
                        .dealStatus{
                            float: right;
                            color: $mainColor;

                        }
                    }
                    .cardBody{
                        margin: 0 0.625rem;
                        border-bottom: 1px solid $bgColor;
                        .flexbox{
                            height: 5.312rem;
                            margin-bottom: 0.625rem;
                            display: flex;
                            .left{
                                width: 4.75rem;
                                margin-right: 0.625rem;
                                border-radius: 10px;
                                overflow: hidden;               
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .middle{
                                flex: 1;
                                .itemName{
                                    margin-bottom: 5px;
                                    font-weight: normal;
                                    line-height: 1rem;
                                    height: 1.875rem;
                                    font-size: $fontSize;
                                    color: #333;

                                }
                                .options{
                                    margin-bottom: 5px;
                                    line-height: 1rem;
                                    font-size: $fontSize;
                                    color: #999;
                                }
                                .mark{
                                    height: 1rem;
                                    line-height: 1rem;
                                    width: 5.5rem;
                                    display: block;
                                    color: #ff5000;
                                    font-size: $fontSize;
                                    background-color: #fff1eb;
                                    border-radius: 5px;
    
                                }
                            }
                            .right{
                                width: 3.5rem;
                                text-align: right;
                                .singlePrice{
                                    display: block;
                                }
                                .number{
                                    display: block;
                                    
                                }
                            }
                        }
                    }
                    .cardFooter{
                        align-items: center;
                        margin: 0 0.625rem;
                        padding-top: 0.625rem;
                        padding-bottom: 0.625rem;
                        .freight{
                            height: 20px;
                            font-size: $fontSize;
                            .title{
                                float: left;
                            }
                            .content{
                                float: right;

                            }
                        }
                        .price{
                            @extend .freight;
                            font-size: $titleSize;
                            margin-bottom: 0.625rem;
                            .content{
                                color: #ff5584;
                            }
                        }
                        .orderInfo{
                            margin-top: 1px;
                            .orderId{
                                display: block;
                            }
                            .orderTime{
                                display: block;
                            }
                        }
                    }
                }
            }
        }
        // 联系卖家
        .callto{
            height: 3rem;
            background-color: white;
            line-height: 3rem;
            font-size: $titleSize;
            display: flex;
            justify-content: center;
            .l_bottom{
                flex: 1;
                height: 3rem;
                text-align: center;
                display: inline-block;
                .iconfont{
                    display: inline-block;
                    margin-right: 0.625rem;
                    color: #108ee9;
                }
            }
            .line{

                margin-top: 0.625rem;
                margin-bottom: 0.625rem;
                width: 1px;
                background-color: #ccc;

            }
            .r_bottom{
                @extend .l_bottom;
            }
        }
    }
    // 底部操作栏
    .bottomBar{
        width: 100%;
        height: 3.125rem;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        box-sizing: border-box;
        padding: 0 0.625rem;
        padding-right: 0;
        text-align: right;
        ul{
            display: inline-block;
            margin-top: 0.625rem;
            margin-bottom: 0.625rem;
            li:not(:first-child){
                float: left;
                width: 4.25rem;
                height: 1.75rem;
                line-height: 1.75rem;
                border-radius: 50px;
                border: 1px solid #999999;
                text-align: center;
                margin-right: 0.625rem;
                span{
                    font-size: $titleSize;
                    
                }
                &.say{
                    border-color: $mainColor;
                    color: $mainColor;
                }
            }
            &>li:first-child{
                float: left;
                width: 3.125rem;
                height: 1.75rem;
                line-height: 1.75rem;
                text-align: center;
            }
        }
    }
</style>