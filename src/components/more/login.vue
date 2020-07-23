<template>
    <div>
        <div class="loginTop">
            <div class="back" @click="goBack">
                <span></span>
            </div>
            <div class="logo">
                <img src="../../assets/images/shihuo.png" alt="">
            </div>
        </div>
        <div class="container">
            <div class="account">
                <label for="login_username"></label>
                <input id="login_username" type="text" placeholder="登录名/手机号/邮箱" v-model="username">
            </div>
            <div class="password">
                <label for="login_password"></label>
                <input type="password" id="login_password" placeholder="密码" v-model="password">
            </div>
            <div class="login_btn">
                <button class="register" type="button" @click="toRegister">注册</button>
                <button class="login" type="button" @click="onLogin">登录</button>
            </div>
            <div class="other_login">
                <i></i>
                <a class="qq_login">
                    <span>QQ登录</span>
                </a>
                <i></i>
                <a class="phone_login">
                    <span>手机登录</span>
                </a>
                <i></i>
            </div>
        </div>
    </div>
</template>

<script>
    import "../../assets/js/rem";
    import Vue from 'vue';
    import { Toast } from 'vant';

    Vue.use(Toast);
    import {mapState} from "vuex";
    export default {
        data(){
            return{
                username:null,
                password:null,
            }
        },
        methods:{
            // 点击登录按钮
            onLogin(){
                console.log(this);
                this.$axios.get("login",{
                    params:{
                        username:this.username,
                        password:this.password,
                    }
                }).then((res)=>{
                    console.log(res);
                    // 200登录成功，跳转到个人中心
                    if(res.data==200){
                        // 把登录的用户名信息赋值给个人中心
                        this.$store.state.username = res.config.params.username;
                        
                        console.log(this.redirect);
                        if(this.redirect){
                            // 跳转回拦截的页面
                            this.$router.push({path:this.redirect});
                        }else{
                            // 
                            this.$router.push("/more");
                        }
                    }else{
                        // 201 登录失败
                        Toast('账号或密码不正确');
                    }

                })
            },
            // 跳转到注册页面
            toRegister(){
                this.$router.push("/register");
            },
            // 返回
            goBack(){
                this.$router.go(-1);
            }
        },
        computed:{
            ...mapState("more",{
                redirect:state=>state.redirect
            })
        },
        created(){
            console.log(this.$route.query);
            if(this.$route.query.redirect){
                console.log(111)
                this.$store.state.more.redirect = this.$route.query.redirect;
            }
        },
    }
</script>

<style lang="scss" scoped>
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
            margin-bottom: 1.875rem;
        }
        .login_btn{
            text-align: center;
            .register{
                width: 4.687rem;
                height: 2rem;
                border: 1px solid #b7b7b7;
                border-radius: 50px;
                margin-right: 25px;
                font-size: $fontSize;
                color: #b7b7b7;
            }
            .login{
                width: 4.687rem;
                height: 2rem;
                border: 1px solid #d8544c;
                border-radius: 50px;
                background-color: #d8544c;
                font-size: $titleSize;
                color: #fff;
            }
        }
        .other_login{
            display: flex;
            margin-top: 5rem;
            padding: 0 10px;
            i{
                flex: 1;
                height: $circleHeight/2;
                display: inline-block;
                border-bottom: 1px solid #e1e1e1;
            }
            .qq_login{
                text-align: center;
                flex: 1;
                display: inline-block;
                &::before{
                    content: "";
                    margin: 0 auto;
                    display: block;
                    width: 3rem;
                    height: 3rem;
                    border-radius: 50%;
                    background: url("../../assets/images/icon/qq.png") no-repeat center center;
                    background-color: #73c5ff;
                    background-size: 18px 21px;
                }
                span{
                    font-size: $fontSize;
                    color: #b7b7b7;
                }
            }
            .phone_login{
                text-align: center;
                flex: 1;
                display: inline-block;
                &::before{
                    content: "";
                    margin: 0 auto;
                    display: block;
                    width: 3rem;
                    height: 3rem;
                    border-radius: 50%;
                    background: url("../../assets/images/icon/icon-phone-new.png") no-repeat center center;
                    background-color: #48d58e;
                    background-size: 18px 21px;
                }
                span{
                    color: #b7b7b7;
                    font-size: $fontSize;
                    
                }
            }
        }
    }
</style>