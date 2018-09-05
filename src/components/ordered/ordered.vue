<template>
	<div class="ordered-wrapper">
		<Back></Back>
		<div class="wrap">
			<div class="tip">
				<p>预约成功后请等待工作人员上门取件</p>
			</div>
			<!--添加地址-->
			<div class="address" @click="showAddress=!showAddress">
				<div class="select-address"><i></i><span>请选择一个地址</span>
					<div>
						<span v-text="names"></span><span v-text="sex"></span><span v-text="phoneNumber"></span>
						<p v-text="address"></p>
					</div><em></em></div>
			</div>
			<div class="address-list" v-if="showAddress">
				<ul v-if="user.addressManage">
					<li v-for="(item,index) in user.addressManage.addressList" @click="seletAddress(index)">
						<span>{{item.names}}</span><span>{{item.sex}}</span><span>{{item.phoneNumber}}</span>
						<p>{{item.address}}</p>
					</li>
				</ul>
				<div class="go-back" @click="showAddress=!showAddress">返回</div>
			</div>
			<!--预约时间-->
			<div class="ordered-time" @click="timeListShow=!timeListShow">
				<p><span>预约收衣时间</span><span class="time-choice" v-text="times">选择预约时间</span><em></em></p>
			</div>
			<div class="time-list" :class="{'time-list-show': timeListShow}">
				<div class="time-tab">
					<ul>
						<li :class="{'selected': todayShow}" @click="todayShowHandle">
							<p class="day">今天</p>
							<p class="times">{{today}}</p>
							<span></span>
						</li>
						<li :class="{'selected': tomorrowShow}" @click="tomorrowShowHandle">
							<p class="day">明天</p>
							<p class="times">{{tomorrow}}</p>
							<span></span>
						</li>
						<li :class="{'selected': AfterTomorrowShow}" @click="AfterTomorrowShowHandle">
							<p class="day">后天</p>
							<p class="times">{{AfterTomorrow}}</p>
							<span></span>
						</li>
					</ul>
				</div>
				<div class="time-table">
					<div class="time-box" v-show="todayShow">
						<span v-for="(item,index) in user.times" :class="{'old-time': nowHour > item.value}" @click="(nowHour < item.value)? selectTimeToday(index):''">{{item.time}}</span>
						<span :class="{'old-time': nowHour > 21.99 || nowHour < 7.99}" @click="onTapToday">随时可取</span>
					</div>
					<div class="time-box" v-show="tomorrowShow">
						<span v-for="(item,index) in user.times" @click="selectTimeTomorrow(index)">{{item.time}}</span>
						<span @click="onTapTomorrow">随时可取</span>
					</div>
					<div class="time-box" v-show="AfterTomorrowShow">
						<span v-for="(item,index) in user.times" @click="selectTimeAfterTomorrow(index)">{{item.time}}</span>
						<span @click="onTapTomorrow">随时可取</span>
					</div>
					<p class="prompt">温馨提示：为保证服务质量，请提前1个小时以上预约。</p>
				</div>
				<div class="go-back" @click="timeListShow=!timeListShow">返回</div>
			</div>
			<!--配送方式-->
			<div class="delivery-mode">
				<h2>配送方式</h2>
				<div class="mode mode-1">
					<p><i class="active"></i><span>上门取件</span></p>
				</div>
			</div>
			<!--加急送回-->
			<div class="order-urgent">
				<div class="urgent-btn">
					<span>加急送回</span> <em :class="{'on': urgentBtnShow}"><i @click="urgentBtnShow=!urgentBtnShow"></i></em>
				</div>
				<p>需额外收取订单金额的50.0%</p>	
			</div>
			<div class="urgent-sure" style="display: none;">
				<div class="urgent-sure-box">
					<h2>提示</h2>
					<p>是否确定加急送回</p>
					<span class="cancel">取消</span><span class="ensure">确定</span>
				</div>
			</div>
			<!--输入备注内容-->
			<div class="remarks">
				<textarea placeholder="输入备注内容（可不填）" maxlength="50" @input="messageInput" v-model="message"></textarea>
				<span><i>{{remnant}}</i>/50个字</span>
			</div>
		</div>
		<div class="submit-btn">
			<input class="sub-btn" type="button" name="" value="确定" @click="openPay">
		</div>
		<pay :names="names" :phoneNumber='phoneNumber' :sex="sex" :address="address" :times="times" :message="message" v-if="payShow" @close="closePay"></pay>
	</div>
</template>
<script>
	import Back from "../../components/back/back"
	import pay from "../../components/pay/pay"
	export default{
		data(){
			return {
				showAddress:false,
				timeListShow:false,
				todayShow:true,
				tomorrowShow:false,
				AfterTomorrowShow:false,
				urgentBtnShow:false,
				payShow:false,
				names:'',
				phoneNumber:'',
				sex:'',
				address:'',
				times:'',
				message:'',
				remnant:'',
			}
		},
		computed:{
			user(){
				return this.$store.state.user
			},
			today(){
				const date = new Date();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				return month + '月' + day + '日'
			},
			tomorrow(){
				const date = new Date();
				const nowTime = date.getTime();
				const ms = 24*3600*1000*1;
				date.setTime(parseInt(nowTime+ms));
				const month = date.getMonth() + 1;
				const day = date.getDate();
				return month + '月' + day + '日'
			},
			AfterTomorrow(){
				const date = new Date();
				const nowTime = date.getTime();
				const ms = 24*3600*1000*2;
				date.setTime(parseInt(nowTime+ms));
				const month = date.getMonth() + 1;
				const day = date.getDate();
				return month + '月' + day + '日'
			},
			nowHour(){
				const date = new Date();
				const hour = date.getHours();
				return hour;
			}
		},
		methods:{
			seletAddress(index){
				this.names=this.user.addressManage.addressList[index].names;
				this.sex=this.user.addressManage.addressList[index].sex;
				this.phoneNumber=this.user.addressManage.addressList[index].phoneNumber;
				this.address=this.user.addressManage.addressList[index].address;
				this.showAddress=false
			},
			selectTimeToday(index){
				this.times = this.today + ' ' + this.user.times[index].time;
				this.timeListShow = false;
			},
			selectTimeTomorrow(index){
				this.times = this.tomorrow + ' ' + this.user.times[index].time;
				this.timeListShow = false;
			},
			selectTimeAfterTomorrow(index){
				this.times = this.AfterTomorrow + ' ' + this.user.times[index].time;
				this.timeListShow = false;
			},
			onTapToday(){
				this.times = this.today + ' ' + '随时可取';
				this.timeListShow = false;
			},
			onTapTomorrow(){
				this.times = this.tomorrow + ' ' + '随时可取';
				this.timeListShow = false;
			},
			onTapAfterTomorrow(){
				this.times = this.AfterTomorrow + ' ' + '随时可取';
				this.timeListShow = false;
			},
			todayShowHandle(){
				this.todayShow = true;
				this.tomorrowShow = false;
				this.AfterTomorrowShow = false;
			},
			tomorrowShowHandle(){
				this.todayShow = false;
				this.tomorrowShow = true;
				this.AfterTomorrowShow = false;
			},
			AfterTomorrowShowHandle(){
				this.todayShow = false;
				this.tomorrowShow = false;
				this.AfterTomorrowShow = true;
			},
			messageInput(){
				const txtVal = this.message.length;
				this.remnant = 50-txtVal
			},
			openPay(){
				this.payShow = true;
			},
			closePay(){
				this.payShow = false
			}
		},
		created(){
			console.log(this.nowHour)
		},
		mounted(){
			this.$store.dispatch('getUser')
		},
		components:{
			Back,
			pay
		}
	};
</script>
<style>
.ordered-wrapper{position: absolute; left: 0; top: 0; height: 100%; width: 100%; background-color: #f9f9f9; z-index: 9999; overflow: auto;}
.ordered-wrapper .wrap{padding: 3.5rem 0 5rem;}
.tip{height: 2rem; line-height: 2rem; background-color: #fffce6; color: #ea8010; text-indent: .5rem;}
.address{position: relative; padding: 2rem 0; background-color: #fff; background-image: url(../../assets/icon_address_line.png); background-repeat: repeat-x; background-position: bottom; background-color: #fff;}
.address .select-address{padding:0 3rem; line-height: 1.6rem;}
.address .select-address i{position:absolute; top:50%; left:1rem; display:inline-block; width: 1.4rem; height: 1.4rem; background: url(../../assets/icon_address.png) no-repeat; background-size: contain; background-position: center; transform: translate(0,-50%); -webkit-transform: translate(0,-50%);}
.address .select-address em,.ordered-time p em{position:absolute; top: 50%; right:1rem; display: inline-block; float: right; height: 1.2rem; width: 1.4rem; background: url(../../assets/icon_arrow_right_2.png) no-repeat; background-size: contain; background-position: center; transform: translate(0,-50%); -webkit-transform: translate(0,-50%);}
.address-list{position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 99999; padding: .5rem .5rem 4rem; background-color: #fff;}
.address-list ul li{padding: .5rem 0; line-height: 1.6rem; border-bottom: 1px solid #efefef;}
.address-list ul li span{margin-right: 1rem;}
.address-list .go-back{position: absolute; left: .5rem; bottom: .5rem; width: calc(100% - 1rem); height: 3rem; background-color: #00a0e8; color: #fff; line-height: 3rem; text-align: center; border-radius: 3px;}
.ordered-time{position:relative; padding: 1rem 0; margin-top: .5rem; background-color: #fff;}
.ordered-time .time-choice{float: right; color: #999;}
.ordered-time p{padding: 0 3rem 0 1rem}
.time-list{position:fixed; top:0; right:-100%; z-index:99999; padding-top: 2rem; width:100%; height:100%; background-color: #fff; transition: .3s linear; -webkit-transition: .3s linear;}
.time-list .time-tab ul{overflow: hidden; padding: 0 .5rem; border-bottom: 1px solid #f2f2f2;}
.time-list .time-tab ul li{position:relative; float: left; width: 33.33333%; text-align: center; height: 5rem; line-height: 1.6rem}
.time-list .time-tab ul li .day{font-size: 1.25rem; font-weight: bold;}
.time-list .time-tab ul li .times{color: #666;}
.time-list .time-tab ul li.selected span{position:absolute; display: inline-block; bottom:0; left:0; width: 100%; height: .5rem; background-color: #00a0e8}
.time-list .time-table{padding: .5rem;}
.time-list .time-table .time-box{width: 100%; text-align: center; border-top:1px solid #f2f2f2; border-left:1px solid #f2f2f2; overflow: hidden;}
.time-list .time-table .time-box span{float:left;display: inline-block; height: 4rem; line-height: 4rem; width: 33.333%; border-right:1px solid #f2f2f2; border-bottom:1px solid #f2f2f2;}
.time-list .time-table .old-time{color: #999}
.time-list .time-table .current{color: #fff; background-color: #00a0e8}
.time-list .prompt{color: #ea8010; line-height: 1.2rem; margin-top: 1rem;}
.time-list .go-back{position: absolute; left: .5rem; bottom: .5rem; width: calc(100% - 1rem); height: 3rem; background-color: #00a0e8; color: #fff; line-height: 3rem; text-align: center; border-radius: 3px}
.time-list-show{right: 0;}
.delivery-mode{padding: .5rem; margin-top: .5rem; background-color: #fff;}
.delivery-mode h2{height: 3rem; line-height: 3rem; text-indent: .5rem; font-size: 1rem; font-weight: bold; color: #ea8010; background-color: #fffce6; border-radius: 5px; border:1px solid #f2f2f2;}
.delivery-mode .mode{overflow:hidden; line-height: 3rem; padding:0 .5rem;}
.delivery-mode .mode p{display: inline-block;}
.delivery-mode .mode p i{position:relative; display:inline-block; top: .25rem; margin-right:.5rem;width: 1.2rem; height: 1.2rem; background: url(../../assets/icon_check.png) no-repeat; background-size: contain;}
.delivery-mode .mode p i.active{background-image: url(../../assets/icon_checked.png);}
.delivery-mode .mode-1{border-bottom: 1px solid #f2f2f2;}
.delivery-mode .mode-2 a{float: right; color: #ea8010; font-size: .875rem;}
.delivery-mode .search{position: relative; height: 2rem;}
.delivery-mode .search .sbox{position: absolute; width:100%; padding: 0 7rem 0 .5rem; height: 2rem; background-color: #eee; border:none; outline: none; border-radius: 5px 0 0 5px;}
.delivery-mode .search .sbtn{position: absolute; top: 0; right: 0; width: 6rem; height: 2rem; background-color: #00a0e8; color: #fff; border:none; border-left: 1rem solid #fff;}
.order-urgent{padding: .5rem; margin-top: .5rem; background-color: #fff;}
.order-urgent .urgent-btn{position:relative; height: 3rem; line-height: 3rem; text-indent: .5rem; font-size: 1rem; font-weight: bold; color: #ea8010; background-color: #fffce6; border-radius: 5px; border:1px solid #f2f2f2;}
.order-urgent .urgent-btn em{position:absolute; right:1rem; top:1rem; display:block; height: 1rem; width: 2rem; background-color: #ccc; border-radius: 1rem; transition: .5s;}
.order-urgent .urgent-btn i{position:absolute; left:-.8rem; top:-.3rem; display:inline-block; height: 1.6rem; width: 1.6rem; background-color: #fff; border:1px solid #eee; border-radius: 50%; box-shadow: 1px 1px 3px rgba(0,0,0,.2); transition: .5s;}
.order-urgent .urgent-btn .on {background-color: #4cc6fd;}
.order-urgent .urgent-btn .on i{left: 1.2rem; background-color: #00a0e8; border:none;}
.order-urgent p{overflow:hidden; padding:.2rem .5rem 0; height: 2.4rem; line-height: 2.4rem; color: #999; font-size: .875rem;}
.order-urgent p a{float: right; color: #ea8010;}
.urgent-sure{position: fixed; top: 0; left: 0; z-index: 9999; width: 100%; height: 100%; background:rgba(0,0,0,.5);}
.urgent-sure-box{position: absolute; overflow: hidden; top: 50%; left: 50%; padding: 1rem; width: 80%; text-align: center; background-color: #fff; border-radius: 5px; transform: translate(-50%,-50%); -webkit-transform: translate(-50%,-50%);}
.urgent-sure-box h2{height: 3rem; line-height: 3rem; font-weight: bold; font-size: 1.25rem;}
.urgent-sure-box p{height: 2rem; line-height: 2rem;}
.urgent-sure-box span{margin-top:1rem; width: 45%; height: 2.6rem; line-height: 2.6rem; border-radius: 3px;}
.urgent-sure-box .cancel{float: left; border:1px solid #f2f2f2; color: #999;}
.urgent-sure-box .ensure{float: right; background-color: #00a0e8; color: #fff;}
.remarks{position: relative; margin-top: .5rem; padding: .5rem; background-color: #fff;}
.remarks textarea{padding: .5rem; width: 100%; height: 10rem; border-radius: 5px; border:1px solid #f2f2f2; outline: none;}
.remarks span{position:absolute; right: 1rem; bottom: 1rem; color: #999;}
.submit-btn{position: fixed; bottom: 0; left: 0; padding: 1rem; width: 100%; background-color: #fff;}
.submit-btn .sub-btn{border:none; width: 100%; background-color: #00a0e8; color: #fff; height: 3rem;  line-height: 3rem; font-size: 1rem; border-radius: 3px;}
</style>