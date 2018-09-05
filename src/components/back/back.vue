<template>
	<div class="back">
		<i @click="goBack"><img src="./icon_arrow_left.png"></i>
	</div>
</template>
<script>
	export default{
		methods:{
			goBack(){
				this.$router.go(-1);
			}
		}
	};
</script>
<style>
	.back{position: fixed; top: 0; left: 0; width: 100%; z-index: 9; height: 3rem; background-color: #fff; border-bottom: 1px solid #f9f9f9; box-shadow: 0 1px 5px rgba(0,0,0,.1)}
	.back i{display: block; position: absolute; left: 1rem; top: 1rem; height: 1rem;}
	.back i img{height: 100%;}
</style>