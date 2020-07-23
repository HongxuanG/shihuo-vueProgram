<template>
    <div>
        <!-- 头部组件 -->
        <div class="top_Bar">
            <div class="goback" @click="$router.go(-1)">
                <img src="../../assets/images/basketball/head_back_b142dc1.png" alt="">
            </div>
            <div class="ico_list" @click="showNav=!showNav">
                <img src="../../assets/images/basketball/head_list_4a4f511.png" alt="">
            </div>
            <span class="header_title" v-text="title">
            </span>
            <div class="header_nav" v-show="showNav" >
                <ul>
                    <li>
                        <a href="#" @click="$router.push('/main')">
                            <span class="iconfont icon-shouye"></span>
                            首页
                        </a>
                    </li>
                    <li>
                        <a href="#" @click="$router.push('/more')">
                            <span class="iconfont icon-wode"></span>
                            我的
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                showNav:false
            }
        },
        props:["title"]
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $fontSize:0.75rem;
    $titleSize:0.875rem;
    .top_Bar{
        box-sizing: border-box;
        width: 100%;
        position: fixed;
        top:0;
        height: 2.937rem;
        background-color: $bgColor;
        border-bottom: 1px solid #f1f1f1;
        line-height: 2.937rem;
        text-align: center;
        vertical-align: middle;
        .goback{
            position: absolute;
            left: 0;
            width: 2.937rem;
            height: 100%;
            img{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 2.5rem;
                height: 2.5rem;
            }
        }
        .ico_list{
            position: absolute;
            right: 0;
            width: 2.937rem;
            height: 100%;
            img{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 2.5rem;
                height: 2.5rem;
            }
        }
        span.header_title{
            font-size: 20px;
            font-weight: bold;
            color: #333333;
        }
        .header_nav{
            position: absolute;
            top: 2.55rem;
            right: 0;
            width: 116px;
            border-radius: 3px;
            background-color: rgba(0,0,0,0.5);
            ul{
                li{
                    height: 40px;
                    line-height: 40px;
                    a{
                        span{
                            margin-right: 5px;
                        }
                        font-size: $fontSize;
                        color: white;
                    }
                }
            }
            &::before{
                content:"";
                display:block;
                width: 0;
                position: absolute;
                top: -8px;
                right: 15px;
                z-index: 99;
                border-right: 8px solid transparent;
                border-left: 8px solid transparent;
                border-bottom: 8px solid rgba(0,0,0,0.5);
            }
        }
    }
</style>