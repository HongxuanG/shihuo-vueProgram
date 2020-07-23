<template>
    <div>
        <div class="hotActivity clearfix">
            <h3>热门活动</h3>
            <ul>
                <li>
                    <a href="#">
                        <div class="img">
                            <img src="../../assets/images/basketball/7e5b5b66171686cf805178be1c793bf0.jpg" alt="">
                        </div>
                        <p class="p1 one-txt-cut">虎扑优选精英篮球袜</p>
                        <p class="p2">
                            <span>低至6.9元</span>
                        </p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div class="img">
                            <img src="../../assets/images/basketball/74d68d16fe92f589562be729a89ee9a3.jpg" alt="">
                        </div>
                        <p class="p1 one-txt-cut">5折上新，95分专属抢购</p>
                        <p class="p2">
                            <span>低价折扣超值精选</span>
                        </p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div class="img">
                            <img src="../../assets/images/basketball/e5e9c867a2016694abe40d752c81080a.jpg" alt="">
                        </div>
                        <p class="p1 one-txt-cut">应季机能风</p>
                        <p class="p2">
                            <span>酷战雨雪</span>
                        </p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $fontSize:0.75rem;
    $titleSize:0.875rem;
    .hotActivity{
        background-color: white;
        margin-bottom: 0.625rem;
        h3{
            font-size: 0.937rem;
            padding: 0.625rem 0.625rem;
        }
        ul{
            padding: 0 0.625rem;
            li{
                float: left;
                width: calc(33.3% - 3px);
                margin-right: 4px;
                margin-bottom: 0.625rem;
                a{
                    p{
                        line-height: 1rem;
                    }
                    div.img{
                        margin-bottom: 0.312rem;
                        img{
    
                        }
                    }
                    .p1{
                        font-weight: bold;
                        font-size: $titleSize;
                        color: #444444;
                    }
                    .p2{
                        span{
                            display: block;
                            transform: scale(0.9);
                            font-size: $fontSize;
                            color: #999;
                        }
                    }
                }
                &:last-child{
                    margin-right: 0;
                }
            }
        }
    }
</style>