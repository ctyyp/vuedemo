<template>
	<div class="pay-wrapper">
		<div class="close" @click='close'><img src="../../assets/icon_close.png"></div>
		<div class="wrap" style="padding-bottom: 3.5rem;">
			<div class="order-content">
				<dl>
					<dt>订单信息</dt>
					<dd><b>订单号</b><span>DC12232152362585641</span></dd>
					<dd><b>联系人</b><span>{{this.names}}&nbsp;&nbsp;{{sex}}</span></dd>
					<dd><b>联系电话</b><span>{{phoneNumber}}</span></dd>
					<dd><b>下单时间</b><span>{{nowTime}}</span></dd>
					<dd><b>预约时间</b><span>{{times}}</span></dd>
					<dd><b>收衣地址</b><span>{{address}}</span></dd>
					<dd><b>备注</b><span>{{message}}</span></dd>
				</dl>
			</div>
			<div class="order-info">
				<div class="tit">
					<h3>衣物信息</h3>
				</div>
				<div class="content">
					<ul>
						<li v-for="item in cartList">
							<span class="name">{{item.clothesName}}</span>
							<span class="num">x{{item.count}}</span>
							<span class="price">￥{{item.price*item.count}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="pay-bar">
				<div class="total">
					<span>共<em>{{toalCount}}</em>件</span><span>实付：<em>¥{{totalCost}}.00</em></span>
				</div>
				<button class="pay-btn" @click="openPayment">付款</button>
			</div>
		</div>
		<payment v-if="paymentShow" @closePayment="closePayment"></payment>
	</div>
</template>
<script>
	import payment from "../../components/payment/payment"
	export default{
		data(){
			return {
				paymentShow:false
			}
		},
		props:{
				names:{
					type: String
				},
				phoneNumber:{
					type: Number
				},
				sex:{
					type: String
				},
				address:{
					type: String
				},
				times:{
					type: String
				},
				message:{
					type: String
				}
		},
		computed:{
			cartList(){
				return this.$store.state.cartList
			},
			nowTime(){
				const date = new Date();
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				const hour = date.getHours() >= 10 ? date.getHours(): ('0' + date.getHours());
				const minute = date.getMinutes() >= 10 ? date.getMinutes():('0'+date.getMinutes());
				const second = date.getSeconds() >= 10 ? date.getSeconds():('0'+date.getSeconds());
				return year + '年' + month + '月' + day + '日' + ' ' + hour + ':' + minute + ':' + second  
			},
			toalCount(){
				let count = 0;
				this.cartList.forEach(item =>{
					count += item.count
				})
				return count
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
			close(){
				this.$emit('close')
			},
			openPayment(){
				this.paymentShow=true
			},
			closePayment(){
				this.paymentShow=false
			}
		},
		components:{
			payment
		}
	};
</script>
<style>
.pay-wrapper{position: fixed; left: 0; top: 0; height: 100%; width: 100%; background-color: #f9f9f9; z-index: 99999; overflow: auto;}
.pay-wrapper .close{position: absolute; left: 0; top: 0; width: 100%; height: 3rem; background-color: #fff;}
.pay-wrapper .close img{position: absolute; left: 1rem; top: 1rem; width: 1rem; height: 1rem;}
.pay-wrapper .wrap{padding: 3rem 0 5rem;}
.order-content{height: 100%; width: 100%; padding-bottom: 1rem; margin-top:.5rem; background-color: #fff; border-top: 1px solid #f2f2f2; border-bottom: 1px solid #f2f2f2;}
.order-content dl dt{padding:0 1rem; margin-bottom: .5rem; height: 3rem; line-height: 3rem; border-bottom: 1px solid #f2f2f2;}
.order-content dl dd{overflow: hidden; padding: 0 1rem; line-height: 2rem; color: #666;}
.order-content dl dd span{float: right; width: calc(100% - 7rem); width: -wbkit-calc(100% - 7rem); text-align: right; color: #999;}
.order-content dl dd b{float: left; width: 7rem; font-weight: normal;}
.order-info{margin-top: .5rem; background-color: #fff;}
.order-info .tit{overflow: hidden; padding: 0 1rem; height: 3rem; line-height: 3rem; border-bottom: 1px solid #e0e0e0;}
.order-info .tit h3{display: inline-block;}
.order-info .tit a{float: right; font-size: .875rem; color: #999;}
.order-info .content{padding: .5rem 1rem;}
.order-info .content ul li{overflow: hidden; line-height: 2.4rem;}
.order-info .content ul li span{display: inline-block; float: left;}
.order-info .content .name{width: 60%; height: 2.4rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
.order-info .content .num{width: 20%; text-align: center; color: #666;}
.order-info .content .price{width: 20%; color: #666;}
.pay-bar{position: fixed; left: 0; bottom: 0; width: 100%; height: 3rem; line-height: 3rem; background-color: #fff; box-shadow: 3px 3px 5px rgba(0,0,0,2)}
.pay-bar .total{padding-left: 1rem; display: inline-block;}
.pay-bar .total em{font-style: normal; color: #e5383c;}
.pay-bar .total span{margin-right: 1rem;}
.pay-bar .pay-btn{float: right; height: 3rem; width: 6rem; background-color: #0ae; color: #fff; border: none; outline: none; font-size: 1rem;}
</style>