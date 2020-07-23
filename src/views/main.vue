<template>
    <div>
        <!-- 头部开始 -->
        <div class="indexHeader">
            <div class="top">
                <div class="search">
                    <input @focus="toSearch" type="text" placeholder="搜索商品，品牌"/>
                </div>
                <a class="me" href="javascript:;" @click="goMe">
                    <img src="../assets/images/me_0442d1d.png" alt="">
                </a>
            </div>
            <div class="banner">
                <van-swipe :autoplay="3000" @change="onChange">
                    <van-swipe-item v-for="(image, index) in images" :key="index">
                        <img v-lazy="image" />
                    </van-swipe-item>
                    <template #indicator>
                        <div class="my-indicator">
                            <ol class="circle">
                                <li v-for="(item,index) in images" :key="index" :class="{'on':current==index}"></li>
                            </ol>
                        </div>
                    </template>
                </van-swipe>
                <div class="text">
                    <span>广告</span>
                </div>
            </div>
        </div>
        <!-- 分类开始 -->
        <div class="classify">
            <ul>
                <li @click="$router.push('/basketball')">
                    <a href="javascript:;">
                        <div class="classify_left">
                            <div class="classify_title">篮球</div>
                            <p>纯白系列秒杀</p>
                        </div>
                        <div class="classify_right">
                            <img src="../assets/images/product01.jpg" alt="">
                        </div>
                    </a>
                </li>
                <li @click="$router.push('/running')">
                    <a href="javascript:;">
                        <div class="classify_left">
                            <div class="classify_title">跑步</div>
                            <p>女王节秒杀</p>
                        </div>
                        <div class="classify_right">
                            <img src="../assets/images/product02.jpg" alt="">
                        </div>
                    </a>
                </li>
                <li @click="$router.push('/fitness')">
                    <a href="javascript:;">
                        <div class="classify_left">
                            <div class="classify_title">健身</div>
                            <p>布瑞特装备秒杀</p>
                        </div>
                        <div class="classify_right">
                            <img src="../assets/images/product03.png" alt="">
                        </div>
                    </a>
                </li>
                <li @click="$router.push('/football')">
                    <a href="javascript:;">
                        <div class="classify_left">
                            <div class="classify_title">足球</div>
                            <p>其实是在吹总裁</p>
                        </div>
                        <div class="classify_right">
                            <img src="../assets/images/product04.jpg" alt="">
                        </div>
                    </a>
                </li>
                <li @click="$router.push('/tide')">
                    <a href="javascript:;">
                        <div class="classify_left">
                            <div class="classify_title">潮流</div>
                            <p>78元短袖秒杀</p>
                        </div>
                        <div class="classify_right">
                            <img src="../assets/images/product05.jpg" alt="">
                        </div>
                    </a>
                </li>
                <li @click="$router.push('/numerical')">
                    <a href="javascript:;">
                        <div class="classify_left">
                            <div class="classify_title">数码</div>
                            <p>2020年</p>
                        </div>
                        <div class="classify_right">
                            <img src="../assets/images/product06.png" alt="">
                        </div>
                    </a>
                </li>
            </ul>
            <!-- 今日优惠 -->
            <ol>
                <li>
                    <a href="javascript:;">
                        <div class="title">今日优惠</div>
                        <p>EQT 5折好价</p>
                        <img src="../assets/images/product01.jpg" alt="">
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <div class="title">限时团购</div>
                        <p>春节不打烊</p>
                        <img src="../assets/images/product02.jpg" alt="">
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <div class="title">免费抽奖</div>
                        <p>识货抽奖 天天中奖</p>
                        <img src="../assets/images/product03.png" alt="">
                    </a>
                </li>
            </ol>
        </div>
        <!-- 二级菜单 -->
        <div class="listView">
            <div class="list-top">
                <van-row tag="ul" class="list-menu" type="flex" justify="space-around">
                    <van-col tag="li" span="4" v-for="(item,index) in mainList" :key="index" @click="changeIndex(index)">
                        <router-link tag="span"  :to="item.to" :class="{'on':index == isOn}">{{item.title}}</router-link>
                    </van-col>
                </van-row>
                <router-view :isthis="current_address"></router-view>
            </div>
        </div>
        
		<!-- 底部固定导航栏 -->
		<nav-bar></nav-bar>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Lazyload } from 'vant';
    import { Swipe, SwipeItem } from 'vant';
    import { Col, Row } from 'vant';

    Vue.use(Col);
    Vue.use(Row);
    Vue.use(Swipe);
    Vue.use(SwipeItem);
    Vue.use(Lazyload);
	import navBar from "../components/navigation";

    export default {
        data(){
            return{
                images:[
                    // 引入图片
                    require("../assets/images/banner1.png"),
                    require("../assets/images/banner2.jpg"),
                    require("../assets/images/banner3.png"),
                    require("../assets/images/banner4.jpg"),
                    require("../assets/images/banner5.png"),
                ],
                // 轮播图的索引号
                current:0,
                // 二级导航索引
                isOn:0,
                mainList:[
                    {title:"推荐",to:"/main/recommend/all",name:"recommend"},
                    {title:"篮球",to:"/main/basketball/all",name:"basketball"},
                    {title:"跑步",to:"/main/running/all",name:"running"},
                    {title:"健身",to:"/main/fitness/all",name:"fitness"},
                    {title:"潮流",to:"/main/tide/all",name:"tide"},
                ],
                // 当前点击的二级导航名
                current_address:"recommend",
                
            }
        },
        methods:{
            // index, 当前轮播页的索引
            onChange(index){
                this.current = index;
            },
            // 跳转到搜索页
            toSearch(){
                this.$router.push({path:"/search"});
            },
            // 跳转到我的
            goMe(){
                this.$router.push('/more');
            },
            // 切换二级导航索引
            changeIndex(index){
                this.isOn=index;
                this.current_address = this.mainList[index].name;
            }
        },
		components:{
			navBar
        },
        created(){
            // created的时候高亮
            this.$store.state.isOn = 0;
        },
        mounted(){
            
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
    $spacingBottom:5px;
    @mixin maxWidth() {
        max-width: $maxWidth;
    }
    @mixin minWidth() {
        min-width: $minWidth;
    }
    .indexHeader{
        width: 100%;
        margin-bottom: $spacingBottom;
        .top{
            height: 2.5rem;
            background-color: transparent;
            padding-left: 0.625rem;
            display: flex;
            position: absolute;
            z-index: 99;
            box-sizing: border-box;
            @include maxWidth();
            width: 100%;
            .search{
                flex: auto;
                line-height: 2.5rem;
                position: relative;
                &::before{
                    content: "";
                    display: block;
                    position: absolute;
                    width: 1.687rem;
                    height: 1.687rem;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    background: url("../assets/images/下载 (1).png") no-repeat center center;
                    background-size: 70% 70%;
                }
                input{
                    width: 100%;
                    height: 1.687rem;
                    border: none;
                    border-radius: 5px;
                    box-sizing: border-box;
                    padding-left: 1.687rem;
                    &::-webkit-input-placeholder{
                        font-size: $fontSize;
                        color: #999;
                    }
                }
            }
            a.me{
                display: inline-block;
                width: 3rem;//48px
                height: 2.5rem;
                line-height: 2.5rem;
                text-align: center;
                img{
                    vertical-align: middle;
                    display: inline-block;
                    height: 1.687rem;
                    width: auto;
                }
            }
        }
        .banner{
            position: relative;
            z-index: 1;
            overflow: hidden;
            height: 10.125rem;
            border-bottom: 1px solid #e6e6e6;
            .text{
                position: absolute;
                bottom: 0;
                left: 0;
                background-color: rgba(255,255,255,0.6);
                padding: 0 0.312rem;
                span{
                    color: rgb(255, 255, 255); 
                    opacity: 0.6;
                }
            }
            img{
                width: 100%;
                height: 10.125rem;
            }
            ol.circle{
                position: absolute;
                bottom: 0.625rem;
                right: 0.625rem;
                li{
                    width: 7px;
                    height: 7px;
                    float: left;
                    margin-right: 5px;
                    background-color: rgba(255,255,255,0.7);
                    border-radius: 50%;
                    &:last-child{
                        margin-right: 0;
                    }
                    &.on{
                        background-color: #fff;
                    }
                }
            }
        }
    }
    // 分类开始
    .classify{
        width: 100%;
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: $spacingBottom;
        ul{
            li{
                box-sizing: border-box;
                width: 50%;
                border-left: 1px solid $bgColor;
                border-bottom: 1px solid $bgColor;
                float: left;
                padding: 0.312rem 0.75rem;
                background-color: #fff;
                a{
                    .classify_left{
                        
                        width: 5.062rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        float: left;
                        line-height: 20px;
                        font-size: $fontSize;
                        div.classify_title{
                            font-size: $titleSize;
                            font-weight: bold;
                            text-align: left;
                            color: #333333;
                        }
                        p{
                            margin-top: 2px;
                            color: #666666;
                        }
                    }
                    .classify_right{
                        float: right;
                        img{
                            width: 3.25rem;
                            height: 3.25rem;
                        }
                    }
                }
            }
        }
        ol{
            display: flex;
            padding: 6px;
            background-color: #f0f3f5;
            li{
                background-color: #fff;
                flex: 1;
                margin-right: 6px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-top: 12px;
                &:last-child{
                    margin-right: 0;
                }
                a{
                    font-size: $fontSize;
                    text-align: center;
                    .title{
                        color: #333333;
                        font-size: $fontSize;
                        font-weight: bold;
                    }
                    p{
                        overflow: hidden;
                        margin: 0.312rem 0;
                        color: #666666;
                    }
                    img{
                        display: block;
                        margin: 0 auto;
                        width: 3.75rem;
                        height: 3.75rem;
                    }
                }
            }
        }
    }
    .listView{
        background-color: #fff;
        .list-top{
            padding: 0 5px;
            padding-bottom: 8px;
            border-bottom: 1px solid #f9f9f9;
            .list-menu{
                text-align: center;
                height: 1.875rem;
                line-height: 1.875rem;
                span{
                    display: block;
                    margin: 2.5px 0;
                    height: 1.562rem;
                    line-height: 1.562rem;
                    font-weight: bold;
                    font-size: $fontSize;
                    color: #333;
                    &.on{
                        color: $mainColor;
                        width: 100%;
                        position: relative;
                        &::after{
                            content:"";
                            display: block;
                            position: absolute;
                            bottom: 2px;
                            left: 50%;
                            width: 0.7rem;
                            height: 2px;
                            margin-left: -0.5rem;
                            background-color: $mainColor;
                        }
                    }
                }
            }
        }
    }
</style>