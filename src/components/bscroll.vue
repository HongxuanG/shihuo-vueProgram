<template>
    <div>
        <div class="content">
            <div class="left" ref="left">
                <ul>
                    <li v-for="(item,index) in leftData" @click="selectItem(index,$event)" :key="index" :class="{current:index==currentIndex}"><span>{{item}}</span></li>
                </ul>
            </div>
            <div class="right" ref="right">
                <ul>
                    <li v-for="(item,index) in rightData" class="right-item-hook" :key="index">
                        <h2>——{{item.name}}——</h2>
                        <ul>
                            <li v-for="num in item.content" :key="num">
                                <div class="img">
                                    <img src="../assets/images/46f95bd552fa134820a7daea19e507ef.png" alt="">
                                </div>
                                <div class="desc">{{item.name+num}}</div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from "@better-scroll/core";
    import "../assets/css/base.css";

    export default {
        data(){
            return{
                listHeight:[],//记录高度
                scrollY:0,
                // currentIndex:0
            }
        },
        props:["leftData","rightData"],
        methods:{
            _initScroll(){
                // 左边联动效果
                this.lefts = new BScroll(this.$refs.left,{
                    click:true,//拥有触发事件
                    probeType:3 //滚动位置探针效果
                });
                // 右边联动效果
                this.rights = new BScroll(this.$refs.right,{
                    probeType:3 //滚动位置探针效果
                });
                // 获取滚动效果的高度
                this.rights.on("scroll",this.onScrollFun);
            },
            onScrollFun(pos){
                // round四舍五入abs绝对值
                this.scrollY = Math.abs(Math.round(pos.y))
            },
            // 获取高度
            _getHeight(){
                // 获取每个类的对象
                let rightItems = this.$refs.right.getElementsByClassName("right-item-hook");
                let height = 0;//这是默认高度
                this.listHeight.push(height);
                // 循环对象获取各自到顶部高度
                for(let i=0;i<rightItems.length;i++){
                    let item = rightItems[i];
                    height += item.clientHeight;
                    // clientHeight，大小和padding不包含边框
                    this.listHeight.push(height)
                    // 每一区域距离顶部的高度
                }
            },
            // 左侧点击的效果
            selectItem(index,event){
                // 当原生浏览器点击事件监听到__constructed,把当时浏览器监听到的属性return掉
                if(!event._constructed){
                    return
                }else{
                    // 联动效果
                    let rightItems = this.$refs.right.getElementsByClassName("right-item-hook");
                    let el = rightItems[index];//通过下标获取对象
                    //通过滚动事件指定目标元素
                    this.rights.scrollToElement(el)
                    // this.currentIndex = index;
                }
            }
        },
        computed:{
            currentIndex(){
                for(let i =0;i<this.listHeight.length;i++){
                    let height = this.listHeight[i];
                    let height2 = this.listHeight[i+1];
                    // 判断高度之间为当前左侧选项的变化s
                    if(!height2 || (this.scrollY >= height && this.scrollY < height2)){
                        // 左边联动
                        let leftItems = this.$refs.left.getElementsByTagName("li");
                        let elLi = leftItems[i];
                        this.lefts.scrollToElement(elLi);
                        return i;
                    }
                }
                // 如果没有高度的值，默认为0，第一位
                return 0
            }
        },
        // 生命周期函数。目的让vue代码执行结束后再去实例化第三方插件
        mounted(){
            // 能在虚拟dom执行完后，在回调方法
            this.$nextTick(()=>{
                this._initScroll();
                this._getHeight();
            })
        },
        // 组件销毁前阻止滚动事件
        beforeDestroy(){
            this.rights.off("scroll",this.onScrollFun)
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
    $leftWidth:67px;
    .content{
        display: flex;
        position: absolute;
        /* 定位里面不写左右样式，不写高度，自动获取高度 */
        top: 0;
        bottom: $navHeight;
        background-color: #eee;
        width: 100%;
        overflow: hidden;
        .left{
            flex: 0 0 $leftWidth;
            width: $leftWidth;
            background-color: #fefefe;
            border-right: 1px solid #ccc;
            li{
                width: 100%;
                height: 100%;
                span{
                    display: block;
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    font-size: 12px;
                    color: #333;
                }
                &.current{
                    color: #fff;
                    span{
                        font-size: $titleSize;
                        color: $mainColor;
                        transition: all 0.1s linear;
                    }
                }
            }
        }
        .right{
            flex: 1;
            background-color: #fff;
            li.right-item-hook{
                overflow: hidden;
                text-align: center;
                &:last-child{
                    min-height: 518px;
                }
                h2{
                    color: $mainColor;
                    line-height: 57px;
                    font-size: $titleSize;
                }
                >ul{
                    width: 100%;
                    >li{
                        width: 33.33%;
                        float: left;
                        text-align: center;
                        font-size: $fontSize;
                        color: #333;
                        .img{
                            width: 45px;
                            height: 45px;
                            margin: 0 auto;
                            img{
                                width: 45px;
                                height: 45px;
                            }
                        }
                        .desc{
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }
                }
            }
        }
    }

</style>