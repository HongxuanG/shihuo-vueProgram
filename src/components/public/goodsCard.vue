<template>
    <div>
        <!-- 搜索框搜索到内容时，显示的搜索结果------商品卡片 -->
        <div class="goodsCard">
            <div class="left">
                <img :src="goodsImg" alt="">
            </div>
            <div class="right">
                <h1 class="goodsName txt-cut">{{goodsName}}</h1>
                <div class="price">
                    <span class="newPrice">￥{{newPrice}}</span>
                    <span class="oldPrice">￥{{oldPrice}}</span>
                </div>
                <div class="goodsInfo">
                    <!-- 免运费 -->
                    <span class="l one-txt-cut">{{l}}</span>
                    <!-- 销量 -->
                    <span class="m one-txt-cut">{{m}}人付款</span>
                    <!-- 地区 -->
                    <span class="r one-txt-cut">{{r}}</span>
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
            goodsImg:{
                type:String,
                default:"../../assets/images/shouji.jpg",
                required:true,
            },
            goodsName:{
                type:String,
                default:"我是商品名称",
                required:true,
            },
            newPrice:{
                type:String,
                default:"30",
                required:true,
            },
            oldPrice:{
                type:String,
                default:"300",
                required:false,
            },
            l:{
                type:String,
                default:"",
                required:false,
            },
            m:{
                type:String,
                default:"0",
                required:false,
            },
            r:{
                type:String,
                default:"",
                required:false,
            }
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $navHeight:2.812rem;
    $fontSize:0.75rem;//12px
    $titleSize:0.875rem;//14px
    .goodsCard{
        background-color: #fff;
        border-bottom:1px solid #dededede;
        overflow: hidden;
        padding: 0.75rem 0.875rem 1rem;
        .left{
            float: left;
            width: 6.25rem;
            height: 6.25rem;
            margin-right: 0.625rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .right{
            overflow: auto;
            // margin: 4px 15px 6px 0;
            margin-top: 4px;
            margin: 6px;
            .goodsName{
                height: 2.5rem;
                line-height: 1.25rem;
                font-size: $titleSize;
                color: #4b566a;
            }
            .price{
                line-height: 1.5rem;
                .newPrice{
                    color: #eb5211;
                    font-size: $titleSize;
                    padding-right: 0.312rem;
                }
                .oldPrice{
                    color: #999;
                    font-size: $fontSize;
                    text-decoration: line-through;
                }
            }
            .goodsInfo{
                display: flex;
                justify-content: space-between;
                color: #999;
                font-size: $fontSize;
                .l{

                }
                .m{

                }
                .r{

                }
            }
        }
    }
</style>