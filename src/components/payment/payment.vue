<template>
	<div class="payment-wrapper">
		<div class="close" @click='closePayment'><img src="../../assets/icon_close.png"></div>
		<div class="wrap">
			<div class="order-box order-num">
				<div class="item-name">订单</div>
				<div class="item-content">
					<span>xm1254893314566</span>
				</div>
			</div>
			<div class="order-box pay-price">
				<div class="item-name">支付金额</div>
				<div class="item-content">
					<span><em>{{totalCost}}.00</em>元</span>
				</div>
			</div>
			<div class="order-box pay-balance">
				<div class="item-name">余额支付</div>
				<div class="item-content">
					<div class="money"><span>账户余额：{{user.balance}}元</span><router-link to="/center/recharge">充值</router-link><div class="check" :class="{'checked':balanceCheck}" @click="balancePay"></div></div>
				</div>
			</div>
			<div class="order-box pay-other">
				<div class="title">其他付款方式</div>
				<div class="pay-weixin">
					<div class="weixin-icon" ><i></i><span>微信支付</span></div>
					<div class="check" :class="{'checked':weixinCheck}" @click="weixinPay"></div>
				</div>
			</div>
			<div class="cbtn">
				<span @click="clearCartList" >确定</span>
			</div>
		</div>
		<div class="black-bg" v-if="completeShow">
			<div class="pay-complete" >
				<h2>支付成功</h2>
				<span><router-link to="/list/衣服">返回商品列表</router-link></span>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				balanceCheck: true,
				weixinCheck: false,
				completeShow:false
			}
		},
		computed:{
			user(){
				return this.$store.state.user
			},
			cartList(){
				return this.$store.state.cartList
			},
			totalCost(){
				let cost = 0;
				this.cartList.forEach(item =>{
					cost +=item.price* item.count
				})
				return cost
			}
		},
		methods:{
			closePayment(){
				this.$emit('closePayment')
			},
			balancePay(){
				this.balanceCheck=true;
				this.weixinCheck=false;
			},
			weixinPay(){
				this.balanceCheck=false;
				this.weixinCheck=true;
			},
			clearCartList(){
				this.$store.commit('cartListClear')
				this.completeShow=true
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.$store.dispatch('getUser')
			})
		}
	};
</script>
<style>

.payment-wrapper{position: fixed; left: 0; top: 0; height: 100%; width: 100%; background-color: #f9f9f9; z-index: 99999; overflow: auto;}
.payment-wrapper .wrap{padding-top: 3.5rem;}
.payment-wrapper .close{position: absolute; left: 0; top: 0; width: 100%; height: 3rem; background-color: #fff;}
.payment-wrapper .close img{position: absolute; left: 1rem; top: 1rem; width: 1rem; height: 1rem;}
.payment-wrapper .black-bg{position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,.5); z-index: 99999}
.payment-wrapper .black-bg .pay-complete{position: absolute; left: 50%; top: 50%; width: 80%; transform: translate(-50%,-50%); padding: 3rem 0; background-color: #fff; text-align: center; border-radius: 5px;}
.payment-wrapper .black-bg .pay-complete h2{display: block; line-height: 1.6;}
.payment-wrapper .black-bg .pay-complete span{display: inline-block; background-color: #0ae; padding: .5rem 1rem; border-radius: 3px; margin-top: 1rem;}
.payment-wrapper .black-bg .pay-complete span a{color: #fff;}
.order-box{position:relative; overflow: hidden; border-bottom: 1px solid #ededed; background-color: #fff; padding: 0 1rem;}
.order-box .item-content{padding-left: 6rem; line-height: 3rem; text-align: right;}
.order-box .item-name{position: absolute; left: 1rem; width: 6rem; line-height: 3rem;}
.order-num .item-content span{color: #999;}
.pay-price .item-content span em{margin-right: .125rem; color: #e5383c; font-style: normal;}
.pay-cash{margin-top: .5rem; border-top: 1px solid #ededed;}
.pay-cash .item-content{background: url(../../assets/icon_arrow_right_2.png) no-repeat right center; background-size: .625rem;}
.pay-cash .item-content span{margin-right: 1.5rem; color: #33b92c; font-size: .875rem;}
.pay-cash p{line-height: 3rem;}
.pay-cash p span{color: #e5383c;}
.pay-balance .item-content{text-align: left; font-size: .875rem; color: #999;}
.pay-balance .item-content .money a{position: relative; display: inline-block; padding: 0 .25rem; margin-left: .5rem; line-height: 1.5; background-color: #0ae; color: #fff; border-radius: 3px;}
.pay-balance .item-content .money .check{position: absolute; right: 1rem; top:.8rem;  width: 1.4rem; height: 1.4rem; background: url(../../assets/icon_check_1.png) no-repeat; background-size: contain;}
.pay-balance .item-content .money .checked{background-image: url(../../assets/icon_checked_1.png);}
.pay-balance .item-content .password-set a{display: inline-block; padding: .25rem; margin-left: .5rem; border: 1px solid #0ae; border-radius: 3px; color: #0ae; line-height: 1.5;}
.pay-other{margin-top: .5rem; border-top: 1px solid #ededed;}
.pay-other .title{line-height: 3rem; border-bottom: 1px solid #ededed;}
.pay-other .pay-weixin{position: relative; height: 4rem;}
.pay-other .pay-weixin .weixin-icon {position: absolute; left: 0; top: .5rem; height: 3rem;}
.pay-other .pay-weixin .weixin-icon i{display: inline-block; float: left; width: 3rem; height: 3rem; background: url(../../assets/icon_weixin.png) no-repeat; background-size: contain;}
.pay-other .pay-weixin .weixin-icon span{display: inline-block; margin-left: 1rem; line-height: 3rem;}
.pay-other .pay-weixin .check{position: absolute; right: 0; top: 1.3rem; width: 1.4rem; height: 1.4rem; background: url(../../assets/icon_check_1.png) no-repeat; background-size: contain;}
.pay-other .pay-weixin .checked{background-image: url(../../assets/icon_checked_1.png);}
.cbtn{position: fixed; left: 0; bottom: 1rem; padding: 0 1rem; width: 100%;}
.cbtn span{display: block; width: 100%; height: 2.4rem; line-height: 2.4rem; background-color: #0ae; color: #fff; text-align: center; font-size: 1.125rem; border-radius: 3px;}

</style>