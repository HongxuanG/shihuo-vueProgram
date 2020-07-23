<template>
    <div>
        <div class="pre_classify">
            <ul>
                <li v-for="(item,index) in classifyList.top" :key="index">
                    <img :src="item.img" alt="">
                    <p>{{item.title}}</p>
                </li>
            </ul>
            <ul>
                <li v-for="(item,index) in classifyList.bottom" :key="index">
                    <img :src="item.img" alt="">
                    <p>{{item.title}}</p>
                </li>
            </ul>
            <div class="hosttest">
                <!-- Swiper -->
                <div class="swiper-container hosttestContainer">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"><a href="#">球鞋百科知多少</a><a href="#">乔丹北斗科技芯</a></div>
                        <div class="swiper-slide"><a href="#">为什么买AJ</a><a href="#">AJ潮流效应</a></div>
                        <div class="swiper-slide"><a href="#">编织横行时代</a><a href="#">签名鞋Logo说</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from "swiper";
    export default {
        data(){
            return{
                
            }
        },
        props:["classifyList"],
        methods:{

        },
        mounted(){
            new Swiper('.hosttestContainer', {
                direction: 'vertical',
                // 无缝轮播
                loop : true,
                // 自动轮播
                autoplay:{
                    delay: 2000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
            });
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $fontSize:0.75rem;
    $titleSize:0.875rem;
    .swiper-container {
        width: 100%;
        height: 100%;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    .pre_classify{
        background-color: #fff;
        padding: 0 6px;
        margin-bottom: 0.625rem;
        ul{
            padding: 0.5rem 0;
            display: flex;
            border-bottom: 1px solid #fafbfc;
            li{
                flex: 1;
                text-align: center;
                img{
                    width: 100%;
                    height: auto;
                }
                p{
                    font-size: 12px;
                    transform: scale(0.9);
                    color: #333;
                }
            }
        }
        .hosttest{
            margin-left: 0.312rem;
            height: 1.875rem;
            background: url("../../assets/images/basketball/hottest_32eac13.jpg") no-repeat center left;
            background-size: 5rem auto;
            padding-left: 5rem;
            .hosttestContainer{
                .swiper-wrapper{
                    .swiper-slide{
                        display: flex;
                        a{
                            flex: 1;
                            font-size: $fontSize;
                            transform: scale(.9);
                            color: #666666;
                            display: block;
                            border-right: 1px solid #f6f6f6;
                            &:last-child{
                                border-right: 0px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>