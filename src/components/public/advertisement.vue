<template>
    <div>
        <!-- 广告页 http://localhost:8080/advertisement-->
        <div class="advpage">
            <div class="controler">
                <button class="skip" @click="goHome">跳过({{num}})</button>
            </div>
            <div class="advpic">
                <img src="../../assets/images/advertising.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                num:3,
                cleardate:null
            }
        },
        methods:{
            goHome(){
                this.$router.push("/main/recommend/all");
            }
        },
        created(){
            // 倒计时
            this.cleardate = setInterval(()=>{
                if(this.num == 0){
                    // 跳转首页
                    this.$router.push("/main/recommend/all");
                }else{
                    this.num--;
                }
            },1000)
        },
        beforeDestroy(){
            // 当路由器切换时关闭定时器
            clearInterval(this.cleardate);
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    .advpage{
        .controler{
            text-align: right;
            .skip{
                position: fixed;
                top: 10px;
                right: 10px;
                width: 60px;
                height: 30px;
                border-radius: 50px;
                border: 1px solid white;
                color: white;
                background-color: transparent;
            }
        }
        .advpic{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            img{
                height: 100%;
            }
        }
    }
</style>