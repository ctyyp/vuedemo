<template>
	<div class="password-wrapper">
		<Back></Back>
		<div class="password-set">
			<form>
				<input type="password" name="" class="password-box" placeholder="请输入六位数字支付密码" maxlength="6" v-model="pwOne">
				<input type="password" name="" class="password-box" placeholder="再次输入六位数支付字密码" maxlength="6" v-model="pwTwo">
				<p v-text="tip"></p>
				<input type="button" name="" class="password-btn" value="确定" @click="submitHandle">
			</form>
		</div>
		<div class="success-wrapper" v-if="successBox">
			<div class="success-box">
				<h2>交易密码设置成功</h2>
				<span @click="goBack">返回个人中心</span>
			</div>
		</div>
	</div>
</template>
<script>
import Back from "../../components/back/back"
	export default{
		data() {
			return {
				pwOne:'',
				pwTwo:'',
				tip:'',
				successBox: false
			}
		},
		methods:{
			submitHandle(){
				if(this.pwOne!==this.pwTwo){
					this.tip = "两次输入的密码不一样"
				}else if(isNaN(this.pwOne)||isNaN(this.pwTwo)){
					this.tip = "请输入输入数字"
				}else if(this.pwOne==='' || this.pwTwo===''){
					this.tip = "密码不能为空"
				}else{

				}
			},
			goBack(){
				this.$router.go(-1);
			}
		},
		components:{
			Back
		}
	};
</script>
<style>
.password-wrapper{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #fff; padding-top: 3rem; overflow-y: auto; padding: 4rem .75rem .75rem; z-index: 99999}
.password-set .password-box{padding-left:3rem;width:100%; height: 3rem; line-height: 3rem; border: none; border-bottom: 1px solid #f2f2f2; outline: none; background-image: url(../../assets/icon_login_code.png); background-size: 1.2rem; background-position: 1rem center; background-color: #fff; background-repeat: no-repeat;}
.password-set .password-box::-webkit-input-placeholder{color: #ccc;}
.password-set .password-btn{display:block; margin: 1rem auto 0; width: calc(100% - 2rem); -webkit-width: calc(100% - 2rem); height: 3rem; line-height: 3rem; background-color: #00a0e8; color: #fff; border: none; outline: none; border-radius: 3px; font-size: 1rem;}
.password-set p{color: #c00; padding: 0 1rem; line-height: 2rem; font-size: .75rem;}
.success-wrapper{position: fixed; left: 0; top: 0; z-index: 999999; width: 100%; height: 100%; background: rgba(0,0,0,.5)}
.success-box{position: absolute; left: 50%; top: 50%; width: 80%; padding: 1rem; text-align: center; transform: translate(-50%,-50%); background-color: #fff; border-radius: 5px;}
.success-box h2{line-height: 2; font-size: 1.25rem; font-weight: normal;}
.success-box span{display: inline-block; padding: .625rem 1rem; background-color: #0ae; color: #fff; border-radius: 3px; margin-top: 1rem;}
</style>