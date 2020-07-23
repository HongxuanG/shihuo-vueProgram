<template>
    <div>
        <van-nav-bar
            left-text="返回"
            title="订单"
            left-arrow
            @click-left="onClickLeft"
        />
        <!-- 购物车页面中点击提交订单后的订单页 -->
        <div class="orderPage">
            <!-- 当联系方式列表有时，显示 -->
            <div class="addressInfo" @click="goAddress" v-if="$store.state.address.list.length!=0">
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
                    <div class="tip">
                        收货不便时，可选择暂存服务
                    </div>
                </div>
                <div class="right_icon">
                    <span class="iconfont icon-qianjin"></span>
                </div>
            </div>
            <!-- 当联系方式列表没有时，显示 -->
            <div class="addressInfo" @click="add_addressee" v-if="$store.state.address.list.length==0">
                <div class="left_icon">
                    <span class="iconfont icon-ziyuan"></span>
                </div>
                <div class="middle add_addressee">
                    添加收货人+
                </div>
                <div class="right_icon">
                    <span class="iconfont icon-qianjin"></span>
                </div>
            </div>
            <!-- 订单 -->
            <div class="goodsList">
                <ul>
                    <li v-for="(item,index) in orderList" :key="index">
                        <a href="javascript:;">
                            <!-- 卡片头 -->
                            <div class="cardHeader">
                                <h1 class="shopName">
                                    <span class="iconfont icon-home-shagnchengtuiguang" ></span>
                                    {{item.shopname}}
                                </h1>
                            </div>
                            <!-- 卡片体 -->
                            <div class="cardBody">
                                <div class="flexbox">
                                    <div class="left">
                                        <img :src="item.item_img" alt="">
                                        <img src="../../assets/images/product06.png" alt="">
                                    </div>
                                    <div class="middle">
                                        <h4 class="itemName txt-cut">
                                            {{item.itemName}}
                                        </h4>
                                        <div class="options txt-cut">
                                            {{item.options}}
                                        </div>
                                        <span class="mark">
                                            七天无理由退换
                                        </span>
                                    </div>
                                    <div class="right">
                                        <span class="singlePrice">
                                            ￥
                                            {{item.current_price}}
                                        </span>
                                        <span class="number">
                                            ×
                                            1
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="cardFooter">
                                <div class="group">
                                    <h3 class="optionName">配送方式</h3>
                                    <span class="content">普通配送</span>
                                    <span class="right_side">快递 免邮</span>
                                    <span class="iconfont icon-qianjin"></span>
                                </div>
                                <div class="orderNote">
                                    <h3 class="optionName">订单备注</h3>
                                    <input type="text" placeholder="选填,请先和商家协商一致">
                                </div>
                                <div class="summary">
                                    <i class="num">
                                        共
                                        {{item.bug_num}}
                                        件</i>小计:
                                    <span class="newPrice">
                                        ￥
                                        {{item.current_price*item.bug_num}}
                                    </span>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="sumControler">
                <div class="summary">
                    <i class="num">
                        共
                        {{orderList.length}}
                        件,</i>合计:
                    <span class="newPrice">
                        ￥
                        {{totalPrice}}
                    </span>
                </div>
                <button type="button" class="submit" @click="onsubmit">提交订单</button>
            </div>
        </div>
    </div>
</template>

<script>
    
    import {createNamespacedHelpers} from "vuex";
    const {mapState} = createNamespacedHelpers("order");
    import Vue from 'vue';
    import { Icon } from 'vant';
    import { NavBar } from 'vant';
    import { Toast } from 'vant';

    import store from "../../store/index"
    

    Vue.use(NavBar);
    Vue.use(Icon);
    export default {
        data(){
            return{
                isEmpty:false
            }
        },
        methods:{
            // 跳转到收货人列表
            goAddress(){
                this.$router.push("/addressList");
            },
            // 返回
            onClickLeft(){
                this.$router.push("/shopcart");
            },
            // 添加收货人
            add_addressee(){
                this.$router.push("/addressAdd")
            },
            // 提交订单
            onsubmit(){
                if(JSON.stringify(this.addresseeInfo)!="{}"){
                    this.$store.dispatch("order/onsubmit");
                    // 跳转到订单列表的”全部“选项
                    this.$router.push("/orderList/all");
                    this.$store.commit("cart/removeShopcart");
                    // 订单列表高亮
                    this.$store.commit("changeItem",2);

                }else{
                    Toast("还没有收货人");
                }
            }
        },
        computed:{
            ...mapState({
                orderList:state=>state.orderList,
                totalPrice:state=>state.totalPrice,
                addresseeInfo:state=>state.addresseeInfo,
            }),
        },
        // 组件的前置路由守卫，准备进入这个路由时
        beforeRouteEnter(to,from,next){
            if(to.path=="/order"){
                if(!store.state.username){
                    next({path:"/login",query:to.query})
                }else{
                    next();
                }
            }else{
                next();
            }
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $navHeight:2.812rem;
    $fontSize:0.75rem;
    $titleSize:0.875rem;
    .orderPage{
        padding: 0 0.75rem;
        padding-top: 0.625rem;

        padding-bottom: 3.375rem;

        .addressInfo{
            border-radius: 20px;
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
                .tip{
                    color: $mainColor;
                    font-size: $fontSize;
                }
            }
            .right_icon{
                width: 2.625rem;
                text-align: right;
                span.iconfont{

                }
            }
            .add_addressee{
                font-size: 16px;
                color: #333;
                font-weight: bold;
            }
        }
        .goodsList{
            ul{
                li{
                    border-radius: 20px;
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
                            .summary{
                                height: 2rem;
                                text-align: right;
                                .oldPrice{
                                    font-style: normal;
                                    color: #999;
                                    font-size: $fontSize;
                                    margin-right: 0.625rem;
                                }
                                .newPrice{
                                    color: #333;
                                }
                            }
                        }
                        .cardFooter{
                            padding: 0 0.625rem;
                            .group{
                                height: 2.812rem;
                                line-height: 2.812rem;
                                font-size: 0;
                                display: flex;
                                .optionName{
                                    margin-right: 10px;
                                    display: inline-block;
                                    font-style: lighter;
                                    font-size: $titleSize;
                                    color: #333;
                                    width: 6.25rem;
                                    text-align: right;
                                }
                                .content{
                                    flex: 1;
                                    display: inline-block;
                                    color: #999;
                                    width: 30%;
                                    text-align: left;
                                    font-size: $titleSize;
                                }
                                .right_side{
                                    margin-right: 10px;
                                    font-size: $titleSize;
                                    display: inline-block;
                                    width: 30%;
                                    text-align: right;
                                    color: #333;
                                }
                                span.iconfont{
                                    display: inline-block;
                                    font-size: $titleSize;
                                }
                            }
                            .orderNote{
                                height: 2.812rem;
                                line-height: 2.812rem;
                                display: flex;
                                .optionName{
                                    display: inline-block;
                                    margin-right: 10px;
                                    width: 6.25rem;
                                    text-align: right;
                                    font-size: $titleSize;
                                    color: #333;
                                    box-sizing: border-box;
                                }
                                input{
                                    flex: auto;
                                    width: 60%;
                                    font-size: $titleSize;
                                    &::-webkit-input-placeholder{
                                        color: #999;

                                    }
                                }
                            }
                            .summary{
                                height: 2.812rem;
                                line-height: 2.812rem;
                                text-align: right;
                                .num{
                                    color: #999;
                                    font-style: normal;
                                    margin-right: 10px;
                                }
                                .newPrice{
                                    font-size: $titleSize;
                                    color: #ff5000;
                                }
                            }
                        }
                    }
                }
            }
        }
        .sumControler{
            position: fixed;
            left: 0;
            bottom: 0;
            box-sizing: border-box;
            width: 100%;
            height: 3.375rem;
            padding: 0 0.75rem;
            background: white;
            line-height: 3.375rem;
            text-align: right;
            .summary{
                display: inline-block;
                font-size: $fontSize;
                color: #333;
                margin-right: 10px;
                .num{
                    color: #999;
                    font-style: normal;
                    margin-right: 10px;
                }
                .newPrice{
                    font-size: $titleSize;
                    color: #ff5000;
                }
            }
            button.submit{
                border-radius: 50px;
                border: 0;
                width: 6.25rem;
                height: 2.5rem;
                line-height: 2.5rem;
                color: white;
                background: $mainColor;
                font-size: $titleSize;
            }
        }
    }
</style>