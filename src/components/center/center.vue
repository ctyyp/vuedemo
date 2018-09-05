<template>
	<div class="user-wrapper" v-if="user">
		<div class="wrap">
			<!--头像昵称-->
			<div class="user-info">
				<div class="user-img"><img :src="user.avatar"></div>
				<div class="user-name">{{user.userName}}</div>
			</div>
			<!--充值、余额、现金券-->
			<div class="wallet">
				<div class="balance">
					<router-link to="/center/recharge">
					<p><span>{{user.balance}}.00</span>元</p>
						<p>余额/充值</p></router-link>
				</div>
				<div class="coupon">
					<router-link to="/center/ticket">
						<p><span>{{ticketNum}}</span>张</p>
							<p>现金券</p>
					</router-link>
				</div>
			</div>
			<div class="info-list">
				<ul>
					<li v-if="user.record"><router-link to="/center/record"><i></i>{{user.record.name}}<em></em></router-link></li>
					<li v-if="user.password"><router-link to="/center/password"><i></i>{{user.password.name}}<em></em></router-link></li>
					<li v-if="user.addressManage"><router-link to="/center/address"><i></i>{{user.addressManage.name}}<em></em></router-link></li>
					<li v-if="user.FAQ"><router-link to="/center/FAQ"><i></i>{{user.FAQ.name}}<em></em></router-link></li>
					<li v-if="user.offer"><router-link to="/center/offer"><i></i>{{user.offer.name}}<em></em></router-link></li>
					<li v-if="user.about"><router-link to="/center/about"><i></i>{{user.about.name}}<em></em></router-link></li>
				</ul>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		computed:{
			user(){
				return this.$store.state.user
			},
			ticketNum(){
				if(this.user.tickets){
					return this.user.tickets.length
				}else{
					return 0
				}
				
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
.user-wrapper{position: fixed; left: 0; top: 0; width: 100%; height: 100%; overflow-y: auto; background-color: #f9f9f9; z-index: 999;}
.user-info{padding: 1rem 0; background: url(../../assets/mine_bg.png) no-repeat; background-size: cover;}
.user-img{margin:0 auto; overflow:hidden; width:5rem; height: 5rem; border-radius: 50%;box-shadow: 0 0 10px rgba(0,0,0,.1);}
.user-img img{width: 100%;}
.user-name{text-align: center; line-height: 3rem; color: #fff; font-size: 1.25rem;}
/*钱包*/
.wallet{background-color: #fff; border-bottom: 1px solid #eee; overflow: hidden;}
.wallet div{padding: 1.5rem 1rem;width: 50%; float: left; text-align: center;}
.wallet div:nth-child(1){border-right: 1px solid #eee;}
.wallet div p{color: #9a9a9a; line-height: 1.6;}
.wallet div p span{color: #282828;}
/*信息列表*/
.info-list{margin-top: .5rem; background-color: #fff; margin-bottom: 4.5rem;}
.info-list li{position:relative; overflow: hidden; padding: 0 2rem; line-height: 4rem; border-bottom: 1px solid #f7f7f7;}
.info-list li a{display:block; width: 100%; height: 100%; color: #282828;}
.info-list li i{position:relative; top:.125rem; display:inline-block; margin-right: 1rem; width: 1.2rem; height: 1.2rem; background-repeat: no-repeat; background-size: contain; background-position: center;}
.info-list li:nth-child(1) i{background-image: url(../../assets/user_icon_1.png);}
.info-list li:nth-child(2) i{background-image: url(../../assets/user_icon_2.png);}
.info-list li:nth-child(3) i{background-image: url(../../assets/user_icon_3.png);}
.info-list li:nth-child(4) i{background-image: url(../../assets/user_icon_4.png);}
.info-list li:nth-child(5) i{background-image: url(../../assets/user_icon_5.png);}
.info-list li:nth-child(6) i{background-image: url(../../assets/user_icon_6.png);}
.info-list li em{position:absolute; top:50%; right:2rem; margin-top:-.5rem; display: inline-block; width: 1rem; height: 1rem; background: url(../../assets/icon_arrow_right_2.png) no-repeat; background-size: contain; background-position: center;}
.info-list li span{float: right; margin-right: 1.5rem; color: #ccc;}
</style>