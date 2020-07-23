<template>
    <div>
        <header>
            <article>
                <div class="userfase">
                    <img src="../assets/images/head_02977e3.png" alt="">
                </div>
                <!-- 未登录的样式 -->
                <div class="login" v-if="!$store.state.username">
                    <router-link tag="a" to="/login" >登录</router-link>
                    <router-link tag="a" to="/register" >注册</router-link>
                    <p>金币<span>0</span></p>
                </div>
                <!-- 已登录的样式 -->
                <div class="login user" v-else>
                    <div class="top">
                        <a class="username" href="javascript:;" v-text="$store.state.username"></a>
                        <span class="level_item">
                            <img src="../assets/images/icon/level_1_c8e5252.png" alt="">
                        </span>
                    </div>
                    <div class="bottom">
                        <p>金币<span>0</span></p>
                        <a class="exit" href="javascript:;" @click="$store.state.username=null">退出 ></a>
                    </div>
                </div>
            </article>
        </header>
        <main>
            <div class="mine">
                <div class="title">
                    <h3>我的识货</h3>
                </div>
                <ul>
                    <li>
                        <a href="javascript:;" @click="toCollect">
                            <img src="../assets/images/collect_content.png" alt="">
                            <span>我的收藏</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <img src="../assets/images/my_shaiwu.png" alt="">
                            <span>我的晒物</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <img src="../assets/images/kaiquan.png" alt="">
                            <span>我的礼品</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" @click="address">
                            <!-- <img src="../assets/images/kaiquan.png" alt=""> -->
                            <span class="iconfont icon-wodedizhi"></span>
                            <span>我的地址</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="recommend">
                <div class="title">
                    <h3>识货必备</h3>
                </div>
                <ul>
                    <li>
                        <a href="javascript:;">
                            <img src="../assets/images/tuijiandianpu.png" alt="">
                            <span>推荐店铺</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <img src="../assets/images/select_shoe.png" alt="">
                            <span>黑科技选鞋</span>
                        </a>
                    </li>
                </ul>
            </div>
        </main>
        <!-- 底部固定导航栏 -->
		<nav-bar></nav-bar>
    </div>
</template>

<script>
	import navBar from "../components/navigation";

    export default {
        data(){
            return{

            }
        },
        methods:{
            address(){
                if(JSON.stringify(this.$store.state.order.addresseeInfo)=="{}"){
                    this.$router.push("/addressAdd",()=>{});
                }else{
                    this.$router.push("/addressList",()=>{});
                }
            },
            toCollect(){
                this.$router.push('/collect')
            }
        },
		components:{
			navBar
		},
        created(){
            this.$store.state.isOn = 4;
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
    @mixin maxWidth() {
        max-width: $maxWidth;
    }
    @mixin minWidth() {
        min-width: $minWidth;
    }
    // 头部开始
    header{
        @include maxWidth();
        height: 7.937rem;
        width: 100%;
        background: url("../assets/images/bg_912a95a.png") no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
        article{
            margin-left: 1.375rem;
            display: block;
            margin-top: 3.75rem;
            .userfase{
                width: 2.687rem;
                height: 2.687rem;
                float: left;
                border-radius: 50%;
                box-shadow: 0px 0px 9px 0px #fff;
                img{
                    width: 2.687rem;
                    height: 2.687rem;
                }
            }
            .login{
                overflow: auto;
                padding-left: 20px;
                padding-top: 8px;
                font-size: 0;
                line-height: 18px;
                a{
                    color: #fff;
                    font-size: $titleSize;
                    margin-right: 12px;
                }
                p{
                    font-size: $fontSize;
                    color: #fff;
                    span{
                        margin-left: 5px;
                    }
                }
            }
            .user{
                
                .top{
                    display: inline-block;
                    .username{
                        color: yellow;
                        vertical-align: middle;
                        margin-right: 0.312rem;
                    }
                    .level_item{
                        vertical-align: middle;
                        display: inline-block;
                        width:1.5rem;
                        height: 1rem;
                        img{
                            width:1.5rem;
                            height: 1rem;
                            display: inline-block;
                        }
                    }
                }
                .bottom{
                    p{
                        float: left;
                        span{

                        }
                    }
                    .exit{
                        float: right;
                        font-size: $fontSize;
                    }
                }
            }
        }
    }
    main{
        @include maxWidth();
        @each $key in "mine","recommend"{
            .#{$key}{
                padding: 5px;
                box-sizing: border-box;
                height: 6.25rem;
                background-color: #fff;
                margin-bottom: 8px;
                color: #333333;
                display: flex;
                flex-direction: column;
                .title{
                    background: url("../assets/images/icon/border_88b19b4.png") repeat-x center center;
                    background-size: auto 3px;
                    h3{
                        background-color: #fff;
                        display: inline-block;
                        padding: 0 4px;
                        color: #333333;
                        font-size: $titleSize;
                        font-weight: normal;
                    }
                }
                ul{
                    flex: auto;
                    width: 100%;
                    li{
                        margin: 0.562rem 0;
                        float: left;
                        width: 25%;
                        text-align: center;
                        a{
                            width: 100%;
                            img{
                                margin: 0 auto;
                                width: auto;
                                height: 2.25rem;
                                display: block;
                            }
                            span.iconfont{
                                line-height: 2.25rem;
                                font-size: 2.25rem;
                                @extend img;
                            }
                            span{
                                display: block;
                                font-size: $fontSize;
                            }
                        }
                    }
                }
            }
        }
    }
</style>