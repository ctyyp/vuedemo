<template>
	<div class="show-wrapper" v-if="user.offer">
		<Back></Back>
		<div class="show-content">
			<h1>{{user.offer.content.title}}</h1>
			<div class="text" v-html='user.offer.content.details'>
			</div>
		</div>
	</div>
</template>
<script>
	import Back from "../../components/back/back"
	export default{
		computed:{
			user(){
				return this.$store.state.user
			}
		},
		mounted(){
			this.$store.dispatch('getUser')
		},
		components:{
			Back
		}
	};
</script>
<style>
.show-wrapper{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #f9f9f9; padding-top: 3rem; z-index: 9999; overflow-y: auto;}
.show-content{padding: 1rem; line-height: 1.6}
.show-content h1{text-align: center;}
.show-content h2{padding-top: 1rem}
</style>