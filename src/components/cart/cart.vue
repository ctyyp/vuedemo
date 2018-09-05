<template>
	<div class="cart-wrapper" id="panel" @click="hidePanel">
		<div class="cart">
			<div class="buy-list" :class="{'buy-list-show':showFlag}" @click.stop="">
				<div class="title"><h3>洗衣清单</h3><span @click="showTips=true"><i></i>清空</span></div>
				<ul>
					<li v-for="(item,index) in cartList">
						<h4>{{item.clothesName}}</h4>
						<p><span>￥<em>{{item.price*item.count}}</em></span><i class="subtract" @click="cartListSubtract(index)"></i><b>{{item.count}}</b><i class="add" @click="cartListAdd(index)"></i></p>
					</li>
				</ul>
			</div>
			<div class="icon-cart" @click.stop="cartListHandle">
				<span></span>
				<i class="totalCount">{{countAll}}</i>
			</div>
			<div class="total">
				<p><i>¥</i><span>{{costAll}}</span></p>
			</div>
			<div class="pa-order"><router-link to="/ordered">下单洗护</router-link></div>	
		</div>
		<div class="black-bg" v-show="showFlag"></div>
		<div class="black-bg-two" v-show="showTips">
			<div class="tips" v-if="showTips">
				<section>
					<h2>提示</h2>
					<p>确定清空洗衣清单？</p>
				</section>
				<span class="close-btn" @click="showTips=false">取消</span>
				<span class="sure-btn" @click="cartListClear">确定</span>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
	import Vue from "vue"
	export default{
		data(){
			return {
				categoryName: this.$route.params.categoryName,
				showFlag: false,
				showTips: false
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
			},
			productDictlist(){
				const dict = {};
				this.products.category.forEach(item=>{
					dict[item.id] = item;
				});
				return dict
			},
			countAll(){
				let count = 0
				this.cartList.forEach(item=>{
					count += item.count;
				})
				return count
			},
			costAll(){
				let cost = 0;
				this.cartList.forEach(item => {
					cost += item.price * item.count
				})
				return cost
			}
		},
		methods:{
			cartListHandle(){
				if(this.showFlag===true){
					this.showFlag=false
				}else{
					this.showFlag=true
				}
			},
			hidePanel(event){
				const panel = document.getElementById('panel')
				if(panel){
					if(!panel.contains(event.target)){
						this.showFlag = false
					}
				}
			},
			cartListAdd(index){
				const Id = this.cartList[index].id
				this.$store.commit('cartListAdd',Id)
			},
			cartListSubtract(index){
				const Id = this.cartList[index].id
				this.$store.commit('cartListSubtract',Id);
			},
			cartListClear(){
				this.showFlag=false;
				this.$store.commit('cartListClear');
				this.showTips=false
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.$store.dispatch('getProductList');
			})
		}
	};
</script>
<style>
.cart-wrapper{position: fixed; z-index:11; bottom: 0; left: 0; width: 100%; height: 4rem; background: rgba(0,0,0,.5)}
.cart{position: absolute; width: 100%; height: 100%; z-index: 999;}
.cart .icon-cart{position: absolute; z-index: 9999; top: -1rem; left: .5rem; padding: .75rem; width: 4rem; height: 4rem; border-radius: 50%; background: rgba(0,0,0,.7)}
.cart .icon-cart span{display: block; width: 100%; height: 100%; background: url(../../../static/images/icon_cart.png) no-repeat; background-size: contain;}
.cart .icon-cart i{position: absolute; display: block; top: -.5rem; right: 0; width: 1.4rem; height: 1.4rem; background-color: #e84d4f; border-radius: 50%; font-style: normal; text-align: center; line-height: 1.4rem; color: #fff;}
.cart .total{position:absolute; left:0; top:0; padding:.5rem 4rem 0 5rem}
.cart .total p{font-size: .75rem; color: #ccc; line-height: 1.4;}
.cart .total p i{font-style: normal; font-size: 1.375rem; color: #fff;}
.cart .total p span{font-size: 1.375rem; color: #fff;}
.cart .pa-order{position: absolute; right: 0; bottom:0; width: 5rem; line-height: 4rem; text-align: center; background-color: #00a0e8; color: #fff;}
.cart .pa-order a{color: #fff}
.buy-list{position: fixed; z-index: 999; left: 0; bottom: -100%; width: 100%; background-color: #fff; transition: .3s ease-in-out; -webkit-transition: .3s ease-in-out;}
.buy-list .title{overflow: hidden; background-color: #eee; height: 2.4rem; line-height: 2.4rem;}
.buy-list .title h3{display: inline-block; margin-left: 1rem;}
.buy-list .title span{float: right; color: #999; margin-right: 1rem;}
.buy-list .title span i{position: relative; top:.125rem; display: inline-block; margin-right: .5rem; width: 1rem; height: 1rem; background: url(../../assets/icon_delete.png) no-repeat; background-size: contain;}
.buy-list ul li{height: 4rem; line-height: 4rem; padding: 0 1rem;}
.buy-list ul li h4{display: inline-block; float: left; margin-right: .5rem; font-size: 1rem; font-weight:normal;}
.buy-list .mode{float: left; color: #999;}
.buy-list ul li p{display: inline-block; float: right;}
.buy-list ul li p span{display: inline-block; margin-right: .5rem; color: #ea8010;}
.buy-list ul li p span em{font-style: normal;}
.buy-list ul li p b{display:inline-block; width: 2rem; text-align: center;}
.buy-list ul li p i{position:relative; top:.125rem; display:inline-block; width: 1rem; height: 1rem; background-size: contain; background-repeat: no-repeat;}
.buy-list ul li p .add{background-image: url(../../assets/icon_add.png);}
.buy-list ul li p .subtract{background-image: url(../../assets/icon_subtract.png);}
.buy-list-show{bottom: 4rem;}
.black-bg{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,.5); z-index: 99}
.black-bg-two{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,.5); z-index: 9999}
.tips{position:absolute; z-index: 999; top: 50%; left: 50%; padding: 1rem; margin-top: -5rem; line-height: 1.6; margin-left: -40%; width: 80%; height: 10rem; background-color: #fff; border-radius: 5px; box-shadow: 0 1px 5px rgba(0,0,0,.2)}
.tips section{padding:0 0 1rem; text-align: center;}
.tips section h2{font-size: 1.5rem;}
.tips span{display: block; width: 45%; height: 2.4rem; line-height: 2.4rem; text-align: center; border-radius: 3px;}
.tips .close-btn{float: left; border: 1px solid #f2f2f2;}
.tips .sure-btn{float: right; background-color: #00a0e8; color: #fff;}
</style>