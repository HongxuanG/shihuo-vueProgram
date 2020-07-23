<template>
    <div>
        <!-- 搜索框 -->
        <van-search
            show-action
            placeholder="请输入搜索关键词"
            @focus="$router.push('/search')"
        >
            <template #left>
                <van-icon @click="$router.push('/main/recommend/all')" tag="div" color="#8b9092" size="20" name="arrow-left" />
            </template>
        </van-search>
        <!-- 下拉菜单 -->
        <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value2" :options="option2" @change="onchange"/>
        </van-dropdown-menu>
        <!-- 搜索到的内容 -->
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            ref="lists"
        >
            <!-- 商品卡片 -->
            <!-- <van-card
                v-for="(item,index) in list"
                :key="index"
                :price="item.price"
                :desc="item.desc"
                :title="item.title"
                :thumb="item.thumb"
                @click="godetail"
            /> -->
            <goodsCard
                v-for="(item,index) in list" :key="index"
                :goodsImg="item.goodsImg"
                :goodsName="item.goodsName"
                :newPrice="item.newPrice"
                :oldPrice="item.oldPrice"
                :l="item.l"
                :m="item.m"
                :r="item.r"
                @click.native="godetail(item.goodsId)"
            />
        </van-list>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Search } from 'vant';
    import { Icon } from 'vant';
    
    Vue.use(Icon);
    Vue.use(Search);
    import { List } from 'vant';
    import { Card } from 'vant';
    import { DropdownMenu, DropdownItem } from 'vant';//下拉框
    import { Toast } from 'vant'; //提示框
    
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(Card);
    Vue.use(List);

    import goodsCard from "../public/goodsCard";
    export default {
        data(){
            return{
                list:[],
                loading: false,
                finished: false,
                // 下拉菜单
                value1: 0,
                value2: 'a',
                option1: [
                    { text: '全部商品', value: 0 },
                    { text: '新款商品', value: 1 },
                    { text: '活动商品', value: 2 },
                ],
                option2: [
                    { text: '销量优先', value: 'a' },
                    { text: '价格由低到高', value: 'b' },
                    { text: '价格由高到低', value: 'c' },
                ],
            }
        },
        methods:{
            onLoad() {
                // 异步更新数据
                // setTimeout 仅做示例，真实场景中一般为 ajax 请求
                // setTimeout(() => {
                    /* for (let i = 0; i < 10; i++) {
                        this.list.push({
                            // title:"商品标题",
                            // desc:"描述信息",
                            // price:"2.00",
                            // thumb:"https://img.yzcdn.cn/vant/ipad.jpeg"
                            goodsImg:require('../../assets/images/shouji.jpg'),
                            goodsName:"华为nova2s手机壳女装HUAWEI nova2pl",
                            newPrice:"29",
                            oldPrice:"60",
                            l:"免运费",
                            m:"1279人付款",
                            r:"深圳"
                        });
                    } */

                    // 加载状态结束
                //     this.loading = false;

                //     // 数据全部加载完成
                //     if (this.list.length >= 3) {
                //         this.finished = true;
                //     }
                // }, 1000);
                this.$axios.get("http://api.tbk.dingdanxia.com/spk/good_lists",{
                    params:{
                        apikey:"UaEUPVdgCRyFCcKlz7peBbfUdjxsklD1",
                        min_id:1,
                        keyword:this.$route.query.keyword,
                        sort:0,
                        back:100
                    }
                }).then((res)=>{
                    // 如果有数据时，搜索有结果
                    if(res.data.msg=="请求成功【success】"){
                        for(let i=0;i<20;i++){
                            this.list.push({
                                goodsId:res.data.data[this.list.length].itemid,
                                goodsImg:res.data.data[this.list.length].itempic+"_310x310.jpg",
                                goodsName:res.data.data[this.list.length].itemtitle,
                                newPrice:res.data.data[this.list.length].itemendprice,
                                oldPrice:res.data.data[this.list.length].itemprice,
                                l:"免运费",
                                m:res.data.data[this.list.length].todaysale,
                                r:"深圳"
                            })
                        }
                        this.loading = false;
                        if (this.list.length >= 100) {
                            this.finished = true;
                            this.$refs.lists.check()
                        }
                    }else if(res.data.msg=="数据返回失败【无数据】"){
                    // 如果无数据时，搜索无结果
                        Toast("搜索无结果");
                        this.finished = true;
                    }
                }).catch((err)=>{
                    console.log(err);
                    Toast("请求失败");
                    this.finished = true;
                })
            },
            godetail(id){
                this.$router.push({path:"/detail",query:{itemId:id}});
            },
            // 下拉菜单右边的值改变时
            onchange(val){
                if(val=='a'){
                    // 降序
                    this.list.sort((a,b)=>{
                        return b.m-a.m;
                    })
                }else if(val=='b'){
                    // 升序
                    this.list.sort((a,b)=>{
                        return String(a.newPrice)-String(b.newPrice);
                    })
                    
                }else if(val=='c'){
                    // 降序
                    this.list.sort((a,b)=>{
                        return String(b.newPrice)-String(a.newPrice);
                    })
                }
            }
        },
        components:{
            goodsCard
        },
        computed:{
        },
    }
</script>

<style lang="scss" scoped>
    .van-card:not(:first-child){
        margin-top: 0;
    }
</style>