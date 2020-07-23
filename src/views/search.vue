<template>
    <div>
        <!-- 搜索框 -->
        <van-search
            v-model="keywords"
            show-action
            placeholder="请输入关键词按回车键搜索"
            @search="onSearch(keywords)"
        >
            <!-- @cancel="onCancel" -->
            <!-- <template #left>
                <van-icon @click="$router.push('/main/recommend/all')" tag="div" color="#8b9092" size="20" name="arrow-left" />
            </template> -->
            <template #action>
                <div @click="onSearch(keywords)">搜索</div>
            </template>
        </van-search>
        <searchSuggest @changeKeyword="changeKw" v-if="keywords" :keywords='keywords'></searchSuggest>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Search } from 'vant';
    import { Toast } from 'vant';
    import { Icon } from 'vant';
    
    Vue.use(Icon);
    Vue.use(Search);
    import searchSuggest from "../components/search/searchSuggest";
    export default {
        data(){
            return{
                // 搜索
                keywords: '',
            }
        },
        methods:{
            // 点击搜索或者点击回车按钮搜索
            onSearch(val) {
                // 弹出提示框
                this.$router.push({path:"/searchResult",query:{keyword:val}});
            },
            // 点击取消
            onCancel() {
                Toast('取消');
            },
            changeKw(kw){
                this.keywords = kw;
                
            }
        },
        components:{
            searchSuggest
        }
    }
</script>

<style lang="scss" scoped>
    .back-btn{
        width: 30px;
    }
    
</style>