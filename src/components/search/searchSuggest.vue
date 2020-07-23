<template>
    <div>
        <div class="suggest-container">
            <ul class="suggest-sug">
                <li @click="searchThis(item[0])" v-for="(item,index) in searchList(keywords)" :key="index">{{item[0]}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                list:[]
            }
        },
        props:["keywords"],
        methods:{
            searchList(keywords){
                // "https://suggest.taobao.com/sug?code=utf-8&q=%E6%89%8B%E6%9C%BA&callback=cb"
                this.$jsonp("https://suggest.taobao.com/sug",{
                    code:"utf-8",
                    q:keywords,
                    callback:"cb"
                }).then((res)=>{
                    this.list = res.result.filter(item=>item);
                }).catch((err)=>{
                    console.log(err);
                })
                return this.list;
            },
            // 当用户点击这个建议关键字时，把这个关键字赋值给搜索框的value中
            searchThis(kw){
                this.$emit("changeKeyword",kw);
            }
        }
    }
</script>

<style lang="scss" scoped>

    $fontSize:0.75rem;//12px
    $titleSize:0.875rem;//14px
    .suggest-container{
        ul.suggest-sug{
            li{
                padding: 0 1rem;
                border-top: 1px solid #dededede;
                height: 2.5rem;
                background-color: #fff;
                line-height: 2.5rem;
                font-size: $fontSize;
            }
        }
    }
</style>