<template>
    <div>
        <!-- 显示列表 -->
        <div class="listGroup">
            <ul class="item_new">
                <!-- 商品 -->
                <li v-for="(item,index) in itemList" :key="index" @click="toDetail(item.productId)">
                    <a href="javascript:;">
                        <div class="left fl">
                            <img :src="item.product_img" alt="">
                        </div>
                        <div class="right fl">
                            <h3 class="product_name one-txt-cut">{{item.product_name}}</h3>
                            <p class="content txt-cut">
                                <img src="../../assets/images/icon/quote_left.png" alt="">
                                {{item.content}}
                                <img src="../../assets/images/icon/quote_right.png" alt="">
                            </p>
                            <div class="price">
                                ￥<span>{{item.price}}</span>
                            </div>
                        </div>
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
        props:["itemList","currentCat"],
        methods:{
            // 跳转到详情页
            toDetail(id){
                this.$router.push({path:"/detail",query:{itemId:id}})
            }
        },
        watch:{
            currentCat(newValue){
                console.log(newValue);
            }
        },
        created(){
            console.log(this.currentCat)
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $fontSize:0.75rem;
    $titleSize:0.875rem;
    .listGroup{
        padding: 0.312rem 0 0 0.312rem;//5px
        ul.item_new{
            li{
                height: 7rem;
                box-sizing: border-box;
                padding: 0.312rem 0.312rem 0.312rem 0;
                border-bottom: 1px solid #f6f6f6;
                a{
                    .left{
                        img{
                            // width: 100%;
                            width: 5.359rem;
                            height: 5.359rem;
                        }
                    }
                    .right{
                        margin-left: 10px;
                        height: 100%;
                        width: 66%;
                        position: relative;
                        .product_name{
                            font-size: $titleSize;
                            font-weight: normal;
                            color: #333;
                            position: absolute;
                            left: 0;
                            top: 0;
                        }
                        .content{
                            position: absolute;
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%);
                            color: #666666;
                            font-size: $fontSize;
                            img{
                                display: inline-block;
                                width: 0.5rem;
                                height: 0.5rem;
                                margin: 0 0.2rem;
                            }
                        }
                        .price{
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            color: $mainColor;
                            span{
                                
                            }
                        }
                    }
                }
            }
        }
    }
</style>