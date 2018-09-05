<template>
	<div class="list">
		<div class="godds-subnav">
			<ul class="subnav-ul" v-if="list">
				<li v-for="(item,index) in list.category">
					<router-link :to="'/product/' + item.categoryName">
						<div class="box">
							<div class="pr-img"><img :src="item.avatar"></div>
							<span>{{item.categoryName}}</span>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				name: this.$route.params.name
			}
		},
		computed:{
			list(){
				return this.$store.state.goodsList.find(item=>item.name===this.name)
			}
		},
		methods:{
		},
		created(){
			
		},
		mounted(){
			this.$nextTick(()=>{
				this.$store.dispatch('getProductList')
			});
		}
	};
</script>
<style>
.godds-subnav{padding:6rem 0 4rem;}
.godds-subnav ul{overflow:hidden; padding: .5rem 0;}
.godds-subnav ul li{position:relative; float: left; width: 33.333%; height: 10rem; border:.5rem solid #f9f9f9; text-align: center;}
.godds-subnav ul li .box{display: block; width: 100%; height: 100%; border:1px solid #f2f2f2; background-color: #fff;}
.godds-subnav ul li .pr-img{position:absolute; overflow: hidden; width: 5rem; height: 5rem; left: 50%; margin-left: -2.5rem; top: 1rem;}
.godds-subnav ul li .pr-img img{position:relative; top:50%; width: 100%; transform: translate(0,-50%); -webkit-transform: translate(0,-50%);}
.godds-subnav ul li span{position: absolute; top: 6.5rem; left: 0; width: 100%;}
</style>