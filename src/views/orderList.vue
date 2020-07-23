<template>
    <div>
        <!-- Swiper -->
        <div class="orderlist_header">
            <div class="swiper-container orderlistSwiperContainer">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in orderHeaderTag" :key="index" @click="current = index">
                        <!-- <span class="on" >{{item}}</span> -->
                        <router-link tag="span" :to="item.to" :class="{'on':current == index}">{{item.tag}}</router-link>
                    </div>
                </div>
            </div>
        </div>
        <router-view :item-list="datalist"></router-view>
        <!-- 底部固定导航栏 -->
        <nav-bar></nav-bar>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from "vuex";
    const {mapState,mapGetters} = createNamespacedHelpers("order");
    import Swiper from "swiper";
    import navBar from "../components/navigation.vue";
    export default {
        data(){
            return{
                // 当前点击的索引
                current:0,
                // 头部选项的数据
                orderHeaderTag:[
                    {tag:"全部",to:"/orderList/all",id:0},
                    {tag:"待付款",to:"/orderList/waitFPay",id:1},
                    {tag:"待发货",to:"/orderList/waitFSend",id:2},
                    {tag:"待收货",to:"/orderList/waitFTake",id:3},
                    {tag:"待评价",to:"/orderList/waitFSay",id:4},
                ],
                
            }
        },
		components:{
			navBar
		},
        computed:{
            ...mapState({
                AllList:state=>state.AllList,
                // payList:state=>state.payList,
                // sendList:state=>state.sendList,
                // takeList:state=>state.takeList,
                // sayList:state=>state.sayList,
            }),
            ...mapGetters([
                "payList",
                "sendList",
                "takeList",
                "sayList",
            ]),
            datalist:function(){
                let list = [];
                
                switch(this.current){
                    case 0:
                        list = JSON.parse(JSON.stringify(this.AllList));
                        break;
                    case 1:
                        list = JSON.parse(JSON.stringify(this.payList));
                        break;
                    case 2:
                        list = JSON.parse(JSON.stringify(this.sendList));
                        break;
                    case 3:
                        list = JSON.parse(JSON.stringify(this.takeList));
                        break;
                    case 4:
                        list = JSON.parse(JSON.stringify(this.sayList));
                        break;
                }
                return list;
            }
        },
        mounted(){
            new Swiper('.orderlistSwiperContainer', {
                slidesPerView: 5, //显示的个数 一行
                spaceBetween: 0,  //间隔
                freeMode: true,  //自由模式
            });
        },
        created(){
            this.$store.state.isOn = 2;
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $navHeight:2.812rem;
    $fontSize:0.75rem;//12px
    $titleSize:0.875rem;//14px
    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      text-align: center;
      font-size: 16px;
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
    .orderlist_header{
        .orderlistSwiperContainer{
            height: 2.125rem;
            span{
                line-height: 2.125rem;
                box-sizing: border-box;
                font-size: $titleSize;
                display: block;
                height: 100%;
                color: #333;
                border-bottom: 2px solid transparent;
                &.on{
                    color: $mainColor;
                    border-bottom: 2px solid $mainColor;
                }
            }
        }
    }
    
</style>