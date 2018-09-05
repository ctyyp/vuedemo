<template>
	<div class="order">
		<div class="menu">
			<ul v-if="orderList">
				<li v-for="(item,index) in orderList"><router-link :to="'/order/' + item.name">{{item.cName}}<i></i></router-link></li>
			</ul>
		</div>
		<router-view :key="key"></router-view>
	</div>
</template>
<script>
	export default{
		data(){
			return{}
		},
		computed:{
			orderList(){
				return this.$store.state.orderList
			},
			key() {
		        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
		    }

		},
	    mounted(){
	    	this.$nextTick(()=>{
				this.$store.dispatch('getOrder')
			})
	    }
	};
</script>
<style>
.order{position: fixed; z-index: 999; left: 0; top: 0; width: 100%; height: 100%; overflow-y: auto; background-color: #f9f9f9; padding-bottom: 3.5rem}
.order .menu{position:fixed; top:0; height: 3rem; width: 100%; background-color: #fff;}
.order .menu ul{overflow: hidden;}
.order .menu li{position:relative;float: left; width: 33.333333%; text-align: center; font-size: 1.125rem; color: #282828; line-height: 3rem; border-bottom: 1px solid #ededed;}
.order .menu li .router-link-exact-active i{position:absolute; width: 100%; left: 0; bottom: 0; height: 3px; background-color: #00a0d3;}
.order .menu li .router-link-exact-active a{color:#00a0e8;}
</style>