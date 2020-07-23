<template>
    <div>
        <div class="ywqd">
            <div class="title">
                <span>查看更多></span>
                <h1>欲望清单</h1>
            </div>
            <!-- Swiper -->
            <div class="swiper-container ywqdContainer">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <a href="#">
                            <img src="../../assets/images/b9541b36f94bfa8c6c51482e7536eb35.jpg" alt="">
                            <p class="txt-cut">BB2.0开箱</p>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="#">
                            <img src="../../assets/images/b9541b36f94bfa8c6c51482e7536eb35.jpg" alt="">
                            <p class="txt-cut">BB2.0开箱</p>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="#">
                            <img src="../../assets/images/b9541b36f94bfa8c6c51482e7536eb35.jpg" alt="">
                            <p class="txt-cut">BB2.0开箱</p>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="#">
                            <img src="../../assets/images/b9541b36f94bfa8c6c51482e7536eb35.jpg" alt="">
                            <p class="txt-cut">BB2.0开箱</p>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="#">
                            <img src="../../assets/images/b9541b36f94bfa8c6c51482e7536eb35.jpg" alt="">
                            <p class="txt-cut">BB2.0开箱</p>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="#">
                            <img src="../../assets/images/b9541b36f94bfa8c6c51482e7536eb35.jpg" alt="">
                            <p class="txt-cut">BB2.0开箱</p>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="#">
                            <img src="../../assets/images/b9541b36f94bfa8c6c51482e7536eb35.jpg" alt="">
                            <p class="txt-cut">BB2.0开箱</p>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="#">
                            <img src="../../assets/images/b9541b36f94bfa8c6c51482e7536eb35.jpg" alt="">
                            <p class="txt-cut">BB2.0开箱</p>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="#">
                            <img class="more" src="../../assets/images/icon/more_76fa7ac.png" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from "swiper";
    export default {
        mounted(){
            new Swiper('.ywqdContainer', {
                slidesPerView: 3,
                spaceBetween: 6,
                freeMode: true,
            });
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $fontSize:0.75rem;
    $titleSize:0.875rem;
    
    .ywqd{
        padding: 0 0.625rem;
        background-color: white;
        margin-bottom: 0.625rem;
        .title{
            color: #333;
            padding: 0.625rem 0;
            h1{
                font-size: $titleSize;
            }
            span{
                transform: scale(0.9);
                font-size: $fontSize;
                float: right;
            }
        }
        .ywqdContainer{
                width: 100%;
                height: 100%;
                .swiper-slide {
                    font-size: 18px;
                    background: #fff;
                    padding-bottom: 0.625rem;
                    a{
                        img{
                            
                        }
                        p{
                            height: 2rem;
                            font-size: $fontSize;
                        }
                        img.more{
                            display: inline-block;
                            width: 2.5rem;
                            height: auto;
                        }
                    }
                }
            }
    }
</style>