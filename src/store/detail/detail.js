import axios from "axios";
export default {
    namespaced:true,
    state:{
        goods:{},
        showContent:false,
        // 颜色初始值
        color:"#ccc",
        txt:"未收藏"
    },
    mutations:{
        // 设置goods数据
        setGoods(state,dataObj){
            // 深拷贝
            // this.deepCopy(state.goods,dataObj);
            state.goods = JSON.parse(JSON.stringify(dataObj));
            console.log(state)
        },
        // 点击收藏，切换收藏状态
        changeStar(state,color){
            if(color=="#ccc"){
                state.color="#ff5000";
                state.txt = "已收藏";
            }else if(color=="#ff5000"){
                state.color="#ccc";
                state.txt = "未收藏";
            }
        },
        // 没有登录时重置收藏
        resetStar(state){
            state.color = "#ccc";
            state.txt = "未收藏";
        }
    },
    actions:{
        // 获取该物品的详情数据
        async getData({state,commit,rootState},id){
            // 请求数据 异步请求 转 同步（不转会因为请求时间长，错过了挂载声明周期而报错）
            await axios.get("http://api.tbk.dingdanxia.com/tbk/item_info",{
                params:{
                    apikey:"UaEUPVdgCRyFCcKlz7peBbfUdjxsklD1",
                    num_iids:id
                }
            }).then((res)=>{
                console.log(res);
                
                commit("setGoods",res.data.data[0])
            }).catch((err)=>{
                console.log(err)
            })
            // 如果有登录，请求数据
            if(rootState.username){
                await axios.get("/getCollect",{
                    params:{
                        // 获取根vuex的username
                        username:rootState.username
                    }
                }).then((res)=>{
                    console.log(res);
                    console.log(state.goods);
                    // 遍历服务器里面的收藏列表,找到与当前所进入的详情页的物品的id相同的
                    let bool = res.data.collectList.some((item)=>{
                        return item.num_iid == state.goods.num_iid;
                    })
                    // true则收藏图标高亮,false则不高亮
                    if(bool){
                        state.color="#ff5000";
                        state.txt = "已收藏";
                    }else{
                        // 没有则不高亮
                        state.color="#ccc";
                        state.txt = "未收藏";
                    }
                }).catch((err)=>{
                    console.log(err)
                    
                })
            }
            state.showContent = true;
            
        },
        
    },
    getters:{
    },
    modules:{

    }
}