<template>
    <div>
        <van-nav-bar
            :title="$route.name"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <!-- 地址列表 -->
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            @select="isSelect"
        />
    </div>
</template>

<script>
    import Vue from 'vue';
    import { AddressList } from 'vant';
    import { NavBar } from 'vant';

    Vue.use(NavBar);
    Vue.use(AddressList);
    import {createNamespacedHelpers} from "vuex";
    const {mapState} = createNamespacedHelpers("address");
    export default {
        data() {
            return {
                chosenAddressId: '1',
                from:"",
            };
        },
        methods: {
            // 添加联系方式
            onAdd() {
                this.$router.push("/addressAdd");
            },
            // 编辑联系方式
            onEdit(item) {
                this.$router.replace({path:"/addressEdit",query:{itemId:item.id}});
            },
            // 返回
            onClickLeft() {
                // 返回
                this.$router.go(-1);
            },
            // 点击选中
            isSelect(item){
                this.$store.commit("address/isSelect",item);
                this.$router.push("/order");
            }
        },
        computed:{
            ...mapState({
                list:state=>state.list,
                // 当前选中的收货人
                currentSelect:state=>state.currentSelect,
            })
        },
        created(){
            // 默认选中带有isDefault = true的联系方式
            // find返回了一个对象，这个对象isDefault为true
            // this.chosenAddressId = this.list.find(item=>item.isDefault).id;

            // 点击哪个就选中哪个
            this.chosenAddressId = this.currentSelect
        }
    }
</script>

<style lang="scss" scoped>

</style>