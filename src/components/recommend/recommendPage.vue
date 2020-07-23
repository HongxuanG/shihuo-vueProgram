<template>
    <div>
        <div class="RC_title"></div>
        <ul class="clearfix">
            <li class="fl" v-for="(item,index) in list" :key="index" @click="toDetail(item.rc_itemId)">
                <recommendCard
                    :rc_img="item.rc_img"
                    :rc_title="item.rc_title"
                    :rc_price="item.rc_price"
                    :rc_volume="item.rc_volume"
                />
            </li>
        </ul>
    </div>
</template>

<script>
    import recommendCard from "../public/recommendCard";
    import { Toast } from 'vant'; //提示框
    export default {
        data(){
            return{
                list:[]
            }
        },
        methods:{
            toDetail(id){
                this.$router.push({path:"/detail",query:{itemId:id}});
            }
        },
        components:{
            recommendCard
        },
        created(){
            this.$axios.get("http://api.tbk.dingdanxia.com/spk/good_lists",{
                params:{
                    apikey:"UaEUPVdgCRyFCcKlz7peBbfUdjxsklD1",
                    min_id:1,
                    keyword:"运动鞋",
                    sort:0,
                    back:100
                }
            }).then((res)=>{
                for(let i=0;i<20;i++){
                    this.list.push({
                        rc_itemId:res.data.data[this.list.length].itemid,
                        rc_img:res.data.data[this.list.length].itempic+"_310x310.jpg",
                        rc_title:res.data.data[this.list.length].itemtitle,
                        rc_price:res.data.data[this.list.length].itemendprice,
                        rc_volume:res.data.data[this.list.length].todaysale,
                    })
                }
            }).catch((err)=>{
                Toast("请求失败");
                console.log(err)
            })
        }
    }
</script>

<style lang="scss" scoped>
    .RC_title{
        height: 2.812rem;
        background: url("../../assets/images/icon/maybeyoulike.png") no-repeat center center;
        background-size: auto 1.25rem;
    }
    ul{
        width: 100%;
        li{
            width: calc(50% - 0.25rem * 2);
            margin: 0 0.25rem 0.5rem;
        }
    }
</style>