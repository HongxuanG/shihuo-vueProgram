<template>
    <div>
        <div class="my_empty">
            <span v-if="iconname" :style="{'font-size':size+'px'}" :class="['iconfont',iconname]"></span>
            <svg v-if="iconId" :style="{'width':size+'em','height':size+'em'}" class="icon" aria-hidden="true">
                <use :xlink:href="iconId"></use>
            </svg>
            <div class="tip" v-text="text"></div>
            <button class="btn" v-text="btntext"></button>
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
            iconId:{
                type:String,
                default:"",
                required:false,
            },
            iconname:{
                type:String,
                default:"",
                required:false,
            },
            text:{
                type:String,
                default:"没有了",
                required:false,
            },
            btntext:{
                type:String,
                default:"我是按钮",
                required:false,
            },
            size:{
                type:String,
                default:"10",
                required:false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my_empty{
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .icon {
        width: 10em;
        height: 10em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .iconfont{
        font-size: 80px;
        
    }
    .tip{
        margin-top: 20px;
        position: relative;
        font-size: 16px;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }
    .btn{
        margin-top: 20px;
        display: block;
        width: 130px;
        height: 40px;
        background-color: red;
        color: white;
        border-radius: 50px;
        border:0;
        position: relative;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }
</style>