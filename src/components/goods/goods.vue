<template>
	<div class="goods">
		<div class="goods-back"><i><router-link to="/"><img src="../../assets/icon_arrow_left.png"></router-link></i></div>
		<div class="goods-nav">
			<ul>
				<li v-for="(item,index) in goods" class="item"><router-link :to="'/list/'+ item.name">{{item.name}}</router-link></li>
			</ul>
		</div>
		<router-view :key='key'></router-view>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				
			}
		},
		created(){
		},
		computed:{
			goods(){
				return this.$store.state.goodsList
			},
			key() {
		        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
		    }
		},
		methods:{
		},
		components:{
		},
		mounted(){
			this.$store.dispatch('getProductList')
		}
	};
</script>
<style>
.goods{position: absolute; left: 0; top: 0; z-index: 9999; width:100%; min-height: 100%; background-color: #f9f9f9;}
.goods-back{position: fixed; top: 0; left: 0; width: 100%; z-index: 9; height: 3rem; background-color: #fff; border-bottom: 1px solid #f9f9f9; box-shadow: 0 1px 5px rgba(0,0,0,.1)}
.goods-back i{display: block; position: absolute; left: 1rem; top: 1rem; height: 1rem;}
.goods-back i img{height: 100%;}
.goods-nav{position: fixed; top: 3rem; left: 0; z-index: 99; height: 3rem; line-height: 3rem; font-size: 1.125rem; width: 100%; background: #fff; overflow: auto; white-space: nowrap; border-bottom: 1px solid #f2f2f2;}
.goods-nav ul{position: absolute; width: 100%; padding: 0 1.1rem; overflow: auto;}
.goods-nav ul::-webkit-scrollbar{display: none;}
.goods-nav ul li{height: calc(3rem - 1px); display: inline-block; text-align: center; color: #333; padding: 0 1.1rem 0; border-bottom: none; font-weight: normal; font-size: 1.125rem;}
.goods-nav .router-link-exact-active{color: #0ae; border-bottom: solid 3px #0ae; font-weight: 900; font-size: 1.25rem}
</style>