<template>
    <div>
        <!-- 底部固定导航栏 -->
		<div class="nav">
			<ul>
				<li v-for="(item,index) in nav" :key="index" @click="changeItem(index)" :class="{on:isOn == index}">
					<router-link tag="a" :to="item.to">
						<span>{{item.name}}</span>
					</router-link>
				</li>
			</ul>
		</div>
    </div>
</template>

<script>
    import "../assets/css/base.css";
    import {mapState,mapMutations} from "vuex";
    export default {
        data(){
			return{
				
			}
        },
        methods:{
            ...mapMutations([
            // 修改 isOn的值
                "changeItem"
            ]),
        },
        computed:{
            
            ...mapState({
                nav:state=>state.nav,
                isOn:state=>state.isOn
            })
        }
    }
</script>

<style lang="scss" scoped>
    $mainColor:#ff4338;
    $bgColor:#f7f7f7;
    $navHeight:2.812rem;
    $fontSize:0.75rem;
    $titleSize:0.875rem;
    $maxWidth:640px;
	$minWidth:320px;
	@mixin maxWidth() {
        max-width: $maxWidth;
    }
    @mixin minWidth() {
        min-width: $minWidth;
	}
	[v-cloak] {
		display: none;
	}
	// 固定导航栏开始
	.nav{
		box-shadow: 0 4px 23px 2px #333333;
		height: $navHeight;
		position: fixed;
		bottom: 0;
		// z-index: 999;
		background-color: rgba(255,255,255,1);
		width: 100%;
		@include maxWidth();
		ul{
			height: 100%;
			display: flex;
			@each $index,$key in (1:"index",2:"youhui",3:"find",4:"zhuangbei",5:"more"){
				li:nth-of-type(#{$index}){
					flex: 1;
					a{
						text-align: center;
						&::before{
							content: "";
							display: block;
							height: 1.75rem;
							background: url("../assets/images/#{$key}.png") no-repeat center center;
							background-size: auto 100%;
						}
						span{
							display: block;
							font-size: $fontSize;
							width: 100%;
							text-align: center;
							color: #444444;
						}
					}
					&.on{
						a{
							&::before{
								background: url("../assets/images/#{$key}-on.png") no-repeat center center;
								background-size: auto 100%;
							}
							span{
								color: $mainColor;
							}
						}
					}
				}
			} 
		}
	}
</style>