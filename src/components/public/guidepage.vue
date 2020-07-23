<template>
    <div>
        <!-- 引导页 http://localhost:8080/guidepage-->
        <!--逻辑： 如果用户第一次体检此应用，先进入引导页，再跳转首页 
        如果用户有进入过一次引导页，以后默认进入广告页，再跳转首页-->
        <!-- 进入广告页之前判断 -->
        <!-- Swiper -->
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide ">
                    <div class="slide slide1">
                        <transition enter-active-class="animate__animated animate__fadeInUp" >
                            <div :key="0" class="text" v-if="0==index">
                                <h1>多样式购物体验</h1>
                                <p>快乐购物,轻松购物,享受购物之旅</p>
                            </div>
                        </transition>
                    </div>
                </div>
                <div class="swiper-slide ">
                    <div class="slide slide2">
                        <transition-group  enter-active-class="animate__animated animate__fadeInUp">
                            <div :key="1" class="text" v-if="1==index">
                                <h1>应有尽有</h1>
                                <p>您需要的运动装备都在里面</p>
                            </div>
                        </transition-group>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="slide slide3">
                        <transition-group  enter-active-class="animate__animated animate__fadeInUp">
                            <div :key="2" class="text" v-if="2==index">
                                <h1>下单更轻松</h1>
                                <p>全新UI界面，带你体验非凡购物之旅</p>
                                <van-button round type="primary" @click="gohome">立即体验</van-button>
                            </div>
                        </transition-group >
                    </div>
                </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Button } from 'vant';

    Vue.use(Button);
    import Swiper from "swiper";
    export default {
        data(){
            return{
                index:0
            }
        },
        methods:{
            gohome(){
                this.$router.push("/main/recommend/all")
            }
        },
        mounted(){
            let _this = this;
            this.showContent = true;

            new Swiper('.swiper-container', {
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true,
                },
                on:{
                    // 从当前slide开始过渡到另一个slide时执行。
                    slideChangeTransitionStart:function(){
                        _this.index = this.activeIndex;
                    }
                }
            });
        },
        beforeDestroy(){
            // 当路由器切换时关闭定时器
            clearInterval(this.cleardate);
        }
    }
</script>

<style lang="scss" scoped>
    .swiper-container{
        position: fixed;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
        .swiper-wrapper{

            .swiper-slide{
                .slide{
                    width: 100%;
                    height: 100%;
                    .text{
                        width: 100%;
                        position: fixed;
                        text-align: center;
                        bottom: 80px;
                        h1{
                            font-size: 30px;
                        }
                        p{
                            font-size: 16px;
                        }
                        .van-button{
                            margin-top: 0.625rem;
                        }
                    }
                }
                .slide1{
                    
                    background: url("../../assets/images/引导页1.jpg");
                    background-size: 100% 100%;
                }
                .slide2{
                    background: url("../../assets/images/引导页2.jpg");
                    background-size: 100% 100%;
                }
                .slide3{
                    background: url("../../assets/images/引导页3.jpg");
                    background-size: 100% 100%;
                    color: white;
                }
                
            }
        }
    }

</style>