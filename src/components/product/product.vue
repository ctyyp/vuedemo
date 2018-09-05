<template>
	<div class="product">
		<Back></Back>
		<nav class="price-item">
			<ul>
				<li>衣物名称</li>
				<li>价格</li>
			</ul>
		</nav>
		<div class="price-list" v-if="products">
			<ul v-for="(product,index) in products.category">
				<li v-for="(item,index) in product.goodsList" v-if="product.categoryName===categoryName">
					<p><em class="pl-img"><img :src="item.clothesAvatar"></em>{{item.clothesName}}</p>
					<span @click="handleAddToCart(index)">{{item.price}}<i v-show="item.count>0">{{item.count}}</i></span>	
				</li>
			</ul>
		</div>
		<cart></cart>
	</div>
</template>
<script>
	import Back from "../../components/back/back"
	import cart from "../../components/cart/cart"
	export default{
		data(){
			return{
				categoryName: this.$route.params.categoryName
			}
		},
		computed:{
			products(){
				return this.$store.state.goodsList.find(item =>
					item.category.find(items => items.categoryName===this.categoryName)
				)		
			},
			cartList(){
				return this.$store.state.cartList
			}
		},
		methods:{
			handleAddToCart(index){
				const categoryItem = this.products.category.filter(item=>item.categoryName === this.categoryName);
				const Id = categoryItem[0].goodsList[index].id;
				const clothesName = categoryItem[0].goodsList[index].clothesName;
				const price = categoryItem[0].goodsList[index].price;
				const cartItem = [Id,clothesName,price]
				this.$store.commit('addCart',cartItem)
			}
		},
		components:{
			Back,
			cart
		},
		created(){
			
		},
		mounted(){
			this.$nextTick(()=>{
				this.$store.dispatch('getProductList')
			})
		}
	};
</script>
<style>
.product{position: absolute; left: 0; top: 0; height: 100%; width: 100%; background-color: #f9f9f9; z-index: 9999; overflow: auto;}
.up-page{position: fixed; top: 0; left: 0; width: 100%; z-index: 999; height: 3rem; background-color: #fff; border-bottom: 1px solid #f9f9f9; box-shadow: 0 1px 5px rgba(0,0,0,.1)}
.up-page i{display: block; position: absolute; left: 1rem; top: 1rem; height: 1rem;}
.up-page i img{height: 100%;}
.price-item{position: fixed; top: 3rem; padding: 0 .5rem; width: 100%; height: 3rem; line-height: 3rem; background-color: #fff; font-size: .875rem;}
.price-item ul{overflow: hidden; padding: 0 .5rem}
.price-item ul li{float: left; width: 75%;}
.price-item ul li:nth-child(2){width: 25%}
.price-list{padding: 5rem 0 4rem;}
.price-list ul{padding: 0 .5rem .5rem; margin-top: -.5rem}
.price-list ul:nth-child(1){padding-top: 1.5rem; margin-top: 0;}
.price-list ul li{overflow:hidden; background-color: #fff; padding: .5rem; margin-bottom: .5rem; line-height: 3rem;}
.price-list ul li p{width: 50%; display: inline-block; float: left;}
.price-list ul li .pl-img{display:block; float:left; overflow: hidden; margin-right: 1rem; width: 3rem; height: 3rem;}
.price-list ul li .pl-img img{width: 100%;}
.price-list ul li span{ display:block; float: right; width: 25%; color: #999; cursor: pointer;}
.price-list ul li i{position:relative; display:inline-block; top: -.625rem; right: .75rem; width: 1rem; height: 1rem; background-color: #e84d4f; border-radius: 50%; text-align: center; line-height: 1.2rem; color: #fff; font-style: normal; font-size: .75rem;}
</style>