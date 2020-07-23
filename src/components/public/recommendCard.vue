<template>
    <div style="display:inline-block;width:100%;">
        <div class="cardContainer">
            <div class="RC_pic">
                <img :src="rc_img" alt="">
            </div>
            <div class="RC_content">
                <p class="title txt-cut">{{rc_title}}</p>
                <div class="itemInfo">
                    <span class="price">￥{{rc_price}}</span>
                    <span class="volume">{{rc_volume}}人已购买</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                
            }
        },
        props:{
            rc_img:{
                type:String,
                default:"../../assets/images/300.jpg",
                required:true
            },
            rc_title:{
                type:String,
                default:"这是标题",
                required:true
            },
            rc_price:{
                type:String,
                default:"36",
                required:true
            },
            rc_volume:{
                type:String,
                default:"300",
                required:true
            },
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $fontSize:0.75rem;
    $titleSize:0.875rem;
    .cardContainer{
        display: inline-block;
        border-radius: 8px;
        background-color: #fff;
        width: 100%;
        overflow: hidden;
        .RC_pic{
            width: 100%;
            img{
                width: 100%;
                
            }
        }
        .RC_content{
            padding: 0.625rem 0.625rem 0.312rem 0.625rem;
            p.title{
                font-size: $titleSize;
                line-height: 18px;
            }
            div.itemInfo{
                margin-top: 0.312rem;
                span.price{
                    display: inline-block;
                    margin-right: 0.312rem;
                    color: #ff5500;
                }
                span.volume{
                    display: inline-block;
                    color: #999999;

                }
            }
        }
    }
</style>