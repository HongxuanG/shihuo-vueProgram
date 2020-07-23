export default {
    namespaced:true,
    state:{
        // 当前选中的地址的id值
        currentSelect:'1',
        list: [
            // {
            //     id: '1',
            //     name: '郭鸿轩',
            //     tel: '17324565534',
            //     city:"佛山市",
            //     province:"广东省",
            //     county:"三水区",
            //     areaCode:"330106",
            //     addressDetail:"乐平镇职教路3号（佛山职业技术学院）",
            //     address: '广东省佛山市三水区乐平镇职教路3号（佛山职业技术学院）',
            //     isDefault: true,
            // },
            // {
            //     id: '2',
            //     name: '李四',
            //     tel: '13100000001',
            //     city:"杭州市",
            //     province:"浙江省",
            //     county:"拱墅区",
            //     areaCode:"330106",
            //     addressDetail:"莫干山路 50 号",
            //     address: '浙江省杭州市拱墅区莫干山路 50 号',
            // },
        ]
    },
    mutations:{
        // 添加
        add(state,{addressDetail,city,county,name,province,tel,areaCode}){
            // 清除所有数据的isDefault值为false
            state.list.forEach((item)=>{
                item.isDefault = false;
            })
            // 新添加的数据isDefault为true
            state.list.push({
                id:String(state.list.length+1), //id
                name,     //名字
                tel,      //电话
                city,    //市
                county,  //区
                province, //省,
                addressDetail,
                isDefault:true,
                address: province+city+county+addressDetail,
                areaCode
            })
            // 提交收件人信息时 当addresseeInfo的长度为0时
            // 判断对象有没有数据
            if(JSON.stringify(this.state.order.addresseeInfo)==="{}"){
                Object.assign(this.state.order.addresseeInfo,{
                    id:String(state.list.length+1), //id
                    name,     //名字
                    tel,      //电话
                    city,    //市
                    county,  //区
                    province, //省,
                    addressDetail,
                    isDefault:true,
                    address: province+city+county+addressDetail,
                    areaCode
                });
            }
        },
        // 编辑
        edit(state,{id,content}){
            // 筛选目标对象
            let targetList = state.list.filter((item)=>{
                return item.id == id
            })
            targetList = {
                id, //id
                name:content.name,     //名字
                tel:content.tel,      //电话
                city:content.city,    //市
                county:content.county,  //区
                province:content.province, //省,
                addressDetail:content.addressDetail,
                isDefault:content.isDefault,
                address: content.province+content.city+content.county+content.addressDetail,
                areaCode:content.areaCode
            }
            console.log(targetList)
            // 处理默认高亮小图标唯一性
            if(targetList.isDefault){
                state.list.forEach((item)=>{
                    item.isDefault = false
                })
                targetList.isDefault = true;
            }
            let index = state.list.findIndex((item)=>{
                return item.id == id
            })
            Object.assign(state.list[index],targetList)
        },
        delete(state,id){
            let index = state.list.findIndex((item)=>{
                return item.id == id
            })
            state.list.splice(index,1);
        },
        isSelect(state,obj){
            // obj为commit过来的参数，输入表单里面的值的对象
            state.currentSelect = obj.id
            // 当前的选中的收货人的id
            console.log(state.currentSelect);
            // 赋值给order子模块里面的addresseeInfo
            Object.assign(this.state.order.addresseeInfo,obj);
        }
    },
    actions:{
        
    },
    getters:{
    },
    modules:{

    }
}