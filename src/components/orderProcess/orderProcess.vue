<template>
	<div class="order-process-wrapper">
		<Back></Back>
		<div class="order-process">
			<img src="../../../static/images/order_process.jpg">
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
	.order-process-wrapper{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #fff; padding-top: 3rem; overflow-y: auto; padding: 4rem .75rem .75rem; z-index: 99999}
	.order-process img{width: 100%}
</style>