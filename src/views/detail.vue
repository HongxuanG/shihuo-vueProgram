<template>
    <div v-if="showContent">
        <div class="detailHeader">
            <!-- 轮播图 -->
            <div class="pic">
                <van-swipe @change="onChange"  width="100%">
                    <van-swipe-item v-for="(item,index) in goods.small_images.string" :key="index">
                        <img :src="item" alt="">
                    </van-swipe-item>
                    <template #indicator>
                        <div class="custom-indicator">
                        {{ current + 1 }}/{{goods.small_images.string.length}}
                        </div>
                    </template>
                </van-swipe>
            </div>
            <!-- 轮播图 end -->
            <button class="basecircle back" @click="$router.go(-1)">
                <span class="icon iconfont">&#xe62e;</span>
            </button>
            <button class="basecircle shopcart">
                <span class="icon iconfont">&#xe66e;</span>
            </button>
        </div>
        <!-- 产品详情 -->
        <div class="detailWrapper">
            <!-- 产品信息 -->
            <div class="itemInfo">
                <ul class="price">
                        <li class="newPrice">￥<span>{{goods.zk_final_price}}</span></li>
                        <li class="oldPrice">价格:￥<span>{{goods.reserve_price}}</span></li>

                </ul>
                <p>{{goods.title}}</p>
                <div class="info">
                    <ul>
                        <li>快递:<span id="exway">{{goods.presale_deposit}}</span></li>
                        <li>月销<span id="saleMonth">{{goods.volume}}</span></li>
                        <li><span id="provcity">{{goods.provcity}}</span></li>
                    </ul>
                </div>
            </div>
            <!-- 选项 -->
            <div class="group-wrap">
                <div class="serve">
                    <div class="title">服务</div>
                    <div class="content">付款后48小时内发货·7天无理由退换</div>
                    <div class="inside">
                        <span class="icon iconfont">&#xe650;</span>
                    </div>
                </div>
            </div>
            <div class="group-wrap">
                <div class="specification">
                    <div class="title">规格</div>
                    <div class="content">请选择颜色尺寸</div>
                    <div class="inside">
                        <span class="icon iconfont">&#xe650;</span>
                    </div>
                </div>
                <div class="parameter">
                    <div class="title">参数</div>
                    <div class="content">品牌 材质...</div>
                    <div class="inside">
                        <span class="icon iconfont">&#xe650;</span>
                    </div>
                </div>
            </div>
            <!-- 宝贝评价 -->
            <div class="textView">
                <div class="titleBar">
                    <div class="title">
                        <span>宝贝评价(136)</span>
                    </div>
                    <div class="r_icon">
                        <span>查看更多</span>
                        <span class="icon iconfont">&#xe650;</span>
                    </div>
                </div>
                <div class="content">
                    <div class="user">
                        <span class="user_img">
                            <img src="../assets/images/20170710210234_y3Kf5.jpeg" alt="">
                        </span>
                        <span class="user_name">萌**丿</span>
                    </div>
                    <p class="user_text txt-cut">面料挺厚实，有质感，小设计点满满，第一次买他们家就关注了，是我喜欢的风格第一次买他们家就关注了，是我喜欢的风格 </p>
                </div>
            </div>
            <!-- 店铺信息 -->
            <div class="shopView">
                <div class="shopInfo">
                    <div class="l_part">
                        <div class="shop_img">
                            <img src="../assets/images/icon/shopImg.jpg" alt="">
                        </div>

                        <div class="shop_Name">
                            <div class="shopName one-txt-cut">{{goods.nick}}</div>
                            <div class="shopDec">
                                <span class="honor">
                                    <img src="../assets/images/icon/honor.png" alt="">
                                </span>
                                <span class="level">
                                    <img src="../assets/images/icon/shoplevel.png" alt="">
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="r_part">
                        <button class="allGoods">全部宝贝</button>
                        <button class="getInShop">进店逛逛</button>
                    </div>
                </div>
                <div class="shopGrade">
                    <span class="left">宝贝描述<i>4.8</i><i>高</i></span>
                    <span class="center">卖家服务<i>4.8</i><i>高</i></span>
                    <span class="right">物流服务<i>4.8</i><i>平</i></span>
                </div>
            </div>
            <!-- 商品详情 -->
            <div class="detail-desc">
                <div class="detail_title">
                    <span class="line"></span>
                    <div class="icon-info">
                        <span class="iconfont icon-home-shagnchengtuiguang"></span>
                        <span class="icon-text">详情</span>
                    </div>
                    <span class="line"></span>
                </div>
                <img src="../assets/images/detail_desc/1.jpg" alt="">
                <img src="../assets/images/detail_desc/2.jpg" alt="">
                <img src="../assets/images/detail_desc/3.jpg" alt="">
                <img src="../assets/images/detail_desc/4.jpg" alt="">
                <img src="../assets/images/detail_desc/5.jpg" alt="">
                <img src="../assets/images/detail_desc/6.png" alt="">
            </div>
        </div>


        <!-- 底部选项 -->
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" dot @click="toServise" />
            <van-goods-action-icon icon="cart-o" text="购物车" :badge="quantity" @click="toShopCart" />
            <van-goods-action-icon icon="star" :text="txt" ref="star" :color="color" @click="toggleCollect" />
            <van-goods-action-button
                type="warning"
                text="加入购物车"
                @click="add_shopcart(goods)"
            />
            <van-goods-action-button
                type="danger"
                text="立即购买"
                @click="bugNow"
            />
        </van-goods-action>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Swipe, SwipeItem } from 'vant';//轮播图
    import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
    import { Toast } from 'vant';
    import { Skeleton } from 'vant';//骨架图
    
    Vue.use(Skeleton);//骨架图
    Vue.use(Swipe);
    Vue.use(SwipeItem);
    Vue.use(GoodsAction);
    Vue.use(GoodsActionButton);
    Vue.use(GoodsActionIcon);
    // import {createNamespacedHelpers} from "vuex";
    import {mapState,mapActions} from "vuex";
    // const {mapState,mapActions} = createNamespacedHelpers("cart");
    export default {
        data() {
            return {
                current: 0,
            };
        },
        methods: {
            onChange(index) {
                this.current = index;
            },
            toServise(){
                Toast('点击客服');
            },
            // 点击收藏
            toggleCollect(){
                // 如果有用户名时，证明用户的登录了
                if(this.$store.state.username){
                    //实现样式之间的切换
                    if(this.color == "#ccc"){
                        
                        // 请求api
                        this.$axios.get("/addCollect",{
                            params:{
                                username:this.$store.state.username,
                                collectItem:this.goods
                            }
                        }).then((res)=>{
                            console.log(res);
                            this.$store.commit("detail/changeStar",this.color);
                            // 添加成功
                            Toast("添加收藏成功");
                        }).catch((err)=>{
                            console.log(err);
                            Toast("添加收藏失败")
                        })
                    }else{
                        // 请求api
                        this.$axios.get("/delCollect",{
                            params:{
                                username:this.$store.state.username,
                                itemId:this.goods.num_iid //传递这个物品的id值
                            }
                        }).then((res)=>{
                            console.log(res);
                            this.$store.commit("detail/changeStar",this.color);
                            // 添加成功
                            Toast("删除收藏成功");
                        }).catch((err)=>{
                            console.log(err);
                            Toast("删除收藏失败")
                        })
                    }
                    
                }else{
                    Toast("请先登录")
                }
                
            },
            toShopCart(){
                // 高亮购物车图标
                this.$store.commit("changeItem",3);
                // 跳转到购物车
                this.$router.push({path:"/shopcart"},()=>{});
            },
            // 立即购买
            bugNow() {
                if(this.$store.state.username){
                    let newArr = [];
                    newArr.push({
                        itemId:this.goods.num_iid,
                        shopname:this.goods.nick,
                        item_img:this.goods.pict_url,
                        itemName:this.goods.title,
                        options:"190/3XL",
                        current_price:this.goods.zk_final_price,
                        bug_num:1
                    })
                    this.$store.state.order.orderList = newArr;
                    this.$store.state.order.totalPrice = this.goods.zk_final_price;
                    this.$router.push({path:"/order",query:{newArr,totalPrice:this.goods.zk_final_price}},()=>{});
                }else{
                    Toast("请先登录");
                }
            },
            ...mapActions("cart",[
                // 加入购物车
                "add_shopcart",
            ]),
        },
        computed:{
            ...mapState("cart",{
                // 如果购物车商品数量为零，不显示高亮，否则显示
                quantity:state=>{
                    if(state.shopcartList.length <= 0){
                        return null;
                    }else{
                        return state.shopcartList.length
                    }
                },
            }),
            ...mapState("detail",{
                goods:state=>state.goods,
                showContent:state=>state.showContent,
                color:state=>state.color,
                txt:state=>state.txt,
            })
        },
        created(){
            // 如果没有登录，则重置收藏图标的颜色
            if(!this.$store.state.username){
                this.$store.commit("detail/resetStar");
            }
            // 请求详情页数据
            this.$store.dispatch("detail/getData",this.$route.query.itemId)
        },
        mounted(){
            
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $navHeight:2.812rem;
    $fontSize:0.75rem;//12px
    $titleSize:0.875rem;//14px
    $maxWidth:640px;
    $minWidth:320px;
    @mixin maxWidth() {
        max-width: $maxWidth;
    }
    @mixin minWidth() {
        min-width: $minWidth;
    }
    .custom-indicator {
        position: absolute;
        right: 7px;
        bottom: 14px;
        padding: 2px 5px;
        font-size: 12px;
        color: #fff;
        border-radius: 50px;
        background: rgba(0, 0, 0, 0.1);
    }
    .detailHeader{
        position: relative;
        .pic{
            height: 20rem;
            width: 100%;
            overflow: hidden;
            img{
                width: 100%;
                height: 20rem;
            }
        }
        .basecircle{
            position: absolute;
            width: 1.812rem;
            height: 1.812rem;
            background-color:rgba($color: #000000, $alpha: 0.3);
            border: 0;
            border-radius: 50%;
            top: 18px;
            line-height: 1.812rem;
            span.icon{
                color: #fff;
            }
        }
        .back{
            @extend .basecircle;
            left: 9px;
        }
        .shopcart{
            @extend .basecircle;
            right: 9px;
        }
    }
    .detailWrapper{
        .itemInfo{
            background: #fff;
            padding: 0.625rem;
            margin-bottom: 8px;
            .price{
                .newPrice{
                    color: #ff5000;
                    font-size: $fontSize;
                    span{
                        font-size: 1rem;
                    }
                }
                .oldPrice{
                    font-size: $fontSize;
                    color: #999999;
                    span{
                        text-decoration: line-through;
                    }
                }
            }
            p{
                font-size: $titleSize;
                color: #000;
                line-height: 18px;
                font-weight: bold;
            }
            .info{
                margin-top: 10px;
                ul{
                    display: flex;
                    li{
                        flex: 1;
                        color: #999999;
                        font-size: $fontSize;
                        span{

                        }
                        &:nth-of-type(1){
                            text-align: left;
                        }
                        &:nth-of-type(2){
                            text-align: center;
                        }
                        &:nth-of-type(3){
                            text-align: right;
                        }
                    }
                }
            }
        }
        .group-wrap{
            margin-bottom: 8px;
            @each $key in "serve","specification","parameter"{
                .#{$key}{
                    padding: 0.625rem;//10px
                    background-color: #fff;
                    font-size: $fontSize;
                    overflow: hidden;
                    .title{
                        color: #999999;
                        margin-right: 10px;
                        float: left;
                    }
                    .content{
                        float: left;
                        width: 10.875rem;//174px
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .inside{
                        float: right;
                        .icon{
                            font-size: $fontSize;
                        }
                    }
                }
            }
        }
        .textView{
            background-color: #fff;
            padding: 0.625rem;
            margin-bottom: 0.625rem;
            .titleBar{
                height: 1.25rem;
                line-height: 1.25rem;
                margin-bottom: 0.625rem;
                font-size: $fontSize;
                .title{
                    float: left;
                    span{
                        color: #333;
                    }
                }
                .r_icon{
                    float: right;
                    span{
                        margin-right: 8px;
                        color: $mainColor;
                        &.icon{
                            margin-right: 0;
                            font-size: $fontSize;
                        }
                    }
                }
            }
            .content{

                .user{
                    display: inline-block;
                    .user_img{
                        display: inline-block;
                        background: url("../assets/images/icon/touxiangDec.png") no-repeat center center;
                        background-size: 100% 100%;
                        width: 2.5rem;
                        height: 2.5rem;
                        text-align: center;
                        line-height: 2.5rem;
                        img{
                            vertical-align: middle;
                            display: inline-block;
                            border-radius: 50%;
                            width: 1.5rem;
                            height: 1.5rem;
                        }
                    }
                    .user_name{
                        font-size: $fontSize;
                        color: #999999;
                    }
                }
                .user_text{
                    font-size: $titleSize;
                }
            }
        }
        .shopView{
            background-color: #fff;
            padding: 0.625rem;
            .shopInfo{
                height: 2.625rem;
                .l_part{
                    float: left;
                    width: 55%;
                    height: 2.625rem;
                    .shop_img{
                        width: 2.625rem;//42px
                        height: 2.625rem;
                        margin-right: 0.5rem;
                        display: inline-block;
                        
                        img{
                            width: 2.625rem;
                            height: 2.625rem;
                        }
                    }
                    .shop_Name{
                        width: 65%;
                        display: inline-block;
                        height: 1.6875rem;
                        .shopName{
                            font-size: $titleSize;
                            color: #333;
                        }
                        .shopDec{
                            span.honor{
                                height: 0.625rem;
                                display: inline-block;
                                margin-right: 0.312rem;
                                img{
                                    display: inline-block;
                                    height: 0.625rem;
                                    width: auto;
                                }
                            }
                            span.level{
                                display: inline-block;
                                height: 0.625rem;
                                img{
                                    display: inline-block;
                                    height: 0.625rem;
                                    width: auto;
                                }
                            }
                        }
                    }
                }
                .r_part{
                    line-height: 2.625rem;
                    float: right;
                    width: 45%;
                    text-align: right;
                    button.allGoods{
                        line-height: 1.25rem;
                        width: 3.5rem;
                        height: 1.25rem;
                        border-radius: 50px;
                        border: 1px solid $mainColor;
                        color: $mainColor;
                        margin-right: 0.625rem;
                    }
                    button.getInShop{
                        width: 3.5rem;
                        height: 1.25rem;
                        color: white;
                        line-height: 1.25rem;
                        background-color: $mainColor;
                        border-radius: 50px;
                        border: 0;
                    }
                }
            }
            .shopGrade{
                display: flex;
                justify-content: space-between;
                height: 2.625em;
                align-items: center;
                margin-top: 0.625rem;
                span.left{
                    display: inline-block;
                    color: #999;
                    i{
                        margin-left: 0.312rem;
                        color: $mainColor;
                    }
                }
                span.center{
                    @extend .left;
                }
                span.right{
                    @extend .left;
                }
            }
        }
        .detail-desc{
            text-align: center;
            .detail_title{
                height: 1.875rem;
                line-height: 1.875rem;
                .line{
                    display: inline-block;
                    width: 2.125rem;
                    height: 1px;
                    background: #999;
                    vertical-align: middle;
                }
                .icon-info{
                    display: inline-block;
                    margin-right: 0.625rem;
                    margin-left: 0.625rem;
                    .iconfont{

                    }
                    .icon-text{
                        color: #999;
                        font-size: $fontSize;
                    }
                }
            }
            img{
            }
        }
    }
</style>