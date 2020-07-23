export default {
    namespaced:true,
    state:{
        orderList:[],
        totalPrice:0,
        addresseeInfo:{
            // id:1,
            // name: '郭鸿轩',
            // tel: '17324565534',
            // address: '广东省佛山市三水区乐平镇职教路3号（佛山职业技术学院）',
        },
        // 全部
        AllList:[],
        typeList:["交易成功","待付款","待发货","待收货","待评价"],
        arrEng:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    },
    mutations:{
        // 提交订单
        onsubmit(state){
            // 随机数  时间戳+十个随机字母
            let randomNum = new Date().getTime();
            // 循环十次
            for(let i=0;i<10;i++){
                // 十个随机字母
                let num = Math.floor(Math.random()*10);
                // 随机大小写字母
                if(i == num){
                    randomNum += state.arrEng[Math.floor(Math.random()*26)].toUpperCase();
                }
                randomNum += state.arrEng[Math.floor(Math.random()*26)];
            }
            randomNum = randomNum.split("").sort(()=>Math.random() - 0.5).join("")
            // 添加数据到全部选项中对应的数组中
            state.AllList.push({
                addresseeInfo:state.addresseeInfo,
                orderList:state.orderList,
                // 给个随机数字，模拟一下
                type:Math.floor(Math.random()*4+1),
                // 全额
                totalPrice:state.totalPrice,
                // 订单编号
                orderId:randomNum,
                // 下单时间
                orderTime:new Date()
            });
            console.log(state.AllList);
        },
        // 删除数据
        onCancel(state,obj){
            console.log(obj);
            // 这个index是当前点击的orderList的索引   orderList[index]就是指这个{bug_num，itemId，。。。。。。}  
            // orderList里面有很多个，orderList是个数组[{bug_num，itemId，。。。。。。}，{bug_num，itemId，。。。。。。}，{bug_num，itemId，。。。。。。}]
            let index = obj.item.orderList.findIndex((currentVal)=>{
                return currentVal.itemId == obj.value.itemId
            }) 
            // 寻找点击的item在allList上的索引值，通过唯一的orderId找到allList里面对应的索引值，然后进行删除操作，用obj.index索引值找allList里面对应的索引值则会误删其他数据
            let allListIndex = state.AllList.findIndex((currentVal)=>{
                return currentVal.orderId == obj.item.orderId;
            })
            console.log(allListIndex);
            // 当此时只剩最后一条数据时，把整条AllList[allListIndex]也删除干净，里面包括有其他的type，addresseeInfo，orderId等等。。。。
            if(state.AllList[allListIndex].orderList.length==1){
                state.AllList.splice(allListIndex,1);
            }else{
                // 只是删除AllList[allListIndex]里面的orderList[index]
                state.AllList[allListIndex].orderList.splice(index,1);
            }
        }
    },
    actions:{
        onsubmit({commit}){
            console.log("提交订单");
            commit("onsubmit");
        },
    },
    // 监听数据
    getters:{
        payList:(state)=>{
            return state.AllList.filter(item=>item.type == 1);
        },
        sendList:(state)=>{
            return state.AllList.filter(item=>item.type == 2);
        },
        takeList:(state)=>{
            return state.AllList.filter(item=>item.type == 3);
        },
        sayList:(state)=>{
            return state.AllList.filter(item=>item.type == 4);
        }
    },
    modules:{

    }
}