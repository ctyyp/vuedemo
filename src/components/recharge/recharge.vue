<template>
	<div class="recharge-wrapper">
		<Back></Back>
		<div class="wrap recharge">
			<div class="balance">
				<h2>账户余额</h2>
				<span><em>{{user.balance}}.00</em>元</span>
			</div>
			<div class="recharge-box">
				<h2>我要充值</h2>
				<div class="rb-tab">
					<ul>
						<li :class="{'selected':boxShow}" @click="onlineHandle">在线充值<i></i></li>
						<li :class="{'selected':cardShow}" @click="cardHandle">充值卡充值<i></i></li>
					</ul>
				</div>
				<div class="rb-content">
					<div class="online" :class="{'box-show': boxShow}">
						<div class="input-box">
							<input type="text" name="" placeholder="请输入您要充值的金额">
							<p>活动期间享一次在线充值500送150优惠</p>
						</div>
						<div class="pay-mode">
							<h3>付款方式</h3>
							<div class="pay-weixin" :class="{'current': selectWeixin}" @click="selectWeixin=!selectWeixin">
								<span><i></i>微信支付</span>
								<em></em>
							</div>
						</div>
						<button type="button" @click="goBack">立即充值</button>
					</div>
					<div class="card" :class="{'box-show': cardShow}">
						<div class="input-box">
							<input type="text" name="" placeholder="请输入充值兑换码">
						</div>
						<button type="button" @click="goBack">立即充值</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Back from "../../components/back/back"
	export default{
		data(){
			return{
				boxShow: true,
				cardShow: false,
				selectWeixin: false
			}
		},
		computed:{
			user(){
				return this.$store.state.user
			}
		},
		methods:{
			onlineHandle(){
				this.boxShow=true;
				this.cardShow=false;
			},
			cardHandle(){
				this.boxShow=false;
				this.cardShow=true;
			},
			goBack(){
				this.$router.go(-1);
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
.recharge-wrapper{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #f9f9f9; padding-top: 3rem; z-index: 9999; overflow-y: auto;}
.recharge{overflow: hidden;}
.recharge .balance{overflow:hidden; padding: 0 1rem; height: 3rem; line-height: 3rem; background-color: #fff; border-bottom: 1px solid #f2f2f2;}
.recharge .balance h2{display: inline-block; font-size: 1rem;}
.recharge .balance span{float: right;}
.recharge .balance span em{font-style: normal; color: #c00;}
.recharge .recharge-box{margin-top:1rem; border-top: 1px solid #f2f2f2;}
.recharge .recharge-box h2{padding:0 1rem; font-size: 1rem; border-bottom: 1px solid #f2f2f2; line-height: 3rem; background-color: #fff;}
.recharge .rb-tab ul{overflow: hidden; background-color: #fff;}
.recharge .rb-tab ul li{position:relative; float: left; width: 50%; text-align: center; line-height: 2.4rem; border-bottom: 1px solid #f2f2f2;}
.recharge .rb-tab ul li:nth-child(1){border-right:1px solid #f2f2f2;}
.recharge .rb-tab ul li.selected i{position:absolute; bottom:0; left:0; width:100%; height: 3px; background-color:#00a0e8;}
.recharge .rb-content{position: relative; height: 350px;}
.recharge .rb-content input{padding: 0 .5rem; width:100%; height:2.25rem; outline: none; border:1px solid #f2f2f2;}
.recharge .rb-content input::-webkit-input-placeholder{color: #ccc;}
.recharge .rb-content .input-box{padding: 1rem 1rem 0; background-color: #fff;}
.recharge .rb-content .input-box p{color: #ff8900; font-size: .875rem; line-height: 2.4rem;}
.recharge .rb-content .online{position: absolute; left: 0; top: 0; width: 100%; transition:.3s linear; -webkit-transition:.3s linear; transform: translate(-100%,0); -webkit-transform: translate(-100%,0);}
.recharge .rb-content .pay-mode{margin-top: .5rem; background-color: #fff;}
.recharge .rb-content .pay-mode h3{padding: 0 1rem; font-size: 1rem; border-bottom: 1px solid #f2f2f2; line-height: 3rem; background-color: #fff;}
.recharge .rb-content .pay-weixin{position:relative; overflow: hidden; padding: .5rem 1rem; line-height: 3rem;}
.recharge .rb-content .pay-weixin span{height: 3rem; line-height: 3rem; display: inline-block;}
.recharge .rb-content .pay-weixin span i{display:inline-block; margin-right: .5rem; float: left; width: 3rem; height: 3rem; background:url(../../assets/icon_weixin.png) no-repeat; background-size: contain;}
.recharge .rb-content .pay-weixin em{position:absolute; right:1rem; top:50%; margin-top:-.6rem; display:inline-block; width: 1.2rem; height: 1.2rem; background:url(../../assets/icon_check_1.png) no-repeat; background-size: contain;}
.recharge .rb-content .current em{background-image: url(../../assets/icon_checked_1.png);}
.recharge .rb-content button{display:block; margin:1rem auto 0; width: calc(100% - 2rem); width: -webkit-calc(100% - 2rem); height: 3rem; border-radius: 3px; font-size: 1.125rem; background-color: #00a0e8; color: #fff; border:none; outline: none;}
.recharge .rb-content .card{position: absolute; left: 0; top: 0; width:100%; transition:.3s linear; -webkit-transition:.3s linear; transform: translate(100%,0); -webkit-transform: translate(100%,0);}
.recharge .rb-content .card .input-box{padding-bottom: 1rem;}
.recharge .rb-content .box-show{transform: translate(0,0);-webkit-transform: translate(0,0);}
</style>