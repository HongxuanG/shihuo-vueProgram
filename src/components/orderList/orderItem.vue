<template>
    <div>
        <div class="order_search">
            <input type="text" placeholder="搜索所有订单" v-model="keywords">
            <button type="button" @click="onSearch(keywords)">搜索</button>
        </div>
        <div class="orderListBody">
            <ul class="orderListUl" v-if="!isEmpty">
                <li class="orderlistLi" v-for="(item,index) in searchList(kw)" :key="index" @click="showDetail(item)">
                    <a href="javascript:;" v-for="(value,i) in item.orderList" :key="i">
                        <div class="cardHeader">
                            <h1 class="shopName">
                                <span class="iconfont icon-home-shagnchengtuiguang" ></span>
                                {{value.shopname}}
                            </h1>
                            <!-- 如果状态为4即待评价，说明交易成功 typeList[0]是交易成功-->
                            <span class="dealStatus">{{item.type==4 ? typeList[0] : typeList[item.type]}}</span>
                        </div>
                        <div class="cardBody">
                            <div class="flexbox">
                                <div class="left">
                                    <img :src="value.item_img" alt="">
                                </div>
                                <div class="middle">
                                    <h4 class="itemName txt-cut">{{value.itemName}}</h4>
                                    <div class="options txt-cut">{{value.options}}</div>
                                    <span class="mark">七天无理由退换</span>
                                </div>
                                <div class="right">
                                    <span class="singlePrice">￥{{value.current_price}}</span>
                                    <span class="number">×{{value.bug_num}}</span>
                                </div>
                            </div>
                            <div class="summary">
                                <i class="oldPrice">总价￥{{value.current_price*value.bug_num}},优惠￥
                                    <!-- {{item.discount}} 折扣功能没写-->
                                </i>
                                <!-- 这里的实付是总价乘以折扣 -->
                                <span class="newPrice" v-if="item.type!=1">实付款￥{{value.current_price*value.bug_num}}</span>
                                <span class="newPrice" v-if="item.type==1">需付款￥{{value.current_price*value.bug_num}}</span>
                            </div>
                        </div>
                        <div class="cardFooter">
                            <!-- 待付款 -->
                            <!-- ["交易成功","待付款","待发货","待收货","待评价"] -->
                            <ul v-if="item.type==1">
                                <li>
                                    <span>更多</span>
                                </li>
                                <li>
                                    <span>修改地址</span>
                                </li>
                                <li @click.stop="onCancel({item,value,index})">
                                    <span>取消订单</span>
                                </li>
                                <li class="say">
                                    <span>付款</span>
                                </li>
                            </ul>
                            <!-- 待发货 -->
                            <ul v-else-if="item.type==2">
                                <li>
                                    <span>更多</span>
                                </li>
                                <li>
                                    <span>提醒发货</span>
                                </li>
                                <li @click.stop="onCancel({item,value,index})">
                                    <span>取消订单</span>
                                </li>
                                <li class="say">
                                    <span>申请退款</span>
                                </li>
                            </ul>
                            <!-- 待收货 -->
                            <ul v-else-if="item.type==3">
                                <li>
                                    <span>更多</span>
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
                            <ul v-else-if="item.type==4">
                                <li>
                                    <span>更多</span>
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
                    </a>
                </li>
            </ul>
            <!-- 空状态 -->
            <!-- 自己写的组件  在@click后面加native表示的是当前页面的事件 size为图标大小-->
            <myEmpty 
                iconname="icon-illustrator"
                v-if="isEmpty"
                text="这里并没有东西哦~~" 
                btntext="去逛一逛"
                size="80" 
                @click.native="$router.push('/main/recommend/all')"
            />
            <!-- 推荐页面的组件 -->
            <recommend v-if="isEmpty"></recommend>
        </div>
    </div>
</template>

<script>
    import recommend from "../recommend/recommendPage";
    import Vue from 'vue';
    import { Empty } from 'vant';
    import { Button } from 'vant';
    import { Dialog } from 'vant';
    import {createNamespacedHelpers} from "vuex";
    const {mapState,mapMutations} = createNamespacedHelpers("order");
    import myEmpty from "../public/empty";
    Vue.use(Button);
    Vue.use(Empty);
    export default {
        data(){
            return{
                // 是否为空状态
                isEmpty:false,
                keywords:null,
                kw:null
            }
        },
        methods:{
            // 点击进入订单详情页,订单编号和下单时间
            showDetail(item){
                // item是点击的对应的订单数据
                this.$router.push({path:'/orderDetail',query:item});
            },
            // 删除订单按钮
            onCancel(obj){
                Dialog.confirm({
                    message: '确定要删除这条订单吗',
                }).then(() => {
                    this.$store.commit("order/onCancel",obj);
                    // on confirm
                }).catch(() => {
                    return false;
                    // on cancel
                });
            },
            // 点击搜索订单按钮
            onSearch(keywords){
                this.kw = keywords;
            },
            // 搜索到的列表数据
            // 如果没有输入东西，默认全部内容
            searchList(kw){
                return !kw ? this.itemList : this.itemList.filter(item=>item.orderId==kw);
            },
            ...mapMutations([
                
            ])
        },
        components:{
            myEmpty,
            recommend
        },
        computed:{
            ...mapState({
                typeList:state=>state.typeList,
            })
        },
        // 从orderList这个父组件中传过来的一个订单列表数据
        props:["itemList"],
        // 监听传过来的itemList，里面有没有值，如果有就显示，没有就显示空状态
        watch:{
            // 监听变化
            itemList(newvalue){
                if(newvalue.length == 0){
                    this.isEmpty = true;
                }else{
                    this.isEmpty = false;
                }
            }
        },
        created(){
            // 一开始创建这个组件的时候判断订单列表数据有没有值，如果有就显示，没有就显示空状态
            if(this.itemList.length == 0){
                this.isEmpty = true;
            }else{
                this.isEmpty = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $fontSize:0.75rem;
    $titleSize:0.875rem;
    .bottom-button {
        width: 160px;
    }
    
    .order_search{
        padding: 0.625rem;//10px
        position: relative;
        height: 1.562rem;//25px
        display: flex;
        input{
            flex: auto;
            height: 1.562rem;
            margin-right: 8px;
            border-radius: 10px;
            background-color: white;
            padding-left: 1.562rem;
            box-sizing: border-box;
        }
        button{
            width: 4.687rem;//75px
            height: 1.562rem;
            border-radius: 10px;
            background-color: $mainColor;
            color: white;
            border: 0;
        }
        &::before{
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            left: 1rem;
            margin-top: -0.6rem;// 0.812/2
            width: 1.2rem;//13px
            height: 1.2rem;
            background: url("../../assets/images/下载 (1).png") no-repeat center center;
            background-size: 100% 100%;
        }
    }
    .orderListBody{
        padding: 0 0.625rem;//10px
        ul.orderListUl{
            li.orderlistLi{
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
                        // height: 2.875rem;
                        margin: 0 0.625rem;
                        margin-right: 0;
                        ul{
                            float: right;
                            padding: 0.5rem 0;
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
                }
            }
        }
    }
</style>