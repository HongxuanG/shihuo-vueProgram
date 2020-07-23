<template>
	<div id="app">
		<!-- 组件模板显示的位置 -->
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		computed:{
		}
	};
</script>

<style lang="scss">
	$navHeight:2.812rem;
	#app{
		padding-bottom: $navHeight;
	}
</style>
