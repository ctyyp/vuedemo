<template>
	<div class="service-wrapper">
		<Back></Back>
		<div class="service-box">
			<img src="../../../static/images/serviceImg_1.jpg">
			<img src="../../../static/images/serviceImg_2.png">
			<img src="../../../static/images/serviceImg_3.png">
			<img src="../../../static/images/serviceImg_4.jpg">
		</div>
	</div>
</template>
<script>
	import Back from "../../components/back/back"
	export default{
		components:{
			Back
		}
	};
</script>
<style>
.service-wrapper{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #fff; padding-top: 3rem; overflow-y: auto; padding: 4rem .75rem .75rem; z-index: 99999}
.service-box img{width: 100%}
</style>