<template>
    <div>
        <van-nav-bar
           :title="$route.name"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <!-- 编辑地址 -->
        <van-address-edit
            :area-list="areaList"
            :address-info="addressInfo"
            show-delete
            show-set-default
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
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
    import {createNamespacedHelpers} from "vuex";
    const {mapState} = createNamespacedHelpers("address");
    export default {
        data() {
            return {
                areaList,
                addressInfo:{},
            };
        },
        methods: {
            // 保存按钮
            onSave(content) {
                this.$store.commit("address/edit",{id:this.$route.query.itemId,content});
                this.$router.push("/addressList");
            },
            // 删除按钮
            onDelete() {
                this.$store.commit("address/delete",{id:this.$route.query.itemId});
                this.$router.push("/addressList");
            },
            // 返回按钮
            onClickLeft() {
                // 返回
                this.$router.push("/addressList");
            },
        },
        computed:{
            ...mapState({
                list:state=>state.list
            })
        },
        created(){
            let id = this.$route.query.itemId;
            // 页面created时把数据放入输入框中
            this.addressInfo = this.list.find(item=>id == item.id);
        }
    }
</script>

<style lang="scss" scoped>

</style>