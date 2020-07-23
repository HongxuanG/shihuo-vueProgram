<template>
    <div>
        <div class="loginTop">
            <div class="back" @click="$router.go(-1)">
                <span></span>
            </div>
            <div class="logo">
                <img src="../../assets/images/shihuo.png" alt="">
            </div>
        </div>
        <div class="container">
            <div class="account">
                <label for="login_username"></label>
                <input id="login_username" type="text" placeholder="用户名/手机号/邮箱" v-model="username">
            </div>
            <div class="password">
                <label for="login_password"></label>
                <input type="password" id="login_password" placeholder="密码" v-model="password">
            </div>
            <div class="password">
                <label for="confirmPwd"></label>
                <input type="password" id="confirmPwd" placeholder="确认密码" v-model="password2">
            </div>
            <div class="login_btn">
                <button class="register" type="button" @click="onRegister">立即注册</button>
            </div>
        </div>
    </div>
</template>

<script>
    import "../../assets/js/rem";
    import Vue from 'vue';
    import { Toast } from 'vant';

    Vue.use(Toast);
    export default {
        data(){
            return{
                username:null,
                password:null,
                password2:null,
            }
        },
        methods:{
            // 点击注册
            onRegister(){
                // 请求数据接口后台处理注册逻辑
                this.$axios.get("register",{
                    params:{
                        username:this.username,
                        password:this.password,
                        password2:this.password2,
                    }
                }).then((res)=>{
                    console.log(res);
                    if(res.data==200){

                        this.$router.push("/login");
                    }else{
                        // 201 登录失败
                        Toast('注册失败');
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $fontSize:0.75rem;
    $titleSize:0.875rem;
    $circleHeight:3rem;
    .loginTop{
        width: 100%;
        height: 2.375rem;
        background-color: #f4f4f4;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
        position: relative;
        .back{
            display: inline-block;
            width: 2.375rem;
            height: 2.375rem;
            text-align: center;
            line-height: 2.375rem;
            span{
                vertical-align: middle;
                display: inline-block;
                width: 0.625rem;
                height: 0.625rem;
                border-top: 1px solid #cf1c1c;
                border-left: 1px solid #cf1c1c;
                transform: rotate(-45deg);
            }
        }
        .logo{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            img{
                height: 1.75rem;
            }
        }
    }
    .container{
        width: 100%;
        @each $key,$icon in ("account","user"),
                            ("password","lock") {
            .#{$key}{
                text-align: center;
                label{
                    vertical-align: middle;
                    display: inline-block;
                    width: 1.5rem;
                    height: 2rem;
                    background: url("../../assets/images/icon/#{$icon}.png") no-repeat left center;
                    background-size: 0.937rem 1.125rem;
                }
                input{
                    box-sizing: border-box;
                    border: none;
                    height: 2rem;
                    width: 14.25rem;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #e1e1e1;
                    background-color: transparent;
                    &::-webkit-input-placeholder{
                        color: #e3e4e5;
                        font-size: $titleSize;
                    }
                    &:-webkit-autofill {
                        -webkit-box-shadow: 0 0 0px 1000px rgb(246, 246, 246) inset;
                        -webkit-text-fill-color: #333;
                    }
                }
            }
        }  
        .account{
            margin-top: 1.562rem;
        }
        .password{
            margin-top: 1rem;
        }
        .login_btn{
            margin-top: 1.875rem;
            text-align: center;
            .register{
                width: 4.687rem;
                height: 2rem;
                border: 1px solid #b7b7b7;
                border-radius: 50px;
                margin-right: 25px;
                font-size: $fontSize;
                color: #b7b7b7;
                &:focus{
                    background-color: $mainColor;
                    color: white;
                    border: 1px solid $mainColor;
                }
            }
        }
        
    }
</style>