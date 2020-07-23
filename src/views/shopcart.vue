<template>
    <div>
        <div class="sc_wrapper">
            <div class="sc_header clearfix">
                <h2>购物车<span>({{shopcartList.length}})</span></h2>
                <span class="sc_manage" v-show="!isManage" @click="manageSwitch">管理</span>
                <span class="sc_manage" v-show="isManage" @click="manageSwitch">完成</span>
            </div>
            <p>共<span>{{shopcartList.length}}</span>件宝贝</p>
            <div class="orderList">
                <van-checkbox-group v-model="result" ref="checkboxGroup">
                    <!-- 商品卡片 start -->
                    <div class="orderItem" v-for="(item,index) in shopcartList" :key="index">
                        <div class="itemCard_header">
                            <a href="javascript:;">
                                <span class="iconfont icon-home-shagnchengtuiguang"></span>
                                <span class="shopname">{{item.shopname}}</span>
                            </a>
                        </div>
                        <div class="itemCard_info">
                            <van-checkbox :name="item.itemId">
                                <div class="left">
                                    <img :src="item.item_img" alt="">
                                </div>
                            </van-checkbox>
                            <div class="right">
                                <h4 class="itemName">{{item.itemName}}</h4>
                                <div class="options">{{item.options}}</div>
                                <div class="stepper">
                                    <span class="current_price">￥<i>{{item.current_price}}</i></span>
                                    <van-stepper v-model="item.bug_num" min="1" max="99"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 商品卡片 end -->
                </van-checkbox-group>
            </div>
            
            <myEmpty 
                iconname="icon-illustrator"
                v-if="isEmpty"
                text="这里并没有东西哦~~" 
                btntext="去逛一逛"
                size="80" 
                @click.native="$router.push('/main/recommend/all')"
            />
            <!-- 推荐页面的组件 -->
            <recommend v-if="isEmpty"></recommend>
            <!-- 结算组件 -->
            <div v-if="!isEmpty">
                <van-submit-bar v-show="!isManage" :price="totalPrice*100" :button-text="`结算(${result.length})`" @submit="onSubmit([result,totalPrice])">
                    <van-checkbox v-model="checked" @click="checkAll($refs.checkboxGroup)">全选</van-checkbox>
                </van-submit-bar>
                <van-submit-bar v-show="isManage" :price="totalPrice*100" :button-text="`删除(${result.length})`" @submit="ondelete(result)">
                    <van-checkbox v-model="checked" @click="checkAll($refs.checkboxGroup)">全选</van-checkbox>
                </van-submit-bar>
            </div>
        </div>
        <!-- 底部固定导航栏 -->
        <nav-bar></nav-bar>
    </div>
</template>

<script>
    import myEmpty from "../components/public/empty";
    import recommend from "../components/recommend/recommendPage";
    import {createNamespacedHelpers} from "vuex";
    const {mapState,mapActions,mapMutations} = createNamespacedHelpers("cart");
    import Vue from 'vue';
    import { Checkbox, CheckboxGroup } from 'vant';
    import { Stepper } from 'vant';
    import { SubmitBar } from 'vant';
    
    Vue.use(SubmitBar);
    Vue.use(Checkbox);
    Vue.use(CheckboxGroup);
    Vue.use(Stepper);
    import navBar from "../components/navigation.vue";
    export default {
        data() {
            return {
                isEmpty:false
            };
        },
        methods:{
            ...mapMutations([
                "manageSwitch",
                "checkSwitch",
                "checkAll"
            ]),
            ...mapActions([
                "ondelete",
                "onSubmit"
            ]),
            
            
        },
        computed:{
            // 获取vuex的数据
            ...mapState({
                shopcartList:state=>state.shopcartList,
                // checked:state=>state.checked,
                isManage:state=>state.isManage,
                // result:state=>state.result
            }),
            // 组件中v-model=“XXX”，而XXX是vuex state中的某个变量
            // 由于vuex传递是个单向流传递，v-model是vue中的双向绑定，但是在computed中只通过get获取参数值，没有set无法改变参数值
            checked:{
                get(){
                    return this.$store.state.cart.checked;
                },
                set(val){
                    this.$store.state.cart.checked = val;
                }
            },
            result:{
                get(){
                    return this.$store.state.cart.result;
                },
                set(val){
                    this.$store.state.cart.result = val;
                }
            },
            // 总价
            totalPrice(){
                let total=0;
                // 用id
                for(let i of this.result){
                    this.shopcartList.forEach((currentValue,currentIndex)=>{
                        if(currentValue.itemId === i){
                            total += this.shopcartList[currentIndex].bug_num*this.shopcartList[currentIndex].current_price;
                        }
                    })
                }
                return total
            }
        },
		components:{
            navBar,
            myEmpty,
            recommend
        },
        created(){
            this.$store.state.isOn = 3;
            if(this.shopcartList.length == 0){
                this.isEmpty = true;
            }else{
                this.isEmpty = false;
            }
        },
        beforeUpdate(){
            // 控制 全选按钮的选中状态
            if(this.result.length != this.shopcartList.length){
                this.checked = false;
            }else{
                this.checked = true;
            }
            // 控制空状态显示隐藏
            if(this.shopcartList.length == 0){
                this.isEmpty = true;
            }else{
                this.isEmpty = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $navHeight:2.812rem;
    $fontSize:0.75rem;
    $titleSize:0.875rem;
    $maxWidth:640px;
	$minWidth:320px;
	@mixin maxWidth() {
        max-width: $maxWidth;
    }
    @mixin minWidth() {
        min-width: $minWidth;
	}
    .sc_wrapper{
        padding: 0 12px;
        // 防止内容被遮住
        padding-bottom: 51px;
        .sc_header{
            margin: 10px 0 0 0;
            height: 1.875rem;
            line-height: 1.875rem;
            h2{
                float: left;
                font-size: 20px;
            }
            span.sc_manage{
                float: right;
                font-size: $titleSize;
            }
        }
        p{
            font-size: $titleSize;
            margin-bottom: 10px;
        }
        .orderList{
            .orderItem{
                margin-bottom: 0.625rem;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                padding: 0.625rem;
                padding-top: 0;
                display: flex;
                flex-direction: column;
                .itemCard_header{
                    height: 1.187rem;//19px
                    margin: 5px 0;
                    a{
                        span{
                            font-size: $fontSize;
                            margin-right: 5px;
                        }
                    }
                }
                .itemCard_info{
                    flex: auto;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    .van-checkbox{
                        float: left;
                        .left{
                            width: 5.625rem;//90px
                            height: 5.625rem;
                            border-radius: 5px;
                            overflow: hidden;
                            margin-right: 0.5rem;//8px
                            img{
                                width: 5.625rem;//90px
                                height: 5.625rem;
                            }
                        }
                    }
                    .right{
                        flex: auto;
                        width: 55%;
                        float: left;
                        // width: 9.375rem;//150px
                        height: 5.625rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        h4.itemName{
                            height: 2.5rem;
                            font-size: $titleSize;
                            font-weight: normal;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                        }
                        .options{
                            font-size: $fontSize;
                            color: #999999;
                            line-height: 1.375rem;
                        }
                        .stepper{
                            
                            height: 28px;
                            line-height: 28px;
                            .current_price{
                                vertical-align: middle;
                                font-size: $titleSize;
                                color: #ff5500;
                                i{
                                    font-style: normal;
                                }
                            }
                            .van-stepper{
                                float: right;
                                vertical-align: middle;
                            }
                        }
                    }
                }
            }
        }
        .van-submit-bar{
            margin-bottom: $navHeight;
            border-bottom: 1px solid #e7e7e7;
        }
    }
</style>