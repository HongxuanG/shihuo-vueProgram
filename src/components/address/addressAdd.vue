<template>
    <div>
        <van-nav-bar
            :title="$route.name"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <!-- 添加地址 -->
        <van-address-edit
            :area-list="areaList"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
        />
    </div>
</template>

<script>
    import areaList from "../../assets/js/erea"
    import Vue from 'vue';
    import { AddressEdit } from 'vant';
    import { NavBar } from 'vant';

    Vue.use(NavBar);
    Vue.use(AddressEdit);
    import store from "../../store/index";
    
    export default {
        data() {
            return {
            // 地区列表
                areaList,
            };
        },
        methods: {
            // 点击保存时 content为输入的表单的值的对象
            onSave(content) {
                // 提交到address的mutations
                this.$store.commit("address/add",content);
                // 返回上一级
                this.$router.go(-1);
            },
            onClickLeft() {
                // 返回
                this.$router.go(-1);
            },
        },
        computed:{
            
        },
        beforeRouteEnter(to,from,next){
            if(to.path=="/addressAdd"){
                if(!store.state.username){
                    next("/login");
                }else{
                    next();
                }
            }else{
                next();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>